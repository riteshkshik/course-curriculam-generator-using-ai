import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Clock, Presentation, ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CourseViewPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  // Determine parameter from the Promise
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const course = await prisma.course.findFirst({
    where: { 
      id: id,
      userId: session.user.id
    }
  });

  if (!course) notFound();

  // Handle potential JSON parsing if it's stored as plain string physically or just standard JSONB object
  const curriculum = typeof course.curriculum === 'string' 
    ? JSON.parse(course.curriculum) 
    : (course.curriculum as any);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <Link href="/dashboard/courses" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Courses
      </Link>
    
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-100">{course.title}</h1>
        <p className="text-slate-400 text-lg leading-relaxed">{course.description}</p>
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-800">
          <div className="text-sm">
            <span className="text-slate-500">Audience: </span>
            <span className="font-medium text-slate-300">{course.targetAudience}</span>
          </div>
          <div className="text-sm">
            <span className="text-slate-500">Difficulty: </span>
            <span className="font-medium text-slate-300">{course.difficulty}</span>
          </div>
        </div>
      </div>

      <div className="p-1">
        {curriculum ? (
          <div className="space-y-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-xl">
             <div className="space-y-4 mb-10 pb-6 border-b border-slate-800">
                <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-300">
                  <BookOpen className="w-5 h-5" /> 
                  AI Generated Curriculum
                </h2>
                <p className="text-slate-300 leading-relaxed font-sans">{curriculum.overview}</p>
                <div className="flex items-center gap-4 text-sm text-slate-300 bg-slate-950 border border-slate-800 p-3 rounded-lg w-max">
                   <div className="flex items-center gap-2">
                     <Clock className="w-4 h-4 text-indigo-400" />
                     <span>Est. Time: <strong className="text-slate-100">{curriculum.timeEstimate}</strong></span>
                   </div>
                   <div className="w-px h-4 bg-slate-700"></div>
                   <div className="flex items-center gap-2">
                     <Presentation className="w-4 h-4 text-indigo-400" />
                     <span>Modules: <strong className="text-slate-100">{curriculum.modules?.length || 0}</strong></span>
                   </div>
                </div>
             </div>

             <div className="space-y-8">
               {curriculum.modules?.map((module: any, idx: number) => (
                 <div key={idx} className="relative pl-6 border-l-2 border-indigo-500/30 pb-4 last:border-0 last:pb-0">
                   <div className="absolute w-4 h-4 bg-slate-950 border-2 border-indigo-500 rounded-full -left-[9px] top-1"></div>
                   <h4 className="text-xl font-semibold text-slate-200 mb-2">Module {idx + 1}: {module.moduleTitle}</h4>
                   <p className="text-slate-400 text-sm mb-6 leading-relaxed">{module.moduleDescription}</p>
                   
                   <div className="space-y-4">
                     {module.lessons?.map((lesson: any, lIdx: number) => (
                       <div key={lIdx} className="bg-slate-950 border border-slate-800 rounded-lg p-5">
                         <h5 className="font-medium text-indigo-200 mb-3">{lIdx + 1}. {lesson.lessonTitle}</h5>
                         <ul className="space-y-2">
                           {lesson.keyTakeaways?.map((takeaway: string, tIdx: number) => (
                             <li key={tIdx} className="text-sm text-slate-400 flex items-start gap-2">
                               <div className="mt-1.5 w-1.5 h-1.5 bg-slate-600 rounded-full shrink-0"></div>
                               <span className="leading-relaxed">{takeaway}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500 border border-slate-800 rounded-2xl bg-slate-900/50">
            No curriculum data was found.
          </div>
        )}
      </div>
    </div>
  );
}
