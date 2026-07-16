import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { ImageUpload } from './ui/image-upload';
import { FileUpload } from './ui/file-upload';
import { Badge } from './ui/badge';
import { Save, X, AlertTriangle } from 'lucide-react';
import { Notice } from '../lib/supabase';

interface NoticeEditorProps {
  notice?: Notice; // 편집 모드일 때 기존 공지사항
  onSave: (noticeData: Partial<Notice>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function NoticeEditor({ notice, onSave, onCancel, isLoading = false }: NoticeEditorProps) {
  const [title, setTitle] = useState(notice?.title || '');
  const [content, setContent] = useState(notice?.content || '');
  const [author, setAuthor] = useState(notice?.author || 'CUIF+ 운영진');
  const [isImportant, setIsImportant] = useState(notice?.is_important || false);
  const [images, setImages] = useState<string[]>(notice?.images || []);
  const [files, setFiles] = useState<string[]>(notice?.files || []);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    } else if (title.length > 255) {
      newErrors.title = '제목은 255자 이하로 입력해주세요.';
    }

    if (!content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    }

    if (!author.trim()) {
      newErrors.author = '작성자를 입력해주세요.';
    } else if (author.length > 100) {
      newErrors.author = '작성자는 100자 이하로 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    const noticeData: Partial<Notice> = {
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      is_important: isImportant,
      images: images.length > 0 ? images : undefined,
      files: files.length > 0 ? files : undefined,
    };

    // 편집 모드일 때는 ID 포함
    if (notice) {
      noticeData.id = notice.id;
    }

    try {
      await onSave(noticeData);
    } catch (error) {
      console.error('공지사항 저장 실패:', error);
      alert('공지사항 저장에 실패했습니다.');
    }
  };

  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
  };

  const handleFilesChange = (newFiles: string[]) => {
    setFiles(newFiles);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              {notice ? '공지사항 편집' : '새 공지사항 작성'}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                취소
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                {isLoading ? '저장 중...' : '저장'}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 제목 */}
          <div className="space-y-2">
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지사항 제목을 입력하세요"
              disabled={isLoading}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <div className="flex items-center gap-1 text-sm text-red-500">
                <AlertTriangle className="w-4 h-4" />
                {errors.title}
              </div>
            )}
          </div>

          {/* 작성자 */}
          <div className="space-y-2">
            <Label htmlFor="author">작성자 *</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="작성자명을 입력하세요"
              disabled={isLoading}
              className={errors.author ? 'border-red-500' : ''}
            />
            {errors.author && (
              <div className="flex items-center gap-1 text-sm text-red-500">
                <AlertTriangle className="w-4 h-4" />
                {errors.author}
              </div>
            )}
          </div>

          {/* 중요 공지사항 설정 */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="important">중요 공지사항</Label>
              <p className="text-sm text-muted-foreground">
                중요 공지사항으로 설정하면 목록에서 강조 표시됩니다.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="important"
                checked={isImportant}
                onCheckedChange={setIsImportant}
                disabled={isLoading}
              />
              {isImportant && (
                <Badge variant="destructive" className="text-xs">
                  중요
                </Badge>
              )}
            </div>
          </div>

          {/* 내용 */}
          <div className="space-y-2">
            <Label htmlFor="content">내용 *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="공지사항 내용을 입력하세요"
              rows={10}
              disabled={isLoading}
              className={errors.content ? 'border-red-500' : ''}
            />
            {errors.content && (
              <div className="flex items-center gap-1 text-sm text-red-500">
                <AlertTriangle className="w-4 h-4" />
                {errors.content}
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              줄바꿈은 자동으로 적용됩니다.
            </p>
          </div>

          {/* 이미지 업로드 */}
          <div className="space-y-2">
            <Label>첨부 이미지 (선택사항)</Label>
            <ImageUpload
              onImagesChange={handleImagesChange}
              existingImages={images}
              maxImages={5}
              disabled={isLoading}
            />
          </div>

          {/* 파일 업로드 */}
          <div className="space-y-2">
            <Label>첨부 파일 (선택사항)</Label>
            <FileUpload
              onFilesChange={handleFilesChange}
              existingFiles={files}
              maxFiles={5}
              disabled={isLoading}
            />
          </div>

          {/* 미리보기 */}
          {(title || content) && (
            <div className="space-y-2">
              <Label>미리보기</Label>
              <Card className="border-dashed">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      {isImportant && (
                        <Badge variant="destructive" className="text-xs">
                          중요
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {author || '작성자'} • 방금 전
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold">
                      {title || '제목 미입력'}
                    </h3>
                    
                    <div className="text-muted-foreground" style={{ whiteSpace: 'pre-line' }}>
                      {content || '내용 미입력'}
                    </div>

                    {images.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">첨부 이미지 ({images.length}개)</p>
                        <div className="grid grid-cols-3 gap-2">
                          {images.map((imageUrl, index) => (
                            <div key={index} className="aspect-video rounded border overflow-hidden">
                              <img
                                src={imageUrl}
                                alt={`미리보기 ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {files.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">첨부 파일 ({files.length}개)</p>
                        <div className="text-sm text-muted-foreground">
                          {files.map((fileUrl, index) => (
                            <div key={index} className="truncate">
                              📎 파일 {index + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
