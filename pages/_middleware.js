import {
  chain,
  nextSafe,
  strictDynamic,
  reporting,
} from '@next-safe/middleware';

// The geo block middleware from the package README to play around with
/** @type {import('@next-safe/middleware').Middleware} */
const geoBlockMiddleware = (req, evt, res, next) => {
  const BLOCKED_COUNTRY = 'GB';
  const country = req.geo.country || 'US';

  if (country === BLOCKED_COUNTRY) {
    const response = new Response('Blocked for legal reasons', { status: 451 });
    // returning response terminates the chain
    return response;
    // returning response with next continues the chain with response as `res` param
    // next will only be available in chain context, not if used as standalone middleware
    return next ? next(response) : response;
  }
  // returning nothing continues the chain
};

const isDev = process.env.NODE_ENV === 'development';

const nextSafeMiddleware = nextSafe((req) => {
  const stackblitz = {
    'frame-ancestors': [`https://stackblitz.com`],
  };
  // origin: host with protocol (e.g. https:// demo-next-safe-middleware.vercel.app, ...)
  const { origin } = req.nextUrl;
  const connect = {
    'connect-src': [`'self'`, origin],
  };
  return {
    isDev,
    contentSecurityPolicy: {
      ...stackblitz,
      ...connect,
    },
    // customize as you need: https://trezy.gitbook.io/next-safe/usage/configuration
  };
});

// you can observe logged CSP violations in the "Functions" section of a deployment
// in the Vercel dashboard. You can set up a log drain via integration to ingest and analyze them: https://vercel.com/integrations#logging
const reportingMiddleware = reporting((req) => {
  const { origin } = req.nextUrl;
  const nextApiReportingEndpoint = `${origin}/api/reporting`;
  return {
    csp: {
      reportUri: process.env.CSP_REPORT_URI || nextApiReportingEndpoint,
      reportSample: true,
    },
    reportTo: {
      max_age: 1800,
      endpoints: [
        {
          url:
            process.env.REPORT_TO_ENDPOINT_DEFAULT || nextApiReportingEndpoint,
        },
      ],
    },
  };
});
export default chain(nextSafeMiddleware, strictDynamic(), reportingMiddleware);
