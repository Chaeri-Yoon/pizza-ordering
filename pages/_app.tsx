import { Fragment, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    (async function () {
      await fetch('/api/db');
    })();
  }, []);
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp;
