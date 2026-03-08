export interface Bug {
  line: number;
  issue: string;
  fix: string;
}

export interface CodeReview {
  time_complexity: string;
  space_complexity: string;
  bugs: Bug[];
  security_issues: string[];
  quality_score: number;
  suggestions: string[];
  optimized_code: string;
  summary: string;
}

export type Language = 'python' | 'javascript' | 'cpp' | 'java' | 'go' | 'rust' | 'typescript' | 'bash';

export interface ReviewHistoryItem {
  id: string;
  language: Language;
  code: string;
  review: CodeReview;
  timestamp: Date;
}
