"use client";

import { useEffect, useState } from "react";

import { findCrowdfunding } from "@/lib/crowdfunding";
import { useToast } from "@/hooks/use-toast";
import { Crowdfunding } from "@/types/Crowdfunding";
import ProjectDetail from "./detail";
import { useCrowdfunding } from "@/hooks/use-crowdfunding";
import { mapCrowdfunding } from "@/lib/graphql";

export default function ProjectManagement({
  params,
}: {
  params: { address: string };
}) {
  const { toast } = useToast();
  const { data, error, loading } = useCrowdfunding(params.address);

  if (loading) {
    return <h1>Loading . . .</h1>;
  }

  if (error) {
    toast({
      title: "Error find crowdfunding",
      description: error.message,
    });
    return <h1>Error . . .</h1>;
  }

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      <ProjectDetail crowdfunding={mapCrowdfunding(data)} />
    </div>
  );
}
