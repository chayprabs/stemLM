const requiredServerVars: Record<string, string | undefined> = {
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_D1_DATABASE_ID: process.env.CLOUDFLARE_D1_DATABASE_ID,
  CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
}

if (typeof window === "undefined") {
  const missing = Object.entries(requiredServerVars)
    .filter(([_, v]) => !v)
    .map(([k]) => k)

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map(k => `  - ${k}`).join("\n")}`
    )
  }
}

const env = {
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
    secretKey: process.env.CLERK_SECRET_KEY!,
    signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL!,
    signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL!,
    afterSignInUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL!,
    afterSignUpUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL!,
  },
  cloudflare: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    d1DatabaseId: process.env.CLOUDFLARE_D1_DATABASE_ID!,
    apiToken: process.env.CLOUDFLARE_API_TOKEN!,
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL!,
    dashboardUrl: process.env.NEXT_PUBLIC_DASHBOARD_URL!,
  },
}

export default env
