import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Trophy, ArrowRight } from 'lucide-react';

// 사전 컴파일 Tailwind CSS 프로젝트 → 신규 색상·굵기는 인라인 스타일로
const CARD = '#efe9de';
const CORAL = '#cc785c';
const INK = '#141413';
const BODY = '#3d3d3a';

/**
 * 선배의 노하우 (공모전 TIP) — 2026 신설.
 * 최준혁(2022 CUIF 대상 / 2025 CUIF+ 대상·경기도의회 의장상) 아카이브 /tips 로 보내는 진입점.
 */
export function TipsTeaserSection() {
  const chapters = [
    { no: '01', title: '팀플', desc: '같은 목표를 위해 제대로 갈등할 수 있는 팀' },
    { no: '02', title: '주제 선정', desc: '주제에 적힌 것은 수단인가, 목표인가' },
    { no: '03', title: '아이디어', desc: '“그런데, 사람들이 이걸 굳이 해야 할까?”' },
    { no: '04', title: '발표', desc: '아이디어를 심사위원의 선택으로 바꾸는 과정' },
  ];

  return (
    <section id="tips" className="py-20" style={{ backgroundColor: CARD }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            선배의 노하우 · Alumni Playbook
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ color: INK }}>
            (대)상 받는 공모전 TIP
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: BODY, lineHeight: 1.8 }}>
            2022 CUIF 대상, 2025 CUIF+ 대상(경기도의회 의장상) 최준혁 선배가
            팀 구성부터 주제 선정, 아이디어, 발표까지 실제로 사용했던 생각의 순서를 공개했습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {chapters.map((c) => (
            <div
              key={c.no}
              style={{
                backgroundColor: '#faf9f5',
                border: '1px solid rgba(20,20,19,0.10)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <p style={{ color: CORAL, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em' }}>
                {c.no}
              </p>
              <p className="mt-2" style={{ color: INK, fontSize: '17px', fontWeight: 700 }}>
                {c.title}
              </p>
              <p className="mt-2" style={{ color: BODY, fontSize: '14px', lineHeight: 1.7 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            className="gap-2"
            onClick={() => {
              window.location.href = '/tips';
            }}
          >
            <Trophy className="w-4 h-4" />
            공모전 TIP 전체 보기
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
