import { createClient } from '@supabase/supabase-js'
// Supabase 클라이언트 생성 (환경 변수 체크 포함)
function createSupabaseClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // 환경 변수가 없거나 유효하지 않으면 null 반환
  if (!supabaseUrl || !supabaseKey || 
      !supabaseUrl.startsWith('https://') || 
      !supabaseUrl.includes('.supabase.co') ||
      supabaseKey.length < 50) {
    console.warn('❌ Supabase 환경 변수가 설정되지 않았습니다. 데모 모드로 실행됩니다.');
    return null;
  }

  try {
    const client = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase 클라이언트가 성공적으로 연결되었습니다!');
    return client;
  } catch (error) {
    console.warn('❌ Supabase 클라이언트 생성 실패:', error);
    return null;
  }
}

// Supabase 클라이언트 export
export const supabase = createSupabaseClient();

// 이미지 URL 유효성 검증
function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

// PostgreSQL 배열 문자열을 JavaScript 배열로 변환
function parseImages(images: any): string[] | undefined {
  if (!images) return undefined;
  
  // 이미 배열이면 유효한 URL만 필터링하여 반환
  if (Array.isArray(images)) {
    const validUrls = images.filter((url): url is string => 
      typeof url === 'string' && url.length > 0 && isValidImageUrl(url)
    );
    return validUrls.length > 0 ? validUrls : undefined;
  }
  
  // 문자열 형태의 배열인 경우 (PostgreSQL 배열 문자열)
  if (typeof images === 'string') {
    try {
      // JSON 배열인 경우: ["url1","url2"]
      if (images.trim().startsWith('[')) {
        const parsed = JSON.parse(images);
        if (Array.isArray(parsed)) {
          const validUrls = parsed.filter((url): url is string => 
            typeof url === 'string' && isValidImageUrl(url)
          );
          return validUrls.length > 0 ? validUrls : undefined;
        }
      }
      
      // PostgreSQL 배열 형식: {url1,url2} 또는 {"url1","url2"}
      if (images.trim().startsWith('{') && images.trim().endsWith('}')) {
        const content = images.trim().slice(1, -1);
        const urls = content.split(',').map(url => {
          const trimmed = url.trim();
          // 따옴표 제거
          return trimmed.replace(/^["']|["']$/g, '');
        }).filter(url => url.length > 0 && isValidImageUrl(url));
        
        return urls.length > 0 ? urls : undefined;
      }
    } catch (e) {
      console.warn('이미지 배열 파싱 실패:', images, e);
    }
  }
  
  return undefined;
}

// 파일 URL 배열 파싱 (이미지와 동일한 로직)
function parseFiles(files: any): string[] | undefined {
  if (!files) return undefined;
  
  // 이미 배열이면 유효한 URL만 필터링하여 반환
  if (Array.isArray(files)) {
    const validUrls = files.filter((url): url is string => 
      typeof url === 'string' && url.length > 0 && isValidImageUrl(url) // 같은 URL 검증 사용
    );
    return validUrls.length > 0 ? validUrls : undefined;
  }
  
  // 문자열 형태의 배열인 경우 (PostgreSQL 배열 문자열)
  if (typeof files === 'string') {
    try {
      // JSON 배열인 경우: ["url1","url2"]
      if (files.trim().startsWith('[')) {
        const parsed = JSON.parse(files);
        if (Array.isArray(parsed)) {
          const validUrls = parsed.filter((url): url is string => 
            typeof url === 'string' && isValidImageUrl(url)
          );
          return validUrls.length > 0 ? validUrls : undefined;
        }
      }
      
      // PostgreSQL 배열 형식: {url1,url2} 또는 {"url1","url2"}
      if (files.trim().startsWith('{') && files.trim().endsWith('}')) {
        const content = files.trim().slice(1, -1);
        const urls = content.split(',').map(url => {
          const trimmed = url.trim();
          // 따옴표 제거
          return trimmed.replace(/^["']|["']$/g, '');
        }).filter(url => url.length > 0 && isValidImageUrl(url));
        
        return urls.length > 0 ? urls : undefined;
      }
    } catch (e) {
      console.warn('파일 배열 파싱 실패:', files, e);
    }
  }
  
  return undefined;
}

// 공지사항 타입 정의
export interface Notice {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
  is_important: boolean
  author: string
  images?: string[] // 이미지 URL 배열 추가 (선택적)
  files?: string[] // 첨부파일 URL 배열 추가 (선택적)
}

// 영상 타입 정의
export interface Video {
  id: number
  title: string
  youtube_url: string
  created_at: string
  updated_at: string
}

// 갤러리 이미지 타입 정의
export interface GalleryImage {
  id: number
  image_url: string
  title?: string
  description?: string
  display_order: number
  created_at: string
  updated_at: string
}

// 더미 데이터 (Supabase 연결이 없을 때 사용)
// ⚠ 배열 순서 = 노출 순서. 메인 화면에는 앞에서 3개만 보인다(NoticeSection).
const dummyNotices: Notice[] = [
  {
    id: 5,
    title: '[9/18] 2026 CUIF+ 미니해커톤 참가자 모집 (신청 ~9/15)',
    content: `여러분의 신선한 아이디어에 「+」를 더해 줄 미니해커톤 참가자를 모집합니다. 팀이 없어도, 기획을 몰라도 참여할 수 있습니다.

📅 일시: 2026년 9월 18일(금) 13:00 ~ 19:00 (총 6시간)
📍 장소: 미래관 603호
👥 대상: 차의과학대학교 재학생 — CUIF+ 참가 팀·개인은 물론, CUIF+에 참가하지 않는 학생도 신청할 수 있습니다
⏰ 모집 기간: 2026년 9월 15일(화)까지
🍽️ 간식·저녁 식사 제공

하루 여섯 시간 동안 아이디어를 발굴하고, 그 자리에서 피칭까지 해 보는 자리입니다.
참가 형태는 「팀 참가」와 「개인 참가」 두 가지이며, 개인으로 신청하면 현장에서 팀을 꾸립니다. 신청서에 희망하는 역할(기획·디자인·개발·발표 등)을 적어 주세요.
저녁 메뉴와 알레르기 등 제약사항도 신청서에서 함께 받습니다.

🔗 신청: https://forms.gle/LLw3itcFGpmo2TXV8
📞 문의: 정은채 실습조교 031-850-9054

※ 11월 본선(11/5) 및 6개 대학 연합 해커톤(11/13~14)과는 별개로, 차의과학대학교에서 열리는 교내 1일 행사입니다. 신청 창구도 따로이니 위 링크로 신청해 주세요.`,
    author: 'CUIF+ 운영진',
    is_important: true,
    created_at: '2026-09-14T01:00:00Z',
    updated_at: '2026-09-14T01:00:00Z'
  },
  {
    id: 6,
    title: '[선배의 노하우] 오시혜 선배 특강 공개 — 7개 언어로 볼 수 있습니다',
    content: `CUIF 대상 수상자이자 1학년부터 4학년까지 매년 CUIF에 참여했던 오시혜 선배(21학번)가 후배들을 위해 특강 자료를 보내 주셨습니다. 강의 영상 6편과 함께 홈페이지에 올렸습니다.

🎓 00 자기소개 — CUIF를 네 번 한 이유
🎓 01 CUIF, 왜 해야 할까요? — 기획 → 실행 → 성과 → 보고, 현업의 전 과정을 미리
🎓 02 지자체 맞춤 리서치 방법 — 중장기 종합발전계획에서 근거 한 줄 찾기
🎓 03 논리 VS 크리에이티브 — 양주·포천 실제 사례로 보는 문제 재정의
🎓 04 플랜 작성법 — 발표 준비 시간부터 거꾸로 세는 1~3개월 일정 설계
🎓 05 마치며 — 헤맨 만큼 내 땅이 된다

📍 주소: cuif2026.vercel.app/tips/osihye

🌐 외국인 학생을 위해 두 편의 선배 특강 모두 페이지 오른쪽 위 드롭다운에서 언어를 바꿀 수 있습니다.
   한국어 · English · မြန်မာဘာသာ · Монгол хэл · Tiếng Việt · ไทย · नेपाली
   (한국어 외의 언어는 기계 번역입니다. 뜻이 어긋나 보이면 한국어 원문을 기준으로 봐 주세요. 영상은 한국어로 진행되며, 유튜브 자막(CC)에서 자동 번역 자막을 켤 수 있습니다.)

먼저 올라와 있는 최준혁 선배의 「(대)상 받는 공모전 TIP」(cuif2026.vercel.app/tips)도 같은 방식으로 언어를 바꿔 볼 수 있습니다.

"지자체가 원하는 방향을 먼저 읽고, 그 위에 우리가 가진 새로운 시각을 덧붙이는 것."

예선 제안서 제출(10/22) 전에 팀원들과 함께 보시기를 권합니다.`,
    author: 'CUIF+ 운영진',
    is_important: true,
    created_at: '2026-09-15T09:00:00Z',
    updated_at: '2026-09-15T09:00:00Z'
  },
  {
    id: 4,
    title: '[선배의 노하우] (대)상 받는 공모전 TIP 공개',
    content: `2022 CUIF 대상, 2025 CUIF+ 대상(경기도의회 의장상) 수상팀 팀장 최준혁 선배가 공모전을 준비하며 실제로 사용했던 생각의 순서와 판단 기준을 전부 공개했습니다.

🏆 00 시작하기 — 공모전을 잘한다는 것은 무엇일까
🏆 01 팀플 — 좋은 팀은 갈등이 없는 팀이 아니라, 같은 목표를 위해 제대로 갈등할 수 있는 팀
🏆 02 주제 선정 — 주제에 적힌 것은 수단인가, 목표인가
🏆 03 아이디어 — “그런데, 사람들이 이걸 굳이 해야 할까?”
🏆 04 발표 — 아이디어를 심사위원의 선택으로 바꾸는 과정
🏆 05 실제 공모전 발표 영상 3편 (2022 CUIF · 2022 XR 디바이스 · 2025 CUIF+)

챕터별 강의 영상과 연천 과제 실제 사례, 팀·주제·아이디어 체크리스트가 함께 있습니다.

📍 보는 곳: 홈페이지 상단 메뉴 「공모전 TIP」 또는 메인 화면의 「(대)상 받는 공모전 TIP」 섹션
📍 주소: cuif2026.vercel.app/tips

“대상을 받는 공식은 없습니다. 하지만 대상을 향해 가는 사고방식은 분명히 있습니다.”

예선 제안서 제출(10/22) 전에 팀원들과 함께 보시기를 권합니다.`,
    author: 'CUIF+ 운영진',
    is_important: true,
    created_at: '2026-09-03T10:00:00Z',
    updated_at: '2026-09-03T10:00:00Z'
  },
  {
    id: 1,
    title: '2026 CUIF+ 개최 안내',
    content: `안녕하세요. 2026 CUIF+ 경기북부 대학생 정책 아이디어 페스티벌 개최를 안내드립니다.

올해는 경기북부 6개 대학 연합으로 새롭게 시작합니다. 지역 현안을 직접 발굴하고, 약 4개월간 현장에서 실행한 뒤 본선에서 발표합니다.

📅 예선 제안서 제출: 2026년 10월 22일 (목)
📅 본선 대회: 2026년 11월 5일 (목)
👥 참가 대상: 6개 대학 재학생 3~5명으로 구성된 팀

많은 관심과 참여 부탁드립니다.

※ 현재 데모 모드입니다. 실제 Supabase 데이터베이스 연결 후 실제 공지사항이 표시됩니다.`,
    author: 'CUIF+ 운영진',
    is_important: true,
    created_at: '2026-07-16T10:00:00Z',
    updated_at: '2026-07-16T10:00:00Z',
    images: [
      'https://ohfkqbgpjtqhcddgbzoa.supabase.co/storage/v1/object/public/PHOTO%20DB/CUIF2025.png',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 2,
    title: '팀 구성 상시 진행 안내',
    content: `2026 CUIF+ 설명회(6/18 온라인)는 종료되었지만, 팀 구성과 참가 준비는 지금도 진행 중입니다.

👥 팀 규모: 3~5인
⭐ 가산점 2종: ① 1학년 신입생 포함 ② 포천·동두천·연천 지역 시민 포함
📅 예선 제안서 제출: 2026년 10월 22일 (목)

친구든 후배든 지역 주민이든, 지금 함께할 팀을 만들어 보세요.

※ 현재 데모 모드입니다.`,
    author: 'CUIF+ 운영진',
    is_important: false,
    created_at: '2026-07-10T14:30:00Z',
    updated_at: '2026-07-10T14:30:00Z'
    // 이 공지사항은 이미지가 없음
  },
  {
    id: 3,
    title: '도시별 과제 안내 — 3개 도시 9개 과제',
    content: `2026 CUIF+ 도시별 과제를 안내드립니다.

✅ 동두천: 국가 차원의 보상·지원 정책 / 반환 공여지 활용 / 다시 돌아오는 동두천
✅ 연천(★추가 지원금): 소규모 학교 운영 혁신 / 학교-지역사회 연계 / 교육을 통한 인구 유입
✅ 포천: 청년이 머무는 포천 / 교육도시 포천 / 드론·관광·지역 자원 활용

9개 과제 중 하나를 선택해 지원하세요.

※ 현재 데모 모드입니다.`,
    author: 'CUIF+ 운영진',
    is_important: false,
    created_at: '2026-07-08T09:15:00Z',
    updated_at: '2026-07-08T09:15:00Z',
    images: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop'
    ]
  }
];

// 공지사항 관련 함수들
export const noticeService = {
  // 모든 공지사항 가져오기
  async getNotices(limit?: number): Promise<Notice[]> {
    if (!supabase) {
      const notices = [...dummyNotices];
      return limit ? notices.slice(0, limit) : notices;
    }

    try {
      let query = supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query
      if (error) throw error
      
      // 이미지 및 파일 배열 파싱 및 정규화
      return (data as any[]).map(notice => ({
        ...notice,
        images: parseImages(notice.images),
        files: parseFiles(notice.files)
      })) as Notice[]
    } catch (error) {
      const notices = [...dummyNotices];
      return limit ? notices.slice(0, limit) : notices;
    }
  },

  // 특정 공지사항 가져오기
  async getNotice(id: number): Promise<Notice> {
    if (!supabase) {
      const notice = dummyNotices.find(n => n.id === id);
      if (!notice) throw new Error('공지사항을 찾을 수 없습니다.');
      return notice;
    }

    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      
      // 이미지 및 파일 배열 파싱 및 정규화
      return {
        ...data,
        images: parseImages(data.images),
        files: parseFiles(data.files)
      } as Notice
    } catch (error) {
      const notice = dummyNotices.find(n => n.id === id);
      if (!notice) throw new Error('공지사항을 찾을 수 없습니다.');
      return notice;
    }
  },

  // 중요 공지사항만 가져오기
  async getImportantNotices(limit = 3): Promise<Notice[]> {
    if (!supabase) {
      const importantNotices = dummyNotices.filter(n => n.is_important);
      return importantNotices.slice(0, limit);
    }

    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('is_important', true)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      
      // 이미지 및 파일 배열 파싱 및 정규화
      return (data as any[]).map(notice => ({
        ...notice,
        images: parseImages(notice.images),
        files: parseFiles(notice.files)
      })) as Notice[]
    } catch (error) {
      const importantNotices = dummyNotices.filter(n => n.is_important);
      return importantNotices.slice(0, limit);
    }
  }
}

// 더미 영상 데이터 (Supabase 연결이 없을 때 사용)
const dummyVideos: Video[] = [
  {
    id: 1,
    title: '2026 CUIF+ 소개 영상',
    youtube_url: 'https://www.youtube.com/embed/Fxjirx90whk',
    created_at: '2025-09-15T10:00:00Z',
    updated_at: '2025-09-15T10:00:00Z'
  },
  {
    id: 2,
    title: '사전설명회 영상',
    youtube_url: 'https://www.youtube.com/embed/example2',
    created_at: '2025-09-10T14:30:00Z',
    updated_at: '2025-09-10T14:30:00Z'
  }
];

// 영상 관련 함수들
export const videoService = {
  // 모든 영상 가져오기 (최신순)
  async getVideos(limit?: number): Promise<Video[]> {
    if (!supabase) {
      const videos = [...dummyVideos];
      return limit ? videos.slice(0, limit) : videos;
    }

    try {
      let query = supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query
      if (error) throw error
      
      return data as Video[]
    } catch (error) {
      const videos = [...dummyVideos];
      return limit ? videos.slice(0, limit) : videos;
    }
  },

  // 최신 영상 1개 가져오기
  async getLatestVideo(): Promise<Video | null> {
    const videos = await this.getVideos(1);
    return videos.length > 0 ? videos[0] : null;
  }
}

// 더미 갤러리 이미지 데이터 (Supabase 연결이 없을 때 사용) — 2025 실제 행사 사진 + 2026 브랜드 일러스트
const dummyGalleryImages: GalleryImage[] = [
  {
    id: 1,
    image_url: '/images/gallery_2025_awards.jpg',
    title: '2025 CUIF+ 본선 시상식 — 대상·최우수상',
    display_order: 1,
    created_at: '2026-07-16T10:00:00Z',
    updated_at: '2026-07-16T10:00:00Z'
  },
  {
    id: 2,
    image_url: '/images/gallery_2025_final.jpg',
    title: '2025 CUIF+ 본선 발표 현장',
    display_order: 2,
    created_at: '2026-07-16T10:00:00Z',
    updated_at: '2026-07-16T10:00:00Z'
  },
  {
    id: 3,
    image_url: '/images/gallery_2025_activity.jpg',
    title: '팀 활동 · 현장 실행',
    display_order: 3,
    created_at: '2026-07-16T10:00:00Z',
    updated_at: '2026-07-16T10:00:00Z'
  },
  {
    id: 4,
    image_url: '/images/gallery_2025_dongducheon.jpg',
    title: '동두천시 정책 전달',
    display_order: 4,
    created_at: '2026-07-16T10:00:00Z',
    updated_at: '2026-07-16T10:00:00Z'
  },
  {
    id: 5,
    image_url: '/images/network_7univ.jpg',
    title: '2026 — 경기북부 6개 대학 연합',
    display_order: 5,
    created_at: '2026-07-16T10:00:00Z',
    updated_at: '2026-07-16T10:00:00Z'
  },
  {
    id: 6,
    image_url: '/images/hero_2026.jpg',
    title: '2026 CUIF+',
    display_order: 6,
    created_at: '2026-07-16T10:00:00Z',
    updated_at: '2026-07-16T10:00:00Z'
  }
];

// 갤러리 이미지 관련 함수들
export const galleryService = {
  // 메인 화면용 이미지 가져오기 (정렬 순서대로)
  async getMainImages(limit = 10): Promise<GalleryImage[]> {
    if (!supabase) {
      const images = [...dummyGalleryImages];
      return limit ? images.slice(0, limit) : images;
    }

    try {
      let query = supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: false })
        .order('created_at', { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query
      if (error) throw error
      
      return data as GalleryImage[]
    } catch (error) {
      const images = [...dummyGalleryImages];
      return limit ? images.slice(0, limit) : images;
    }
  },

  // 모든 갤러리 이미지 가져오기
  async getAllImages(): Promise<GalleryImage[]> {
    if (!supabase) {
      return [...dummyGalleryImages];
    }

    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return data as GalleryImage[]
    } catch (error) {
      return [...dummyGalleryImages];
    }
  }
}
