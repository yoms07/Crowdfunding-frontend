import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Users, Clock } from "lucide-react";

export default function ProjectExplorer() {
  const projects = [
    {
      id: 1,
      title: "Eco-Friendly Water Bottle",
      category: "Environment",
      raised: 15000,
      goal: 20000,
      backers: 350,
      daysLeft: 15,
    },
    {
      id: 2,
      title: "Revolutionary AI Assistant",
      category: "Technology",
      raised: 50000,
      goal: 100000,
      backers: 1200,
      daysLeft: 30,
    },
    {
      id: 3,
      title: "Indie Film Production",
      category: "Arts",
      raised: 30000,
      goal: 50000,
      backers: 600,
      daysLeft: 20,
    },
    {
      id: 4,
      title: "Sustainable Fashion Line",
      category: "Fashion",
      raised: 25000,
      goal: 40000,
      backers: 500,
      daysLeft: 25,
    },
    {
      id: 5,
      title: "Educational Board Game",
      category: "Games",
      raised: 10000,
      goal: 15000,
      backers: 200,
      daysLeft: 10,
    },
    {
      id: 6,
      title: "Organic Urban Farm",
      category: "Food",
      raised: 40000,
      goal: 60000,
      backers: 800,
      daysLeft: 35,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Projects</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <Input
            type="search"
            placeholder="Search projects"
            className="w-full"
          />
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="arts">Arts</SelectItem>
            <SelectItem value="environment">Environment</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="games">Games</SelectItem>
            <SelectItem value="food">Food</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trending">Trending</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="most-funded">Most Funded</SelectItem>
            <SelectItem value="ending-soon">Ending Soon</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {project.category}
              </p>
            </CardHeader>
            <CardContent>
              <Progress
                value={(project.raised / project.goal) * 100}
                className="mb-2"
              />
              <p className="text-sm text-muted-foreground mb-4">
                ${project.raised.toLocaleString()} raised of $
                {project.goal.toLocaleString()} goal
              </p>
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {project.backers} backers
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {project.daysLeft} days left
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/project/${project.id}`} className="w-full">
                <Button className="w-full">View Project</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
