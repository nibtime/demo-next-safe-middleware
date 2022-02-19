# Demo for @next-safe/middleware with Next 12.1

https://demo-next-safe-middleware.vercel.app/

A little demo project to showcase the usage and the hybrid strict-dynamic CSP support of the [@next-safe/middleware](https://www.npmjs.com/package/@next-safe/middleware) package.

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/nextjs-km7zwa)

Strict-dynamic CSPs can't be evaluated with Next.js development builds.

You can either serve a production build with `npm run build && npm run start` (surprisingly works in StackBlitz frame, you can observe CSP in Network Tab) or, to test it for real, deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnibtime%2Fdemo-next-safe-middleware%2Ftree%2Fmaster)
