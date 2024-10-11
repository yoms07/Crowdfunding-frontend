"use client";
import { format } from "date-fns";
import { daysLeft } from "@/app/utils/date";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Crowdfunding } from "@/types/Crowdfunding";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { withdrawFromCrowdfunding } from "@/lib/factory";
import { useToast } from "@/hooks/use-toast";
import { Alert } from "@/components/ui/alert";

export function DatePicker({
  date,
  setDate,
  disabled = false,
}: {
  date?: Date;
  setDate: (date: Date) => void;
  disabled?: boolean;
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
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}

const WithdrawTab = ({ crowdfunding }: { crowdfunding: Crowdfunding }) => {
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const { toast } = useToast();
  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await withdrawFromCrowdfunding(crowdfunding.address, withdrawAmount);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Error withdraw",
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
    <Card>
      <CardHeader>
        <CardTitle>Withdrawal</CardTitle>
        <CardDescription>Withdraw after project finish</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            min={1}
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(parseInt(e.target.value))}
          />
        </div>
        <Button className="mt-4" onClick={handleWithdraw}>
          Withdraw
        </Button>
      </CardContent>
    </Card>
  );
};

const ProjectSettingTab = ({
  crowdfunding,
}: {
  crowdfunding: Crowdfunding;
}) => {
  const [deadline, setDeadline] = useState(crowdfunding.deadline);
  const [title, setTitle] = useState(crowdfunding.title);
  const [goal, setGoal] = useState(crowdfunding.target);

  const disabled = !crowdfunding.isOpen;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Settings</CardTitle>
        <CardDescription>
          Manage your project details and configuration
        </CardDescription>
        {disabled && (
          <CardDescription>
            <Alert variant="destructive">
              Cannot edit becase project has finished
            </Alert>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              value={crowdfunding.title}
              disabled={disabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-description">Project Description</Label>
            <Textarea
              id="project-description"
              value={crowdfunding.description}
              rows={4}
              disabled={disabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="funding-goal">Funding Goal</Label>
            <Input
              id="funding-goal"
              type="number"
              value={crowdfunding.target}
              disabled={disabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-deadline">Project Deadline</Label>
            <DatePicker
              date={deadline}
              setDate={setDeadline}
              disabled={disabled}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default function ProjectDetail({
  crowdfunding,
}: {
  crowdfunding: Crowdfunding;
}) {
  const [editingUpdate, setEditingUpdate] = useState(false);
  const [newUpdate, setNewUpdate] = useState({ title: "", content: "" });

  const handleUpdateSave = () => {};
  return (
    <main className="flex-1 overflow-y-auto p-8 w-full">
      <h1 className="text-3xl font-bold mb-8">Project Management</h1>

      {/* Project overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{crowdfunding.title}</CardTitle>
          <CardDescription>
            {!crowdfunding.isOpen && <p>This project has finished</p>}
            TODO: DESCRIPTION
            {/* {projects.find((p) => p.name === activeProject)?.description} */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Funds Raised</p>
              <p className="text-2xl font-bold">
                Rp. {crowdfunding.current.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Backers</p>
              <p className="text-2xl font-bold">TODO: Backers</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Days Left</p>
              <p className="text-2xl font-bold">
                {!crowdfunding.isOpen ? "-" : daysLeft(crowdfunding.deadline)}
              </p>
            </div>
          </div>
          <Progress
            value={(crowdfunding.current / crowdfunding.target) * 100}
            className="h-2"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Rp. {crowdfunding.current.toLocaleString()} raised of Rp.
            {crowdfunding.target.toLocaleString()} goal
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
              {/* <div className="space-y-4">
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
              </div> */}
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>
                    {editingUpdate !== null ? "Edit Update" : "Add New Update"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="update-title">Title</Label>
                      <Input
                        id="update-title"
                        value={"New update"}
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
          <ProjectSettingTab crowdfunding={crowdfunding} />
        </TabsContent>
        <TabsContent value="withdrawal">
          <WithdrawTab crowdfunding={crowdfunding} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
