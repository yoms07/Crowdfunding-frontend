"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProjectDetail from "./detail";
import { findCrowdfunding } from "@/lib/crowdfunding";
import { useEffect, useState } from "react";
import { Crowdfunding } from "@/types/Crowdfunding";
import { useToast } from "@/hooks/use-toast";

export default function Page({
  params,
}: {
  params: {
    address: string;
  };
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
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Link href="/explore" className="flex items-center text-primary mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <ProjectDetail crowdfunding={crowdfunding} />
      </main>

      <footer className="bg-muted mt-16 py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 CrowdFund. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
