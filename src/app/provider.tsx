"use client";
import { MetaMaskProvider } from "@metamask/sdk-react";
import TokenBalanceProvider from "./hooks/useTokenBalance";

export default function Provider({ children }: { children: React.ReactNode }) {
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
      <TokenBalanceProvider>{children}</TokenBalanceProvider>
    </MetaMaskProvider>
  );
}
