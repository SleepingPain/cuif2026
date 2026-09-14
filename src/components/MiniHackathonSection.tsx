import type { CSSProperties } from 'react';
import { Button } from './ui/button';
import { CalendarClock, MapPin, Users, Clock, Phone, Send, Utensils } from 'lucide-react';
import { useLang } from '../lib/i18n';
import '../styles/apply-cta.css';
import {
  MINI_HACKATHON_CONTACT_EN,
  MINI_HACKATHON_CONTACT_KO,
  MINI_HACKATHON_POSTER,
  applyDdayLabel,
  isMiniHackathonOpen,
  isMiniHackathonVisible,
  openMiniHackathonForm,
} from '../lib/miniHackathon';

// 사전 컴파일 Tailwind CSS 프로젝트 → 신규 색·굵기·간격은 전부 인라인 스타일로
const CANVAS = '#faf9f5';
const CARD = '#efe9de';
const CORAL = '#cc785c';
const INK = '#141413';
const BODY = '#3d3d3a';

const 칩: CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'rgba(204,120,92,0.10)',
  border: '1px solid rgba(204,120,92,0.35)',
  color: CORAL,
  fontSize: '14px',
  fontWeight: 600,
  borderRadius: '999px',
  padding: '7px 14px',
  marginRight: '8px',
  marginBottom: '8px',
};

/**
 * 2026 CUIF+ 미니해커톤 (9/18) — 조교 공지(9/14) 사이트 반영.
 *
 * 내용의 정본은 접수 폼 안내문이다. 포스터에 없던 시간(13:00~19:00)이 폼에 있어 여기에 적는다.
 * 켜고 끄는 스위치·날짜 판정은 전부 `src/lib/miniHackathon.ts` 한 곳에 있다.
 */
