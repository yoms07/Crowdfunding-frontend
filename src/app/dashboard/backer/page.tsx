"use client";

import { useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LayoutDashboard,
  Heart,
  DollarSign,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default function BackerDashboard() {
  const [activeTab, setActiveTab] = useState("backed-projects");

  const backedProjects = [
    {
      id: 1,
      name: "Eco-Friendly Water Bottle",
      creator: "Green Solutions Inc.",
      pledged: 50,
      goal: 10000,
      raised: 7500,
      status: "Active",
    },
    {
      id: 2,
      name: "Innovative Learning App",
      creator: "EduTech Startup",
      pledged: 100,
      goal: 25000,
      raised: 18000,
      status: "Active",
    },
    {
      id: 3,
      name: "Community Garden Initiative",
      creator: "Local Green Thumbs",
      pledged: 25,
      goal: 5000,
      raised: 5000,
      status: "Successful",
    },
  ];

  const donationHistory = [
    {
      id: 1,
      project: "Eco-Friendly Water Bottle",
      amount: 50,
      date: "2023-06-15",
    },
    {
      id: 2,
      project: "Innovative Learning App",
      amount: 100,
      date: "2023-06-10",
    },
    {
      id: 3,
      project: "Community Garden Initiative",
      amount: 25,
      date: "2023-05-28",
    },
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
            href="/backer-dashboard"
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-200"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/explore"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <Heart className="mr-3 h-5 w-5" />
            Explore Projects
          </Link>
          <Link
            href="/donation-history"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <DollarSign className="mr-3 h-5 w-5" />
            Donation History
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
        <h1 className="text-3xl font-bold mb-8">Backer Dashboard</h1>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="backed-projects">Backed Projects</TabsTrigger>
            <TabsTrigger value="donation-history">Donation History</TabsTrigger>
          </TabsList>

          <TabsContent value="backed-projects" className="space-y-4">
            {backedProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>by {project.creator}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress
                      value={(project.raised / project.goal) * 100}
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${project.raised.toLocaleString()} raised</span>
                      <span>
                        {((project.raised / project.goal) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p>Your pledge: ${project.pledged}</p>
                    <p>Status: {project.status}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="donation-history">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donationHistory.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell>{donation.date}</TableCell>
                        <TableCell>{donation.project}</TableCell>
                        <TableCell>${donation.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{backedProjects.length}</p>
                <p className="text-sm text-muted-foreground">Projects Backed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  $
                  {donationHistory.reduce(
                    (sum, donation) => sum + donation.amount,
                    0
                  )}
                </p>
                <p className="text-sm text-muted-foreground">Total Donated</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {
                    backedProjects.filter(
                      (project) => project.status === "Successful"
                    ).length
                  }
                </p>
                <p className="text-sm text-muted-foreground">
                  Successful Projects
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
