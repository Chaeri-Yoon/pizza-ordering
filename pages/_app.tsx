import { Fragment, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import '../styles/globals.css';
import useApi from '../lib/useApi';

function MyApp({ Component, pageProps }: AppProps) {
  const [dbConnect] = useApi('/api/db');
  useEffect(() => {
    dbConnect();
  }, []);
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp;
