import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCustomers = query({
  args: {},
  handler: async (ctx) => {
    const customers = await ctx.db.query("customers").order("desc").collect();
    
    // Calculate balances for each customer
    const customersWithBalances = await Promise.all(
      customers.map(async (customer) => {
        const transactions = await ctx.db
          .query("transactions")
          .withIndex("by_customer", (q) => q.eq("customerId", customer._id))
          .collect();
          
        let totalDue = 0;
        let totalPaid = 0;
        
        for (const t of transactions) {
          if (t.type === "due") {
            totalDue += t.amount;
          } else if (t.type === "payment") {
            totalPaid += t.amount;
          }
        }
        
        return {
          ...customer,
          totalDue,
          totalPaid,
          balance: totalDue - totalPaid,
        };
      })
    );
    
    return customersWithBalances;
  },
});

export const getCustomerById = query({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    const customer = await ctx.db.get(args.id);
    if (!customer) return null;
    
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_customer", (q) => q.eq("customerId", args.id))
      .order("desc")
      .collect();
      
    let totalDue = 0;
    let totalPaid = 0;
    
    for (const t of transactions) {
      if (t.type === "due") {
        totalDue += t.amount;
      } else if (t.type === "payment") {
        totalPaid += t.amount;
      }
    }
    
    return {
      ...customer,
      totalDue,
      totalPaid,
      balance: totalDue - totalPaid,
      transactions,
    };
  },
});

export const createCustomer = mutation({
  args: {
    name: v.string(),
    phone: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("customers", {
      ...args,
      createdAt: Date.now(),
    });
    return id;
  },
});

export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const transactions = await ctx.db.query("transactions").collect();
    const customersCount = (await ctx.db.query("customers").collect()).length;
    
    let totalDue = 0;
    let totalPaid = 0;
    
    for (const t of transactions) {
      if (t.type === "due") totalDue += t.amount;
      else if (t.type === "payment") totalPaid += t.amount;
    }
    
    return {
      totalCustomers: customersCount,
      totalReceiving: totalDue - totalPaid, // Still to be received
      totalDue: totalDue,
      totalPaid: totalPaid,
    };
  },
});

export const deleteCustomer = mutation({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    const customer = await ctx.db.get(args.id);
    if (!customer) throw new Error("Customer not found");
    
    // Fetch all transactions for this customer
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_customer", (q) => q.eq("customerId", args.id))
      .collect();
      
    // Delete all transactions concurrently
    await Promise.all(transactions.map((tx) => ctx.db.delete(tx._id)));
    
    // finally delete the customer
    await ctx.db.delete(args.id);
  },
});
