import { useState, useCallback } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeInputPanel from "@/components/CodeInputPanel";
import ReviewPanel from "@/components/ReviewPanel";
import ReviewHistory from "@/components/ReviewHistory";
import LoadingState from "@/components/LoadingState";
import { CodeReview, Language, ReviewHistoryItem } from "@/types/review";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Language>("python");
  const [review, setReview] = useState<CodeReview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ReviewHistoryItem[]>([]);

  const handleReview = useCallback(async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setReview(null);

    try {
      const { data, error } = await supabase.functions.invoke("code-review", {
        body: { code, language },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      const reviewData = data as CodeReview;
      setReview(reviewData);

      setHistory((prev) => {
        const item: ReviewHistoryItem = {
          id: crypto.randomUUID(),
          language,
          code,
          review: reviewData,
          timestamp: new Date(),
        };
        return [item, ...prev].slice(0, 5);
      });
    } catch (e: any) {
      toast.error(e.message || "Failed to review code");
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  const handleHistorySelect = (item: ReviewHistoryItem) => {
    setCode(item.code);
    setLanguage(item.language);
    setReview(item.review);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Left panel */}
        <div className="w-full lg:w-1/2 border-r border-border flex flex-col min-h-0 lg:h-auto h-[50vh]">
          <CodeInputPanel
            code={code}
            language={language}
            isLoading={isLoading}
            onCodeChange={setCode}
            onLanguageChange={setLanguage}
            onReview={handleReview}
          />
          <ReviewHistory history={history} onSelect={handleHistorySelect} />
        </div>

        {/* Right panel */}
        <div className="w-full lg:w-1/2 flex flex-col min-h-0 lg:h-auto h-[50vh]">
          {isLoading ? (
            <LoadingState />
          ) : review ? (
            <ReviewPanel review={review} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-primary font-mono text-2xl font-bold opacity-60">&lt;/&gt;</span>
                </div>
                <div className="space-y-1.5">
                  <p className="text-lg font-medium text-foreground/70">Your code review will appear here</p>
                  <p className="text-sm text-muted-foreground">Paste any code on the left and hit Review →</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
