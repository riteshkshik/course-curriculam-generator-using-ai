import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboard, BookOpen, Settings, PlusCircle } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Component-level protection
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen pt-16 bg-slate-950 text-slate-50">
      {/* Sidebar sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur shrink-0 hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/dashboard/new">
            <Button className="w-full justify-start gap-2 bg-indigo-600 hover:bg-indigo-700 font-semibold" size="lg">
              <PlusCircle className="w-5 h-5" />
              New Course
            </Button>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Overview</span>
            </div>
          </Link>
          <Link href="/dashboard/courses">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">My Courses</span>
            </div>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <Link href="/dashboard/settings">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
