
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Loader2, Play, Wand2 } from "lucide-react";
import { generateVideo } from "@/ai/flows/generate-video";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface AIVideoCreatorProps {
  label?: string;
}

export function AIVideoCreator({ label = "CREATE WITH AI" }: AIVideoCreatorProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const { toast } = useToast();

  async function handleCreate() {
    if (!prompt) return;
    setIsGenerating(true);
    setGeneratedVideo(null);
    
    try {
      const result = await generateVideo({ prompt });
      setGeneratedVideo(result.videoUrl);
      toast({
        title: "Masterpiece Created",
        description: "Your AI-generated cinematic video is ready!",
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Creation Failed",
        description: error.message || "Failed to generate video. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="border-primary/50 hover:border-primary text-primary h-14 px-10 text-lg rounded-full backdrop-blur-sm group">
          <Wand2 className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-card border-white/10">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl italic gold-text-gradient">
            Veo AI Studio
          </DialogTitle>
          <DialogDescription className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">
            Powered by Google Genkit & Veo
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-primary/70">Your Vision</label>
            <div className="flex gap-2">
              <Input
                placeholder="Describe your cinematic masterpiece..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-background/50 border-white/10 focus:border-primary"
                disabled={isGenerating}
              />
              <Button 
                onClick={handleCreate} 
                disabled={isGenerating || !prompt}
                className="bg-primary text-black font-bold"
              >
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : "GENERATE"}
              </Button>
            </div>
          </div>

          {isGenerating && (
            <div className="aspect-video rounded-2xl bg-black/40 flex flex-col items-center justify-center space-y-4 border border-white/5 animate-pulse">
              <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <p className="text-sm text-muted-foreground font-medium">Painting your frames with AI...</p>
            </div>
          )}

          {generatedVideo && (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-700">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10">
                <video 
                  src={generatedVideo} 
                  controls 
                  autoPlay 
                  loop 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
