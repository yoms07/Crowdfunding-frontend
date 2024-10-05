"use client";
import NextImage from "next/image";
import { Crowdfunding } from "@/types/Crowdfunding";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { daysLeft } from "@/app/utils/date";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { useRemindMe } from "@/hooks/use-remindMe";
import { donateToCrowdfunding } from "@/lib/factory";
import { useToast } from "@/hooks/use-toast";

const moneyFormatter = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumSignificantDigits: 1,
});

export default function ProjectDetail({
  crowdfunding,
}: {
  crowdfunding: Crowdfunding;
}) {
  const { toast } = useToast();
  const [donationAmount, setDonationAmount] = useState(0);
  const [comment, setComment] = useState("");
  const { isRemindingMe, addRemindMe, removeRemindMe } = useRemindMe();

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await donateToCrowdfunding(crowdfunding.address, donationAmount);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Error submit project",
          description: err.message,
        });
        return;
      }
      toast({
        title: "Unknown error",
        description: err as string,
      });
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-4xl font-bold mb-4">{crowdfunding.title}</h1>
        <p className="text-muted-foreground mb-6">
          by {crowdfunding.starter.address}
        </p>

        <div className="aspect-video bg-muted mb-6">
          {/* Replace with actual project image */}
          <NextImage
            src="/placeholder.svg?height=400&width=600"
            alt={crowdfunding.title}
            className="w-full h-full object-cover"
            width={100}
            height={100}
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
                <p>TODO: DESCRIPTION</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="updates">
            <Card>
              <CardHeader>
                <CardTitle>Project Updates</CardTitle>
              </CardHeader>
              {/* <CardContent>
                {project.updates.map((update, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-semibold">{update.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {update.date}
                    </p>
                    <p>{update.content}</p>
                  </div>
                ))}
              </CardContent> */}
            </Card>
          </TabsContent>
          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <CardTitle>Backer Comments</CardTitle>
              </CardHeader>
              {/* <CardContent>
                {project.comments.map((comment, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">{comment.name}</p>
                    <p className="text-sm text-muted-foreground mb-1">
                      {comment.date}
                    </p>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </CardContent> */}
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
                  value={(crowdfunding.current / crowdfunding.target) * 100}
                  className="h-2"
                />
                <p className="text-2xl font-bold mt-2">
                  Rp. {crowdfunding.current.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  raised of Rp. {crowdfunding.target.toLocaleString()} goal
                </p>
              </div>
              {/* <div>
                <p className="text-2xl font-bold">{project.backers}</p>
                <p className="text-sm text-muted-foreground">backers</p>
              </div> */}
              <div>
                <p className="text-2xl font-bold">
                  {daysLeft(crowdfunding.deadline)}
                </p>
                <p className="text-sm text-muted-foreground">days to go</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="flex space-x-2 w-full">
              <Button variant="outline" className="flex-1">
                {isRemindingMe(crowdfunding.address) ? (
                  <HeartFilledIcon
                    className="mr-2 h-4 w-4"
                    onClick={() => removeRemindMe(crowdfunding.address)}
                  />
                ) : (
                  <Heart
                    className="mr-2 h-4 w-4"
                    onClick={() => addRemindMe(crowdfunding.address)}
                  />
                )}
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
                  <Label htmlFor="donation-amount">Donation Amount (IDR)</Label>
                  <Input
                    id="currency"
                    type="text"
                    placeholder="Rp. "
                    onChange={(e) => {
                      let amount = e.target.value.replace(/\D/g, "");
                      if (amount === "") {
                        amount = "0";
                      }
                      const formattedAmount = moneyFormatter.format(
                        parseInt(amount)
                      );
                      setDonationAmount(parseInt(amount));
                      e.target.value = formattedAmount;
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Leave a comment (optional)</Label>
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
  );
}
