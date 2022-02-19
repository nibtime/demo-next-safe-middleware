import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';
import fetch from 'ky-universal';

// required for Hash-based CSP to work with ISR on Vercel
export const config = {
  unstable_includeFiles: ['.next/static/chunks/**/*.js'],
};

export const getStaticProps = async () => {
  const random = Math.random() * 100;
  return { props: { random } };
};

const RevalidateButton = () => {
  const { pathname } = useRouter();
  const [revalidated, setRevalidated] = useState(false);
  const onClick = useCallback(async () => {
    if (!revalidated) {
      const res = await fetch(`/api/revalidate`, {
        searchParams: {
          pathname,
          secret: 'this should be a real secret',
        },
        method: 'get',
      });
      if (res.ok) {
        const { revalidated } = await res.json();
        setRevalidated(revalidated || false);
      } else {
        setRevalidated(false);
      }
    } else {
      window.location.reload();
    }
  }, [pathname, revalidated]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm lg:text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {!revalidated
        ? 'Change it / revalidate!'
        : 'Revalidated! Click to Reload the page'}
    </button>
  );
};
const Page = ({ random }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  return (
    <article className="prose prose-lg prose-blue">
      <h1>A Page with getStaticProps</h1>
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
        A random number generated at build-time that doesn't change: {random}.
        Don't like that number? Then try the new Next 12.1 on-demand ISR
        feature:
      </p>
      <p>
        <RevalidateButton />
      </p>
      <p>
        It get's prerendered at build-time and has no access to request and
        response data. Can't use a Nonce-based CSP here, because it doesn't
        rerender per request. Must use a Hash-based CSP.
      </p>
      <h2>Internal navigation to other pages</h2>
      <ul>
        <li>
          <Link href="/isr/lazy-slug">
            <a>
              Page with getStaticProps + <code>revalidate</code> (ISR)
            </a>
          </Link>
        </li>
        <li>
          <Link href="/dynamic-page">Page with getServerSideProps</Link>
        </li>
      </ul>
    </article>
  );
};

export default Page;