export function MiniHackathonSection() {
  const { t } = useLang();

  if (!isMiniHackathonVisible()) return null;

  const 접수중 = isMiniHackathonOpen();
  const dday = applyDdayLabel();
  // 「Sign-up」 처럼 영문 라벨이 길어 두 줄로 접히는 것을 막는다
  const 라벨폭 = t('52px', '78px');

  const 사실 = [
    {
      icon: CalendarClock,
      label: t('일시', 'When'),
      value: t(
        '2026. 9. 18.(금) 13:00 ~ 19:00 (총 6시간)',
        'Fri, Sep 18, 2026 · 1:00 – 7:00 p.m. (6 hours)',
      ),
    },
    {
      icon: MapPin,
      label: t('장소', 'Where'),
      value: t('차의과학대학교 미래관 603호', 'CHA University, Mirae Hall 603'),
    },
    {
      icon: Users,
      label: t('대상', 'Who'),
      value: t(
        '차의과학대학교 재학생 — CUIF+ 참가 팀·개인은 물론, CUIF+에 참가하지 않는 학생도 신청할 수 있습니다',
        'CHA University students — CUIF+ teams and individuals, and anyone not entered in CUIF+ as well',
      ),
    },
    {
      icon: Clock,
      label: t('모집', 'Sign-up'),
      value: t('2026. 9. 15.(화)까지', 'Until Tue, Sep 15, 2026'),
    },
    {
      icon: Phone,
      label: t('문의', 'Contact'),
      value: t(MINI_HACKATHON_CONTACT_KO, MINI_HACKATHON_CONTACT_EN),
    },
  ];

  return (
    <section
      id="minihackathon"
      className="py-20"
      style={{ backgroundColor: CARD, scrollMarginTop: '64px' }}
    >
      <div className="container mx-auto px-4">
        <div
          className="mx-auto"
          style={{
            maxWidth: '1040px',
            backgroundColor: CANVAS,
            border: '1px solid rgba(204,120,92,0.38)',
            borderRadius: '20px',
            padding: 'clamp(24px, 4vw, 44px)',
          }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* 왼쪽 — 내용 */}
            <div>
              <p
                className="uppercase"
                style={{
                  color: CORAL,
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  marginBottom: '10px',
                }}
              >
                2026 · Idea &amp; Planning Workshop
              </p>

              <div style={{ marginBottom: '14px' }}>
                {접수중 && dday !== '' && (
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: CORAL,
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      borderRadius: '999px',
                      padding: '5px 12px',
                      marginRight: '8px',
                    }}
                  >
                    {t(`신청 마감 ${dday}`, `Sign-up closes ${dday}`)}
                  </span>
                )}
                <span style={{ color: BODY, fontSize: '14px' }}>
                  {t('차의과학대 교내 1일 행사', 'A one-day event on the CHA campus')}
                </span>
              </div>

              <h2
                className="text-4xl md:text-5xl"
                style={{ color: INK, marginBottom: '8px', lineHeight: 1.18 }}
              >
                {t('CUIF+ 미니해커톤', 'CUIF+ Mini Hackathon')}
              </h2>
              <p
                style={{
                  color: CORAL,
                  fontSize: '22px',
                  fontWeight: 600,
                  marginBottom: '16px',
                  lineHeight: 1.4,
                }}
              >
                {t('혼자 와도, 팀이 됩니다.', 'Come alone. Leave with a team.')}
              </p>

              <p style={{ color: BODY, fontSize: '16px', lineHeight: 1.8, marginBottom: '18px' }}>
                {t(
                  '여러분의 신선한 아이디어에 「+」를 더해 줄 자리입니다. 하루 여섯 시간 동안 아이디어를 발굴하고, 그 자리에서 피칭까지 해 봅니다. 개인으로 신청하면 현장에서 팀을 꾸립니다.',
                  'Six hours to find an idea and pitch it on the spot. Sign up alone and you will be put into a team on the day.',
                )}
              </p>

              <div style={{ marginBottom: '22px' }}>
                <span style={칩}>{t('팀이 없어도 OK', 'No team? OK')}</span>
                <span style={칩}>{t('기획을 몰라도 OK', 'No planning experience? OK')}</span>
                <span style={{ ...칩, backgroundColor: CORAL, color: '#ffffff', borderColor: CORAL }}>
                  <Utensils className="w-4 h-4" style={{ display: 'inline', marginRight: '6px', verticalAlign: '-3px' }} />
                  {t('간식 · 저녁 식사 제공', 'Snacks and dinner provided')}
                </span>
              </div>

              <dl
                style={{
                  borderTop: '1px solid rgba(20,20,19,0.10)',
                  paddingTop: '16px',
                  marginBottom: '22px',
                }}
              >
                {사실.map((f) => (
                  <div key={f.label} className="flex items-start gap-3" style={{ marginBottom: '10px' }}>
                    <f.icon className="w-5 h-5" style={{ color: CORAL, flexShrink: 0, marginTop: '3px' }} />
                    <dt
                      style={{
                        color: INK,
                        fontSize: '15px',
                        fontWeight: 600,
                        width: 라벨폭,
                        flexShrink: 0,
                      }}
                    >
                      {f.label}
                    </dt>
                    <dd style={{ color: BODY, fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {접수중 ? (
                <>
                  <Button
                    size="lg"
                    className="cuif-apply-cta"
                    style={{ backgroundColor: CORAL, color: '#ffffff' }}
                    onClick={openMiniHackathonForm}
                  >
                    <Send className="w-5 h-5" />
                    {t('미니해커톤 신청하기', 'Sign up for the mini hackathon')}
                  </Button>
                  <p style={{ color: BODY, fontSize: '13px', marginTop: '12px', lineHeight: 1.7 }}>
                    {t(
                      '신청서에 「팀 참가 / 개인 참가」와 희망 역할을 적어 주세요. 저녁 메뉴와 알레르기 등 제약사항도 함께 받습니다.',
                      'Tell us whether you are applying as a team or on your own, and which role you want. The form also asks about dinner and any dietary restrictions.',
                    )}
                  </p>
                </>
              ) : (
                <p style={{ color: INK, fontSize: '15px', fontWeight: 600, lineHeight: 1.7 }}>
                  {t(
                    `신청 접수가 마감되었습니다. 문의 ${MINI_HACKATHON_CONTACT_KO}`,
                    `Sign-ups are closed. Contact ${MINI_HACKATHON_CONTACT_EN}`,
                  )}
                </p>
              )}
            </div>

            {/* 오른쪽 — 조교 배포 포스터 */}
            <div className="text-center">
              <img
                src={MINI_HACKATHON_POSTER}
                alt={t(
                  '2026 CUIF+ 미니해커톤 모집 포스터 — 9월 18일 금요일, 미래관 603호',
                  'Poster for the 2026 CUIF+ mini hackathon — Friday, September 18, Mirae Hall 603',
                )}
                className="w-full"
                style={{
                  maxWidth: '360px',
                  margin: '0 auto',
                  borderRadius: '14px',
                  border: '1px solid rgba(20,20,19,0.10)',
                }}
              />
            </div>
          </div>

          {/* 다른 일정과 헷갈리지 않게 — 사이트에는 11월 연합 해커톤이 따로 있다 */}
          <p
            style={{
              color: BODY,
              fontSize: '13px',
              lineHeight: 1.8,
              borderTop: '1px solid rgba(20,20,19,0.10)',
              paddingTop: '16px',
              marginTop: '20px',
            }}
          >
            {t(
              '※ 11월 본선(11/5)·6개 대학 연합 해커톤(11/13~14)과는 별개의 행사입니다. 이 미니해커톤은 차의과학대학교에서 열리는 교내 1일 행사이고, 신청 창구도 따로입니다. 본선 참가 신청은 화면 위의 「참가 신청하기」 버튼에서 받습니다.',
              '* This is not the Nov 5 finals or the six-university hackathon on Nov 13–14. The mini hackathon is a one-day event on the CHA campus with its own sign-up form. To enter CUIF+ itself, use the Apply button at the top of the page.',
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
