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

export default function ProjectManagement() {
  const [activeProject, setActiveProject] = useState(
    "Eco-Friendly Water Bottle"
  );

  const projects = [
    {
      name: "Eco-Friendly Water Bottle",
      description: "Innovative water bottle made from sustainable materials",
      raised: 7500,
      goal: 10000,
      backers: 150,
      daysLeft: 12,
      updates: [
        {
          date: "2023-06-15",
          title: "Project Launch",
          content:
            "We're excited to announce the launch of our Eco-Friendly Water Bottle campaign!",
        },
        {
          date: "2023-06-22",
          title: "First Milestone Reached",
          content:
            "Thanks to your support, we've reached 50% of our funding goal in just one week!",
        },
      ],
      rewards: [
        {
          tier: "Early Bird",
          amount: 20,
          description:
            "Get one Eco-Friendly Water Bottle at a special early bird price",
        },
        {
          tier: "Double Pack",
          amount: 35,
          description: "Two Eco-Friendly Water Bottles at a discounted rate",
        },
      ],
    },
    {
      name: "Innovative Learning App",
      description: "AI-powered app to enhance learning experience for students",
      raised: 18000,
      goal: 25000,
      backers: 320,
      daysLeft: 8,
      updates: [
        {
          date: "2023-06-10",
          title: "Beta Testing Completed",
          content:
            "We've successfully completed beta testing with 100 students. The feedback has been overwhelmingly positive!",
        },
      ],
      rewards: [
        {
          tier: "App Access",
          amount: 15,
          description: "One year access to the Innovative Learning App",
        },
        {
          tier: "Family Pack",
          amount: 40,
          description: "Access for up to 4 family members for one year",
        },
      ],
    },
  ];

  const [editingUpdate, setEditingUpdate] = useState(null);
  const [newUpdate, setNewUpdate] = useState({ title: "", content: "" });

  const handleUpdateEdit = (index) => {
    setEditingUpdate(index);
    setNewUpdate(projects.find((p) => p.name === activeProject).updates[index]);
  };

  const handleUpdateSave = () => {
    const updatedProjects = projects.map((p) => {
      if (p.name === activeProject) {
        const updatedUpdates = [...p.updates];
        if (editingUpdate !== null) {
          updatedUpdates[editingUpdate] = newUpdate;
        } else {
          updatedUpdates.push({
            ...newUpdate,
            date: new Date().toISOString().split("T")[0],
          });
        }
        return { ...p, updates: updatedUpdates };
      }
      return p;
    });
    // Here you would typically update the state or send to an API
    console.log("Updated projects:", updatedProjects);
    setEditingUpdate(null);
    setNewUpdate({ title: "", content: "" });
  };

  const handleUpdateDelete = (index) => {
    const updatedProjects = projects.map((p) => {
      if (p.name === activeProject) {
        const updatedUpdates = p.updates.filter((_, i) => i !== index);
        return { ...p, updates: updatedUpdates };
      }
      return p;
    });
    // Here you would typically update the state or send to an API
    console.log("Updated projects after deletion:", updatedProjects);
  };

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

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Project Management</h1>

        {/* Project overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{activeProject}</CardTitle>
            <CardDescription>
              {projects.find((p) => p.name === activeProject)?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Funds Raised</p>
                <p className="text-2xl font-bold">
                  $
                  {projects
                    .find((p) => p.name === activeProject)
                    ?.raised.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Backers</p>
                <p className="text-2xl font-bold">
                  {projects.find((p) => p.name === activeProject)?.backers}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Left</p>
                <p className="text-2xl font-bold">
                  {projects.find((p) => p.name === activeProject)?.daysLeft}
                </p>
              </div>
            </div>
            <Progress
              value={
                (projects.find((p) => p.name === activeProject)?.raised /
                  projects.find((p) => p.name === activeProject)?.goal) *
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
          </CardContent>
        </Card>

        {/* Project management tabs */}
        <Tabs defaultValue="updates" className="space-y-4">
          <TabsList>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="settings">Project Settings</TabsTrigger>
            <TabsTrigger value="withdrawal">Withdrawal</TabsTrigger>
          </TabsList>

          <TabsContent value="updates">
            <Card>
              <CardHeader>
                <CardTitle>Project Updates</CardTitle>
                <CardDescription>
                  Keep your backers informed about your project's progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects
                    .find((p) => p.name === activeProject)
                    ?.updates.map((update, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {update.title}
                          </CardTitle>
                          <CardDescription>{update.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{update.content}</p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2"
                            onClick={() => handleUpdateEdit(index)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleUpdateDelete(index)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>
                      {editingUpdate !== null
                        ? "Edit Update"
                        : "Add New Update"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="update-title">Title</Label>
                        <Input
                          id="update-title"
                          value={newUpdate.title}
                          onChange={(e) =>
                            setNewUpdate({
                              ...newUpdate,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="update-content">Content</Label>
                        <Textarea
                          id="update-content"
                          value={newUpdate.content}
                          onChange={(e) =>
                            setNewUpdate({
                              ...newUpdate,
                              content: e.target.value,
                            })
                          }
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleUpdateSave}>
                      {editingUpdate !== null ? "Save Changes" : "Add Update"}
                    </Button>
                  </CardFooter>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>
                  Manage your project details and configuration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input id="project-name" value={activeProject} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-description">
                      Project Description
                    </Label>
                    <Textarea
                      id="project-description"
                      value={
                        projects.find((p) => p.name === activeProject)
                          ?.description
                      }
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="funding-goal">Funding Goal</Label>
                    <Input
                      id="funding-goal"
                      type="number"
                      value={
                        projects.find((p) => p.name === activeProject)?.goal
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-duration">
                      Project Duration (days)
                    </Label>
                    <Input
                      id="project-duration"
                      type="number"
                      value={
                        projects.find((p) => p.name === activeProject)?.daysLeft
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="withdrawal">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal</CardTitle>
                <CardDescription>Withdraw after project finish</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" min={1} />
                </div>
                <Button className="mt-4">Withdraw</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
