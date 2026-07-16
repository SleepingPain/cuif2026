import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Shield, 
  Users, 
  Trees, 
  Building2, 
  Camera, 
  GraduationCap,
  MapPin,
  Mountain,
  Factory
} from 'lucide-react';

export function TopicsSection() {
  const topics = [
    // 포천 (3개)
    {
      id: 1,
      icon: Building2,
      title: "구도심 재생",
      description: "포천 도시재생, 구도심 활성화, 지역공동체 회복을 위한 종합적인 접근이 요구됩니다.",
      hashtags: "#포천도시재생 #구도심활성화 #지역공동체회복",
      city: "포천"
    },
    {
      id: 2,
      icon: Camera,
      title: "관광 활성화",
      description: "포천 관광 활성화, 체류형 관광도시, 생태문화 브랜드 구축을 통한 지역 발전 방안을 제안합니다.",
      hashtags: "#포천관광활성화 #체류형관광도시 #생태문화브랜드",
      city: "포천"
    },
    {
      id: 3,
      icon: GraduationCap,
      title: "미래교육 모델 구축",
      description: "포천 미래교육, 교육격차 해소, 지역인재 정주를 위한 혁신적 교육 모델이 필요합니다.",
      hashtags: "#포천미래교육 #교육격차해소 #지역인재정주",
      city: "포천"
    },
    // 동두천 (3개)
    {
      id: 4,
      icon: MapPin,
      title: "미군 공여지 활용 방안",
      description: "동두천 공여지 활용, 지역경제 회복, 도시발전 핵심과제 해결을 위한 전략적 방안을 모색합니다.",
      hashtags: "#동두천공여지활용 #지역경제회복 #도시발전핵심과제",
      city: "동두천"
    },
    {
      id: 5,
      icon: Mountain,
      title: "소요산 관광 활성화",
      description: "소요산 관광 활성화, 체류형 휴양지, 지역 매력도 제고를 통한 관광 산업 육성 방안이 필요합니다.",
      hashtags: "#소요산관광활성화 #체류형휴양지 #지역매력도제고",
      city: "동두천"
    },
    {
      id: 6,
      icon: Factory,
      title: "방위산업 클러스터 조성",
      description: "동두천 방위산업, 국방신산업 도시, 지역경제 도약을 위한 산업 클러스터 구축 방안을 제시합니다.",
      hashtags: "#동두천방위산업 #국방신산업도시 #지역경제도약",
      city: "동두천"
    },
    // 연천 (3개)
    {
      id: 7,
      icon: Shield,
      title: "규제 및 수도권 역차별 문제 해결 방안",
      description: "접경지역, 군사보호구역, 수도권 규제 문제에 대한 혁신적 해결책을 제시합니다.",
      hashtags: "#접경지역 #군사보호구역 #수도권규제",
      city: "연천"
    },
    {
      id: 8,
      icon: Users,
      title: "인구 감소 및 고령화에 대한 대처 방안",
      description: "인구소멸위기, 청년정착과 출산친화, 고령사회 대응을 위한 실질적 방안을 모색합니다.",
      hashtags: "#인구소멸위기 #청년정착과출산친화 #고령사회대응",
      city: "연천"
    },
    {
      id: 9,
      icon: Trees,
      title: "자연환경 활용 관광 활성화",
      description: "연천 생태관광, 유네스코 자연유산, 지속가능한 지역발전을 위한 창의적 아이디어가 필요합니다.",
      hashtags: "#연천생태관광 #유네스코자연유산 #지속가능지역발전",
      city: "연천"
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
            2025년 공모 주제
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            지역 현안 및 참가 주제
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            각 지역별 현안 및 참가주제를 정리한 섹션입니다.<br />
            나열된 다음 9가지 주제 중 한가지를 택하여 지원하시길 바랍니다.
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
