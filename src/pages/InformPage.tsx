import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Bell, Calendar, ChevronRight, Search, ArrowLeft, Lightbulb, Image as ImageIcon } from 'lucide-react';
import { noticeService, Notice } from '../lib/supabase';

export function InformPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadNotices();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = notices.filter(notice =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotices(filtered);
    } else {
      setFilteredNotices(notices);
    }
  }, [searchTerm, notices]);

  const loadNotices = async () => {
    try {
      const data = await noticeService.getNotices();
      setNotices(data);
      setFilteredNotices(data);
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
                <span className="text-lg font-semibold">CUIF+ 2025 공지사항</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bell className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">공지사항</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              CUIF+ 2025 대회와 관련된 모든 공지사항을 확인하세요
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="공지사항 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Notices List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredNotices.length > 0 ? (
            <div className="space-y-4">
              {filteredNotices.map((notice) => (
                <Card 
                  key={notice.id} 
                  className="hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary/20"
                  onClick={() => navigate(`/inform/${notice.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          {notice.is_important && (
                            <Badge variant="destructive" className="text-xs">
                              중요
                            </Badge>
                          )}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {formatDate(notice.created_at)}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            • {notice.author}
                          </span>
                        </div>
                        <h2 className="text-xl font-semibold mb-3 hover:text-primary transition-colors">
                          {notice.title}
                        </h2>
                        <p className="text-muted-foreground line-clamp-3 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                          {notice.content.length > 200 
                            ? `${notice.content.substring(0, 200)}...`
                            : notice.content
                          }
                        </p>
                        
                        {/* 이미지 미리보기 */}
                        {notice.images && Array.isArray(notice.images) && notice.images.length > 0 && (
                          <div className="mt-4 flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <ImageIcon className="w-4 h-4" />
                              <span>이미지 {notice.images.length}개</span>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                              {notice.images.slice(0, 3).map((imageUrl, index) => (
                                <div 
                                  key={index}
                                  className="w-16 h-16 sm:w-12 sm:h-12 rounded border overflow-hidden flex-shrink-0"
                                >
                                  <img
                                    src={imageUrl}
                                    alt={`미리보기 ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                    loading="lazy"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyNEg0MFY0MEgyNFYyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHR1ZXh0IHg9IjMyIiB5PSI1MiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuydtOuvuOyngDwvdGV4dD4KPC9zdmc+';
                                    }}
                                  />
                                </div>
                              ))}
                              {notice.images.length > 3 && (
                                <div className="w-16 h-16 sm:w-12 sm:h-12 rounded border bg-muted flex items-center justify-center text-xs text-muted-foreground">
                                  +{notice.images.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground ml-6 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-xl font-semibold mb-3">
                  {searchTerm ? '검색 결과가 없습니다' : '공지사항이 없습니다'}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {searchTerm 
                    ? '다른 키워드로 검색해보세요' 
                    : '새로운 공지사항이 등록되면 여기에 표시됩니다'
                  }
                </p>
                {searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchTerm('')}
                  >
                    검색 초기화
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
