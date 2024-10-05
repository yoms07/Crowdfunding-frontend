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

export default function Dashboard() {
  const [activeProject, setActiveProject] = useState(
    "Eco-Friendly Water Bottle"
  );

  const projects = [
    {
      name: "Eco-Friendly Water Bottle",
      raised: 7500,
      goal: 10000,
      backers: 150,
      daysLeft: 12,
    },
    {
      name: "Innovative Learning App",
      raised: 18000,
      goal: 25000,
      backers: 320,
      daysLeft: 8,
    },
    {
      name: "Community Garden Initiative",
      raised: 4200,
      goal: 5000,
      backers: 85,
      daysLeft: 5,
    },
  ];

  const dailyDonations = [
    { name: "Mon", amount: 500 },
    { name: "Tue", amount: 800 },
    { name: "Wed", amount: 1200 },
    { name: "Thu", amount: 750 },
    { name: "Fri", amount: 1500 },
    { name: "Sat", amount: 2000 },
    { name: "Sun", amount: 1800 },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
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
                <p className="text-2xl font-bold">10</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Project Success</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">OnGoing Project</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Backers</p>
                <p className="text-2xl font-bold">100</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Carousel className="w-full h-50">
          <CarouselContent className=" h-50 w-1/2">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="h-50 w-full">
                {/* <div className="p-1"> */}
                <Card className="mb-8 w-full">
                  <CardHeader>
                    <CardTitle>{activeProject}</CardTitle>
                    <CardDescription>Project Overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Funds Raised
                        </p>
                        <p className="text-2xl font-bold">
                          $
                          {projects
                            .find((p) => p.name === activeProject)
                            ?.raised.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Backers
                        </p>
                        <p className="text-2xl font-bold">
                          {
                            projects.find((p) => p.name === activeProject)
                              ?.backers
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Days Left
                        </p>
                        <p className="text-2xl font-bold">
                          {
                            projects.find((p) => p.name === activeProject)
                              ?.daysLeft
                          }
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress
                        value={
                          ((projects.find((p) => p.name === activeProject)
                            ?.raised ?? 0) /
                            (projects.find((p) => p.name === activeProject)
                              ?.goal ?? 1)) *
                          100
                        }
                        className="h-2"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        $
                        {projects
                          .find((p) => p.name === activeProject)
                          ?.raised.toLocaleString()}{" "}
                        raised of $
                        {projects
                          .find((p) => p.name === activeProject)
                          ?.goal.toLocaleString()}{" "}
                        goal
                      </p>
                    </div>
                  </CardContent>
                </Card>
                {/* </div> */}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="translate-x-8" />
          <CarouselNext className="-translate-x-12" />
        </Carousel>

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
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyDonations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
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
