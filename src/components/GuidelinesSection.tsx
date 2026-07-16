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
  const timeline = [
    {
      date: "~ 2025.10.15 (수) 23:59",
      title: "참가 신청 마감",
      description: "팀 구성 및 참가신청서 제출",
      icon: FileText
    },
    {
      date: "2025.11.18 (화)",
      title: "예선 발표",
      description: "10개 팀 선정 발표",
      icon: CheckCircle
    },
    {
      date: "2025.11.27 (목) 17:00~21:00",
      title: "최종 발표회",
      description: "최종 PT 및 시상식 (예정)",
      icon: Trophy
    }
  ];

  const requirements = [
    {
      icon: Users,
      title: "팀 구성 요건",
      content: [
        "본교 재학생: 최대 5인",
        "지역 구성원: 최대 2인 (선택사항)",
        "⚠️ 차의과학대학교 재학생은 거주지와 관계없이 '본교 재학생' 자격으로만 참여 가능"
      ]
    },
    {
      icon: CheckCircle,
      title: "예선 평가 가산점",
      content: [
        "학과/학년 융합 구성 시",
        "지역 구성원 포함 시",
        "⚠️ 지역 구성원은 추후 재직증명서, 재학증명서 등 서류 제출 필요"
      ]
    },
    {
      icon: Trophy,
      title: "시상 내역",
      content: [
        "총 상금 1,000만원",
        "우수 아이디어 정책 연계 기회"
      ]
    },
    {
      icon: DollarSign,
      title: "지원 혜택",
      content: [
        "전문 멘토링 제공",
        "실제 정책 반영 기회"
      ]
    }
  ];

  return (
    <section id="guidelines" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            참가 안내
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            CUIF+ 2025 참가 방법
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            아래 일정과 요구사항을 확인하고 팀을 구성하여 참가해보세요. 창의적인 아이디어와 열정만 있다면 누구나 참가할 수 있습니다.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl mb-8 text-center">대회 일정</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
              ‼️ 모든 자세한 내용은 페이지 하단에서 확인이 가능합니다 ‼️
            </p>
            <p className="text-sm text-blue-800">
              신청 마감: 2025년 10월 15일(수) 23:59
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => window.open('https://forms.gle/LFa9TKvvseD6j3Ab6', '_blank')} className="bg-[rgba(104,0,158,1)]"
            >
              <FileText className="w-5 h-5 mr-2" />
              구글폼으로 참가 신청하기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}