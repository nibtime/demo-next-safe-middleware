import Script from "next/script";
import globalStyles from "styles/globalStyles";

function MyApp({ Component, pageProps }) {
  globalStyles();
  return (
    <>
      <Script
        id="inline-after-test-script"
        // in most cases use your inline scripts with afterInteractive.
        // That way they will be inserted by Next and don't need to be nonced or hashed.
        // Also, the whole DOM will be available at this point, in beforeInteractive it is not.
        strategy="afterInteractive"
      >
        {`console.log('Hi I am an inline-script running with strategy afterInteractive')`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
