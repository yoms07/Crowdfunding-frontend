"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function FinancialReporting() {
  const [selectedReport, setSelectedReport] = useState("daily");

  const dailyData = [
    { date: "2023-06-15", amount: 1200 },
    { date: "2023-06-16", amount: 1500 },
    { date: "2023-06-17", amount: 1800 },
    { date: "2023-06-18", amount: 2200 },
    { date: "2023-06-19", amount: 2500 },
    { date: "2023-06-20", amount: 2100 },
    { date: "2023-06-21", amount: 2300 },
  ];

  const weeklyData = [
    { week: "Week 1", amount: 8200 },
    { week: "Week 2", amount: 9500 },
    { week: "Week 3", amount: 11000 },
    { week: "Week 4", amount: 10500 },
  ];

  const monthlyData = [
    { month: "January", amount: 35000 },
    { month: "February", amount: 42000 },
    { month: "March", amount: 38000 },
    { month: "April", amount: 45000 },
    { month: "May", amount: 51000 },
    { month: "June", amount: 49000 },
  ];

  const getChartData = () => {
    switch (selectedReport) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const getXAxisKey = () => {
    switch (selectedReport) {
      case "daily":
        return "date";
      case "weekly":
        return "week";
      case "monthly":
        return "month";
      default:
        return "date";
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Financial Reporting</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Funding Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Raised</p>
              <p className="text-2xl font-bold">$52,500</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Number of Backers</p>
              <p className="text-2xl font-bold">723</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Pledge</p>
              <p className="text-2xl font-bold">$72.61</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Funding Progress Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={getXAxisKey()} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
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
                <TableHead>Reward Tier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2023-06-21</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>$50</TableCell>
                <TableCell>Early Bird Special</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-06-20</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>$100</TableCell>
                <TableCell>Double Pack</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2023-06-19</TableCell>
                <TableCell>Bob Johnson</TableCell>
                <TableCell>$25</TableCell>
                <TableCell>Basic Tier</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button className="mt-4">
            <Download className="mr-2 h-4 w-4" /> Download Full Report
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
