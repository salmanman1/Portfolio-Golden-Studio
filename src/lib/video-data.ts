import imageData from '@/app/lib/placeholder-images.json';

export interface Video {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  thumbnail: string;
  videoUrl?: string; 
  category: {
    ar: string;
    en: string;
  };
  duration: string;
  views: string;
}

export const VIDEOS: Video[] = imageData.videoTemplates.map((template, index) => ({
  id: template.id,
  title: template.title,
  description: template.description,
  thumbnail: template.imageUrl,
  videoUrl: template.videoUrl, 
  category: { ar: "أعمالنا", en: "Portfolio" },
  duration: "0:30",
  // استخدام قيم ثابتة بدلاً من Math.random() لتجنب أخطاء Hydration في Next.js
  views: `${150 + (index * 42)}K`
}));
