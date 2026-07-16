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
  CheckCircle
} from 'lucide-react';

export function GuidelinesSection() {
  // 2026 일정 (6/18 설명회 → 11/5 본선)
  const timeline = [
    {
      date: "2026.6.18 (목) · ONLINE",
      title: "설명회 (완료)",
      description: "팀 구성 및 활동 시작 — 지금도 팀 구성 상시 진행 중",
      icon: Users
    },
    {
      date: "2026.10.22 (목)",
      title: "예선 제안서 제출",
      description: "팀별 정책·홍보 기획 제안서 제출",
      icon: FileText
    },
    {
      date: "10.23 (금) → 10.26 (월)",
      title: "예선 심사 · 결과 발표",
      description: "예선 심사 후 본선 진출팀 발표",
      icon: CheckCircle
    },
    {
      date: "2026.11.5 (목) · FINAL",
      title: "CUIF+ 본선 대회",
      description: "본선 발표 및 시상",
      icon: Trophy
    }
  ];

  // 진행 프로세스 4단계 (6월 ~ 11월) — 기획에 그치지 않고 끝까지 실행
  const processSteps = [
    { no: "01", title: "문제 발굴", description: "지역 현안 탐색 · 현장 답사 · 인터뷰" },
    { no: "02", title: "아이디어 제안", description: "창의적 해결책 · 정책/홍보 기획안 수립" },
    { no: "03", title: "현장 실행", description: "약 4개월간 SNS 채널 운영 · 콘텐츠 제작·배포" },
    { no: "04", title: "정책 제안", description: "본선 발표 · 지자체 정책 연계" }
  ];

  const requirements = [
    {
      icon: Users,
      title: "팀 구성 요건",
      content: [
        "팀 규모: 3 ~ 5인",
        "경기북부 7개 대학 재학생 누구나",
        "친구든 후배든 지역 주민이든, 지금 함께할 팀을 만들어 보세요"
      ]
    },
    {
      icon: CheckCircle,
      title: "예선 평가 가산점 2종",
      content: [
        "① 1학년 신입생 포함 시 가산점",
        "② 포천·동두천·연천 지역 시민 포함 시 가산점",
        "(해당 지역에 살며 문제를 직접 겪는 시민)"
      ]
    },
    {
      icon: Trophy,
      title: "시상 내역",
      content: [
        "대상 1팀 200만원 · 최우수상 1팀 100만원",
        "우수상 2팀 각 70만원 · 장려상 2팀 각 50만원",
        "⚠️ 상금 규모는 협의 중이며 최종 결정 시 변동될 수 있습니다"
      ]
    },
    {
      icon: DollarSign,
      title: "지원 혜택",
      content: [
        "모든 참가 팀에 팀 운영비 지원",
        "연천 과제 선택 팀에는 추가 지원금",
        "멘토링 · 선배 노하우 영상 · 참가 증명서 · 취업용 포트폴리오"
      ]
    }
  ];

  return (
    <section id="guidelines" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            참가 안내 · How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            2026 CUIF+ 참가 방법
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            아래 일정과 요구사항을 확인하고 팀을 구성하여 참가해보세요. 기획에 그치지 않고 끝까지 실행하는 대회입니다.
          </p>
        </div>

        {/* Process — 4단계 */}
        <div className="mb-20">
          <h3 className="text-2xl mb-8 text-center">진행 프로세스 (6월 ~ 11월)</h3>
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

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl mb-8 text-center">대회 일정</h3>
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

        <div className="text-center mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-3xl mx-auto mb-6">
            <p className="text-blue-900 mb-2">
              지금, 팀을 만들어 도전하세요 — 팀 구성은 상시 진행 중입니다
            </p>
            <p className="text-sm text-blue-800">
              예선 제안서 제출: 2026년 10월 22일(목) · 신청 방법은 공지사항에서 안내됩니다
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => { window.location.href = '/inform'; }}
            >
              <FileText className="w-5 h-5 mr-2" />
              참가 신청 안내 보기 (공지사항)
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}