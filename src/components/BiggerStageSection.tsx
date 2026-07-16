import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Rocket, Landmark } from 'lucide-react';

// 사전 컴파일 Tailwind CSS 프로젝트 → 신규 색상은 인라인 스타일로
const DARK = '#181715';
const CORAL = '#cc785c';

/** 다음 무대 (Bigger Stage) — 2026 신설: 본선 이후 해커톤·페스티벌 (작년과 달라진 점) */
export function BiggerStageSection() {
  const stages = [
    {
      icon: Rocket,
      date: '2026. 11. 13.(금) ~ 14.(토)',
      title: '7개 대학 연합 해커톤',
      description: '경기북부 7개 대학에서 대학별 3팀, 총 21팀이 모여 아이디어를 겨룹니다.',
      badge: '상위 3팀 진출'
    },
    {
      icon: Landmark,
      date: '2026. 11. 27.(금)',
      title: '경기북부 아이디어 페스티벌',
      description: '의정부 아일랜드 캐슬에서 열리는 큰 무대. 타 대학 학생·선배들의 아이디어를 직접 보고 만나는 자리입니다.',
      badge: '누구나 관람 가능'
    }
  ];

  return (
    <section id="bigger-stage" className="py-20" style={{ backgroundColor: DARK }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
            다음 무대 · Bigger Stage
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6 text-white">
            본선에서 끝나지 않습니다
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            CUIF+ 본선에서 대상을 받아도 끝이 아닙니다.
            상위 3팀(대상·최우수)은 더 큰 무대로 나아갑니다 — 올해 새로 생긴, 작년과 달라진 점입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {stages.map((stage) => (
            <Card
              key={stage.title}
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.16)' }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(204,120,92,0.2)' }}>
                    <stage.icon className="w-6 h-6" style={{ color: CORAL }} />
                  </div>
                  <Badge variant="secondary" style={{ backgroundColor: CORAL, color: '#ffffff', border: 'none' }}>
                    {stage.badge}
                  </Badge>
                </div>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{stage.date}</p>
                <CardTitle className="text-xl text-white">{stage.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{stage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center mt-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
          해커톤 진출은 상위 3팀 한정 — 단, 11/27 페스티벌 발표는 누구나 관람할 수 있습니다.
        </p>
      </div>
    </section>
  );
}
