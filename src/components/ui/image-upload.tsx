import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ImageUploadProps {
  onImagesChange: (imageUrls: string[]) => void;
  maxImages?: number;
  existingImages?: string[];
  disabled?: boolean;
}

export function ImageUpload({ 
  onImagesChange, 
  maxImages = 5, 
  existingImages = [],
  disabled = false 
}: ImageUploadProps) {
  const [images, setImages] = useState<string[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!supabase) {
      console.warn('Supabase가 연결되지 않았습니다. 데모 모드에서는 이미지 업로드가 지원되지 않습니다.');
      return null;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `notices/${fileName}`;

      setUploadProgress(prev => ({ ...prev, [file.name]: 50 }));

      const { data, error } = await supabase.storage
        .from('notices-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('이미지 업로드 실패:', error);
        return null;
      }

      // 공개 URL 생성
      const { data: { publicUrl } } = supabase.storage
        .from('notices-images')
        .getPublicUrl(data.path);

      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[file.name];
        return newProgress;
      });

      return publicUrl;
    } catch (error) {
      console.error('이미지 업로드 중 오류:', error);
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[file.name];
        return newProgress;
      });
      return null;
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []) as File[];
    
    if (files.length === 0) return;
    
    // 최대 이미지 개수 체크
    if (images.length + files.length > maxImages) {
      alert(`최대 ${maxImages}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    // 파일 타입 체크
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      alert('JPG, PNG, GIF, WebP 파일만 업로드할 수 있습니다.');
      return;
    }

    // 파일 크기 체크 (10MB)
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(file => uploadImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      const successfulUrls = uploadedUrls.filter((url): url is string => url !== null);
      const newImages = [...images, ...successfulUrls];
      
      setImages(newImages);
      onImagesChange(newImages);
      
      if (successfulUrls.length < files.length) {
        alert(`${files.length - successfulUrls.length}개의 파일 업로드에 실패했습니다.`);
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = async (imageUrl: string, index: number) => {
    if (!supabase) {
      // 데모 모드에서는 단순히 배열에서 제거
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      onImagesChange(newImages);
      return;
    }

    try {
      // Storage에서 파일 삭제 (선택사항)
      // const path = imageUrl.split('/').pop();
      // if (path) {
      //   await supabase.storage.from('notices-images').remove([`notices/${path}`]);
      // }
      
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      onImagesChange(newImages);
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
    }
  };

  const handleUploadClick = () => {
    if (disabled || uploading) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* 업로드 버튼 */}
      <div className="flex items-center gap-4">
        <Button 
          type="button"
          variant="outline" 
          onClick={handleUploadClick}
          disabled={disabled || uploading || images.length >= maxImages}
          className="gap-2"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          이미지 업로드
        </Button>
        
        <div className="text-sm text-muted-foreground">
          {images.length}/{maxImages} • JPG, PNG, GIF, WebP (최대 10MB)
        </div>
        
        {!supabase && (
          <Badge variant="secondary" className="text-xs">
            데모 모드 - 업로드 불가
          </Badge>
        )}
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* 업로드 진행률 */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="truncate">{fileName}</span>
                <span>{Math.round(Number(progress))}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 이미지 미리보기 */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <Card key={index} className="relative group overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <img
                    src={imageUrl}
                    alt={`업로드된 이미지 ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 이미지 로드 실패 시 플레이스홀더 표시
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA3NUgxMjVWMTI1SDc1Vjc1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                    }}
                  />
                  
                  {/* 삭제 버튼 */}
                  <button
                    type="button"
                    onClick={() => removeImage(imageUrl, index)}
                    disabled={disabled}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  
                  {/* 이미지 아이콘 오버레이 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-80 transition-opacity" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 안내 메시지 */}
      {images.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              이미지를 업로드하여 공지사항에 첨부하세요
            </p>
            <p className="text-sm text-muted-foreground">
              JPG, PNG, GIF, WebP 형식 • 최대 {maxImages}개 • 파일당 10MB 이하
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
