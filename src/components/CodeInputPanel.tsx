import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";
import { Language } from "@/types/review";
import { Loader2, Play, FileCode } from "lucide-react";

const SAMPLE_CODE = `def bubbleSort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n):
            if arr[j] > arr[j+1]:
                temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
    return arr`;

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "bash", label: "Bash" },
];

function getLanguageExtension(lang: Language) {
  switch (lang) {
    case "python": return python();
    case "javascript": return javascript();
    case "typescript": return javascript({ typescript: true });
    case "cpp": return cpp();
    case "java": return java();
    case "rust": return rust();
    default: return python();
  }
}

interface Props {
  code: string;
  language: Language;
  isLoading: boolean;
  onCodeChange: (code: string) => void;
  onLanguageChange: (lang: Language) => void;
  onReview: () => void;
}

const CodeInputPanel = ({ code, language, isLoading, onCodeChange, onLanguageChange, onReview }: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="bg-muted text-foreground text-sm rounded-md px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
        <button
          onClick={() => { onCodeChange(SAMPLE_CODE); onLanguageChange("python"); }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground bg-muted px-3 py-2 rounded-md border border-border transition-colors"
        >
          <FileCode className="w-4 h-4" />
          Sample Code
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-auto">
        <CodeMirror
          value={code}
          height="100%"
          theme={vscodeDark}
          extensions={[getLanguageExtension(language)]}
          onChange={onCodeChange}
          className="h-full text-sm"
          placeholder="Paste your code here..."
        />
      </div>

      <div className="p-4 border-t border-border">
        <button
          onClick={onReview}
          disabled={isLoading || !code.trim()}
          className="w-full gradient-indigo text-primary-foreground font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed glow-indigo"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Play className="w-5 h-5" />
          )}
          {isLoading ? "Reviewing..." : "Review My Code"}
        </button>
      </div>
    </div>
  );
};

export default CodeInputPanel;
