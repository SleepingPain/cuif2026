import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Bell, Calendar, ChevronRight } from 'lucide-react';
import { noticeService, Notice } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function NoticeSection() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      // 메인페이지에서는 최신 3개만 표시
      const data = await noticeService.getNotices(3);
      setNotices(data);
    } catch (error) {
      console.error('공지사항을 불러오는데 실패했습니다:', error);
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

  if (loading) {
    return (
      <section id="notices" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="notices" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bell className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">공지사항</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            2026 CUIF+ 대회와 관련된 중요한 소식들을 확인하세요
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {notices.length > 0 ? (
            <div className="space-y-4">
              {notices.map((notice) => (
                <Card 
                  key={notice.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/inform/${notice.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {notice.is_important && (
                            <Badge variant="destructive" className="text-xs">
                              중요
                            </Badge>
                          )}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {formatDate(notice.created_at)}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                          {notice.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2" style={{ whiteSpace: 'pre-line' }}>
                          {notice.content.length > 100 
                            ? `${notice.content.substring(0, 100)}...`
                            : notice.content
                          }
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground ml-4 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">공지사항이 없습니다</h3>
                <p className="text-muted-foreground">
                  새로운 공지사항이 등록되면 여기에 표시됩니다.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/inform')}
              className="gap-2"
            >
              더보기
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
