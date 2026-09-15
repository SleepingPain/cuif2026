/**
 * 선배 특강 한 편을 그리는 공용 화면.
 * 최준혁(/tips)·오시혜(/tips/osihye) 두 편이 이 컴포넌트 하나를 같이 쓴다.
 *
 * 본문·UI 문구는 전부 src/content/lectures/<slug>/<언어>.json 에서 온다.
 * → 문구를 고칠 때 이 파일을 열 일이 없고, 새 언어를 붙일 때도 JSON 한 장만 더 놓으면 된다.
 *
 * ※ 사전 컴파일 Tailwind(빌드 단계 없음) 프로젝트다. 존재하지 않는 유틸 클래스는 «조용히»
 *   무시되므로, 색·굵기·간격은 인라인 스타일로만 쓴다. (index.css 에 있는 클래스만 유효)
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Lightbulb, Trophy, ExternalLink, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { LectureLangSelect } from './LectureLangSelect';
import {
  LECTURES,
  LECTURE_LANGS,
  LECTURE_LANG_CODES,
  LECTURE_LANG_KEY,
  loadLecture,
} from '../content/lectures';
import type { Block, Lecture } from '../content/lectures';
import '../styles/lecture-scripts.css';

const CREAM = '#faf9f5';
const CARD = '#efe9de';
const DARK = '#181715';
const CORAL = '#cc785c';
const INK = '#141413';
const BODY = '#3d3d3a';

/** 저장된 선택 → 브라우저 언어 → 한국어 */
function detect(): string {
  try {
    const saved = localStorage.getItem(LECTURE_LANG_KEY);
    if (saved && LECTURE_LANG_CODES.includes(saved)) return saved;
    const nav = (navigator.language || '').toLowerCase();
    const hit = LECTURE_LANG_CODES.find((c) => nav.startsWith(c));
    if (hit) return hit;
  } catch {
    /* localStorage 가 막힌 환경에서도 죽지 않는다 */
  }
  return 'ko';
}

