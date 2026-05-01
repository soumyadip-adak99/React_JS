import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addTransaction = mutation({
  args: {
    customerId: v.id("customers"),
    type: v.union(v.literal("due"), v.literal("payment")),
    amount: v.number(),
    note: v.optional(v.string()),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("transactions", {
      ...args,
      createdAt: Date.now(),
    });
    return id;
  },
});

export const deleteTransaction = mutation({
  args: { id: v.id("transactions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const deleteAllTransactions = mutation({
  args: { customerId: v.id("customers") },
  handler: async (ctx, args) => {
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_customer", (q) => q.eq("customerId", args.customerId))
      .collect();

    for (const tx of transactions) {
      await ctx.db.delete(tx._id);
    }
  },
});
