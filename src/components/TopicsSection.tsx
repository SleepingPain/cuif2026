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
import { useLang } from '../lib/i18n';

export function TopicsSection() {
  const { t } = useLang();

  // 2026 도시별 과제 — 3개 도시 · 총 9개 (Mission 01 동두천 / 02 연천 / 03 포천)
  const topics = [
    // Mission 01 · 동두천
    {
      id: 1,
      icon: Shield,
      title: t('국가 차원의 실질적 보상·지원 정책', 'Real National Compensation and Support'),
      description: t(
        '75년간 미군기지로 감내해 온 지역의 희생에 대한 국가 차원의 실질적 보상·지원 정책을 발굴합니다.',
        'Find national policies that genuinely compensate a city that hosted US bases for 75 years.',
      ),
      hashtags: t('#미군기지75년 #국가보상 #지원정책', '#75Years #NationalCompensation #SupportPolicy'),
      city: t('동두천', 'Dongducheon'),
      cityKey: '동두천'
    },
    {
      id: 2,
      icon: MapPin,
      title: t('반환 공여지 활용', 'Reusing the Returned Base Land'),
      description: t(
        '반환 공여지 활용을 통해 동두천의 미래 성장 동력을 만듭니다.',
        'Turn the returned base land into the city’s next engine of growth.',
      ),
      hashtags: t('#반환공여지 #미래성장동력 #도시발전', '#ReturnedLand #GrowthEngine #UrbanFuture'),
      city: t('동두천', 'Dongducheon'),
      cityKey: '동두천'
    },
    {
      id: 3,
      icon: Users,
      title: t('다시 돌아오는 동두천', 'Coming Back to Dongducheon'),
      description: t(
        '청년이 떠나지 않고 다시 돌아오는 동두천을 만드는 방안을 제안합니다.',
        'Propose ways to make young people stay — and come back.',
      ),
      hashtags: t('#청년유출대응 #청년회귀 #정주여건', '#YouthOutflow #ComingBack #LivingConditions'),
      city: t('동두천', 'Dongducheon'),
      cityKey: '동두천'
    },
    // Mission 02 · 연천 (★ 추가 지원금 대상)
    {
      id: 4,
      icon: GraduationCap,
      title: t('소규모 학교의 지속 가능한 운영', 'Keeping Small Schools Alive'),
      description: t(
        '소규모 학교의 지속 가능한 운영을 위한 혁신 방안을 찾습니다.',
        'Find ways to run very small schools sustainably.',
      ),
      hashtags: t('#소규모학교 #지속가능운영 #교육혁신', '#SmallSchools #Sustainable #EduInnovation'),
      city: t('연천', 'Yeoncheon'),
      cityKey: '연천'
    },
    {
      id: 5,
      icon: Building2,
      title: t('학교와 지역사회 연계·협력', 'Schools and Community, Linked'),
      description: t(
        '학교와 지역사회 간 연계·협력을 강화하는 방안을 제안합니다.',
        'Propose stronger ties between schools and the community around them.',
      ),
      hashtags: t('#학교지역연계 #지역사회협력 #상생', '#SchoolCommunity #Partnership #Together'),
      city: t('연천', 'Yeoncheon'),
      cityKey: '연천'
    },
    {
      id: 6,
      icon: Trees,
      title: t('교육을 통한 인구 유입', 'Education That Brings People In'),
      description: t(
        '교육을 통한 인구 유입과 정주 여건 개선 방안을 모색합니다.',
        'Use education to draw people in and make it worth staying.',
      ),
      hashtags: t('#교육인구유입 #정주여건개선 #지역활성화', '#EduMigration #BetterLiving #Revitalise'),
      city: t('연천', 'Yeoncheon'),
      cityKey: '연천'
    },
    // Mission 03 · 포천
    {
      id: 7,
      icon: Users,
      title: t('청년이 머무는 포천', 'A Pocheon Young People Stay In'),
      description: t(
        '인구 감소·청년 유출에 대응하고 정주 여건을 개선해, 청년이 머무는 포천을 만듭니다.',
        'Answer population decline and youth outflow by making the city liveable.',
      ),
      hashtags: t('#청년정주 #인구감소대응 #정주여건개선', '#YouthStay #Depopulation #BetterLiving'),
      city: t('포천', 'Pocheon'),
      cityKey: '포천'
    },
    {
      id: 8,
      icon: GraduationCap,
      title: t('교육도시 포천', 'Pocheon, a City of Learning'),
      description: t(
        '교육·돌봄을 통한 지역 발전 방안으로 교육도시 포천을 설계합니다.',
        'Design the city around education and care as its growth strategy.',
      ),
      hashtags: t('#교육도시포천 #교육돌봄 #지역발전', '#LearningCity #Care #LocalGrowth'),
      city: t('포천', 'Pocheon'),
      cityKey: '포천'
    },
    {
      id: 9,
      icon: Camera,
      title: t('드론·관광·지역 자원을 활용한 미래 포천', 'Drones, Tourism and Local Assets'),
      description: t(
        '드론·방위산업·관광지·평화경제특구·농특산물로 지역경제와 생활인구를 활성화합니다.',
        'Grow the local economy with drones, defence industry, tourism, the peace economic zone and local produce.',
      ),
      hashtags: t('#드론 #방위산업 #평화경제특구 #관광', '#Drones #Defence #PeaceZone #Tourism'),
      city: t('포천', 'Pocheon'),
      cityKey: '포천'
    }
  ];

  const getCityColor = (cityKey: string) => {
    const colors: { [key: string]: string } = {
      '연천': 'bg-[#F8F7BA]',
      '포천': 'bg-[#A3CCDA]',
      '동두천': 'bg-[#BDE3C3]'
    };
    return colors[cityKey] || 'bg-gray-100';
  };

  const cityCards = [
    {
      img: '/images/city_dongducheon.jpg',
      name: t('Mission 01 · 동두천', 'Mission 01 · Dongducheon'),
      sub: t('보상·공여지·청년 회귀', 'Compensation · land · coming back'),
    },
    {
      img: '/images/city_yeoncheon.jpg',
      name: t('Mission 02 · 연천 ★', 'Mission 02 · Yeoncheon ★'),
      sub: t('교육으로 다시 사는 지역', 'A region revived through education'),
    },
    {
      img: '/images/city_pocheon.jpg',
      name: t('Mission 03 · 포천', 'Mission 03 · Pocheon'),
      sub: t('청년·교육·미래 자원', 'Youth · education · future assets'),
    },
  ];

  return (
    <section id="topics" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {t('2026년 도시별 과제 · Missions', '2026 Missions')}
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            {t('3개 도시 · 9개 과제', 'Three Cities · Nine Missions')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              '2025년에는 공개되지 못했던 포천 과제가 올해 3개로 확정되어, 포천·동두천·연천 세 도시 9개 과제가 모두 준비되었습니다.',
              'The Pocheon missions that could not be released in 2025 are set — three each for Pocheon, Dongducheon and Yeoncheon, nine in all.',
            )}
            <br />
            {t(
              '아래 9가지 과제 중 하나를 선택해 지원하세요.',
              'Pick one of the nine and apply.',
            )}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            ★{' '}
            {t(
              '연천 과제를 선택한 팀에게는 기본 제작 지원금에 더해 추가 지원금이 지급될 예정입니다.',
              'Teams that take a Yeoncheon mission receive extra funding on top of the standard production budget.',
            )}
          </p>
        </div>

        {/* 도시 비주얼 3종 — fal gpt-image-2 생성 (크림 톤) */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {cityCards.map((city) => (
            <div key={city.name} className="relative rounded-lg overflow-hidden shadow-sm">
              <img src={city.img} alt={city.name} className="w-full h-44 object-cover" />
              <div
                className="absolute inset-0 flex flex-col justify-end p-4"
                style={{ backgroundImage: 'linear-gradient(180deg, rgba(24,23,21,0) 40%, rgba(24,23,21,0.72) 100%)' }}
              >
                <p className="text-white" style={{ fontWeight: 600 }}>{city.name}</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{city.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className={`hover:shadow-lg transition-all cursor-pointer group border-2 ${getCityColor(topic.cityKey)}`}
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
            {t(
              '관심 있는 주제가 있으신가요? 팀을 구성하여 참가 신청을 해보세요!',
              'Found one that speaks to you? Build a team and apply.',
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2">
              💡{' '}
              {t(
                '팁: 여러 주제를 융합한 아이디어도 환영합니다',
                'Tip: ideas that combine several missions are welcome',
              )}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
