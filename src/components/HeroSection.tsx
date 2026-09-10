import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Lightbulb, FileText, Trophy, Send } from 'lucide-react';
import { APPLY_CTA_CLASS_DARK, APPLY_LABEL, IS_APPLY_OPEN, openApplyForm } from '../lib/apply';

// 2026 브랜드 컬러 (크림·코랄·다크) — 프로젝트가 사전 컴파일 Tailwind CSS를 쓰므로 인라인 스타일 사용
const DARK = '#181715';
const CORAL = '#cc785c';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ backgroundColor: DARK }}
    >
      {/* Background — fal gpt-image-2 생성 일러스트 (대학 별자리) + 다크 오버레이 */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: DARK }}>
        <img
          src="/images/hero_2026.jpg"
          alt="경기북부 밤하늘의 대학 별자리 아래에서 아이디어를 적는 학생들"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(180deg, rgba(24,23,21,0.72) 0%, rgba(24,23,21,0.38) 45%, rgba(24,23,21,0.82) 100%)' }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p
          className="mb-4 uppercase"
          style={{ color: CORAL, letterSpacing: '0.35em', fontSize: '0.85rem' }}
        >
          Gyeonggi-North University Idea Festival
        </p>

        <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
          <Lightbulb className="w-3 h-3 mr-1" />
          2026년 · 경기북부 6개 대학 연합
        </Badge>

        <h1 className="text-5xl md:text-7xl mb-6 text-white">
          2026 CUIF+
        </h1>

        <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-2xl mx-auto">
          경기북부 대학생 정책 아이디어 페스티벌
        </p>
        <p className="text-lg mb-8 text-white/70 max-w-2xl mx-auto">
          경기 북부의 대학생들이, 우리 지역의 진짜 문제에 직접 답을 내놓습니다.<br />
          여러분의 아이디어가, 우리 지역을 바꾸는 정책이 됩니다.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-white/90">
            <Calendar className="w-5 h-5" />
            <span>본선 2026. 11. 5.(목)</span>
          </div>
          <div className="flex items-center gap-2 text-white/90">
            <Users className="w-5 h-5" />
            <span>팀 단위 참가 (3~5명)</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className={APPLY_CTA_CLASS_DARK}
            style={{ backgroundColor: CORAL, color: '#ffffff' }}
            onClick={openApplyForm}
          >
            {IS_APPLY_OPEN ? <Send className="w-5 h-5 mr-2" /> : <FileText className="w-5 h-5 mr-2" />}
            {APPLY_LABEL}
          </Button>
          <Button
            variant="outline"
            size="lg"
            style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: 'rgba(255,255,255,0.6)' }}
            onClick={() => {
              const topicsSection = document.getElementById('topics');
              topicsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            도시별 과제 보기
          </Button>
        </div>
        <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
          팀 구성 상시 진행 중 · 예선 제안서 제출 10/22(목)
          {IS_APPLY_OPEN && (
            <>
              {' · '}
              <button
                onClick={() => navigate('/inform')}
                style={{
                  color: 'rgba(255,255,255,0.75)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  font: 'inherit',
                }}
              >
                신청 안내 보기
              </button>
            </>
          )}
        </p>

        {/* 선배 노하우 아카이브(/tips) 진입 — 2026 신설 */}
        <a
          href="/tips"
          className="inline-flex items-center gap-2 mt-8"
          style={{
            color: CORAL,
            fontSize: '14px',
            fontWeight: 600,
            border: '1px solid rgba(204,120,92,0.5)',
            borderRadius: '999px',
            padding: '8px 16px',
          }}
        >
          <Trophy className="w-4 h-4" />
          NEW · 대상 수상 선배가 공개한 「공모전 TIP」 보기
        </a>
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
