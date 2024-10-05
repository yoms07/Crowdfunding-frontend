import { create, KuboRPCClient } from "kubo-rpc-client";
import React, { createContext } from "react";
type IPFSClientState = {
  client: KuboRPCClient;
};

const IPFSClientContext = createContext<IPFSClientState>({ client: create() });

export default function IPFSClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = create();
  return (
    <IPFSClientContext.Provider value={{ client: client }}>
      {children}
    </IPFSClientContext.Provider>
  );
}
