import { defineSchema , defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
// now lets create the table schemas 
import { v } from "convex/values";
 
const schema = defineSchema({
  ...authTables,
  // Your other tables...

  //this is the counter for the projects which we will be creating in this app 
  project_counter: defineTable({
    userId: v.id('users'),
    nextProjectNumber: v.number()
  }).index('by_userId' , ['userId']) //indexes are faster to get the querries , and thats it 
});
 
export default schema;