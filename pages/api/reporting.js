import { reporting, sentryCspReporterForEndpoint } from '@next-safe/middleware/dist/api';

/** @type {import('@next-safe/middleware/dist/api').Reporter} */
const consoleLogReporter = (data) =>
  console.log(JSON.stringify(data, undefined, 2));

// lookup at https://docs.sentry.io/product/security-policy-reporting/
const sentryCspEndpoint = process.env.SENTRY_CSP_ENDPOINT;
const sentryCspReporter = sentryCspEndpoint ? [sentryCspReporterForEndpoint(sentryCspEndpoint)] : [];

export default reporting(consoleLogReporter, ...sentryCspReporter);
