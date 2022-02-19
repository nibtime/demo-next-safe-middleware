import Link from 'next/link';
import { useEffect, useState } from 'react';

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      requestHeaders: ctx.req?.headers,
      responseHeaders: ctx.res?.getHeaders(),
    },
  };
};

const Page = ({ requestHeaders, responseHeaders }) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <article className="prose prose-lg prose-blue">
      <h1>A Page with getServerSideProps</h1>
      {!hydrated && (
        <p className="text-red-700">
          If you see me the page hasn't hydrated and is not interactive...
        </p>
      )}
      {hydrated && (
        <p className="text-green-700">
          If you see me the page has hydrated and is interactive...
        </p>
      )}
      <p>
        It get's prerendered per request and has access to request and response
        data
      </p>

      <p>
        That's why it can use Nonce-based CSP, it has the chance to set a fresh
        nonce as attribute to scripts on each request.
      </p>

      <h2>Internal navigation to other pages</h2>
      <ul>
        <li>
          <Link href="/static-page">Page with getStaticProps</Link>
        </li>
        <li>
          <Link href="/isr/i-am-a-lazy-path">
            <a>
              Page with getStaticProps + <code>revalidate</code> (ISR)
            </a>
          </Link>
        </li>
      </ul>
      <h2>Request Headers</h2>
      <pre>{JSON.stringify(requestHeaders, null, 2)}</pre>
      <h2>Response Headers</h2>
      <pre>{JSON.stringify(responseHeaders, null, 2)}</pre>
    </article>
  );
};

export default Page;
