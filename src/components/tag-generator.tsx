
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { generateVideoTags } from "@/ai/flows/generate-video-tags";
import { Badge } from "@/components/ui/badge";

interface TagGeneratorProps {
  title: string;
  description: string;
}

export function TagGenerator({ title, description }: TagGeneratorProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerate() {
    setIsLoading(true);
    try {
      const result = await generateVideoTags({ videoTitle: title, videoDescription: description });
      setTags(result.tags);
    } catch (error) {
      console.error("Failed to generate tags", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-headline text-xl text-primary flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          AI Insights
        </h3>
        <Button 
          onClick={handleGenerate} 
          disabled={isLoading}
          variant="outline"
          className="border-primary/30 hover:border-primary text-primary hover:bg-primary/10 h-8 text-xs px-3"
        >
          {isLoading ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Sparkles className="w-3 h-3 mr-2" />}
          {tags.length > 0 ? "REGENERATE TAGS" : "GENERATE TAGS"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-12 items-center">
        {tags.length > 0 ? (
          tags.map((tag, i) => (
            <Badge 
              key={i} 
              variant="secondary" 
              className="bg-muted hover:bg-muted/80 text-foreground border-none text-[11px] px-3 py-1 font-medium animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              #{tag.toLowerCase().replace(/\s+/g, '')}
            </Badge>
          ))
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Click generate to analyze this video using AI...
          </p>
        )}
      </div>
    </div>
  );
}
