import CourseForm from "@/components/forms/CourseForm";
import { Sparkles } from "lucide-react";

export default function NewCoursePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="relative overflow-hidden rounded-2xl bg-indigo-950/40 border border-indigo-500/20 p-8">
        <div className="absolute -right-20 -top-20 bg-indigo-500/20 blur-[100px] w-64 h-64 rounded-full"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight mb-3 text-slate-50 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-indigo-400" />
            AI Course Generator
          </h1>
          <p className="text-slate-400 text-lg">
            Configure the parameters below and let our advanced AI models orchestrate a world-class curriculum for your students.
          </p>
        </div>
      </div>

      <CourseForm />
    </div>
  );
}
