"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  LayoutDashboard,
  DollarSign,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Edit,
  Trash2,
} from "lucide-react";
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            CrowdFund
          </Link>
        </div>
        <nav className="mt-8">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/project-management"
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-200"
          >
            <BarChart2 className="mr-3 h-5 w-5" />
            Project Management
          </Link>
          <Link
            href="/backers"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <Users className="mr-3 h-5 w-5" />
            Backers
          </Link>
          <Link
            href="/finances"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <DollarSign className="mr-3 h-5 w-5" />
            Finances
          </Link>
          <Link
            href="/settings"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => console.log("Logout clicked")}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>
      <ProjectDetail crowdfunding={crowdfunding} />
      {/* Main content */}
    </div>
  );
}
