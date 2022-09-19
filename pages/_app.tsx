import React from 'react';
import type { AppProps } from 'next/app';
import useSWR, { SWRConfig } from 'swr';
import Header from '../components/Header';
import '../styles/globals.css';

function DBConnect() {
  useSWR('/api/db');
  return null;
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then(response => response.json()) }}>
      <Header />
      <Component {...pageProps} />
      <DBConnect />
    </SWRConfig>
  )
}

export default MyApp;
