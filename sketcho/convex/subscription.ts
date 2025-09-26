import { query } from "./_generated/server";
import { v } from "convex/values";

// Returns minimal entitlement info for a user based on subscriptions table
export const hasEntitlement = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const subscriptions = await ctx.db
      .query("subscriptions")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    if (subscriptions.length === 0) {
      return { hasAccess: false, subscription: null } as const;
    }

    // Choose the most relevant active subscription if present
    const active = subscriptions.find((s) => s.status === "active") ?? subscriptions[0];
    const hasAccess = active.status === "active" || active.status === "trialing";

    return { hasAccess, subscription: active } as const;
  },
});


