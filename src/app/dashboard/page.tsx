import { auth } from "@/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Sparkles, TrendingUp, Users } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, {session?.user?.name || 'Admin'}!</h1>
        <p className="text-slate-400">Here's what's happening with your courses today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Courses</CardTitle>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-50">0</div>
            <p className="text-xs text-slate-500 mt-1">Start building your first.</p>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">AI Generations</CardTitle>
            <Sparkles className="w-4 h-4 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-50">0</div>
            <p className="text-xs text-slate-500 mt-1">Curriculums generated.</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 opacity-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Students</CardTitle>
            <Users className="w-4 h-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-50">-</div>
            <p className="text-xs text-slate-500 mt-1">Coming in Phase 2</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800 opacity-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Engagement</CardTitle>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-50">-</div>
            <p className="text-xs text-slate-500 mt-1">Coming in Phase 2</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-slate-900/50 border-slate-800 col-span-1">
          <CardHeader>
            <CardTitle>Recent Drafts</CardTitle>
            <CardDescription className="text-slate-400">Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-slate-500" />
              </div>
              <h3 className="font-semibold text-slate-300">No courses yet</h3>
              <p className="text-sm text-slate-500 max-w-xs mt-1 mb-6">Create a curriculum backed by AI to get started.</p>
              <Link href="/dashboard/new">
                <Button className="bg-indigo-600 hover:bg-indigo-700">Create Course</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-indigo-600/10 border-indigo-500/30 col-span-1 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-32 bg-indigo-500/20 blur-[80px] rounded-full -mr-16 -mt-16"></div>
          <CardHeader className="relative">
            <CardTitle className="text-indigo-200 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              AI Architect
            </CardTitle>
            <CardDescription className="text-slate-400">Generate structured curriculums with Gemini Pro.</CardDescription>
          </CardHeader>
          <CardContent className="relative flex flex-col h-[calc(100%-80px)] justify-between pb-8">
            <p className="text-slate-300 text-sm mb-6">
              Our advanced AI parses your topic, audience, and goals to build a comprehensive module tree instantly.
            </p>
            <Link href="/dashboard/new">
              <Button variant="secondary" className="w-full font-semibold border border-indigo-500/50 bg-indigo-950/50 text-indigo-200 hover:bg-indigo-900/80">
                Generate with AI
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
