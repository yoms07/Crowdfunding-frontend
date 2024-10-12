"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@apollo/client";
import { GET_MY_CROWDFUNDINGS, mapCrowdfunding } from "@/lib/graphql";
import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
import { Crowdfunding } from "@/types/Crowdfunding";
import CrowdfundingCard from "./detail";

const useSearch = () => {
  const [search, setSearch] = useState("");

  return {
    search,
    setSearch,
  };
};

const useSearchQuery = (search: string) => {
  const { account } = useSDK();
  const { loading, error, data } = useQuery(GET_MY_CROWDFUNDINGS, {
    variables: {
      myAddress: account ? account : "0x0000", // default to zero address
      search,
    },
  });

  return {
    loading,
    error,
    data,
  };
};

export default function Dashboard() {
  const { search, setSearch } = useSearch();
  const { loading, error, data } = useSearchQuery(search);

  let crowdfundings: Crowdfunding[] = [];
  if (error) {
    return <h1>Error . . .</h1>;
  }
  if (!loading && !error) {
    crowdfundings = data.crowdfundings.map(mapCrowdfunding);
  }

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="flex justify-between gap-4 items-center mb-8">
        <Input
          placeholder="Search . . ."
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button asChild>
          <Link href="/dashboard/starter/create-crowdfunding">
            Create Project
          </Link>
        </Button>
      </div>
      <div className="space-y-6">
        {crowdfundings.map((crowdfunding) => (
          <CrowdfundingCard
            crowdfunding={crowdfunding}
            key={crowdfunding.address}
          />
        ))}
      </div>
    </main>
  );
}
