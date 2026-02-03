
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { VideoCard } from "@/components/video-card";
import { VIDEOS } from "@/lib/video-data";
import { 
  Facebook, 
  Instagram, 
  Phone,
  Check,
  Star,
  ExternalLink,
  Sparkles,
  Layout,
  Wand2,
  Cpu
} from "lucide-react";
import Image from "next/image";
import imageData from '@/app/lib/placeholder-images.json';
import siteContent from '@/app/lib/site-content.json';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AIVideoCreator } from "@/components/ai-video-creator";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const WHATSAPP_NUMBER = "201099525798";
const FACEBOOK_PAGE_URL = "https://www.facebook.com/GoldenStudioEG/";
const INSTAGRAM_PAGE_URL = "https://www.instagram.com/golden_studio_official_eg/";
const DRIVE_PORTFOLIO_URL = "https://drive.google.com/drive/folders/1anMPAz_IDSaUH9p110I50yvVCdJIKZ3O?usp=drive_link";

export default function Home() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const { cover, profile } = imageData.assets;

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const ui = siteContent.ui;
  
  const t = {
    studio_name: lang === 'ar' ? "جولدن ستوديو" : "Golden Studio",
    tagline: ui.tagline[lang],
    cta_whatsapp: ui.cta_whatsapp[lang],
    templates_title: ui.sections.templates[lang],
    pricing_title: ui.sections.pricing[lang],
    faq_title: ui.sections.faq[lang],
    ready_title: ui.sections.ready[lang],
    ready_desc: lang === 'ar' ? "تواصل معنا الآن واحصل على عرض سعر مخصص." : "Contact us now for a custom quote.",
    rights: ui.footer.rights[lang],
    reviews_title: ui.sections.reviews[lang],
    see_more: lang === 'ar' ? "لمشاهدة المزيد من أعمالنا الإبداعية.. اضغط هنا" : "To see more of our creative work.. Click Here",
    landing_request: lang === 'ar' ? "لو عايز موقع هبوط إحترافي زي ده اضغط هنا" : "Want a professional landing page like this? Click here",
    ai_badge: ui.ai_badge[lang]
  };

  const SocialLinks = () => (
    <div className="flex items-center gap-4 sm:gap-6">
      <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-110 transition-all duration-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
        <Facebook className="w-5 h-5 sm:w-7 h-7 fill-current" />
      </a>
      <a href={INSTAGRAM_PAGE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:scale-110 transition-all duration-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
        <Instagram className="w-5 h-5 sm:w-7 h-7" />
      </a>
    </div>
  );

  const landingPageMessage = encodeURIComponent(
    lang === 'ar' 
      ? "أهلاً جولدن ستوديو، حابب أعمل موقع هبوط إحترافي مثل هذا الموقع." 
      : "Hello Golden Studio, I would like to create a professional landing page like this one."
  );

  return (
    <div className="flex flex-col min-h-screen bg-background relative pb-0 overflow-x-hidden">
      <div className="bg-mesh">
        <div className="mesh-circle mesh-1" />
        <div className="mesh-circle mesh-2" />
      </div>
      
      <Navigation lang={lang} setLang={setLang} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-0 sm:px-4 pt-20 sm:pt-24 relative z-10">
        {/* Hero Section */}
        <section className="animate-in fade-in zoom-in-95 duration-1000 fill-mode-both px-4 sm:px-0">
          <div className="relative w-full h-[250px] sm:h-[450px] overflow-hidden rounded-[1.5rem] sm:rounded-[4rem] shadow-2xl group border border-white/5">
            <Image 
              src={cover.imageUrl}
              alt={cover.description}
              fill
              className="object-cover transition-transform duration-[3000ms] group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              data-ai-hint={cover.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/90" />
            
            {/* AI Powered Badge in Hero */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30">
              <Cpu className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-widest">{t.ai_badge}</span>
            </div>
          </div>

          <div className={cn(
            "relative px-4 sm:px-10 -mt-12 sm:-mt-28 flex flex-col items-center sm:items-end sm:justify-between sm:flex-row-reverse",
            lang === 'en' && 'sm:flex-row'
          )}>
            <div className="relative w-28 h-28 sm:w-52 sm:h-52 rounded-full border-4 border-background overflow-hidden bg-card shadow-2xl z-10 transition-transform duration-500 hover:scale-105">
              <Image 
                src={profile.imageUrl}
                alt={profile.description}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 112px, 208px"
                data-ai-hint={profile.imageHint}
              />
            </div>
            
            <div className={cn(
              "mt-4 sm:mt-6 w-full sm:w-auto flex flex-col gap-4 sm:gap-6 animate-in slide-in-from-top-10 duration-1000 delay-300 fill-mode-both",
              lang === 'ar' ? 'text-center sm:text-right' : 'text-center sm:text-left'
            )}>
              <div className={cn("flex justify-center", lang === 'ar' ? 'sm:justify-end' : 'sm:justify-start')}>
                <SocialLinks />
              </div>

              <div className="space-y-1 sm:space-y-3">
                <h1 className="text-3xl sm:text-7xl font-black text-primary tracking-tighter gold-text-shadow leading-tight">
                  {t.studio_name}
                </h1>
                <p className="text-muted-foreground font-medium text-sm sm:text-2xl max-w-xs sm:max-w-md mx-auto sm:mx-0 opacity-80 leading-relaxed">
                  {t.tagline}
                </p>
              </div>
              
              <div className={cn("flex justify-center pt-2 gap-4", lang === 'ar' ? 'sm:justify-end' : 'sm:justify-start')}>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-primary/50 border hover:border-primary bg-background/30 hover:bg-primary/10 text-primary h-12 sm:h-16 px-8 sm:px-12 text-sm sm:text-xl rounded-full backdrop-blur-md transition-all group font-black shadow-lg active:scale-95"
                >
                  <WhatsAppIcon className="w-5 h-5 sm:w-7 h-7 group-hover:rotate-12 transition-transform" />
                  {t.cta_whatsapp}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-12 sm:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 px-4 sm:px-6">
          {siteContent.stats.map((stat, idx) => (
            <div key={idx} className="p-4 sm:p-8 bg-card/60 backdrop-blur-md rounded-[1.2rem] sm:rounded-[2.5rem] border border-white/5 shadow-xl hover:border-primary/40 transition-all duration-300 group text-center">
              <div className="text-2xl sm:text-5xl font-black text-primary mb-1 group-hover:scale-105 transition-transform">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-bold tracking-widest uppercase">{stat.label[lang]}</div>
            </div>
          ))}
        </section>

        {/* Services Section */}
        <section className="mt-20 sm:mt-40 px-4 sm:px-6">
          <div className="mb-10 sm:mb-20 text-center">
             <h2 className="text-2xl sm:text-6xl font-black text-white tracking-tight gold-text-shadow">
               {siteContent.ui.sections.services[lang]}
             </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteContent.services.map((service, idx) => (
              <div key={idx} className="p-8 bg-card/40 backdrop-blur-md rounded-[2rem] border border-white/5 hover:border-primary/40 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">{service.title[lang]}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="mt-16 sm:mt-40 px-4 sm:px-6">
          <div className="mb-10 sm:mb-20 text-center">
            <h2 className="text-2xl sm:text-6xl font-black text-white tracking-tight gold-text-shadow">{t.templates_title}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-14">
            {VIDEOS.map((video) => (
              <div key={video.id} className="group space-y-3 sm:space-y-6">
                <VideoCard video={video} lang={lang} />
                <div className={cn("px-1 min-h-[3rem] sm:min-h-[4rem]", lang === 'ar' ? 'text-right' : 'text-left')}>
                  <h3 className="text-[11px] sm:text-2xl font-black text-white group-hover:text-primary transition-colors leading-snug">
                    {video.title[lang]}
                  </h3>
                </div>
              </div>
            ))}
          </div>
          
          {/* See More CTA */}
          <div className="mt-16 sm:mt-24 text-center">
            <a 
              href={DRIVE_PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border-2 border-primary/40 hover:border-primary bg-primary/5 hover:bg-primary/15 text-primary h-14 sm:h-20 px-10 sm:px-16 text-sm sm:text-2xl rounded-full backdrop-blur-md transition-all group font-black shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] active:scale-95"
            >
              <ExternalLink className="w-5 h-5 sm:w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              {t.see_more}
            </a>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mt-16 sm:mt-32 px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-20">
            <h2 className="text-2xl sm:text-5xl font-black text-white mb-4 gold-text-shadow">{t.pricing_title}</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full opacity-50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {siteContent.pricing.map((plan, i) => (
              <div key={i} className={cn(
                "p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] border transition-all duration-500 relative group overflow-hidden flex flex-col h-full",
                plan.popular 
                  ? "bg-primary/10 border-primary shadow-[0_0_40px_rgba(212,175,55,0.1)] md:scale-105 z-10" 
                  : "bg-card/40 border-white/5 hover:border-primary/20"
              )}>
                {/* AI Recommended Badge */}
                {plan.popular && (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-primary text-black font-black text-[8px] sm:text-[10px] animate-bounce">
                      <Sparkles className="w-3 h-3 mr-1 inline-block" />
                      {t.ai_badge}
                    </Badge>
                  </div>
                )}

                <div className="mb-6 sm:mb-8 text-center sm:text-right">
                  <h3 className="text-lg sm:text-2xl font-black text-white mb-1">{plan.name[lang]}</h3>
                  <div className="text-2xl sm:text-3xl font-black text-primary">{plan.price[lang]}</div>
                  {/* Promo Banner */}
                  <div className="mt-4 py-2 px-4 bg-primary/20 border border-primary/30 rounded-full inline-flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-widest">
                      {plan.promo[lang]}
                    </span>
                  </div>
                </div>
                <ul className="mt-8 space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
                  {plan.features[lang].map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/80 leading-relaxed">
                      <div className="w-4 h-4 sm:w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 sm:w-3 h-3 text-primary" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full h-12 sm:h-14 rounded-full text-sm sm:text-lg font-black group shadow-xl">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                    ابدأ الآن
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* AI Preview Section */}
        <section className="mt-20 sm:mt-40 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-card/40 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-16 border border-white/10 text-center space-y-8 relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] group-hover:bg-primary/30 transition-colors" />
            <div className="relative z-10 space-y-6">
               <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                 <Wand2 className="w-4 h-4 text-primary" />
                 <span className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-widest">{t.ai_badge}</span>
               </div>
               <h2 className="text-2xl sm:text-5xl font-black text-white gold-text-shadow">
                 {lang === 'ar' ? 'جرب قوة الذكاء الاصطناعي في عرض أفكارك' : 'Experience AI Power in Your Visions'}
               </h2>
               <p className="text-muted-foreground text-sm sm:text-xl max-w-2xl mx-auto leading-relaxed">
                 {lang === 'ar' ? 'نستخدم تقنيات Google Veo المتطورة لمساعدتك في تخيل النتيجة النهائية قبل البدء بالمونتاج.' : 'We use cutting-edge Google Veo tech to help you visualize the final result before editing starts.'}
               </p>
               <div className="pt-4">
                 <AIVideoCreator label={lang === 'ar' ? 'ابتكر معاينة بالذكاء الاصطناعي' : 'CREATE AI PREVIEW'} />
               </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mt-20 sm:mt-40 px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-20">
            <h2 className="text-2xl sm:text-5xl font-black text-white mb-4 gold-text-shadow">{t.reviews_title}</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full opacity-50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {siteContent.reviews.map((review, i) => (
              <div key={i} className="p-6 sm:p-10 bg-card/40 backdrop-blur-md rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/5 shadow-xl hover:border-primary/20 transition-all group">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 sm:w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-xs sm:text-lg text-white/80 italic mb-6 leading-relaxed">
                  "{review.comment[lang]}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 sm:w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-black text-primary text-xl">
                    {review.name[lang][0]}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-lg font-black text-white">{review.name[lang]}</h4>
                    <p className="text-[10px] sm:text-xs text-primary font-bold uppercase tracking-widest">{review.company[lang]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-20 sm:mt-40 px-4 sm:px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-6xl font-black text-white text-center mb-10 sm:mb-24 gold-text-shadow">{t.faq_title}</h2>
          <Accordion type="single" collapsible className="w-full space-y-4 sm:space-y-6">
            {siteContent.faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-none bg-card/40 backdrop-blur-md rounded-[1rem] sm:rounded-[2.5rem] px-5 sm:px-10 hover:bg-card/60 transition-colors shadow-lg">
                <AccordionTrigger className={cn("hover:no-underline font-black text-sm sm:text-2xl text-white py-5 sm:py-10", lang === 'ar' ? 'text-right' : 'text-left')}>
                  <span className="leading-tight">{faq.q[lang]}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5 sm:pb-10 text-[11px] sm:text-xl">
                  {faq.a[lang]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Ready Section */}
        <section className="mt-20 sm:mt-40 px-4 sm:px-6 mb-16 sm:mb-32">
          <div className="gold-gradient-bg rounded-[2rem] sm:rounded-[4rem] p-8 sm:p-24 text-center text-black relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-7xl font-black mb-4 sm:mb-10 tracking-tighter drop-shadow-md">{t.ready_title}</h2>
              <p className="text-sm sm:text-3xl font-bold opacity-80 mb-8 sm:mb-16 max-w-2xl mx-auto leading-relaxed">{t.ready_desc}</p>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 sm:gap-5 bg-black text-white h-14 sm:h-24 px-8 sm:px-20 text-sm sm:text-3xl rounded-full font-black hover:scale-105 transition-all shadow-xl active:scale-95"
              >
                <WhatsAppIcon className="w-6 h-6 sm:w-10 h-10" />
                {t.cta_whatsapp}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 sm:py-24 bg-black/95 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8 sm:gap-12 relative z-10 text-center">
          <Link href="/" className="relative w-24 h-8 sm:w-64 sm:h-20 opacity-60 hover:opacity-100 transition-opacity">
            <Image 
              src={imageData.assets.logo.imageUrl}
              alt={t.studio_name}
              fill
              className="object-contain"
              sizes="256px"
            />
          </Link>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 text-muted-foreground font-black text-sm sm:text-xl">
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-2 hover:text-primary transition-all">
              <Phone className="w-4 h-4 sm:w-5 h-5 text-primary" />
              {WHATSAPP_NUMBER}
            </a>
            <div className="flex items-center gap-6 sm:gap-8">
              <a href={FACEBOOK_PAGE_URL} target="_blank" className="text-primary hover:scale-125 transition-all"><Facebook className="w-5 h-5 sm:w-6 h-6 fill-current" /></a>
              <a href={INSTAGRAM_PAGE_URL} target="_blank" className="text-primary hover:scale-125 transition-all"><Instagram className="w-5 h-5 sm:w-6 h-6" /></a>
            </div>
          </div>

          {/* Landing Page CTA - طلب موقع هبوط */}
          <div className="pt-4 sm:pt-8">
             <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${landingPageMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-all font-bold text-[10px] sm:text-sm uppercase tracking-widest border border-primary/20 hover:border-primary/40 px-4 py-2 rounded-full bg-primary/5 group"
            >
              <Layout className="w-3 h-3 sm:w-4 h-4 group-hover:scale-110 transition-transform" />
              {t.landing_request}
            </a>
          </div>

          <p className="text-white/30 text-[8px] sm:text-xs tracking-[0.3em] uppercase font-bold px-4 pt-4">{t.rights}</p>
        </div>
      </footer>
    </div>
  );
}
