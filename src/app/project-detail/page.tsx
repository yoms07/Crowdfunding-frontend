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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Share2 } from "lucide-react";

export default function ProjectDetail() {
  const [donationAmount, setDonationAmount] = useState("");
  const [comment, setComment] = useState("");

  const project = {
    title: "Eco-Friendly Water Bottle",
    creator: "Green Solutions Inc.",
    description:
      "Our innovative water bottle is designed to reduce plastic waste and keep your drinks at the perfect temperature for hours. Made from sustainable materials, it's the eco-friendly choice for hydration on the go.",
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
    comments: [
      {
        name: "John Doe",
        date: "2023-06-16",
        content:
          "This is exactly what I've been looking for! Can't wait to get mine.",
      },
      {
        name: "Jane Smith",
        date: "2023-06-18",
        content:
          "Love the eco-friendly approach. I've backed this project and shared with my friends!",
      },
    ],
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Donation submitted:", { amount: donationAmount, comment });
    // Here you would typically process the donation and send it to your backend
    setDonationAmount("");
    setComment("");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Link href="/explore" className="flex items-center text-primary mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-muted-foreground mb-6">by {project.creator}</p>

            <div className="aspect-video bg-muted mb-6">
              {/* Replace with actual project image */}
              <img
                src="/placeholder.svg?height=400&width=600"
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <Tabs defaultValue="about" className="mb-6">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About this project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{project.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="updates">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {project.updates.map((update, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="text-lg font-semibold">
                          {update.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {update.date}
                        </p>
                        <p>{update.content}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="comments">
                <Card>
                  <CardHeader>
                    <CardTitle>Backer Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {project.comments.map((comment, index) => (
                      <div key={index} className="mb-4">
                        <p className="font-semibold">{comment.name}</p>
                        <p className="text-sm text-muted-foreground mb-1">
                          {comment.date}
                        </p>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Project Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Progress
                      value={(project.raised / project.goal) * 100}
                      className="h-2"
                    />
                    <p className="text-2xl font-bold mt-2">
                      ${project.raised.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      raised of ${project.goal.toLocaleString()} goal
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{project.backers}</p>
                    <p className="text-sm text-muted-foreground">backers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{project.daysLeft}</p>
                    <p className="text-sm text-muted-foreground">days to go</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full" size="lg">
                  Back this project
                </Button>
                <div className="flex space-x-2 w-full">
                  <Button variant="outline" className="flex-1">
                    <Heart className="mr-2 h-4 w-4" />
                    Remind Me
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
                <CardDescription>
                  Support this project with a custom amount
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonate}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="donation-amount">
                        Donation Amount ($)
                      </Label>
                      <Input
                        id="donation-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comment">
                        Leave a comment (optional)
                      </Label>
                      <Textarea
                        id="comment"
                        placeholder="Say something nice..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Donate
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-muted mt-16 py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 CrowdFund. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
