/**
 * 한국어 / English 전환 스위치.
 * 사전 컴파일 Tailwind 라 새 유틸 클래스가 안 먹는다 → 전부 인라인 스타일.
 */
import type { CSSProperties } from 'react';
import { useLang } from '../lib/i18n';
import type { Lang } from '../lib/i18n';

const CORAL = '#cc785c';

const WRAP: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  border: '1px solid rgba(204,120,92,0.45)',
  borderRadius: '999px',
  overflow: 'hidden',
  lineHeight: 1,
};

function itemStyle(active: boolean, onDark: boolean): CSSProperties {
  return {
    padding: '5px 10px',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.04em',
    cursor: 'pointer',
    border: 'none',
    background: active ? CORAL : 'transparent',
    color: active ? '#ffffff' : onDark ? 'rgba(255,255,255,0.75)' : '#3d3d3a',
    transition: 'background 0.15s ease, color 0.15s ease',
  };
}

export function LangToggle({ onDark = false }: { onDark?: boolean }) {
  const { lang, setLang } = useLang();

  const choices: Array<{ key: Lang; label: string; aria: string }> = [
    { key: 'ko', label: 'KO', aria: '한국어로 보기' },
    { key: 'en', label: 'EN', aria: 'View in English' },
  ];

  return (
    <div style={WRAP} role="group" aria-label="Language / 언어">
      {choices.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={() => setLang(c.key)}
          aria-label={c.aria}
          aria-pressed={lang === c.key}
          style={itemStyle(lang === c.key, onDark)}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
