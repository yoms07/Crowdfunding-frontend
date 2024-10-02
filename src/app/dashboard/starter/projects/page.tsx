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

import {
  LayoutDashboard,
  DollarSign,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Trash,
  MoreHorizontal,
  Edit,
  Badge,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [activeProject, setActiveProject] = useState(
    "Eco-Friendly Water Bottle"
  );

  const projects = [
    {
      id: 1,
      name: "Eco-Friendly Water Bottle",
      raised: 15000,
      goal: 20000,
      backers: 350,
      daysLeft: 15,
      status: "active",
    },
    {
      id: 2,
      name: "Sustainable Backpack",
      raised: 8000,
      goal: 15000,
      backers: 180,
      daysLeft: 25,
      status: "active",
    },
    {
      id: 3,
      name: "Solar-Powered Charger",
      raised: 12000,
      goal: 18000,
      backers: 270,
      daysLeft: 20,
      status: "active",
    },
    {
      id: 4,
      name: "Recycled Plastic Furniture",
      raised: 25000,
      goal: 25000,
      backers: 500,
      daysLeft: 0,
      status: "completed",
    },
    {
      id: 5,
      name: "Biodegradable Food Packaging",
      raised: 5000,
      goal: 30000,
      backers: 100,
      daysLeft: -5,
      status: "ended",
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
        <div className="flex justify-between gap-4 items-center mb-8">
          <Input placeholder="Search . . ." />
          <Button asChild>
            <Link href="/starter/create-project">Create New Project</Link>
          </Button>
        </div>
        <div className="space-y-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  {project.name}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Link
                        href={`/starter/project/${project.id}`}
                        className="flex items-center"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <span>
                    ${project.raised.toLocaleString()} raised of $
                    {project.goal.toLocaleString()}
                  </span>
                  <Badge
                    variant={
                      project.status === "active"
                        ? "default"
                        : project.status === "completed"
                        ? "success"
                        : "secondary"
                    }
                  >
                    {project.status.charAt(0).toUpperCase() +
                      project.status.slice(1)}
                  </Badge>
                </div>
                <Progress
                  value={(project.raised / project.goal) * 100}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{project.backers} backers</span>
                  <span>
                    {project.daysLeft > 0
                      ? `${project.daysLeft} days left`
                      : "Ended"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
