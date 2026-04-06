"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseSchema, type CourseSchemaType } from "@/lib/validations/course";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { generateCurriculumAction } from "@/actions/ai.actions";
import { createCourse } from "@/actions/course.actions";
import { Sparkles, Save, BookOpen, Clock, Presentation } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CourseForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [curriculum, setCurriculum] = useState<any>(null);
  const router = useRouter();

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      title: "",
      description: "",
      targetAudience: "",
      difficulty: "Beginner",
    },
  });

  async function onGenerate(data: CourseSchemaType) {
    setIsGenerating(true);
    setCurriculum(null);
    try {
      const generated = await generateCurriculumAction(data);
      setCurriculum(generated);
    } catch (e) {
      console.error(e);
      alert("Failed to generate curriculum due to database or rate limits. Check server logs.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function onSave() {
    setIsSaving(true);
    try {
      const data = form.getValues();
      await createCourse({
        ...data,
        curriculum,
      });
      router.push("/dashboard/courses");
    } catch (e) {
      console.error(e);
      alert("Failed to save to database. Is Supabase connected?");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Form */}
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onGenerate)} className="space-y-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-1">Course Configuration</h2>
              <p className="text-sm text-slate-400">Provide the parameters for your curriculum.</p>
            </div>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Advanced Next.js Architecture" className="bg-slate-950 border-slate-800" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Primary Objective & Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What exactly should students achieve by the end of this course?" 
                      className="bg-slate-950 border-slate-800 h-24"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mid-level React devs" className="bg-slate-950 border-slate-800" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-slate-950 border-slate-800">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-md font-semibold transition-all hover:scale-[1.02] active:scale-95 disabled:hover:scale-100"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-300 border-t-white rounded-full animate-spin mr-2" />
                  Generating Architecture...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate AI Curriculum
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>

      {/* Right Column: AI Curriculum Output */}
      <div className="relative">
        <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] rounded-full z-0 pointer-events-none"></div>
        <div className="relative z-10 h-full min-h-[600px] bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
          
          <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between backdrop-blur-sm">
            <h3 className="font-semibold text-slate-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Generated Curriculum
            </h3>
            {curriculum && (
              <Button 
                onClick={onSave}
                disabled={isSaving}
                size="sm" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium pl-2 pr-4 transition-all hover:scale-105 active:scale-95"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Course
              </Button>
            )}
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {!isGenerating && !curriculum && (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800">
                  <Sparkles className="w-8 h-8 text-slate-700" />
                </div>
                <p>Fill out the configuration and click Generate.<br/>Your world-class curriculum will appear here.</p>
              </div>
            )}

            {isGenerating && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                <div className="text-indigo-400 font-medium animate-pulse">Running deeply optimized prompt pipelines...</div>
              </div>
            )}

            {curriculum && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-slate-100">{form.getValues('title')}</h1>
                  <p className="text-slate-400 leading-relaxed font-sans">{curriculum.overview}</p>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-300 bg-slate-900 border border-slate-800 p-3 rounded-lg">
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

                <div className="space-y-6 mt-8">
                  {curriculum.modules?.map((module: any, idx: number) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-indigo-500/30 pb-4 last:border-0 last:pb-0">
                      <div className="absolute w-4 h-4 bg-slate-950 border-2 border-indigo-500 rounded-full -left-[9px] top-1"></div>
                      <h4 className="text-lg font-semibold text-slate-200 mb-1">Module {idx + 1}: {module.moduleTitle}</h4>
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{module.moduleDescription}</p>
                      
                      <div className="space-y-3">
                        {module.lessons?.map((lesson: any, lIdx: number) => (
                          <div key={lIdx} className="bg-slate-900 border border-slate-800 rounded-lg p-4 transition-all hover:border-indigo-500/30">
                            <h5 className="font-medium text-indigo-200 mb-2 text-sm">{lIdx + 1}. {lesson.lessonTitle}</h5>
                            <ul className="space-y-1">
                              {lesson.keyTakeaways?.map((takeaway: string, tIdx: number) => (
                                <li key={tIdx} className="text-xs text-slate-400 flex items-start gap-2">
                                  <div className="mt-1 w-1 h-1 bg-slate-600 rounded-full shrink-0"></div>
                                  <span className="leading-snug">{takeaway}</span>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
