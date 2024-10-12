import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Crowdfunding, CrowdfundingContribution } from "@/types/Crowdfunding";
import { Download } from "lucide-react";

const totalRaised = (crowdfundings: Crowdfunding[]): number => {
  return crowdfundings.reduce((prev, cf) => prev + cf.totalRaised, 0);
};

const contributionCount = (crowdfundings: Crowdfunding[]): number => {
  return crowdfundings.reduce((prev, cf) => prev + cf.contributions.length, 0);
};

export default function FinancialReporting({
  crowdfundings,
  recentTransactions,
}: {
  crowdfundings: Crowdfunding[];
  recentTransactions: CrowdfundingContribution[];
}) {
  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Funding Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Raised</p>
              <p className="text-2xl font-bold">
                ${totalRaised(crowdfundings).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Pledge</p>
              <p className="text-2xl font-bold">
                $
                {(
                  totalRaised(crowdfundings) / contributionCount(crowdfundings)
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Backer</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((rt) => (
                <TableRow>
                  <TableCell>{rt.timestamp.toISOString()}</TableCell>
                  <TableCell>{rt.contributor}</TableCell>
                  <TableCell>${rt.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="mt-4">
            <Download className="mr-2 h-4 w-4" /> Download Full Report
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
