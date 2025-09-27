import { subscriptionEntitlementQuery } from '@/convex/query.config'
import { redirect } from 'next/navigation'
import { combinedSlug } from '@/lib/utils'

const page = async () => {
    const [entitlemnt , profileName ] = await subscriptionEntitlementQuery()
    if(!entitlemnt._valueJSON){
      redirect(`/billing${combinedSlug(profileName!)}`);
    }
    redirect(`/dashboard/${combinedSlug(profileName!)}`)
}

export default page