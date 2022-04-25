import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { ApolloProvider } from '@apollo/client';

import apolloClient from '../lib/apollo';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </ApolloProvider>
  );
}

export default MyApp;
