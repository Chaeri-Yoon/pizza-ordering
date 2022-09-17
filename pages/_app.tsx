import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Header from '../components/Header';
import useApi from '../lib/useApi';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [dbConnect] = useApi('/api/db');
  useEffect(() => {
    dbConnect();
  }, []);
  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then(response => response.json()) }}>
      <Header />
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp;
