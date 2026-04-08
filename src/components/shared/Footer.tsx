export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-md py-6 mt-auto">
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-1 items-center md:items-start text-sm text-slate-400">
          <p>
            Built by{" "}
            <span className="text-slate-200 font-semibold">
              Ritesh Kumar Shikarwar
            </span>
          </p>
          {/* <p className="text-xs opacity-70">Staff-Level Full-Stack Developer Assessment</p> */}
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/riteshkshik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.47-1.4 6.47-7a5 5 0 0 0-1.5-3.8 4.6 4.6 0 0 0-.1-3.8s-1.2-.3-3.9 1.5a13.3 13.3 0 0 0-7 0C6.2 2.1 5 2.5 5 2.5a4.6 4.6 0 0 0-.1 3.8A5 5 0 0 0 3 10c0 5.6 3.3 6.6 6.5 7A4.8 4.8 0 0 0 9 20v4"></path>
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ritesh-kumar-shikarwar-149b171b9/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
