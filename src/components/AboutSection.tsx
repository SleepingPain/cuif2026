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

export function AboutSection() {
  const [latestVideo, setLatestVideo] = useState<Video | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [videoLoading, setVideoLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const navigate = useNavigate();

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
  const highlights = [
    {
      icon: Lightbulb,
      title: "창의적 아이디어",
      description: "혁신적이고 실현 가능한 아이디어로 문제 해결"
    },
    {
      icon: Users,
      title: "융합 팀워크",
      description: "다양한 학과 학생들과의 협업으로 시너지 창출"
    },
    {
      icon: Trophy,
      title: "체계적 지원",
      description: "전문 멘토링으로 아이디어 구현"
    },
    {
      icon: Target,
      title: "지역사회 기여",
      description: "지역사회 현안 해결을 통한 실질적 사회 기여"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {/* Content */}
          <div className="max-w-5xl mx-auto">
            <Badge variant="outline" className="mb-4">
              2025년 CUIF+
            </Badge>
            <h2 className="text-4xl md:text-5xl mb-6">
              3川지역 정책 아이디어 경진대회
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
               CUIF+(3川지역 정책 아이디어 경진대회)는 경기 북부 지역(포천시, 동두천시, 연천군) 
              대학 및 지자체 연합 개방형 프로그램입니다. 지역 문제 해결 아이디어를 
              정책과 실행으로 연결하는 플랫폼으로, 학생들과 지역 구성원이 함께 
              창의적이고 혁신적인 아이디어를 발굴하고 실현합니다.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              CUIF(CHA University Idea Festival)은 
              2013년 시작 이후 지역사회와 산학 협력을 통해 지역 현안 해결과 대학·지역사회의 동반 성장을 이끌어왔습니다. 
              올해 2025년, 13회를 맞아 한 단계 업그레이드된 ‘CUIF+’로 새롭게 도약하며, 
              우수한 팀에게는 총 1,000만 원의 상금과 함께 전문 멘토링, 정책 연계 기회가 제공됩니다.
            </p>
            
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
                          alt={image.title || '갤러리 이미지'}
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
                    갤러리 더 보기
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="w-full h-[500px] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">등록된 이미지가 없습니다.</p>
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
                <h2 className="text-2xl">영상</h2>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/video')}
                className="gap-2"
              >
                더 보기
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {videoLoading ? (
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-muted animate-pulse flex items-center justify-center">
                <p className="text-muted-foreground">영상 로딩 중...</p>
              </div>
            ) : latestVideo ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{latestVideo.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    CUIF+ 2025 대회에 대한 자세한 안내를 확인하세요
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
                <p className="text-muted-foreground">등록된 영상이 없습니다.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}