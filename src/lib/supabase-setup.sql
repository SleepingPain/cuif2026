-- CUIF+ 2025 공지사항 테이블 생성 SQL
-- Supabase 대시보드의 SQL Editor에서 실행하세요

-- 공지사항 테이블 생성
CREATE TABLE notices (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL DEFAULT 'CUIF+ 운영진',
    is_important BOOLEAN DEFAULT FALSE,
    images TEXT[], -- 이미지 URL 배열 추가
    files TEXT[], -- 첨부파일 URL 배열 추가
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 업데이트 시간 자동 갱신을 위한 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 생성
CREATE TRIGGER update_notices_updated_at 
    BEFORE UPDATE ON notices 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 샘플 데이터 삽입 (선택사항)
INSERT INTO notices (title, content, author, is_important) VALUES
('CUIF+ 2025 대회 개최 안내', 
'안녕하세요. CUIF+ 2025 3川지역 정책 아이디어 경진대회 개최를 안내드립니다.

이번 대회는 학생들의 창의적이고 혁신적인 아이디어를 발굴하여 지역사회 발전에 기여하고자 합니다.

참가 신청 기간: 2025년 10월 1일 ~ 10월 31일
대회 일정: 2025년 11월 중
참가 대상: 대학(원)생 2-7명으로 구성된 팀

많은 관심과 참여 부탁드립니다.', 
'CUIF+ 운영진', 
true),

('사전 설명회 개최 안내', 
'CUIF+ 2025 대회 참가를 희망하는 학생들을 위한 사전 설명회를 개최합니다.

일시: 2025년 9월 25일 (수) 오후 2시
장소: 차의과학대학교 본관 대강당
내용: 대회 개요, 참가 방법, 평가 기준 등

참석을 원하시는 분은 사전 신청해 주시기 바랍니다.', 
'CUIF+ 운영진', 
false),

('참가 신청서 작성 가이드', 
'참가 신청서 작성 시 유의사항을 안내드립니다.

1. 팀 구성: 2명 이상 7명 이하
2. 팀장은 대학(원)생이어야 함
3. 아이디어는 3川지역(포천, 연천, 가평) 관련이어야 함
4. 제출 서류: 신청서, 팀원 명단, 아이디어 개요서

자세한 내용은 참가 안내를 확인해 주세요.', 
'CUIF+ 운영진', 
false);

-- RLS (Row Level Security) 정책 설정 (읽기 전용)
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 공지사항을 읽을 수 있도록 정책 생성
CREATE POLICY "Anyone can read notices" ON notices
    FOR SELECT USING (true);

-- 관리자만 공지사항을 생성/수정/삭제할 수 있도록 하려면
-- 추가적인 인증 시스템과 정책이 필요합니다.

-- ============================================
-- Storage 버킷 설정 (Supabase Dashboard에서 수동 설정 필요)
-- ============================================

-- 1. Supabase Dashboard > Storage에서 'notices-images' 버킷 생성
-- 2. 버킷 설정:
--    - Public: true (공개 접근 허용)
--    - File size limit: 10MB
--    - Allowed MIME types: image/jpeg, image/png, image/gif, image/webp

-- 3. Supabase Dashboard > Storage에서 'notices-files' 버킷 생성 (파일 첨부용)
-- 4. 버킷 설정:
--    - Public: true (공개 접근 허용)
--    - File size limit: 50MB
--    - Allowed MIME types: application/pdf, application/msword, 
--      application/vnd.openxmlformats-officedocument.wordprocessingml.document,
--      application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
--      application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation,
--      application/zip, text/plain

-- 5. Storage Policies (버킷 생성 후 SQL Editor에서 실행):

-- 모든 사용자가 이미지를 업로드할 수 있도록 허용 (선택사항)
-- CREATE POLICY "Anyone can upload notice images" ON storage.objects
--     FOR INSERT WITH CHECK (bucket_id = 'notices-images');

-- 모든 사용자가 이미지를 읽을 수 있도록 허용
-- CREATE POLICY "Anyone can view notice images" ON storage.objects
--     FOR SELECT USING (bucket_id = 'notices-images');

-- 모든 사용자가 파일을 업로드할 수 있도록 허용 (선택사항)
-- CREATE POLICY "Anyone can upload notice files" ON storage.objects
--     FOR INSERT WITH CHECK (bucket_id = 'notices-files');

-- 모든 사용자가 파일을 읽을 수 있도록 허용
-- CREATE POLICY "Anyone can view notice files" ON storage.objects
--     FOR SELECT USING (bucket_id = 'notices-files');

-- ============================================
-- 기존 테이블에 이미지/파일 컬럼 추가 (이미 테이블이 존재하는 경우)
-- ============================================

-- ALTER TABLE notices ADD COLUMN IF NOT EXISTS images TEXT[];
-- ALTER TABLE notices ADD COLUMN IF NOT EXISTS files TEXT[];

-- ============================================
-- 샘플 이미지/파일이 포함된 공지사항 (선택사항)
-- ============================================

-- 이미지만 포함된 공지사항
-- INSERT INTO notices (title, content, author, is_important, images) VALUES
-- ('이미지가 포함된 공지사항 테스트', 
-- '이것은 이미지가 포함된 공지사항 예시입니다.', 
-- 'CUIF+ 운영진', 
-- false,
-- ARRAY['https://your-project.supabase.co/storage/v1/object/public/notices-images/sample1.jpg']);

-- 파일만 포함된 공지사항
-- INSERT INTO notices (title, content, author, is_important, files) VALUES
-- ('파일이 포함된 공지사항 테스트', 
-- '이것은 파일이 포함된 공지사항 예시입니다.', 
-- 'CUIF+ 운영진', 
-- false,
-- ARRAY['https://your-project.supabase.co/storage/v1/object/public/notices-files/sample-document.pdf']);

-- 이미지와 파일이 모두 포함된 공지사항
-- INSERT INTO notices (title, content, author, is_important, images, files) VALUES
-- ('이미지와 파일이 포함된 공지사항', 
-- '이것은 이미지와 파일이 모두 포함된 공지사항 예시입니다.', 
-- 'CUIF+ 운영진', 
-- true,
-- ARRAY['https://your-project.supabase.co/storage/v1/object/public/notices-images/sample1.jpg'],
-- ARRAY['https://your-project.supabase.co/storage/v1/object/public/notices-files/sample-document.pdf']);

-- ============================================
-- 유용한 쿼리들
-- ============================================

-- 이미지가 있는 공지사항만 조회
-- SELECT * FROM notices WHERE images IS NOT NULL AND array_length(images, 1) > 0;

-- 파일이 있는 공지사항만 조회
-- SELECT * FROM notices WHERE files IS NOT NULL AND array_length(files, 1) > 0;

-- 이미지 또는 파일이 있는 공지사항만 조회
-- SELECT * FROM notices WHERE 
--     (images IS NOT NULL AND array_length(images, 1) > 0) OR 
--     (files IS NOT NULL AND array_length(files, 1) > 0);

-- 특정 공지사항의 이미지/파일 개수 조회
-- SELECT title, 
--        array_length(images, 1) as image_count,
--        array_length(files, 1) as file_count 
-- FROM notices WHERE id = 1;

-- ============================================
-- 영상 테이블 생성
-- ============================================

-- 영상 테이블 생성
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    youtube_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 업데이트 시간 자동 갱신을 위한 트리거 (이미 생성되어 있다면 무시됨)
CREATE TRIGGER update_videos_updated_at 
    BEFORE UPDATE ON videos 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 정책 설정 (읽기 전용)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 영상을 읽을 수 있도록 정책 생성
CREATE POLICY "Anyone can read videos" ON videos
    FOR SELECT USING (true);

-- 샘플 데이터 (선택사항)
INSERT INTO videos (title, youtube_url) VALUES
('CUIF+ 2025 대회 소개 영상', 'https://www.youtube.com/embed/Fxjirx90whk'),
('사전설명회 영상', 'https://www.youtube.com/embed/example2');

-- ============================================
-- 유용한 쿼리들
-- ============================================

-- 최신 영상 조회 (최신순)
-- SELECT * FROM videos ORDER BY created_at DESC;

-- YouTube URL에서 비디오 ID 추출 예시
-- SELECT id, title, 
--        SUBSTRING(youtube_url FROM 'embed/([^?]+)') as video_id
-- FROM videos;

-- ============================================
-- 갤러리 이미지 테이블 생성
-- ============================================

-- 갤러리 이미지 테이블 생성
CREATE TABLE gallery_images (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    title VARCHAR(255),
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 업데이트 시간 자동 갱신을 위한 트리거
CREATE TRIGGER update_gallery_images_updated_at 
    BEFORE UPDATE ON gallery_images 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) 정책 설정 (읽기 전용)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 갤러리 이미지를 읽을 수 있도록 정책 생성
CREATE POLICY "Anyone can read gallery images" ON gallery_images
    FOR SELECT USING (true);

-- 인덱스 생성 (정렬 성능 향상)
CREATE INDEX idx_gallery_order ON gallery_images(display_order DESC, created_at DESC);

-- 샘플 데이터 (선택사항)
INSERT INTO gallery_images (image_url, title, display_order) VALUES
('https://ohfkqbgpjtqhcddgbzoa.supabase.co/storage/v1/object/public/PHOTO%20DB/CUIF%20all.jpg', 'CUIF 전체', 1),
('https://ohfkqbgpjtqhcddgbzoa.supabase.co/storage/v1/object/public/PHOTO%20DB/CUIF%20DB.jpg', 'CUIF DB', 2),
('https://ohfkqbgpjtqhcddgbzoa.supabase.co/storage/v1/object/public/PHOTO%20DB/CUIF%20HS.jpg', 'CUIF HS', 3),
('https://ohfkqbgpjtqhcddgbzoa.supabase.co/storage/v1/object/public/PHOTO%20DB/CUIF%20MJ.jpg', 'CUIF MJ', 4);

-- ============================================
-- 유용한 쿼리들
-- ============================================

-- 갤러리 이미지 조회 (정렬 순서대로)
-- SELECT * FROM gallery_images ORDER BY display_order DESC, created_at DESC;

-- 특정 순서로 이미지 재정렬
-- UPDATE gallery_images SET display_order = 1 WHERE id = 1;
-- UPDATE gallery_images SET display_order = 2 WHERE id = 2;