/** **굵게** 만 인라인으로 살린다 — 원문(노션)의 강조가 문장 한가운데 박혀 있어서 */
function Inline({ text }: { text: string }) {
  const parts = text.split('**');
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ fontWeight: 600, color: INK }}>
            {p}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden" style={{ backgroundColor: DARK }}>
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((b, i) => {
        if (b.t === 'hr') {
          return (
            <div
              key={i}
              style={{ height: '1px', backgroundColor: 'rgba(20,20,19,0.12)', margin: '28px 0' }}
            />
          );
        }
        if (b.t === 'h3' || b.t === 'h4') {
          return (
            <h3
              key={i}
              style={{
                fontSize: b.t === 'h3' ? '19px' : '17px',
                fontWeight: 600,
                color: INK,
                lineHeight: 1.5,
                margin: b.t === 'h3' ? '26px 0 10px' : '20px 0 8px',
              }}
            >
              <Inline text={b.c} />
            </h3>
          );
        }
        if (b.t === 'quote') {
          return (
            <blockquote
              key={i}
              style={{
                borderLeft: `3px solid ${CORAL}`,
                padding: '4px 0 4px 16px',
                margin: '20px 0',
                fontSize: '17px',
                fontWeight: 600,
                lineHeight: 1.7,
                color: INK,
              }}
            >
              <Inline text={b.c} />
            </blockquote>
          );
        }
        if (b.t === 'q') {
          return (
            <p
              key={i}
              style={{ fontSize: '17px', fontWeight: 600, lineHeight: 1.7, color: CORAL, margin: '16px 0' }}
            >
              <Inline text={b.c} />
            </p>
          );
        }
        if (b.t === 'callout') {
          return (
            <div
              key={i}
              style={{
                backgroundColor: CARD,
                border: '1px solid rgba(20,20,19,0.10)',
                borderRadius: '12px',
                padding: '18px 20px',
                margin: '20px 0',
              }}
            >
              {b.c.map((line, j) => (
                <p key={j} style={{ fontSize: '15px', lineHeight: 1.8, color: BODY, margin: j ? '6px 0 0' : 0 }}>
                  <Inline text={line} />
                </p>
              ))}
            </div>
          );
        }
        if (b.t === 'ul') {
          return (
            <ul key={i} style={{ margin: '14px 0', paddingLeft: 0, listStyle: 'none' }}>
              {b.c.map((li, j) => (
                <li
                  key={j}
                  style={{
                    position: 'relative',
                    paddingLeft: '18px',
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: BODY,
                    marginBottom: '6px',
                  }}
                >
                  <span style={{ position: 'absolute', left: 0, color: CORAL }}>·</span>
                  <Inline text={li} />
                </li>
              ))}
            </ul>
          );
        }
        if (b.t === 'table') {
          return (
            <div key={i} style={{ overflowX: 'auto', margin: '20px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                <thead>
                  <tr>
                    {b.head.map((h, j) => (
                      <th
                        key={j}
                        style={{
                          textAlign: 'left',
                          padding: '10px 12px',
                          backgroundColor: CARD,
                          color: INK,
                          fontWeight: 600,
                          borderBottom: '1px solid rgba(20,20,19,0.14)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <Inline text={h} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((r, j) => (
                    <tr key={j}>
                      {r.map((cell, k) => (
                        <td
                          key={k}
                          style={{
                            padding: '10px 12px',
                            color: BODY,
                            lineHeight: 1.7,
                            borderBottom: '1px solid rgba(20,20,19,0.08)',
                          }}
                        >
                          <Inline text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <p key={i} style={{ fontSize: '16px', lineHeight: 1.85, color: BODY, margin: '12px 0' }}>
            <Inline text={b.c} />
          </p>
        );
      })}
    </div>
  );
}

export function LectureView({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const [lang, setLang] = useState<string>(detect);
  const [data, setData] = useState<Lecture | null>(null);

  useEffect(() => {
    let alive = true;
    loadLecture(slug, lang).then((d) => {
      if (alive) setData(d);
    });
    return () => {
      alive = false;
    };
  }, [slug, lang]);

  useEffect(() => {
    try {
      localStorage.setItem(LECTURE_LANG_KEY, lang);
    } catch {
      /* 무시 */
    }
  }, [lang]);

  // #tip-03 처럼 앵커를 달고 들어온 주소가 실제로 그 자리에서 열리게 한다.
  // 본문이 비동기로 들어오므로, 데이터가 붙은 «뒤에» 한 번 더 스크롤해야 맞는다.
  useEffect(() => {
    if (!data) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) window.requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
  }, [data]);

  const other = useMemo(() => LECTURES.find((l) => l.slug !== slug), [slug]);
  const langMeta = LECTURE_LANGS.find((l) => l.code === lang);
  const isKo = lang === 'ko';

  if (!data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: CREAM, color: BODY }}
      >
        <p style={{ fontSize: '15px' }}>Loading…</p>
      </div>
    );
  }

  const ui = data.ui;

  return (
    <div className="min-h-screen" data-lecture-lang={lang} style={{ backgroundColor: CREAM }}>
      {/* 상단 바 — 홈으로 · 제목 · 언어 드롭다운 */}
      <header className="border-b" style={{ backgroundColor: CREAM, position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between" style={{ minHeight: '64px', gap: '12px', flexWrap: 'wrap', paddingTop: '8px', paddingBottom: '8px' }}>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {ui.home}
              </Button>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-primary" />
                <span className="text-lg" style={{ fontWeight: 600 }}>
                  {data.navTitle}
                </span>
              </div>
            </div>
            <LectureLangSelect lang={lang} onChange={setLang} label={ui.langLabel} />
          </div>
        </div>
      </header>

      {/* Hero — 다크 밴드 */}
      <section style={{ backgroundColor: DARK }} className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p
              style={{
                color: CORAL,
                fontSize: '12px',
                letterSpacing: '0.18em',
                fontWeight: 600,
                marginBottom: '18px',
              }}
            >
              {ui.kicker}
            </p>
            <h1 className="text-4xl md:text-5xl text-white mb-6" style={{ lineHeight: 1.3 }}>
              {data.hero.title}
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.8 }}>
              {data.hero.sub.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < data.hero.sub.length - 1 && <br />}
                </span>
              ))}
            </p>

            {/* 화자 카드 */}
            <div
              className="mt-12"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'left',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5" style={{ color: CORAL }} />
                <span className="text-white" style={{ fontWeight: 600 }}>
                  {data.speaker.name} · {data.speaker.meta}
                </span>
              </div>
              <div className="flex" style={{ flexWrap: 'wrap', gap: '8px' }}>
                {data.speaker.badges.map((a) => (
                  <span
                    key={a}
                    style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.85)',
                      backgroundColor: 'rgba(204,120,92,0.22)',
                      border: '1px solid rgba(204,120,92,0.45)',
                      borderRadius: '999px',
                      padding: '5px 12px',
                    }}
                  >
                    {a}
                  </span>
                ))}
              </div>
              <p className="mt-8" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.85, fontSize: '15px' }}>
                {data.speaker.intro}
              </p>
              {data.contact && (
                <a
                  href={`mailto:${data.contact.value}`}
                  className="inline-flex items-center gap-2 mt-6"
                  style={{ color: CORAL, fontSize: '14px', fontWeight: 600 }}
                >
                  <Mail className="w-4 h-4" />
                  {data.contact.label} · {data.contact.value}
                </a>
              )}
            </div>

            {/* 번역 안내 — 한국어일 때는 띄우지 않는다 */}
            {!isKo && (
              <p
                className="mt-6"
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '13px',
                  lineHeight: 1.8,
                  textAlign: 'left',
                }}
              >
                {ui.mtNotice}
                <br />
                {ui.videoNote}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 이용 안내 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl mb-8" style={{ color: INK, fontWeight: 600 }}>
              {ui.guideTitle}
            </h2>
            <div style={{ backgroundColor: CARD, borderRadius: '12px', padding: '24px' }}>
              {data.guide.map((g, i) => (
                <div
                  key={i}
                  style={{ padding: '12px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(20,20,19,0.10)' }}
                >
                  <p style={{ color: CORAL, fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                    {g.when}
                  </p>
                  <p style={{ color: BODY, fontSize: '15px', lineHeight: 1.7 }}>{g.go}</p>
                </div>
              ))}
            </div>

            <blockquote
              style={{
                borderLeft: `3px solid ${CORAL}`,
                padding: '4px 0 4px 16px',
                margin: '28px 0 0',
                fontSize: '16px',
                lineHeight: 1.85,
                color: INK,
              }}
            >
              <strong>{data.guideQuote.title}</strong>
              <br />
              {data.guideQuote.body}
            </blockquote>
          </div>
        </div>
      </section>

      {/* 챕터 본문 */}
      {data.chapters.map((ch, idx) => (
        <section
          key={ch.no}
          id={`tip-${ch.no}`}
          className="py-20"
          style={{ backgroundColor: idx % 2 === 0 ? CARD : CREAM, scrollMarginTop: '74px' }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p style={{ color: CORAL, fontSize: '32px', fontWeight: 600, lineHeight: 1 }}>{ch.no}</p>
              <h2 className="text-2xl mt-2" style={{ color: INK, fontWeight: 600, lineHeight: 1.4 }}>
                {ch.title}
              </h2>
              <p className="mb-8" style={{ color: BODY, fontSize: '15px', marginTop: '8px' }}>
                {ch.lead}
              </p>

              <Blocks blocks={ch.blocks} />

              {ch.video && (
                <div className="mt-12">
                  <YouTube id={ch.video} title={`${ch.no}. ${ch.title}`} />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* 부록 영상 묶음 (최준혁 편의 05) */}
      {data.finalSection && (
        <section
          id={`tip-${data.finalSection.no}`}
          className="py-20"
          style={{ backgroundColor: CARD, scrollMarginTop: '74px' }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p style={{ color: CORAL, fontSize: '32px', fontWeight: 600, lineHeight: 1 }}>
                {data.finalSection.no}
              </p>
              <h2 className="text-2xl mt-2" style={{ color: INK, fontWeight: 600, lineHeight: 1.4 }}>
                {data.finalSection.title}
              </h2>
              <p className="mb-8" style={{ color: BODY, fontSize: '15px', marginTop: '8px' }}>
                {data.finalSection.lead}
              </p>
              <div className="space-y-8">
                {data.finalSection.videos.map((v) => (
                  <div key={v.id} className="space-y-3">
                    <p style={{ color: INK, fontSize: '16px', fontWeight: 600 }}>{v.label}</p>
                    <YouTube id={v.id} title={v.label} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 마무리 + 다른 특강 + 원본 */}
      <section className="py-20" style={{ backgroundColor: DARK }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <blockquote
              style={{
                borderLeft: `3px solid ${CORAL}`,
                padding: '4px 0 4px 18px',
                fontSize: '20px',
                fontWeight: 600,
                lineHeight: 1.7,
                color: '#ffffff',
              }}
            >
              {data.closing.quote}
            </blockquote>
            {data.closing.paras.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? 'mt-8' : 'mt-4'}
                style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', lineHeight: 1.9 }}
              >
                {p.split('**').map((seg, j) =>
                  j % 2 === 1 ? (
                    <span key={j} style={{ color: '#ffffff', fontWeight: 600 }}>
                      {seg}
                    </span>
                  ) : (
                    <span key={j}>{seg}</span>
                  ),
                )}
              </p>
            ))}
            <p className="mt-8 text-lg" style={{ color: '#ffffff', fontWeight: 600 }}>
              {data.closing.sign}
            </p>

            {/* 다른 선배 특강으로 */}
            {other && (
              <a
                href={other.path}
                className="flex items-center justify-between mt-16"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  borderRadius: '12px',
                  padding: '20px 22px',
                  gap: '16px',
                  textDecoration: 'none',
                }}
              >
                <span>
                  <span
                    style={{
                      display: 'block',
                      color: CORAL,
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                    }}
                  >
                    {ui.otherTitle}
                  </span>
                  <span style={{ display: 'block', color: '#ffffff', fontSize: '17px', fontWeight: 600, marginTop: '6px' }}>
                    {isKo ? other.ko.title : other.en.title}
                  </span>
                  <span style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginTop: '4px' }}>
                    {isKo ? `${other.ko.name} · ${other.ko.meta}` : `${other.en.name} · ${other.en.meta}`}
                  </span>
                </span>
                <span style={{ color: CORAL, fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {ui.otherCta} <ArrowRight className="w-4 h-4" style={{ display: 'inline' }} />
                </span>
              </a>
            )}

            <div className="mt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.16)', paddingTop: '24px' }}>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.8 }}>
                {data.closing.note}
              </p>
              <a
                href={data.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4"
                style={{ color: CORAL, fontSize: '15px', fontWeight: 600 }}
              >
                {ui.sourceOpen}
                <ExternalLink className="w-4 h-4" />
              </a>
              {!isKo && langMeta && (
                <p className="mt-6" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
                  {langMeta.english} — machine translation. Korean is the original.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
