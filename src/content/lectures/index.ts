/**
 * 선배 특강 아카이브 — 콘텐츠 레지스트리 + 언어별 지연 로딩
 *
 * ── 왜 JSON 인가
 * 본문이 한 편에 1만 자가 넘고, 그것이 7개 언어로 존재한다. 컴포넌트 안에 문자열로
 * 들고 있으면 (가) 파일이 사람이 못 읽을 크기가 되고 (나) 번역본과 구조가 어긋나도
 * 아무도 모른다. 그래서 «구조는 ko.json 이 정본, 나머지 언어는 같은 구조의 번역본»
 * 으로 두고, 구조 일치는 scripts/특강_번역구조_점검.py 가 기계로 검사한다.
 *
 * ── 왜 지연 로딩인가
 * 7개 언어 × 2편을 전부 번들에 넣으면 한국어만 보는 학생도 전부 내려받는다.
 * import.meta.glob 으로 언어 파일 하나씩 별도 청크가 되게 하고, 고른 언어만 가져온다.
 * 한국어는 폴백이라 항상 먼저 받아 두고, 번역본이 비어 있는 자리는 한국어가 메운다.
 */

export type Block =
  | { t: 'p'; c: string }
  | { t: 'h3'; c: string }
  | { t: 'h4'; c: string }
  | { t: 'quote'; c: string }
  | { t: 'q'; c: string }
  | { t: 'ul'; c: string[] }
  | { t: 'callout'; c: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'hr' };

export type Chapter = {
  no: string;
  title: string;
  lead: string;
  video?: string;
  blocks: Block[];
};

export type Lecture = {
  lang: string;
  slug: string;
  navTitle: string;
  ui: Record<string, string>;
  hero: { title: string; sub: string[] };
  speaker: { name: string; meta: string; badges: string[]; intro: string };
  contact?: { label: string; value: string };
  guide: Array<{ when: string; go: string }>;
  guideQuote: { title: string; body: string };
  chapters: Chapter[];
  finalSection?: {
    no: string;
    title: string;
    lead: string;
    videos: Array<{ label: string; id: string }>;
  };
  closing: { quote: string; paras: string[]; sign: string; note: string };
  sourceUrl: string;
};

/** 화면에 뜨는 순서 = 교수 지시 순서(영어·미얀마어·몽골어·베트남어·태국어·네팔어) */
export const LECTURE_LANGS = [
  { code: 'ko', native: '한국어', english: 'Korean' },
  { code: 'en', native: 'English', english: 'English' },
  { code: 'my', native: 'မြန်မာဘာသာ', english: 'Burmese' },
  { code: 'mn', native: 'Монгол хэл', english: 'Mongolian' },
  { code: 'vi', native: 'Tiếng Việt', english: 'Vietnamese' },
  { code: 'th', native: 'ไทย', english: 'Thai' },
  { code: 'ne', native: 'नेपाली', english: 'Nepali' },
] as const;

export type LectureLang = (typeof LECTURE_LANGS)[number]['code'];

export const LECTURE_LANG_CODES = LECTURE_LANGS.map((l) => l.code) as readonly string[];

/** 언어 선택이 저장되는 자리 (사이트 전체 KO/EN 스위치와 별개로 둔다) */
export const LECTURE_LANG_KEY = 'cuif-lecture-lang';

/** 아카이브 목차 — 페이지 상단 「다른 선배 특강」과 홈 진입 섹션이 같이 쓴다. */
export const LECTURES = [
  {
    slug: 'choijunhyeok',
    path: '/tips',
    ko: { name: '최준혁', title: '(대)상 받는 공모전 TIP', meta: '의료홍보미디어학과 21학번' },
    en: { name: 'Choi Junhyeok', title: 'How to Win: the Grand Prize Playbook', meta: "Class of '21" },
  },
  {
    slug: 'osihye',
    path: '/tips/osihye',
    ko: { name: '오시혜', title: '2026 CUIF 선배 특강', meta: '차의과학대학교 21학번' },
    en: { name: 'Oh Sihye', title: '2026 CUIF Alumni Lecture', meta: "CHA University, class of '21" },
  },
] as const;

const FILES = import.meta.glob('./*/*.json');

/**
 * 한 편의 특강을 한 언어로 가져온다.
 * 번역 파일이 없으면(=아직 안 만들었거나 배포 누락) 조용히 한국어로 떨어진다.
 */
export async function loadLecture(slug: string, lang: string): Promise<Lecture> {
  const ko = (await FILES[`./${slug}/ko.json`]()) as { default: Lecture };
  if (lang === 'ko') return ko.default;
  const loader = FILES[`./${slug}/${lang}.json`];
  if (!loader) return ko.default;
  try {
    const mod = (await loader()) as { default: Lecture };
    return mod.default;
  } catch {
    return ko.default;
  }
}
