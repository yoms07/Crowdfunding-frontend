"use client";

import { useState } from "react";
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
import { ExternalLink } from "lucide-react";
import { mapContribution, mapCrowdfunding } from "@/lib/graphql";
import { useContribution } from "@/hooks/use-contributions";
import { Crowdfunding, CrowdfundingContribution } from "@/types/Crowdfunding";
import Link from "next/link";

type ContributionWithCrowdfunding = CrowdfundingContribution & {
  crowdfunding: Crowdfunding;
};

const countImpact = (contributions: ContributionWithCrowdfunding[]) => {
  const uniqueCrowdfundingAddress = new Set();
  const successFullProjectAddress = new Set();
  const donationForEachCrowdfunding: Record<string, number> = {};

  contributions.forEach((contrib) => {
    uniqueCrowdfundingAddress.add(contrib.crowdfunding.address);
    if (contrib.crowdfunding.totalRaised >= contrib.crowdfunding.target) {
      successFullProjectAddress.add(contrib.crowdfunding.address);
    }

    if (!(contrib.crowdfunding.address in donationForEachCrowdfunding)) {
      donationForEachCrowdfunding[contrib.crowdfunding.address] = 0;
    }
    donationForEachCrowdfunding[contrib.crowdfunding.address] += contrib.amount;
  });

  const totalDonated = contributions.reduce((prev, contrib) => {
    return prev + contrib.amount;
  }, 0);

  return {
    crowdfundingBacked: uniqueCrowdfundingAddress.size,
    totalDonated,
    successFullProject: successFullProjectAddress.size,
    donationForEachCrowdfunding,
  };
};

const getUniqueBackedCrowdfunding = (
  contributions: ContributionWithCrowdfunding[]
): Crowdfunding[] => {
  const uniqueCrowdfundingAddress = new Set();
  const uniqueCf: Crowdfunding[] = [];

  contributions.forEach((contrib) => {
    if (!uniqueCrowdfundingAddress.has(contrib.crowdfunding.address)) {
      uniqueCf.push(contrib.crowdfunding);
      uniqueCrowdfundingAddress.add(contrib.crowdfunding.address);
    }
  });

  return uniqueCf;
};

const statusText = (cf: Crowdfunding) => {
  if (cf.totalRaised >= cf.target) {
    return "Success";
  }

  return "Active";
};

export default function BackerDashboard() {
  const [activeTab, setActiveTab] = useState("backed-projects");
  const { loading, error, data } = useContribution();

  if (error) {
    console.error(error);
    return <h1>Error . . .</h1>;
  }

  const contributions: ContributionWithCrowdfunding[] = data.map((c: any) => ({
    ...mapContribution(c),
    crowdfunding: mapCrowdfunding(c.crowdfunding),
  }));

  const impact = countImpact(contributions);
  const uniqueBackedCrowdfunding = getUniqueBackedCrowdfunding(contributions);

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Backer Dashboard</h1>
      <Card className="mt-8 mb-4">
        <CardHeader>
          <CardTitle>Your Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{impact.crowdfundingBacked}</p>
              <p className="text-sm text-muted-foreground">Projects Backed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                Rp. {impact.totalDonated.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Donated</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{impact.successFullProject}</p>
              <p className="text-sm text-muted-foreground">
                Successful Projects
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
          {uniqueBackedCrowdfunding.map((cf) => (
            <Card key={cf.address}>
              <CardHeader>
                <CardTitle>{cf.title}</CardTitle>
                <CardDescription>by {cf.starter.address}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress
                    value={(cf.totalRaised / cf.target) * 100}
                    className="h-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Rp. {cf.totalRaised.toLocaleString()} raised</span>
                    <span>
                      {((cf.totalRaised / cf.target) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p>
                    Your pledge: Rp.
                    {impact.donationForEachCrowdfunding[cf.address]}
                  </p>
                  <p>Status: {statusText(cf)}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/project-detail/${cf.address}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
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
                  {contributions.map((contrib, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{contrib.timestamp.toISOString()}</TableCell>
                      <TableCell>{contrib.crowdfunding.title}</TableCell>
                      <TableCell>Rp. {contrib.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
