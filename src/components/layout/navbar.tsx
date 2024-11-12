"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSDK } from "@metamask/sdk-react";
import { Bitcoin, User } from "lucide-react";
import { useTokenBalance } from "@/app/hooks/useTokenBalance";
const UserInfo = () => {
  const { account } = useSDK();
  const { balance } = useTokenBalance();

  return (
    <div>
      <div className="flex items-center">
        <User></User>
        <span className="text-sm">{account?.substring(0, 10)}. . .</span>
      </div>
      <div className="flex items-center">
        <Bitcoin />
        <p>{balance?.toLocaleString()}</p>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { account, sdk } = useSDK();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          CrowdFund
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link
                href="/projects"
                className="text-muted-foreground hover:text-primary"
              >
                Explore
              </Link>
            </li>
            <li>
              {account && (
                <Link
                  href="/dashboard/starter/create-crowdfunding"
                  className="text-muted-foreground hover:text-primary"
                >
                  Start a Crowdfunding
                </Link>
              )}
            </li>
            <li>
              {account && (
                <Link
                  href="/dashboard/starter"
                  className="text-muted-foreground hover:text-primary"
                >
                  Open Dashboard
                </Link>
              )}
            </li>
            <li>
              {account ? (
                <UserInfo />
              ) : (
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
              )}
            </li>
            <li>
              <Button
                onClick={() => {
                  sdk?.disconnect();
                }}
              >
                Sign Out
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
