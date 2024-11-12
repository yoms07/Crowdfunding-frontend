"use client";
import { useQuery } from "@apollo/client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GET_CROWDFUNDINGS, mapCrowdfunding } from "@/lib/graphql";
import { Crowdfunding } from "@/types/Crowdfunding";
import CrowdfundingCard from "./card";
import { useMemo, useState } from "react";
import { CROWDFUNDING_CATEGORIES } from "@/types/categories";

const useSearch = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  return {
    search,
    setSearch,
    category,
    setCategory,
  };
};

const useSearchQuery = (category: string, search: string) => {
  const cachedCategories = useMemo(() => {
    if (category === "all") {
      return [];
    }
    return [category];
  }, [category]);

  const { loading, error, data } = useQuery(GET_CROWDFUNDINGS, {
    variables: {
      categories: cachedCategories,
      search,
    },
  });

  return {
    loading,
    error,
    data,
  };
};

export default function ProjectExplorer() {
  const { search, setSearch, category, setCategory } = useSearch();
  const { loading, error, data } = useSearchQuery(category, search);

  let crowdfundings: Crowdfunding[] = [];
  if (error) {
    return <h1>Error . . .</h1>;
  }
  if (!loading && !error) {
    crowdfundings = data.crowdfundings.map(mapCrowdfunding);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Projects</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <Input
            type="search"
            placeholder="Search projects"
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={category} onValueChange={(e) => setCategory(e)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CROWDFUNDING_CATEGORIES.map((cat, i) => (
              <SelectItem value={cat} key={i}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trending">Trending</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="most-funded">Most Funded</SelectItem>
            <SelectItem value="ending-soon">Ending Soon</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading && <h1>Loading . . .</h1>}
        {crowdfundings.map((crowdfunding) => (
          <CrowdfundingCard
            crowdfunding={crowdfunding}
            key={crowdfunding.address}
          />
        ))}
      </div>
    </div>
  );
}
