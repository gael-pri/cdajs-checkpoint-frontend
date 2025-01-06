import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// // Disabling SSR
// export default dynamic(() => Promise.resolve(App), { ssr: false });
