import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Lightbulb, Users, Trophy, Target, Video as VideoIcon, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { videoService, Video, galleryService, GalleryImage } from '../lib/supabase';
import { useLang } from '../lib/i18n';

export function AboutSection() {
  const [latestVideo, setLatestVideo] = useState<Video | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [videoLoading, setVideoLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLang();

  useEffect(() => {
    loadLatestVideo();
    loadGalleryImages();
  }, []);

  const loadLatestVideo = async () => {
    try {
      const video = await videoService.getLatestVideo();
      setLatestVideo(video);
    } catch (error) {
      console.error('영상을 불러오는데 실패했습니다:', error);
    } finally {
      setVideoLoading(false);
    }
  };

  const loadGalleryImages = async () => {
    try {
      const images = await galleryService.getMainImages(10);
      setGalleryImages(images);
    } catch (error) {
      console.error('갤러리 이미지를 불러오는데 실패했습니다:', error);
    } finally {
      setGalleryLoading(false);
    }
  };
  // 2025 성과 — 신뢰 근거 3카드 (Proof)
  const highlights = [
    {
      icon: Trophy,
      title: t('경기도의회 의장상', 'Gyeonggi Council Speaker’s Award'),
      description: t(
        '2025년 우수팀 시상 — 의장이 직접 방문해 시상했습니다',
        'Presented to a 2025 winning team by the Speaker in person',
      )
    },
    {
      icon: Lightbulb,
      title: t('국민신문고 반영 6건', '6 Ideas Filed as Public Petitions'),
      description: t(
        '학생 제안 아이디어 6건이 국민신문고에 실제 반영됐습니다',
        'Six student proposals were actually filed through the national petition system',
      )
    },
    {
      icon: Target,
      title: t('동두천시 홍보 채택', 'Adopted by the City of Dongducheon'),
      description: t(
        '학생 제안·실행 방안이 동두천시 정책·홍보에 실제 활용됐습니다',
        'Student plans were put to work in the city’s own policy and PR',
      )
    },
    {
      icon: Users,
      title: t('13년의 신뢰', '13 Years of Trust'),
      description: t(
        '2013 홍차 학술대회 → 2024 동두천 제12회 CUIF → 2025 삼천(포천·동두천·연천) 확대 → 2026 경기북부 6개 대학 연합',
        '2013 first academic conference → 2024 the 12th CUIF in Dongducheon → 2025 expanded to three cities → 2026 six universities across northern Gyeonggi',
      )
    }
  ];

  // 2026 연합 6개 대학
  const universities = [
    t('차의과학대학교 (주최)', 'CHA University (Host)'),
    t('가톨릭대학교', 'The Catholic University of Korea'),
    t('경민대학교', 'Kyungmin University'),
    t('대진대학교', 'Daejin University'),
    t('동양대학교', 'Dongyang University'),
    t('부천대학교', 'Bucheon University'),
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {/* Content */}
          <div className="max-w-5xl mx-auto">
            <Badge variant="outline" className="mb-4">
              2026 CUIF+ · What is CUIF+
            </Badge>
            <h2 className="text-4xl md:text-5xl mb-6">
              {t(
                '경기북부 대학생 정책 아이디어 페스티벌',
                'A Policy Idea Festival by Students of Northern Gyeonggi',
              )}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t(
                'CUIF+는 올해 새롭게 시작하는, 경기 북부 6개 대학 연합 페스티벌입니다. 차의과학대학교를 비롯해 가톨릭대·경민대·대진대·동양대·부천대 학생들이 한자리에 모입니다. 지역 현안을 학생이 직접 발굴하고, 정책·홍보 아이디어를 제안하고, 약 4개월간 현장에서 실행한 뒤 본선에서 발표합니다. 여러분의 아이디어가, 지역을 바꾸는 정책이 됩니다.',
                'CUIF+ begins this year as a joint festival of six universities in northern Gyeonggi — CHA, The Catholic University of Korea, Kyungmin, Daejin, Dongyang and Bucheon. Students find a local problem themselves, propose a policy and communication plan, run it in the field for about four months, then present at the finals. Your idea becomes the policy that changes the region.',
              )}
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t(
                'CUIF(CHA University Idea Festival)는 갑자기 생긴 공모전이 아닙니다. 2013년 홍차 학술대회에서 시작해 13년째 이어져 온 행사로, 2025년 삼천(포천·동두천·연천) 지역으로 확대했고, 2026년에는 경기북부 6개 대학 연합으로 한 번 더 커졌습니다. 차의과학대학교 RISE 사업단의 경기북부 지역상생 연계 프로그램입니다.',
                'CUIF (CHA University Idea Festival) did not appear overnight. It started as an academic conference in 2013 and has run for thirteen years; in 2025 it widened to three cities — Pocheon, Dongducheon and Yeoncheon — and in 2026 it grew again into a six-university alliance. It is a regional partnership programme of the CHA University RISE initiative.',
              )}
            </p>

            {/* 연합 6개 대학 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
              {universities.map((u) => (
                <Badge key={u} variant="secondary" style={{ padding: '6px 12px', fontSize: '0.875rem' }}>
                  {u}
                </Badge>
              ))}
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <Card key={index} className="border-none shadow-none bg-muted/30">
                  <CardContent className="p-4">
                    <highlight.icon className="w-8 h-8 text-primary mb-2" />
                    <h4 className="mb-2">{highlight.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Images Gallery */}
          <div className="relative max-w-5xl mx-auto">
            {galleryLoading ? (
              <div className="w-full h-[500px] bg-muted animate-pulse rounded-lg"></div>
            ) : galleryImages.length > 0 ? (
              <>
                <Carousel
                  className="w-full"
                  plugins={[
                    Autoplay({
                      delay: 3000,
                    })
                  ]}
                  opts={{
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {galleryImages.map((image) => (
                      <CarouselItem key={image.id}>
                        <ImageWithFallback
                          src={image.image_url}
                          alt={image.title || t('갤러리 이미지', 'Gallery image')}
                          className="w-full h-[500px] object-cover rounded-lg"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                <div className="mt-4 flex justify-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/gallery')}
                    className="gap-2"
                  >
                    {t('갤러리 더 보기', 'More photos')}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="w-full h-[500px] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">{t('등록된 이미지가 없습니다.', 'No images yet.')}</p>
              </div>
            )}
          </div>
        </div>

        {/* YouTube Video */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <VideoIcon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl">{t('영상', 'Video')}</h2>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/video')}
                className="gap-2"
              >
                {t('더 보기', 'More')}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {videoLoading ? (
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-muted animate-pulse flex items-center justify-center">
                <p className="text-muted-foreground">{t('영상 로딩 중...', 'Loading video…')}</p>
              </div>
            ) : latestVideo ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{latestVideo.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(
                      '2026 CUIF+ 대회에 대한 자세한 안내를 확인하세요',
                      'Watch the full introduction to 2026 CUIF+',
                    )}
                  </p>
                </div>
                <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={latestVideo.youtube_url}
                    title={latestVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            ) : (
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">{t('등록된 영상이 없습니다.', 'No video yet.')}</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
