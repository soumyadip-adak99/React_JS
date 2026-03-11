import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  customers: defineTable({
    name: v.string(),
    phone: v.optional(v.string()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  }),
  transactions: defineTable({
    customerId: v.id("customers"),
    type: v.union(v.literal("due"), v.literal("payment")),
    amount: v.number(),
    note: v.optional(v.string()),
    date: v.string(),
    createdAt: v.number(),
  }).index("by_customer", ["customerId"]),
});
