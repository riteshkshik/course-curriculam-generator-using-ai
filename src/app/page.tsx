import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-slate-50 flex items-center justify-center">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -z-10 h-full w-full -translate-x-1/2 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vw] rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute right-[-10%] top-[40%] h-[50vh] w-[50vw] rounded-full bg-violet-600/20 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-6 py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300 font-medium mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
          Introducing Next-Gen AI Curriculum Generation
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 max-w-4xl text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-400">
          Design World-Class Courses in Seconds.
        </h1>
        
        <p className="max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed">
          The ultimate platform for educators. AI-Powered Course Architect helps you craft detailed curriculums, modules, and lessons instantly tailored to your audience.
        </p>

        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="rounded-full h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all hover:scale-105 active:scale-95">
              Start Building Now
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 border-slate-700 text-slate-300 hover:bg-slate-800 transition-all">
              See How It Works
            </Button>
          </a>
        </div>
        
        {/* Mockup or UI graphic */}
        <div className="mt-20 w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/50 p-4 shadow-2xl backdrop-blur-sm">
          <div className="rounded-xl border border-slate-800 bg-black/40 overflow-hidden shadow-inner flex flex-col h-[400px]">
             {/* Mock App Header */}
             <div className="h-12 border-b border-slate-800 bg-slate-900/80 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto bg-slate-800/80 h-6 w-1/3 rounded text-xs flex items-center justify-center text-slate-400 font-mono">
                  architect.ai/dashboard
                </div>
             </div>
             {/* Mock App Body */}
             <div className="flex-1 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border border-indigo-500/30 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-indigo-400"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                  </div>
                  <div className="font-semibold text-slate-300">Generating Module Context...</div>
                  <div className="text-sm text-slate-500 mt-2 animate-pulse">Running advanced AI pipeline...</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
