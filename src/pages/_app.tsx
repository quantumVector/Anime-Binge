import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@shared/lib/styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Quick Notes</title>
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />

        <meta property="og:site_name" content="Quick Notes" />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
