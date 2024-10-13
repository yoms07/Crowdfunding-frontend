"use client";

import { useSDK } from "@metamask/sdk-react";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { connected, account } = useSDK();
  if (connected && !account) {
    redirect("/projects");
  }
  return children;
}
