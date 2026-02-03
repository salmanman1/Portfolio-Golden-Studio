
import { VIDEOS } from "@/lib/video-data";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Play, Share2, Heart, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = VIDEOS.find(v => v.id === id);

  if (!video) return notFound();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-medium uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            العودة للأعمال
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Video Section */}
          <div className="space-y-8">
            <div className="relative aspect-[9/16] max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-black">
              <Image 
                src={video.thumbnail} 
                alt={video.title.ar} 
                fill 
                className="object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform duration-500">
                  <Play className="text-black fill-black w-8 h-8 ml-1" />
                </div>
              </div>
            </div>

            <div className="space-y-6 text-center">
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl sm:text-5xl font-black text-white">
                  {video.title.ar}
                </h1>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:border-primary hover:text-primary">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:border-primary hover:text-primary">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground py-6">
                <span className="text-primary font-bold uppercase tracking-widest">{video.category.ar}</span>
                <span>•</span>
                <span>{video.views} مشاهدة</span>
              </div>

              <div className="max-w-2xl mx-auto">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {video.description.ar}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

