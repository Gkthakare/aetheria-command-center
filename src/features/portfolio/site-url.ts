const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL ||
  (productionHost ? `https://${productionHost}` : undefined);

export const siteUrl = configuredUrl ? new URL(configuredUrl).origin : undefined;
