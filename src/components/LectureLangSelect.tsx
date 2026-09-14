/**
 * 선배 특강 언어 드롭다운 — 한국어 / English / မြန်မာ / Монгол / Tiếng Việt / ไทย / नेपाली
 *
 * 왜 <select> 인가: 라디오·팝오버로 만들면 7개가 화면을 먹고, 모바일에서 손가락에 안 잡힌다.
 * 네이티브 <select> 는 OS 가 알아서 큰 목록 UI 를 띄운다. 스크린리더·키보드도 공짜.
 * (사전 컴파일 Tailwind 라 새 유틸 클래스는 무효 → 색·굵기·간격은 전부 인라인)
 *
 * 글꼴: 태국·미얀마·데바나가리는 Pretendard 에 글리프가 없다. 시스템 폰트로도 읽히지만
 * 기기에 따라 들쭉날쭉해서, 그 언어를 «고른 순간에만» 구글 Noto 를 한 번 덧붙인다.
 * 미리 안 받아 두는 이유 = 한국어만 보는 학생에게 쓸모없는 폰트를 내려받게 하지 않으려고.
 */
import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { Globe } from 'lucide-react';
import { LECTURE_LANGS } from '../content/lectures';
import '../styles/lecture-scripts.css';

const CORAL = '#cc785c';

/** 구글 폰트가 필요한 문자 — 없으면 시스템 폰트로 읽힌다(치명적이지 않음) */
const WEBFONT: Record<string, string> = {
  th: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600&display=swap',
  my: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Myanmar:wght@400;600&display=swap',
  ne: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600&display=swap',
};

export function ensureScriptFont(lang: string) {
  const href = WEBFONT[lang];
  if (!href) return;
  const id = `cuif-font-${lang}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

function boxStyle(onDark: boolean): CSSProperties {
  return {
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundColor: onDark ? 'rgba(255,255,255,0.08)' : '#ffffff',
    color: onDark ? '#ffffff' : '#141413',
    border: `1px solid ${onDark ? 'rgba(255,255,255,0.28)' : 'rgba(204,120,92,0.45)'}`,
    borderRadius: '999px',
    padding: '7px 30px 7px 32px',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.2,
    cursor: 'pointer',
    outline: 'none',
    maxWidth: '190px',
  };
}

export function LectureLangSelect({
  lang,
  onChange,
  onDark = false,
  label,
}: {
  lang: string;
  onChange: (l: string) => void;
  onDark?: boolean;
  label?: string;
}) {
  useEffect(() => {
    ensureScriptFont(lang);
  }, [lang]);

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <Globe
        className="w-4 h-4"
        style={{
          position: 'absolute',
          left: '10px',
          pointerEvents: 'none',
          color: onDark ? 'rgba(255,255,255,0.8)' : CORAL,
        }}
      />
      <select
        className="cuif-lang-select"
        aria-label={label || 'Language / 언어'}
        value={lang}
        onChange={(e) => onChange(e.target.value)}
        style={boxStyle(onDark)}
      >
        {LECTURE_LANGS.map((l) => (
          <option key={l.code} value={l.code} style={{ color: '#141413', backgroundColor: '#ffffff' }}>
            {l.native}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          right: '12px',
          pointerEvents: 'none',
          fontSize: '10px',
          color: onDark ? 'rgba(255,255,255,0.7)' : CORAL,
        }}
      >
        ▼
      </span>
    </div>
  );
}
