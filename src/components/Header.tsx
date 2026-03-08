import { Github } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-primary">&lt;/&gt;</span>{" "}
          <span className="text-foreground">CodeReview</span>{" "}
          <span className="text-primary">AI</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Ship better code. Catch bugs before your reviewer does.
        </p>
      </div>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Github className="w-5 h-5" />
      </a>
    </header>
  );
};

export default Header;
