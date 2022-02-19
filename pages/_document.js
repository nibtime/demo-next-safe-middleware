import Document, {
  provideComponents,
} from '@next-safe/middleware/dist/document';
import { Html, Main } from 'next/document';
import React from 'react';

const violationScript = `console.log('I will always be blocked with a strict CSP')`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    // those components are automagically wired with provideHashesOrNonce
    const { Head, NextScript } = provideComponents(this.props);
    return (
      <Html>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: violationScript }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
