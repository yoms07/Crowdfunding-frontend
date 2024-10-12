"use client";

import { useEffect, useState } from "react";

import { findCrowdfunding } from "@/lib/crowdfunding";
import { useToast } from "@/hooks/use-toast";
import { Crowdfunding } from "@/types/Crowdfunding";
import ProjectDetail from "./detail";

export default function ProjectManagement({
  params,
}: {
  params: { address: string };
}) {
  const { toast } = useToast();
  const [crowdfunding, setCrowdfunding] = useState<Crowdfunding | null>(null);
  const fetchCrowdfunding = async () => {
    try {
      const cf = await findCrowdfunding(params.address);
      setCrowdfunding(cf);
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Error fetching crowdfunding data",
          description: err.message,
        });
        return;
      }
      toast({
        title: "Error fetching crowdfunding data",
        description: err as string,
      });
    }
  };

  useEffect(() => {
    fetchCrowdfunding();
  }, []);

  if (crowdfunding === null) {
    return <h1>Loading . . .</h1>;
  }

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Sidebar */}

      <ProjectDetail crowdfunding={crowdfunding} />
      {/* Main content */}
    </div>
  );
}
