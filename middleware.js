// middleware.js
import {
  chainMatch,
  isPageRequest,
  csp,
  strictDynamic,
  strictInlineStyles,
  reporting,
} from "@next-safe/middleware";

const securityMiddleware = [
  csp({
    // your CSP base configuration with IntelliSense
    // single quotes for values like 'self' are automatic
    directives: {
      "img-src": ["self", "data:", "https://images.unsplash.com"],
      "font-src": ["self", "https://fonts.gstatic.com"],
    },
  }),
  strictDynamic(),
  strictInlineStyles(),
  reporting({
    csp: {
      reportUri: "/api/reporting",
    },
    reportTo: {
      max_age: 1800,
      endpoints: [{ url: "/api/reporting" }],
    },
  }),
];

export default chainMatch(isPageRequest)(...securityMiddleware);
