import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Lightbulb, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryService, GalleryImage } from '../lib/supabase';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await galleryService.getAllImages();
      setImages(data);
    } catch (error) {
      console.error('갤러리 이미지를 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  const openImage = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    let newIndex = selectedIndex;
    if (direction === 'prev') {
      newIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1;
    } else {
      newIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0;
    }
    
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'Escape') {
        closeImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedIndex, images]);

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
                <span className="text-lg font-semibold">CUIF+ 2025 갤러리</span>
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
              <ImageIcon className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">갤러리</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              CUIF+ 2025 대회와 관련된 모든 사진을 확인하세요
            </p>
          </div>

          {/* Images Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gray-200 rounded-lg"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <Card 
                  key={image.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => openImage(image, index)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square relative group">
                      <ImageWithFallback
                        src={image.image_url}
                        alt={image.title || '갤러리 이미지'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {image.title && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-white text-sm font-medium line-clamp-2">
                              {image.title}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-xl font-semibold mb-3">등록된 이미지가 없습니다</h2>
                <p className="text-muted-foreground">
                  새로운 이미지가 등록되면 여기에 표시됩니다
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Image Modal/Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={closeImage}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <ImageWithFallback
                src={selectedImage.image_url}
                alt={selectedImage.title || '갤러리 이미지'}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              
              {selectedImage.title && (
                <div className="mt-4 text-center">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-white/80 text-sm">
                      {selectedImage.description}
                    </p>
                  )}
                  <p className="text-white/60 text-xs mt-2">
                    {selectedIndex + 1} / {images.length}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

