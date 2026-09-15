import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Trophy, ArrowRight, Globe } from 'lucide-react';
import { useLang } from '../lib/i18n';


// 사전 컴파일 Tailwind CSS 프로젝트 → 신규 색상·굵기는 인라인 스타일로
const CARD = '#efe9de';
const CORAL = '#cc785c';
const INK = '#141413';
const BODY = '#3d3d3a';

/**
 * 선배 특강 아카이브 진입점 — 2026 신설.
 *  · 최준혁(2022 CUIF 대상 / 2025 CUIF+ 대상·경기도의회 의장상) → /tips
 *  · 오시혜(21학번 · CUIF 대상, 1~4학년 매년 참여)             → /tips/osihye   (2026.9.15 추가)
 * 두 편 모두 페이지 안에서 7개 언어로 바꿔 볼 수 있다.
 *
 * ⚠ 이 칩에 「မြန်မာ · ไทย · नेपाली」처럼 원어 표기를 한 줄에 늘어놓았더니, 14px 에서
 *   미얀마 문자의 결합 기호가 겹쳐 뭉개졌다(육안 확인). 원어 표기는 글자가 충분히 큰
 *   «언어 드롭다운» 안에만 두고, 여기서는 화면 언어로 된 «언어 이름»만 쓴다.
 */
export function TipsTeaserSection() {
  const { t } = useLang();

  const lectures = [
    {
      path: '/tips',
      who: t('최준혁 · 의료홍보미디어학과 21학번', 'Choi Junhyeok · Class of ’21'),
      title: t('(대)상 받는 공모전 TIP', 'How to Win: the Grand Prize Playbook'),
      desc: t(
        '2022 CUIF 대상, 2025 CUIF+ 대상(경기도의회 의장상). 팀 구성부터 주제 선정, 아이디어, 발표까지 실제로 사용했던 생각의 순서.',
        'Grand Prize at CUIF 2022 and CUIF+ 2025. The order of thinking he actually used — from building a team to the final pitch.',
      ),
      chapters: [
        t('01 팀플 — 같은 목표를 위해 제대로 갈등할 수 있는 팀', '01 Teamwork — a team that can argue well toward one goal'),
        t('02 주제 선정 — 주제에 적힌 것은 수단인가, 목표인가', '02 Topic — is the brief a means, or the goal?'),
        t('03 아이디어 — “사람들이 이걸 굳이 해야 할까?”', '03 Idea — “would anyone actually bother?”'),
        t('04 발표 — 아이디어를 심사위원의 선택으로', '04 Pitch — turning an idea into the judges’ choice'),
      ],
    },
    {
      path: '/tips/osihye',
      who: t('오시혜 · 차의과학대학교 21학번', 'Oh Sihye · CHA University, class of ’21'),
      title: t('2026 CUIF 선배 특강', '2026 CUIF Alumni Lecture'),
      desc: t(
        'CUIF 대상 수상. 1학년부터 4학년까지 매년 참여하며 쌓은 지자체 리서치법과 일정 설계를 6편의 영상으로 정리했습니다.',
        'A CUIF Grand Prize winner who entered every year for four years — local-government research and schedule design, in six videos.',
      ),
      chapters: [
        t('01 CUIF, 왜 해야 할까요? — 현업의 전 과정을 미리', '01 Why CUIF — the whole professional process, early'),
        t('02 지자체 맞춤 리서치 — 중장기 종합발전계획 읽기', '02 Research — reading the city’s long-term plan'),
        t('03 논리 VS 크리에이티브 — 양주·포천 실제 사례', '03 Logic vs. creative — the Yangju and Pocheon cases'),
        t('04 플랜 작성법 — 발표 준비부터 거꾸로 세는 일정', '04 Planning — counting back from the pitch'),
      ],
    },
  ];

  return (
    <section id="tips" className="py-20" style={{ backgroundColor: CARD }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            {t('선배의 노하우 · Alumni Playbook', 'Alumni Playbook')}
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ color: INK }}>
            {t('먼저 해 본 선배들의 공모전 TIP', 'Tips from the ones who went first')}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: BODY, lineHeight: 1.8 }}>
            {t(
              'CUIF 대상을 받은 두 선배가 팀 구성부터 지자체 리서치, 아이디어, 발표, 일정 설계까지 실제로 썼던 방법을 공개했습니다.',
              'Two CUIF Grand Prize winners opened up the methods they actually used — team, research, ideas, the pitch, and the schedule.',
            )}
          </p>
          <p
            className="inline-flex items-center gap-2 mt-6"
            style={{
              color: CORAL,
              fontSize: '14px',
              fontWeight: 600,
              border: '1px solid rgba(204,120,92,0.45)',
              borderRadius: '999px',
              padding: '7px 14px',
            }}
          >
            <Globe className="w-4 h-4" />
            {t(
              '한국어 · 영어 · 미얀마어 · 몽골어 · 베트남어 · 태국어 · 네팔어로 볼 수 있습니다',
              'Korean · English · Burmese · Mongolian · Vietnamese · Thai · Nepali',
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {lectures.map((l) => (
            <div
              key={l.path}
              style={{
                backgroundColor: '#faf9f5',
                border: '1px solid rgba(20,20,19,0.10)',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <p style={{ color: CORAL, fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em' }}>
                {l.who}
              </p>
              <p className="mt-2" style={{ color: INK, fontSize: '20px', fontWeight: 600, lineHeight: 1.4 }}>
                {l.title}
              </p>
              <p className="mt-3" style={{ color: BODY, fontSize: '15px', lineHeight: 1.75 }}>
                {l.desc}
              </p>
              <ul style={{ margin: '18px 0 0', paddingLeft: 0, listStyle: 'none' }}>
                {l.chapters.map((c) => (
                  <li
                    key={c}
                    style={{
                      position: 'relative',
                      paddingLeft: '16px',
                      color: BODY,
                      fontSize: '14px',
                      lineHeight: 1.7,
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ position: 'absolute', left: 0, color: CORAL }}>·</span>
                    {c}
                  </li>
                ))}
              </ul>
              <div style={{ flexGrow: 1 }} />
              <div className="mt-8">
                <Button
                  className="gap-2"
                  onClick={() => {
                    window.location.href = l.path;
                  }}
                >
                  <Trophy className="w-4 h-4" />
                  {t('특강 보기', 'Open the lecture')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
