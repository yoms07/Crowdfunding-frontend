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
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Settings,
  LogOut,
  Search,
  Plus,
} from "lucide-react";

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [topUpAmount, setTopUpAmount] = useState("");

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

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setTopUpAmount("");
  };

  const handleTopUp = () => {
    if (selectedUser && topUpAmount) {
      console.log(
        `Topping up ${selectedUser.name}'s wallet with $${topUpAmount}`
      );
      // Here you would typically call an API to update the user's balance
      setSelectedUser({
        ...selectedUser,
        balance: selectedUser.balance + parseFloat(topUpAmount),
      });
      setTopUpAmount("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            CrowdFund
          </Link>
        </div>
        <nav className="mt-8">
          <Link
            href="/admin-dashboard"
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-200"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin-users"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <Users className="mr-3 h-5 w-5" />
            Users
          </Link>
          <Link
            href="/admin-finances"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <DollarSign className="mr-3 h-5 w-5" />
            Finances
          </Link>
          <Link
            href="/admin-settings"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => console.log("Logout clicked")}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
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

        {selectedUser && (
          <Card>
            <CardHeader>
              <CardTitle>Top Up User Wallet</CardTitle>
              <CardDescription>
                Add funds to {selectedUser.name}'s wallet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-balance">Current Balance</Label>
                  <Input
                    id="current-balance"
                    value={`$${selectedUser.balance.toFixed(2)}`}
                    disabled
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
                      onChange={(e) => setTopUpAmount(e.target.value)}
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
        )}
      </main>
    </div>
  );
}
