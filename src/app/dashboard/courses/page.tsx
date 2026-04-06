import { getCourses } from "@/actions/course.actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, Calendar, Clock, BarChart } from "lucide-react";

export default async function CoursesPage() {
  let courses;
  try {
    courses = await getCourses();
  } catch (e) {
    courses = [];
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Courses</h1>
          <p className="text-slate-400">Manage and refine your generated curriculums.</p>
        </div>
        <Link href="/dashboard/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700">New Course</Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-700">
              <BookOpen className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300">No courses defined yet</h3>
            <p className="text-slate-500 max-w-sm mt-2 mb-8">
              Start your journey by generating a state-of-the-art curriculum utilizing AI.
            </p>
            <Link href="/dashboard/new">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 font-medium px-8 transition-transform hover:scale-105 active:scale-95">
                Go to AI Generator
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => {
            const cur = course.curriculum as any;
            return (
              <Card key={course.id} className="bg-slate-900 border-slate-800 flex flex-col hover:border-indigo-500/50 transition-colors group">
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end">
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-400 mb-6 bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-2">
                      <BarChart className="w-4 h-4 text-indigo-500" />
                      <span>{course.difficulty || "Beginner"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      <span className="truncate">{cur?.timeEstimate || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-auto">
                    <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">View</Button>
                    <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800">Edit</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
