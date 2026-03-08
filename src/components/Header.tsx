import { Github, ExternalLink } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border px-6 py-3 flex items-center justify-between bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <span className="text-primary font-mono font-bold text-sm">&lt;/&gt;</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight leading-none">
              <span className="text-foreground">CodeReview</span>{" "}
              <span className="text-primary">AI</span>
            </h1>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
              codereview.ai
            </p>
          </div>
        </a>
        <span className="hidden sm:inline text-xs text-muted-foreground border-l border-border pl-6">
          Ship better code. Catch bugs before your reviewer does.
        </span>
      </div>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <Github className="w-4 h-4" />
        <span className="hidden sm:inline">GitHub</span>
        <ExternalLink className="w-3 h-3 hidden sm:inline" />
      </a>
    </header>
  );
};

export default Header;
