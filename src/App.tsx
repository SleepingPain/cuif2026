import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { HomePage } from './pages/HomePage';
import { InformPage } from './pages/InformPage';
import { NoticeDetailPage } from './pages/NoticeDetailPage';
import { VideoPage } from './pages/VideoPage';
import { GalleryPage } from './pages/GalleryPage';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  useEffect(() => {
    // Supabase 연결 상태 확인
    if (supabase) {
      console.log('✅ Supabase가 정상적으로 연결되었습니다.');
    } else {
      console.log('⚠️ 데모 모드로 실행 중입니다. Supabase 환경 변수를 설정해주세요.');
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inform" element={<InformPage />} />
        <Route path="/inform/:id" element={<NoticeDetailPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        {/* 404 처리: 모든 다른 경로는 홈페이지로 리다이렉트 */}
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Analytics />
    </>
  );
}