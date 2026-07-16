import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Upload, X, FileText, Loader2, Download } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface FileUploadProps {
  onFilesChange: (fileUrls: string[]) => void;
  maxFiles?: number;
  existingFiles?: string[];
  disabled?: boolean;
}

export function FileUpload({ 
  onFilesChange, 
  maxFiles = 5, 
  existingFiles = [],
  disabled = false 
}: FileUploadProps) {
  const [files, setFiles] = useState<string[]>(existingFiles);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!supabase) {
      console.warn('Supabase가 연결되지 않았습니다. 데모 모드에서는 파일 업로드가 지원되지 않습니다.');
      return null;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `notices/${fileName}`;

      setUploadProgress(prev => ({ ...prev, [file.name]: 50 }));

      const { data, error } = await supabase.storage
        .from('notices-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('파일 업로드 실패:', error);
        return null;
      }

      // 공개 URL 생성
      const { data: { publicUrl } } = supabase.storage
        .from('notices-files')
        .getPublicUrl(data.path);

      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[file.name];
        return newProgress;
      });

      return publicUrl;
    } catch (error) {
      console.error('파일 업로드 중 오류:', error);
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[file.name];
        return newProgress;
      });
      return null;
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []) as File[];
    
    if (selectedFiles.length === 0) return;
    
    // 최대 파일 개수 체크
    if (files.length + selectedFiles.length > maxFiles) {
      alert(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
      return;
    }

    // 파일 타입 체크
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/zip',
      'application/x-zip-compressed',
      'text/plain'
    ];
    const invalidFiles = selectedFiles.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      alert('PDF, Word, Excel, PowerPoint, ZIP, TXT 파일만 업로드할 수 있습니다.');
      return;
    }

    // 파일 크기 체크 (50MB)
    const oversizedFiles = selectedFiles.filter(file => file.size > 50 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('파일 크기는 50MB 이하여야 합니다.');
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = selectedFiles.map(file => uploadFile(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      const successfulUrls = uploadedUrls.filter((url): url is string => url !== null);
      const newFiles = [...files, ...successfulUrls];
      
      setFiles(newFiles);
      onFilesChange(newFiles);
      
      if (successfulUrls.length < selectedFiles.length) {
        alert(`${selectedFiles.length - successfulUrls.length}개의 파일 업로드에 실패했습니다.`);
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

  const removeFile = async (fileUrl: string, index: number) => {
    if (!supabase) {
      // 데모 모드에서는 단순히 배열에서 제거
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onFilesChange(newFiles);
      return;
    }

    try {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onFilesChange(newFiles);
    } catch (error) {
      console.error('파일 삭제 실패:', error);
    }
  };

  const handleUploadClick = () => {
    if (disabled || uploading) return;
    fileInputRef.current?.click();
  };

  const getFileName = (fileUrl: string): string => {
    try {
      const url = new URL(fileUrl);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];
      // 타임스탬프와 랜덤 문자열 제거 (예: 1234567890-abc123.pdf -> 원본명.pdf)
      const cleanName = fileName.replace(/^\d+-[a-z0-9]+\./, '파일.');
      return decodeURIComponent(cleanName);
    } catch {
      return '파일';
    }
  };

  const getFileExtension = (fileUrl: string): string => {
    try {
      const fileName = fileUrl.split('/').pop() || '';
      const ext = fileName.split('.').pop()?.toLowerCase() || '';
      return ext;
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-4">
      {/* 업로드 버튼 */}
      <div className="flex items-center gap-4">
        <Button 
          type="button"
          variant="outline" 
          onClick={handleUploadClick}
          disabled={disabled || uploading || files.length >= maxFiles}
          className="gap-2"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          파일 업로드
        </Button>
        
        <div className="text-sm text-muted-foreground">
          {files.length}/{maxFiles} • PDF, Word, Excel, PPT, ZIP, TXT (최대 50MB)
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
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.txt"
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

      {/* 파일 목록 */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((fileUrl, index) => (
            <Card key={index} className="group">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {getFileName(fileUrl)}
                    </p>
                    <p className="text-xs text-muted-foreground uppercase">
                      {getFileExtension(fileUrl)} 파일
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      title="다운로드"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    
                    <button
                      type="button"
                      onClick={() => removeFile(fileUrl, index)}
                      disabled={disabled}
                      className="p-2 text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50"
                      title="삭제"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 안내 메시지 */}
      {files.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              파일을 업로드하여 공지사항에 첨부하세요
            </p>
            <p className="text-sm text-muted-foreground">
              PDF, Word, Excel, PowerPoint, ZIP, TXT 형식 • 최대 {maxFiles}개 • 파일당 50MB 이하
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

