import { preloadQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";


export const ProfileQuery = async () => {
    return preloadQuery(
        api.user.getCurrentUser, 
        {}, 
        {token : await convexAuthNextjsToken() }
    )
}

// this is nothing but it takes the data from the data base which checks if the user has subscription or not
export const subscriptionEntitlementQuery =  async () => {

}