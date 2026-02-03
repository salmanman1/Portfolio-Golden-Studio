
"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";
import imageData from '@/app/lib/placeholder-images.json';

interface NavigationProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
}

export function Navigation({ lang, setLang }: NavigationProps) {
  const { logo } = imageData.assets;

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Language Switcher */}
        <div className="flex items-center">
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2 border border-primary/30 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold text-white hover:bg-primary/10 transition-all uppercase tracking-widest active:scale-95"
          >
            <Globe className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            {lang === 'ar' ? 'ENGLISH' : 'العربية'}
          </button>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative w-28 h-8 sm:w-44 sm:h-12">
            <Image 
              src={logo.imageUrl}
              alt={logo.description}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 112px, 176px"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
