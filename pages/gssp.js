import Link from 'next/link';
import Prose from 'components/Prose';
import Layout from 'components/Layout';
import Hydrated from 'components/Hydrated';

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      requestHeaders: ctx.req?.headers,
      responseHeaders: ctx.res?.getHeaders(),
    },
  };
};

const Page = ({ requestHeaders, responseHeaders }) => {
  return (
    <Layout>
      <Prose>
        <h1>A Page with getServerSideProps</h1>
        <Hydrated />
        <p>
          It get's prerendered per request and has access to request and
          response data
        </p>
        <p>
          That's why it can use Nonce-based CSP, it has the chance to set a
          fresh nonce as attribute to scripts on each request.
        </p>

        <h2>Internal navigation to other pages</h2>
        <ul>
          <li>
            <Link href="/gsp">Page with getStaticProps</Link>
          </li>
          <li>
            <Link href="/isr/anyslug-from-gssp">
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
      </Prose>
    </Layout>
  );
};

export default Page;
