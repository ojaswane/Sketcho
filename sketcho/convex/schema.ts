import { defineSchema , defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
// now lets create the table schemas 
import { v } from "convex/values";
 
const schema = defineSchema({
  ...authTables,
  // Your other tables...
  //projects schema 
  Projects: defineTable({
    userId: v.id('users'),
    name: v.string(),
    description: v.optional(v.string()),
    styeleGuide: v.optional(v.string()),
    sketchData: v.any(), //json Structure to `matching redux state 
    viewportData :  v.optional(v.any()),
    generatedDesignData : v.optional(v.any()),
    thumbnail : v.optional(v.string()),
    moodBoardImage : v.optional(v.array(v.string())),
    InspirationImages: v.optional(v.array(v.string())),
    lastModified: v.number(),
    createdAt: v.number(),
    category: v.optional(v.array(v.string())),
    projectNumber: v.number(),
    isPublic: v.optional(v.boolean())
  }).index('By_userId' , ['userId']),

  //this is the counter for the projects which we will be creating in this app 
  project_counter: defineTable({
    userId: v.id('users'),
    nextProjectNumber: v.number()
  }).index('by_userId' , ['userId']) //indexes are faster to get the querries , and thats it 
  ,

  // subscriptions schema
  subscriptions: defineTable({
    userId: v.id('users'),
    polarCustomerId: v.string(),
    polarSubscriptionId: v.string(),
    productId: v.optional(v.string()),
    priceId: v.optional(v.string()),
    planCode: v.optional(v.string()),
    status: v.string(),
    currentPeriodEnd: v.optional(v.number()),
    trialEndsAt: v.optional(v.number()),
    cancelAt: v.optional(v.number()),
    canceledAt: v.optional(v.number()),
    seats: v.optional(v.number()),
    metadata: v.optional(v.any()),
    creditsBalance: v.number(),
    creditsGrantPerPeriod: v.number(),
    creditsRolloverLimit: v.number(),
    lastGrantCursor: v.optional(v.string()),
  })
    .index('by_userId', ['userId'])
    .index('by_polarSubscriptionId', ['polarSubscriptionId'])
    .index('by_status', ['status'])
  ,

  // credits ledger schema
  credits: defineTable({
    userId: v.id('users'),
    subscriptionId: v.id('subscriptions'),
    amount: v.number(),
    type: v.string(),
    reason: v.optional(v.string()),
    idempotencyKey: v.optional(v.string()),
    meta: v.optional(v.any()),
  })
    .index('by_subscriptionId', ['subscriptionId'])
    .index('by_userId', ['userId'])
    .index('by_idempotencyKey', ['idempotencyKey'])
});
 
export default schema;