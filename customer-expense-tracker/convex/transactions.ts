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
