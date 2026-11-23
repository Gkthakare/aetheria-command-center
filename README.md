# Aetheria Command Center

Gaurav Thakare’s AI engineering portfolio. The homepage links to engineering case studies, recent project milestones, and the interactive project galaxy.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Use `/command-center` for the interactive WebGL experience and `/aetheria` for the VR world showcase.

Run `npm run build` for the production build and `npm start` to serve it locally. The build downloads the existing Google Fonts through Next.js.

## Update the portfolio

Edit `src/features/portfolio/projects.ts` for the homepage and case studies. Each entry describes what is available to review and includes public source links where available. The existing visual project registry lives at `src/features/project-galaxy/data/projects.ts`.

## Attach a custom domain

1. Deploy the portfolio to the existing `aetheria-command-center` Vercel project.
2. Once you own the domain, open the project’s **Settings → Domains** in Vercel and add it to the **Production** environment.
3. Add the DNS records shown by Vercel at your domain registrar. Wait for Vercel to verify the domain and issue HTTPS.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin in Vercel’s Production environment and redeploy so the page metadata uses your preferred domain.
5. Open the domain in a private browser window and check that the portfolio opens directly without signing in. Submit the homepage URL in the application.

[Vercel custom domain guide](https://vercel.com/docs/domains/set-up-custom-domain)
