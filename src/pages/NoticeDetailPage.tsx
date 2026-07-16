import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Calendar, User, Lightbulb, Bell, FileText, Download } from 'lucide-react';
import { noticeService, Notice } from '../lib/supabase';

export function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadNotice(parseInt(id));
    }
  }, [id]);

  const loadNotice = async (noticeId: number) => {
    try {
      const data = await noticeService.getNotice(noticeId);
      setNotice(data);
    } catch (error) {
      console.error('공지사항을 불러오는데 실패했습니다:', error);
      setError('공지사항을 찾을 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/inform')}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  목록으로
                </Button>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  <span className="text-lg font-semibold">2026 CUIF+ 공지사항</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="animate-pulse">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/inform')}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  목록으로
                </Button>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  <span className="text-lg font-semibold">2026 CUIF+ 공지사항</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h1 className="text-2xl font-semibold mb-3">공지사항을 찾을 수 없습니다</h1>
                <p className="text-muted-foreground mb-6">
                  요청하신 공지사항이 존재하지 않거나 삭제되었습니다.
                </p>
                <Button onClick={() => navigate('/inform')}>
                  공지사항 목록으로
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

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
                onClick={() => navigate('/inform')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                목록으로
              </Button>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold">2026 CUIF+ 공지사항</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              {/* Notice Header */}
              <div className="border-b pb-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  {notice.is_important && (
                    <Badge variant="destructive">중요</Badge>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold mb-4 leading-tight">
                  {notice.title}
                </h1>
                
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{notice.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(notice.created_at)}</span>
                  </div>
                </div>
              </div>

              {/* Notice Content */}
              <div className="prose prose-lg max-w-none">
                <div className="leading-relaxed mb-8" style={{ whiteSpace: 'pre-line' }}>
                  {notice.content}
                </div>
                
                {/* Images */}
                {notice.images && Array.isArray(notice.images) && notice.images.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">첨부 이미지</h3>
                    <div className="space-y-4">
                      {notice.images.map((imageUrl, index) => (
                        <div key={index} className="rounded-lg overflow-hidden border">
                          <img
                            src={imageUrl}
                            alt={`공지사항 이미지 ${index + 1}`}
                            className="w-full h-auto"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuydtOuvuOyngCDroZzrk5zsl6HshKDtjpjsiqQ8L3RleHQ+Cjwvc3ZnPgo=';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Files */}
                {notice.files && Array.isArray(notice.files) && notice.files.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">첨부 파일</h3>
                    <div className="space-y-2">
                      {notice.files.map((fileUrl, index) => {
                        const getFileName = (url: string): string => {
                          try {
                            const pathParts = url.split('/');
                            const fileName = pathParts[pathParts.length - 1];
                            return decodeURIComponent(fileName);
                          } catch {
                            return `파일 ${index + 1}`;
                          }
                        };

                        const getFileExtension = (url: string): string => {
                          try {
                            const fileName = url.split('/').pop() || '';
                            const ext = fileName.split('.').pop()?.toLowerCase() || '';
                            return ext.toUpperCase();
                          } catch {
                            return 'FILE';
                          }
                        };

                        return (
                          <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 group"
                              >
                                <div className="flex-shrink-0 p-2 bg-primary/10 rounded">
                                  <FileText className="w-6 h-6 text-primary" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium group-hover:text-primary transition-colors truncate">
                                    {getFileName(fileUrl)}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {getFileExtension(fileUrl)} 파일
                                  </p>
                                </div>
                                
                                <div className="flex-shrink-0">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2"
                                  >
                                    <Download className="w-4 h-4" />
                                    다운로드
                                  </Button>
                                </div>
                              </a>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Updated Info */}
              {notice.updated_at !== notice.created_at && (
                <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
                  마지막 수정: {formatDate(notice.updated_at)}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('/inform')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              목록으로 돌아가기
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
