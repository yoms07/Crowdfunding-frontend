"use client";
import {
  BarChart2,
  DollarSign,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <h1 className="ml-4 py-2">Starter</h1>
        <nav>
          <Link
            href="/dashboard/starter"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/starter/projects"
            className="flex items-center px-4 py-2 text-gray-700 hover:hover:bg-gray-200"
          >
            <BarChart2 className="mr-3 h-5 w-5" />
            Projects
          </Link>
          {/* <Link
            href="/dashboard/starter/financial-reporting"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <DollarSign className="mr-3 h-5 w-5" />
            Finances
          </Link> */}
        </nav>
        <h1 className="ml-4 py-2">Backer</h1>
        <nav>
          <Link
            href="/dashboard/backer"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
        </nav>
      </aside>
      {children}
    </div>
  );
}
