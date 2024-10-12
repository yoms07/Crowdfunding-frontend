"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  DollarSign,
  Users,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_MY_CROWDFUNDINGS, mapCrowdfunding } from "@/lib/graphql";
import { useSDK } from "@metamask/sdk-react";
import { Crowdfunding } from "@/types/Crowdfunding";

const countBackers = (crowdfundings: Crowdfunding[]): number => {
  const backerList = new Set();
  crowdfundings.forEach((cf) => {
    cf.contributions.forEach((cont) => [backerList.add(cont.contributor)]);
  });

  return backerList.size;
};

export default function Dashboard() {
  const { account } = useSDK();
  const { loading, error, data } = useQuery(GET_MY_CROWDFUNDINGS, {
    variables: {
      myAddress: account ? account : "0x0000", // default to zero address
      search: "",
    },
  });
  let crowdfundings: Crowdfunding[] = [];
  if (error) {
    console.error(error);
    return <h1>Error . . .</h1>;
  }
  if (!loading && !error) {
    crowdfundings = data.crowdfundings.map(mapCrowdfunding);
  }

  return (
    <div className="flex h-screen bg-gray-100 w-full md:max-w-7xl">
      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8 w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Link href="/dashboard/starter/create-crowdfunding">
            <Button>Create Project</Button>
          </Link>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Project Listed</p>
                <p className="text-2xl font-bold">{crowdfundings.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Project Success</p>
                <p className="text-2xl font-bold">
                  {
                    crowdfundings.filter((c) => c.totalRaised >= c.target)
                      .length
                  }
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">OnGoing Project</p>
                <p className="text-2xl font-bold">
                  {crowdfundings.filter((c) => c.totalRaised < c.target).length}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Backers</p>
                <p className="text-2xl font-bold">
                  {countBackers(crowdfundings)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different metrics */}
        <Tabs defaultValue="donations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="backers">Backers</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
          </TabsList>
          <TabsContent value="donations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Donations</CardTitle>
                <CardDescription>
                  Overview of donations received in the past week
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                {/* <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyDonations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer> */}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="backers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Backer Statistics</CardTitle>
                <CardDescription>
                  Detailed information about your project backers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Backer statistics content goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="traffic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Analytics</CardTitle>
                <CardDescription>
                  Website traffic and conversion rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Traffic analytics content goes here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
