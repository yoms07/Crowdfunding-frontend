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
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-200"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/projects"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <BarChart2 className="mr-3 h-5 w-5" />
            Projects
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

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Button>Create Project</Button>
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
