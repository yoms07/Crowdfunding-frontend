import { daysLeft } from "@/app/utils/date";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { countBacker, Crowdfunding } from "@/types/Crowdfunding";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";

export default function CrowdfundingCard({
  crowdfunding,
}: {
  crowdfunding: Crowdfunding;
}) {
  const left = daysLeft(crowdfunding.deadline);
  return (
    <Card key={crowdfunding.address}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">
          {crowdfunding.title}
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
                href={`/dashboard/starter/projects/${crowdfunding.address}`}
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
            Rp. {crowdfunding.totalRaised.toLocaleString()} raised of Rp.
            {crowdfunding.target.toLocaleString()}
          </span>
          {/* <Badge
        vari={
          crowdfunding.isOpen
            ? "default"
            : "success"
        }
      >

      </Badge> */}
        </div>
        <Progress
          value={(crowdfunding.totalRaised / crowdfunding.target) * 100}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{countBacker(crowdfunding)} backers</span>
          <span>{left > 0 ? `${left} days left` : "Ended"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
