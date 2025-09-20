// import {CONVEX_SITE_URL} from "@/env.local";
export default {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL,
      applicationID: "convex",
    },
  ],
};
