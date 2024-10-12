import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { countBacker, Crowdfunding } from "@/types/Crowdfunding";
import { Clock, Users } from "lucide-react";
import Link from "next/link";
import { daysLeft } from "../utils/date";

export default function CrowdfundingCard({
  crowdfunding,
}: {
  crowdfunding: Crowdfunding;
}) {
  return (
    <Card key={crowdfunding.address}>
      <CardHeader>
        <CardTitle>{crowdfunding.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {crowdfunding.categories.join(",")}
        </p>
      </CardHeader>
      <CardContent>
        <Progress
          value={(crowdfunding.current / crowdfunding.target) * 100}
          className="mb-2"
        />
        <p className="text-sm text-muted-foreground mb-4">
          ${crowdfunding.totalRaised.toLocaleString()} raised of $
          {crowdfunding.target.toLocaleString()} goal
        </p>
        <div className="flex justify-between text-sm">
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {countBacker(crowdfunding)} Backers
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {crowdfunding.isOpen
              ? `${daysLeft(crowdfunding.deadline)} days left`
              : "Closed"}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/project-detail/${crowdfunding.address}`}
          className="w-full"
        >
          <Button className="w-full">View Project</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
