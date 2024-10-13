"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectDetail from "./detail";
import { useToast } from "@/hooks/use-toast";
import { useCrowdfunding } from "@/hooks/use-crowdfunding";
import { mapCrowdfunding } from "@/lib/graphql";

export default function Page({
  params,
}: {
  params: {
    address: string;
  };
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
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Link href="/projects" className="flex items-center text-primary mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <ProjectDetail crowdfunding={mapCrowdfunding(data)} />
      </main>

      <footer className="bg-muted mt-16 py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 CrowdFund. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
