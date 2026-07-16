import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Lightbulb, Video as VideoIcon } from 'lucide-react';
import { videoService, Video } from '../lib/supabase';

export function VideoPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const data = await videoService.getVideos();
      setVideos(data);
    } catch (error) {
      console.error('영상을 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                홈으로
              </Button>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold">2026 CUIF+ 영상</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <VideoIcon className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">영상</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              2026 CUIF+ 대회와 관련된 모든 영상을 확인하세요
            </p>
          </div>

          {/* Videos Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="space-y-4">
                    <div className="aspect-video bg-gray-200 rounded-lg"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : videos.length > 0 ? (
            <div className="space-y-8">
              {videos.map((video) => (
                <div key={video.id} className="space-y-3">
                  <div className="aspect-video w-full rounded-lg overflow-hidden shadow-sm">
                    <iframe
                      width="100%"
                      height="100%"
                      src={video.youtube_url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(video.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <VideoIcon className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-xl font-semibold mb-3">등록된 영상이 없습니다</h2>
                <p className="text-muted-foreground">
                  새로운 영상이 등록되면 여기에 표시됩니다
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

