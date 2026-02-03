
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Video } from "@/lib/video-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  video: Video;
  lang: 'ar' | 'en';
}

export function VideoCard({ video, lang }: VideoCardProps) {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // مراقب الظهور: يكتشف متى يكون الفيديو في منتصف الشاشة تقريباً
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.5, // يشتغل لما يظهر 50% من الفيديو
        rootMargin: "-15% 0px -15% 0px" // نركز على المنطقة الوسطى من الشاشة
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <a 
      ref={cardRef}
      href={video.videoUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group block relative overflow-hidden rounded-[1.2rem] sm:rounded-2xl bg-card border border-white/10 shadow-xl transition-all duration-700 hover:shadow-primary/40 aspect-[9/16] group/card"
    >
      {/* Base Video Thumbnail Image */}
      <Image
        src={video.thumbnail}
        alt={video.title[lang]}
        fill
        className={cn(
          "object-cover transition-transform duration-[1500ms]",
          isInView ? "scale-105 sm:group-hover/card:scale-110" : "scale-100"
        )}
        sizes="(max-width: 768px) 50vw, 300px"
      />
      
      {/* Golden Mist Overlay - الضباب الذهبي الذكي */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/5 to-transparent transition-all duration-700 z-10",
        // يختفي البلور إذا كان الفيديو في العرض (للجوال) أو عند مرور الماوس (للمتصفح)
        isInView 
          ? "backdrop-blur-none opacity-0" 
          : "backdrop-blur-[4px] opacity-100 sm:group-hover/card:backdrop-blur-none sm:group-hover/card:opacity-0"
      )} />
      
      {/* Cinematic Vignette */}
      <div className={cn(
        "absolute inset-0 bg-black/30 transition-colors duration-700 z-20",
        isInView ? "bg-transparent" : "sm:group-hover/card:bg-transparent"
      )} />

      {/* Play Icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <div className={cn(
          "w-12 h-12 sm:w-20 h-20 rounded-full bg-primary flex items-center justify-center transition-all duration-500 shadow-[0_0_40px_rgba(212,175,55,0.7)]",
          isInView 
            ? "opacity-100 scale-100" 
            : "opacity-0 scale-50 sm:group-hover/card:opacity-100 sm:group-hover/card:scale-100"
        )}>
          <Play className="text-black fill-black w-5 h-5 sm:w-10 h-10 ml-1" />
        </div>
      </div>

      {/* Category Badge */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-40">
        <Badge className="bg-primary/20 text-primary border-primary/40 text-[7px] sm:text-[10px] uppercase tracking-widest font-black px-1.5 py-0.5 sm:px-2 sm:py-1 backdrop-blur-md">
          {video.category[lang]}
        </Badge>
      </div>

      {/* Hover/Scroll Info */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-2 sm:p-4 transition-transform duration-500 bg-gradient-to-t from-black/90 to-transparent z-40",
        isInView 
          ? "translate-y-0" 
          : "translate-y-full sm:group-hover/card:translate-y-0"
      )}>
        <p className="text-[8px] sm:text-[11px] text-primary font-black uppercase tracking-widest">{video.views} Views</p>
      </div>
    </a>
  );
}
