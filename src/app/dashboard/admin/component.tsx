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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutDashboard, DollarSign, Search, Plus } from "lucide-react";
import { topUp } from "@/lib/kbToken";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [topUpAmount, setTopUpAmount] = useState(0);

  // Mock user data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", balance: 100 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", balance: 250 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", balance: 50 },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTopUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && topUpAmount) {
      try {
        await topUp(selectedUser, topUpAmount);
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
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-8">
          <Link
            href="/dashboard/admin"
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-200"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            User Balance
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Wallet Management</CardTitle>
            <CardDescription>
              Search for users and top up their wallet balance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search users by name or email"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Current Balance</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>${user.balance.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleUserSelect(user)}>
                          Select
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Up User Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="user-address">User Address</Label>
                <Input
                  id="user-address"
                  value={selectedUser}
                  onChange={(e) => {
                    setSelectedUser(e.target.value);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="top-up-amount">Top Up Amount</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <Input
                    id="top-up-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(parseInt(e.target.value))}
                    placeholder="Enter amount"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleTopUp} disabled={!topUpAmount}>
              <Plus className="mr-2 h-4 w-4" />
              Top Up Wallet
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
