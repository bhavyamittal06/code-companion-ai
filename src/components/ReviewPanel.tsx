import { CodeReview } from "@/types/review";
import { Clock, HardDrive, Bug, Shield, BarChart3, Lightbulb, Sparkles, Copy, Check, Download, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="text-muted-foreground hover:text-foreground transition-colors p-1">
      {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function ScoreBar({ score }: { score: number }) {
  const color = score < 5 ? "bg-destructive" : score <= 7 ? "bg-warning" : "bg-success";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${score * 10}%` }} />
      </div>
      <span className="text-2xl font-bold text-foreground">{score}/10</span>
    </div>
  );
}

function Section({ icon: Icon, title, children, iconColor }: { icon: any; title: string; children: React.ReactNode; iconColor?: string }) {
  return (
    <div className="bg-card rounded-lg p-5 glow-card">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${iconColor || "text-primary"}`} />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface Props {
  review: CodeReview;
}

const ReviewPanel = ({ review }: Props) => {
  const handleDownloadPDF = async () => {
    const el = document.getElementById("review-content");
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { backgroundColor: "#080810", scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, w, h);
      pdf.save("code-review.pdf");
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to generate PDF");
    }
  };

  const handleShare = () => {
    const text = `CodeReview AI Report\n\nScore: ${review.quality_score}/10\n${review.summary}\n\nTime: ${review.time_complexity}\nSpace: ${review.space_complexity}\nBugs: ${review.bugs.length}\nSecurity Issues: ${review.security_issues.length}`;
    navigator.clipboard.writeText(text);
    toast.success("Review summary copied to clipboard!");
  };

  return (
    <div className="h-full overflow-auto">
      <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background z-10">
        <h2 className="font-semibold text-foreground">Review Results</h2>
        <div className="flex gap-2">
          <button onClick={handleShare} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground bg-muted px-3 py-1.5 rounded-md border border-border transition-colors">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
          <button onClick={handleDownloadPDF} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground bg-muted px-3 py-1.5 rounded-md border border-border transition-colors">
            <Download className="w-3.5 h-3.5" /> PDF
          </button>
        </div>
      </div>

      <div id="review-content" className="p-4 space-y-4">
        <div className="bg-card rounded-lg p-5 glow-card">
          <p className="text-muted-foreground leading-relaxed">{review.summary}</p>
        </div>

        <Section icon={BarChart3} title="Code Quality Score" iconColor="text-success">
          <ScoreBar score={review.quality_score} />
        </Section>

        <Section icon={Clock} title="Time Complexity" iconColor="text-secondary">
          <p className="text-muted-foreground leading-relaxed">{review.time_complexity}</p>
        </Section>

        <Section icon={HardDrive} title="Memory Usage" iconColor="text-secondary">
          <p className="text-muted-foreground leading-relaxed">{review.space_complexity}</p>
        </Section>

        <Section icon={Bug} title={`Bugs Found (${review.bugs.length})`} iconColor="text-destructive">
          {review.bugs.length === 0 ? (
            <p className="text-muted-foreground">No bugs found! 🎉</p>
          ) : (
            <ul className="space-y-3">
              {review.bugs.map((bug, i) => (
                <li key={i} className="bg-muted rounded-md p-3">
                  <p className="text-foreground font-medium">Line {bug.line}: {bug.issue}</p>
                  <p className="text-success text-sm mt-1">Fix: {bug.fix}</p>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section icon={Shield} title="Security Issues" iconColor="text-warning">
          {review.security_issues.length === 0 ? (
            <p className="text-muted-foreground">No security issues detected! 🔒</p>
          ) : (
            <ul className="space-y-2">
              {review.security_issues.map((issue, i) => (
                <li key={i} className="text-warning text-sm flex items-start gap-2">
                  <span className="mt-1">⚠️</span> {issue}
                </li>
              ))}
            </ul>
          )}
        </Section>

        <Section icon={Lightbulb} title="Suggestions" iconColor="text-warning">
          <ol className="space-y-2 list-decimal list-inside">
            {review.suggestions.map((s, i) => (
              <li key={i} className="text-muted-foreground text-sm leading-relaxed">{s}</li>
            ))}
          </ol>
        </Section>

        <Section icon={Sparkles} title="Optimized Version" iconColor="text-primary">
          <div className="relative">
            <div className="absolute top-2 right-2">
              <CopyButton text={review.optimized_code} />
            </div>
            <pre className="bg-muted rounded-md p-4 overflow-x-auto text-sm font-mono text-foreground whitespace-pre-wrap">
              {review.optimized_code}
            </pre>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default ReviewPanel;
