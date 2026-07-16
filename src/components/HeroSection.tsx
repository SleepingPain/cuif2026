import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Users, Lightbulb, Trophy } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://ohfkqbgpjtqhcddgbzoa.supabase.co/storage/v1/object/public/PHOTO%20DB/CUIF2025.png"
          alt="CUIF+ 2025 Official Poster"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 bg-[rgba(0,0,0,0.72)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
          <Lightbulb className="w-3 h-3 mr-1" />
          2025년 • 제 13회
        </Badge>
        
        <h1 className="text-5xl md:text-7xl mb-6 text-white">
          CUIF+ 2025
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          3川지역 정책 아이디어 경진대회 <br />
          창의적이고 혁신적인 아이디어로 지역사회 문제를 해결하세요!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-white/90">
            <Calendar className="w-5 h-5" />
            <span>2025년 10월 ~ 11월</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Users className="w-5 h-5" />
            <span>팀 단위 참가 (2-7명)</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-white/90"
            onClick={() => {
              // 구글폼 링크로 새 탭에서 열기
              window.open('https://forms.gle/LFa9TKvvseD6j3Ab6', '_blank');
            }}
          >
            <Trophy className="w-5 h-5 mr-2" />
            참가 신청하기
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-[rgba(0,0,0,1)]"
            onClick={() => {
              const topicsSection = document.getElementById('topics');
              topicsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            공모 주제 보기
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}