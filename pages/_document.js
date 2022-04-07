import {
  getCspInitialProps,
  provideComponents,
} from "@next-safe/middleware/dist/document";
import Document, { Html, Main } from "next/document";
import React from "react";
import { lazyGetCssText } from "stitches.config";
import Script from "next/script";

const InterVar = `@font-face {
  font-family: 'Inter var';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/Inter-roman.var.3.18.woff2') format('woff2');
  font-named-instance: 'Regular';
}
@font-face {
  font-family: 'Inter var';
  font-style: italic;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/Inter-italic.var.3.18.woff2') format('woff2');
  font-named-instance: 'Italic';
}`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await getCspInitialProps({
      ctx,
      trustifyStyles: true,
    });
    return initialProps;
  }
  render() {
    // those components are automagically wired with provideHashesOrNonce
    const { Head, NextScript } = provideComponents(this.props);
    return (
      <Html>
        <Head>
          <script>{`console.log('Hello from _document/Head, I get nonced/hashed there')`}</script>
          <style dangerouslySetInnerHTML={{ __html: InterVar }} />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{
              __html: lazyGetCssText(this.props.__NEXT_DATA__.page),
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* add <Script strategy="beforeInteractive"> always in _document.js. Can't be inline*/}
          <Script
            id="sentry-script"
            strategy="beforeInteractive"
            src="https://browser.sentry-cdn.com/6.16.1/bundle.min.js"
            // the script will get assigned a nonce for Nonce-based CSP routes
            // the integrity attribute will be picked up for Hash-based CSP routes
            integrity="sha384-WkFzsrcXKeJ3KlWNXojDiim8rplIj1RPsCbuv7dsLECoXY8C6Cx158CMgl+O+QKW"
          />
          {/* do this with <Script strategy="afterInteractive"> from next/script in _app.js*/}
          {/* or in <Head> for beforeInteractive (see above) */}
          <script
            dangerouslySetInnerHTML={{
              __html: `console.log('I will always be blocked by a strict CSP')`,
            }}
          />
        </body>
      </Html>
    );
  }
}
