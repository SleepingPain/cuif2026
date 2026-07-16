import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Shield,
  Users,
  Trees,
  Building2,
  Camera,
  GraduationCap,
  MapPin
} from 'lucide-react';

export function TopicsSection() {
  // 2026 도시별 과제 — 3개 도시 · 총 9개 (Mission 01 동두천 / 02 연천 / 03 포천)
  const topics = [
    // Mission 01 · 동두천
    {
      id: 1,
      icon: Shield,
      title: "국가 차원의 실질적 보상·지원 정책",
      description: "75년간 미군기지로 감내해 온 지역의 희생에 대한 국가 차원의 실질적 보상·지원 정책을 발굴합니다.",
      hashtags: "#미군기지75년 #국가보상 #지원정책",
      city: "동두천"
    },
    {
      id: 2,
      icon: MapPin,
      title: "반환 공여지 활용",
      description: "반환 공여지 활용을 통해 동두천의 미래 성장 동력을 만듭니다.",
      hashtags: "#반환공여지 #미래성장동력 #도시발전",
      city: "동두천"
    },
    {
      id: 3,
      icon: Users,
      title: "다시 돌아오는 동두천",
      description: "청년이 떠나지 않고 다시 돌아오는 동두천을 만드는 방안을 제안합니다.",
      hashtags: "#청년유출대응 #청년회귀 #정주여건",
      city: "동두천"
    },
    // Mission 02 · 연천 (★ 추가 지원금 대상)
    {
      id: 4,
      icon: GraduationCap,
      title: "소규모 학교의 지속 가능한 운영",
      description: "소규모 학교의 지속 가능한 운영을 위한 혁신 방안을 찾습니다.",
      hashtags: "#소규모학교 #지속가능운영 #교육혁신",
      city: "연천"
    },
    {
      id: 5,
      icon: Building2,
      title: "학교와 지역사회 연계·협력",
      description: "학교와 지역사회 간 연계·협력을 강화하는 방안을 제안합니다.",
      hashtags: "#학교지역연계 #지역사회협력 #상생",
      city: "연천"
    },
    {
      id: 6,
      icon: Trees,
      title: "교육을 통한 인구 유입",
      description: "교육을 통한 인구 유입과 정주 여건 개선 방안을 모색합니다.",
      hashtags: "#교육인구유입 #정주여건개선 #지역활성화",
      city: "연천"
    },
    // Mission 03 · 포천
    {
      id: 7,
      icon: Users,
      title: "청년이 머무는 포천",
      description: "인구 감소·청년 유출에 대응하고 정주 여건을 개선해, 청년이 머무는 포천을 만듭니다.",
      hashtags: "#청년정주 #인구감소대응 #정주여건개선",
      city: "포천"
    },
    {
      id: 8,
      icon: GraduationCap,
      title: "교육도시 포천",
      description: "교육·돌봄을 통한 지역 발전 방안으로 교육도시 포천을 설계합니다.",
      hashtags: "#교육도시포천 #교육돌봄 #지역발전",
      city: "포천"
    },
    {
      id: 9,
      icon: Camera,
      title: "드론·관광·지역 자원을 활용한 미래 포천",
      description: "드론·방위산업·관광지·평화경제특구·농특산물로 지역경제와 생활인구를 활성화합니다.",
      hashtags: "#드론 #방위산업 #평화경제특구 #관광",
      city: "포천"
    }
  ];

  const getCityColor = (city: string) => {
    const colors: { [key: string]: string } = {
      '연천': 'bg-[#F8F7BA]',
      '포천': 'bg-[#A3CCDA]',
      '동두천': 'bg-[#BDE3C3]'
    };
    return colors[city] || 'bg-gray-100';
  };

  return (
    <section id="topics" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            2026년 도시별 과제 · Missions
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            3개 도시 · 9개 과제
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            2025년에는 공개되지 못했던 포천 과제가 올해 3개로 확정되어,
            포천·동두천·연천 세 도시 9개 과제가 모두 준비되었습니다.<br />
            아래 9가지 과제 중 하나를 선택해 지원하세요.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            ★ <strong>연천 과제</strong>를 선택한 팀에게는 기본 제작 지원금에 더해 <strong>추가 지원금</strong>이 지급될 예정입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Card 
              key={topic.id} 
              className={`hover:shadow-lg transition-all cursor-pointer group border-2 ${getCityColor(topic.city)}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-white/80 group-hover:bg-white transition-colors">
                    <topic.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-white/80">
                    {topic.city}
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {topic.description}
                </p>
                <p className="text-sm text-primary/70">
                  {topic.hashtags}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            관심 있는 주제가 있으신가요? 팀을 구성하여 참가 신청을 해보세요!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2">
              💡 팁: 여러 주제를 융합한 아이디어도 환영합니다
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
