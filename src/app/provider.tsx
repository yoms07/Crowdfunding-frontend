"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MetaMaskProvider } from "@metamask/sdk-react";
import TokenBalanceProvider from "./hooks/useTokenBalance";
import { createFragmentRegistry } from "@apollo/client/cache";
import { COMMON_CROWDFUNDING_FIELDS_FRAGMENT } from "@/lib/graphql";

export default function Provider({ children }: { children: React.ReactNode }) {
  const client = new ApolloClient({
    uri: "http://0.0.0.0:8000/subgraphs/name/crowdfunding",
    cache: new InMemoryCache({
      fragments: createFragmentRegistry(COMMON_CROWDFUNDING_FIELDS_FRAGMENT),
    }),
  });

  return (
    <MetaMaskProvider
      debug={true}
      sdkOptions={{
        logging: {
          developerMode: true,
        },
        dappMetadata: {
          name: "KitaBisa",
          url: window.location.href,
        },
      }}
    >
      <ApolloProvider client={client}>
        <TokenBalanceProvider>{children}</TokenBalanceProvider>
      </ApolloProvider>
    </MetaMaskProvider>
  );
}
