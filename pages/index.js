import { useEffect, useState } from 'react';

// pages without a data fetching function are static pages and must use a Hash-based CSP.
const Page = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <article className="prose prose-lg prose-blue">
      <h1>@next-safe/middleware demo </h1>
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
        A little demo project to showcase the usage and the hybrid
        strict-dynamic CSP support of the{' '}
        <a href="https://www.npmjs.com/package/@next-safe/middleware">
          @next-safe/middleware
        </a>{' '}
        package.
      </p>
      <h2>Prerendering strategies:</h2>
      <ul>
        <li>
          <a href="/static-page">Page with getStaticProps</a> (Hash-based)
        </li>
        <li>
          <a href="/dynamic-page">Page with getServerSideProps</a> (Nonce-based)
        </li>
        <li>
          <a href="/isr/lazy-slug">
            Page with getStaticProps + <code>revalidate</code> (ISR)
          </a>{' '}
          (Hash-based)
        </li>
      </ul>
    </article>
  );
};

export default Page;
