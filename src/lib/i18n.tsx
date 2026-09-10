/**
 * 한국어 / English 전환 — 라이브러리 없이 가장 작게.
 *
 * 왜 react-i18next 를 안 쓰나:
 * 이 프로젝트는 Figma Make 내보내기라 Tailwind 가 사전 컴파일본이고,
 * 의존성을 늘릴수록 빌드가 깨질 자리가 늘어난다. 화면 문구 몇 백 줄에
 * 번역 프레임워크를 얹을 이유가 없다.
 *
 * 쓰는 법 — 컴포넌트에서:
 *   const { t } = useLang();
 *   <h1>{t('참가 신청', 'Apply')}</h1>
 *
 * 한국어 원문이 코드에 그대로 남으므로, 번역을 몰라도 화면을 고칠 수 있다.
 * (키 사전을 따로 두면 «어느 키가 어느 화면인지»를 매번 되짚어야 한다)
 */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Lang = 'ko' | 'en';

/** 언어 선택이 저장되는 자리. apply.ts 가 React 밖에서도 읽는다. */
export const LANG_STORAGE_KEY = 'cuif-lang';
const STORAGE_KEY = LANG_STORAGE_KEY;

/** 저장된 선택 → 브라우저 언어 → 한국어 */
function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ko' || saved === 'en') return saved;
    const nav = (navigator.language || '').toLowerCase();
    if (nav && !nav.startsWith('ko')) return 'en';
  } catch {
    /* localStorage 가 막힌 환경(사파리 프라이빗 등)에서도 죽지 않는다 */
  }
  return 'ko';
}

type LangValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (ko: string, en: string) => string;
};

const LangContext = createContext<LangValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* 무시 */
    }
    // 스크린리더·검색엔진이 읽는 문서 언어도 같이 바꾼다
    document.documentElement.lang = lang;

    // 탭 제목·메타 설명도 따라간다 (공유 링크 미리보기에 그대로 쓰인다)
    document.title =
      lang === 'en'
        ? '2026 CUIF+ — A Policy Idea Festival by Students of Northern Gyeonggi'
        : '2026 CUIF+ — 경기북부 대학생 정책 아이디어 페스티벌';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        lang === 'en'
          ? 'Six universities, three cities, nine missions. Students find a local problem, propose a policy, and run it for real. Finals Nov 5, 2026.'
          : '경기북부 6개 대학 연합 · 3개 도시 9개 과제. 학생이 지역 현안을 직접 발굴해 정책을 제안하고 현장에서 실행합니다. 본선 2026년 11월 5일.',
      );
    }
  }, [lang]);

  const value = useMemo<LangValue>(
    () => ({
      lang,
      setLang,
      t: (ko: string, en: string) => (lang === 'en' ? en : ko),
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

/** Provider 밖에서 불러도 한국어로 조용히 동작한다 (부분 도입 중 사고 방지) */
export function useLang(): LangValue {
  const ctx = useContext(LangContext);
  if (ctx) return ctx;
  return { lang: 'ko', setLang: () => {}, t: (ko: string) => ko };
}
