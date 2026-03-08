import { ReviewHistoryItem } from "@/types/review";
import { History, ChevronRight } from "lucide-react";

interface Props {
  history: ReviewHistoryItem[];
  onSelect: (item: ReviewHistoryItem) => void;
}

const ReviewHistory = ({ history, onSelect }: Props) => {
  if (history.length === 0) return null;

  return (
    <div className="border-t border-border p-4">
      <div className="flex items-center gap-2 mb-2">
        <History className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Recent Reviews</span>
      </div>
      <div className="space-y-1">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full flex items-center justify-between text-left text-sm px-3 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
          >
            <div className="truncate">
              <span className="text-foreground font-medium">{item.language}</span>
              <span className="text-muted-foreground ml-2">— Score: {item.review.quality_score}/10</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReviewHistory;
