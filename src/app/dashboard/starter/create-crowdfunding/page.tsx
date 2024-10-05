"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  // Plus,
  // Trash2,
  Upload,
  ArrowLeft,
  CalendarIcon,
} from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createCrowdfunding } from "@/lib/factory";

import { useToast } from "@/hooks/use-toast";

const moneyFormatter = Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumSignificantDigits: 1,
});

export function DatePicker({
  date,
  setDate,
}: {
  date?: Date;
  setDate: (date: Date) => void;
}) {
  // const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            if (date) {
              setDate(date);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

const nextWeek = (): Date => {
  const now = new Date();

  now.setDate(now.getDate() + 7);
  return now;
};

export default function CreateProject() {
  const { toast } = useToast();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [category, setCategory] = useState("");
  const [fundingGoal, setFundingGoal] = useState(0);
  const [date, setDate] = useState(nextWeek());
  // const [rewards, setRewards] = useState([{ amount: "", description: "" }]);
  const [images, setImages] = useState<File[]>([]);

  // const handleAddReward = () => {
  //   setRewards([...rewards, { amount: "", description: "" }]);
  // };

  // const handleRemoveReward = (index: number) => {
  //   setRewards(rewards.filter((_, i) => i !== index));
  // };

  // const handleRewardChange = (
  //   index: number,
  //   field: "amount" | "description",
  //   value: string
  // ) => {
  //   const newRewards = [...rewards];
  //   newRewards[index][field] = value;
  //   setRewards(newRewards);
  // };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const deadline = Math.floor(date.getTime() / 1000);
      await createCrowdfunding(projectName, [category], fundingGoal, deadline);
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
    <div className="min-h-screen bg-background w-full">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create a New Project</h1>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basics" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>

            <TabsContent value="basics">
              <Card>
                <CardHeader>
                  <CardTitle>Project Basics</CardTitle>
                  <CardDescription>
                    Provide the essential details about your project.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-description">
                      Project Description
                    </Label>
                    <Textarea
                      id="project-description"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="film">Film</SelectItem>
                        <SelectItem value="games">Games</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="funding-goal">Funding Goal (IDR)</Label>

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
                        setFundingGoal(parseInt(amount));
                        e.target.value = formattedAmount;
                      }}
                    />
                    {/* <Input
                      id="funding-goal"
                      value={fundingGoal}
                      onChange={(e) => setFundingGoal(parseInt(e.target.value))}
                      required
                    /> */}
                  </div>
                  <div className="space-y-2">
                    <Label>Campaign End Time</Label>
                    <br />
                    <DatePicker date={date} setDate={setDate} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* <TabsContent value="rewards">
              <Card>
                <CardHeader>
                  <CardTitle>Reward Tiers</CardTitle>
                  <CardDescription>
                    Define the rewards for your backers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rewards.map((reward, index) => (
                    <div key={index} className="flex items-end space-x-4">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`reward-amount-${index}`}>
                          Pledge Amount ($)
                        </Label>
                        <Input
                          id={`reward-amount-${index}`}
                          type="number"
                          value={reward.amount}
                          onChange={(e) =>
                            handleRewardChange(index, "amount", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="flex-[3] space-y-2">
                        <Label htmlFor={`reward-description-${index}`}>
                          Reward Description
                        </Label>
                        <Input
                          id={`reward-description-${index}`}
                          value={reward.description}
                          onChange={(e) =>
                            handleRewardChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveReward(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={handleAddReward}
                    className="mt-4"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Reward Tier
                  </Button>
                </CardContent>
              </Card>
            </TabsContent> */}

            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Project Media</CardTitle>
                  <CardDescription>
                    Upload images or videos to showcase your project.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-images">Project Images</Label>
                    <div className="flex items-center space-x-4">
                      <Input
                        id="project-images"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Label
                        htmlFor="project-images"
                        className="cursor-pointer"
                      >
                        <div className="flex items-center space-x-2 bg-muted hover:bg-muted/80 text-muted-foreground px-4 py-2 rounded-md">
                          <Upload className="h-4 w-4" />
                          <span>Upload Images</span>
                        </div>
                      </Label>
                      <span className="text-sm text-muted-foreground">
                        {images.length} file(s) selected
                      </span>
                    </div>
                  </div>
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-video bg-muted rounded-md overflow-hidden"
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Project image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end">
            <Button type="submit" size="lg">
              Create Project
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
