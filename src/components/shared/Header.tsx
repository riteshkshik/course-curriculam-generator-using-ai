import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth, signIn, signOut } from "@/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap w-6 h-6 text-primary"><path d="M21.42 10.922a2 2 0 0 1-.019 3.022L15.3 20.3a2 2 0 0 1-2.6.02L5.42 13.942a2 2 0 0 1-.018-3.021l7.3-6.8a2 2 0 0 1 2.6-.021ZM12 2v20"/><path d="M5 11.5v6c0 .88.4 1.76 1.2 2.4l4.6 3.6a2 2 0 0 0 2.4 0l4.6-3.6c.8-.64 1.2-1.52 1.2-2.4v-6"/></svg>
          </div>
          <span className="font-bold text-xl tracking-tight">Architect<span className="text-primary text-xl">.ai</span></span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-4">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="font-medium">Dashboard</Button>
                </Link>
                <form action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}>
                  <Button variant="outline" type="submit" className="rounded-full px-6">Logout</Button>
                </form>
              </>
            ) : (
              <form action={async () => {
                "use server";
                // Without providing credentials, this redirects to standard nextauth login page
                await signIn("credentials", { redirectTo: "/dashboard" });
              }}>
                <Button type="submit" className="rounded-full px-6 transition-all hover:scale-105 active:scale-95">Get Started</Button>
              </form>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
