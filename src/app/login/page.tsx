"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSDK } from "@metamask/sdk-react";
import { redirect } from "next/navigation";

export default function LoginScreen() {
  const { sdk, account } = useSDK();

  if (account) {
    return redirect("/projects");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            You need metamask installed. Refer to{" "}
            <Link href="https://metamask.io" className="underline">
              https://metamask.io/
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="submit"
            className="w-full mt-4"
            onClick={() => {
              sdk?.connect();
            }}
          >
            Open Metamask
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
