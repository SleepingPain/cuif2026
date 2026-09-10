import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Users,
  Calendar,
  FileText,
  Presentation,
  Trophy,
  DollarSign,
  Clock,
  CheckCircle,
  Send
} from 'lucide-react';
import {
  APPLY_CTA_CLASS,
  APPLY_LABEL_EN,
  APPLY_LABEL_KO,
  IS_APPLY_OPEN,
  openApplyForm,
} from '../lib/apply';
import { useLang } from '../lib/i18n';

// 사전 컴파일 Tailwind CSS 프로젝트 → 신규 스타일은 인라인으로 (2026 브랜드 3색)
const CREAM = '#faf9f5';
const CARD = '#efe9de';
const CORAL = '#cc785c';
const INK = '#141413';
const BODY = '#3d3d3a';

export function GuidelinesSection() {
  const { t } = useLang();

  // 2026 일정 (6/18 설명회 → 11/5 본선)
  const timeline = [
    {
      date: t('2026.6.18 (목) · ONLINE', 'Jun 18, 2026 (Thu) · ONLINE'),
      title: t('설명회 (완료)', 'Info Session (done)'),
      description: t(
        '팀 구성 및 활동 시작 — 지금도 팀 구성 상시 진행 중',
        'Teams formed and work begins — team-building stays open',
      ),
      icon: Users
    },
    {
      date: t('2026.10.22 (목)', 'Oct 22, 2026 (Thu)'),
      title: t('예선 제안서 제출', 'Proposal Due'),
      description: t(
        '팀별 정책·홍보 기획 제안서 제출',
        'Each team submits its policy and communication proposal',
      ),
      icon: FileText
    },
    {
      date: t('10.23 (금) → 10.26 (월)', 'Oct 23 (Fri) → Oct 26 (Mon)'),
      title: t('예선 심사 · 결과 발표', 'Screening · Results'),
      description: t(
        '예선 심사 후 본선 진출팀 발표',
        'Finalists announced after the preliminary review',
      ),
      icon: CheckCircle
    },
    {
      date: t('2026.11.5 (목) · FINAL', 'Nov 5, 2026 (Thu) · FINAL'),
      title: t('CUIF+ 본선 대회', 'CUIF+ Finals'),
      description: t('본선 발표 및 시상', 'Final presentations and awards'),
      icon: Trophy
    }
  ];

  // 진행 프로세스 4단계 (6월 ~ 11월) — 기획에 그치지 않고 끝까지 실행
  const processSteps = [
    {
      no: "01",
      title: t('문제 발굴', 'Find the Problem'),
      description: t('지역 현안 탐색 · 현장 답사 · 인터뷰', 'Scan local issues · field visits · interviews'),
    },
    {
      no: "02",
      title: t('아이디어 제안', 'Propose an Idea'),
      description: t('창의적 해결책 · 정책/홍보 기획안 수립', 'Creative solutions · policy and PR planning'),
    },
    {
      no: "03",
      title: t('현장 실행', 'Run It for Real'),
      description: t(
        '약 4개월간 SNS 채널 운영 · 콘텐츠 제작·배포',
        'Four months of running channels, making and publishing content',
      ),
    },
    {
      no: "04",
      title: t('정책 제안', 'Propose the Policy'),
      description: t('본선 발표 · 지자체 정책 연계', 'Final pitch · handoff to the city government'),
    }
  ];

  const requirements = [
    {
      icon: Users,
      title: t('팀 구성 요건', 'Team Requirements'),
      content: [
        t('팀 규모: 3 ~ 5인', 'Team size: 3–5 members'),
        t('경기북부 6개 대학 재학생 누구나', 'Open to students of the six partner universities'),
        t(
          '친구든 후배든 지역 주민이든, 지금 함께할 팀을 만들어 보세요',
          'Friends, juniors, neighbours — build the team you want now',
        )
      ]
    },
    {
      icon: CheckCircle,
      title: t('예선 평가 가산점 2종', 'Two Bonus Points'),
      content: [
        t('① 1학년 신입생 포함 시 가산점', '① Bonus if a first-year student is on the team'),
        t(
          '② 포천·동두천·연천 지역 시민 포함 시 가산점',
          '② Bonus if a resident of Pocheon, Dongducheon or Yeoncheon joins',
        ),
        t(
          '(해당 지역에 살며 문제를 직접 겪는 시민)',
          '(someone who lives there and feels the problem first-hand)',
        )
      ]
    },
    {
      icon: DollarSign,
      title: t('지원 혜택', 'What You Get'),
      content: [
        t('모든 참가 팀에 팀 운영비 지원', 'Operating budget for every participating team'),
        t('연천 과제 선택 팀에는 추가 지원금', 'Extra funding for teams taking a Yeoncheon mission'),
        t(
          '멘토링 · 선배 노하우 영상 · 참가 증명서 · 취업용 포트폴리오',
          'Mentoring · winner tip videos · certificate · portfolio material',
        )
      ]
    }
  ];

  return (
    <section id="guidelines" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {t('참가 안내 · How It Works', 'How It Works')}
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            {t('2026 CUIF+ 참가 방법', 'How to Enter 2026 CUIF+')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              '아래 일정과 요구사항을 확인하고 팀을 구성하여 참가해보세요. 기획에 그치지 않고 끝까지 실행하는 대회입니다.',
              'Check the schedule and requirements, then build your team. This contest does not stop at planning — you carry the idea through.',
            )}
          </p>
        </div>

        {/* Process — 4단계 */}
        <div className="mb-20">
          <h3 className="text-2xl mb-8 text-center">
            {t('진행 프로세스 (6월 ~ 11월)', 'The Process (June – November)')}
          </h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processSteps.map((step) => (
              <Card key={step.no} className="text-center">
                <CardHeader>
                  <span className="text-3xl" style={{ color: '#cc785c', opacity: 0.55 }}>{step.no}</span>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 아이디어 → 정책 일러스트 (fal gpt-image-2) */}
        <div className="mb-20 max-w-5xl mx-auto">
          <div className="relative rounded-lg overflow-hidden shadow-sm">
            <img
              src="/images/idea_policy.jpg"
              alt={t(
                '아이디어 전구가 도시 설계도로 이어지는 일러스트',
                'An illustration of an idea turning into a city blueprint',
              )}
              className="w-full object-cover"
              style={{ maxHeight: '340px', objectPosition: 'center 40%' }}
            />
            <p
              className="absolute bottom-0 left-0 right-0 p-3 text-center text-sm text-white"
              style={{ backgroundImage: 'linear-gradient(180deg, rgba(24,23,21,0) 0%, rgba(24,23,21,0.66) 100%)' }}
            >
              {t(
                '여러분의 아이디어가, 우리 지역을 바꾸는 정책이 됩니다',
                'Your idea becomes the policy that changes the region',
              )}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl mb-8 text-center">{t('대회 일정', 'Schedule')}</h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {timeline.map((item, index) => (
              <Card key={index} className="relative">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge variant="outline" className="w-fit mx-auto mt-2">
                    {item.date}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-primary text-2xl">
                    →
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="grid md:grid-cols-2 gap-8">
          {requirements.map((req, index) => (
            <Card key={index} className="h-fit">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <req.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>{req.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {req.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 참가 신청 CTA — 2026.9 구글폼 접수 연결 */}
        <div className="text-center mt-12" id="apply">
          <div
            className="rounded-lg p-6 max-w-3xl mx-auto mb-6"
            style={{ backgroundColor: CREAM, border: `1px solid ${CARD}` }}
          >
            <p className="mb-2" style={{ color: INK }}>
              {t(
                '지금, 팀을 만들어 도전하세요 — 팀 구성은 상시 진행 중입니다',
                'Build your team and enter — team-building is open year-round',
              )}
            </p>
            <p className="text-sm" style={{ color: BODY }}>
              {IS_APPLY_OPEN
                ? t(
                    '아래 버튼을 누르면 신청 폼이 열립니다 · 팀당 1회, 팀장이 대표로 작성 (3~5인)',
                    'The button below opens the application form · one entry per team, filled in by the team leader (3–5 members)',
                  )
                : t('신청 방법은 공지사항에서 안내됩니다', 'Application details are posted in the notices')}
            </p>
            <p className="text-sm mt-1" style={{ color: CORAL, fontWeight: 600 }}>
              {t('예선 제안서 제출 : 2026년 10월 22일(목)', 'Proposal due: Oct 22, 2026 (Thu)')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className={APPLY_CTA_CLASS}
              style={{ backgroundColor: CORAL, color: '#ffffff' }}
              onClick={openApplyForm}
            >
              {IS_APPLY_OPEN ? <Send className="w-5 h-5 mr-2" /> : <FileText className="w-5 h-5 mr-2" />}
              {t(APPLY_LABEL_KO, APPLY_LABEL_EN)}
            </Button>
            {IS_APPLY_OPEN && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => { window.location.href = '/inform'; }}
              >
                <FileText className="w-5 h-5 mr-2" />
                {t('신청 안내 보기 (공지사항)', 'Read the guide (Notices)')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
