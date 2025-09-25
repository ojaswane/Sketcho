import React from 'react'
import { subscriptionEntitlementQuery } from '@/convex/query.config'

const page = async () => {
    const [entitlemnt , profileName ] = await subscriptionEntitlementQuery()
  return (
    <div>page</div>
  )
}

export default page