/**
 * 2026 CUIF+ 미니해커톤 (9/18) — 사이트 노출을 이 파일 하나로 켜고 끈다.
 *
 * ★ 본선 접수(apply.ts)와 «다른 창구»다. 섞지 말 것.
 *   - apply.ts        = 2026 CUIF+ 본선 참가 신청(6개 대학 연합 · 예선 제안서 10/22)
 *   - miniHackathon.ts = 차의과학대 교내 미니해커톤 1일 행사(9/18) 참가 신청
 *   폼도 소유자도 다르다. APPLY_FORM_URL 을 이 주소로 바꾸면 본선 접수가 끊긴다.
 *
 * ★ 사이트에 이미 있는 「6개 대학 연합 해커톤」(11/13~14, 상위 3팀 한정)과도 다른 행사다.
 *   이쪽은 차의과학대 재학생이면 누구나, 예선 전에 아이디어를 만들어 보는 하루짜리 자리다.
 *
 * 출처(2026.9.14 확인)
 *   - 접수 폼 = https://forms.gle/LLw3itcFGpmo2TXV8
 *     → https://docs.google.com/forms/d/e/1FAIpQLSep5FBaXaChMSRih7yovpyIHq292h6F1zZxPD2gO_eR58TQSw/viewform
 *     (조교 배포 포스터의 QR 을 디코딩해 끝까지 따라가 확인 — 같은 주소, /viewform 정상)
 *   - 일시·장소·대상 = 위 폼의 안내문이 정본. 포스터에 없던 시간(13:00~19:00)이 폼에 있다.
 *   - 모집 기간·문의 = 조교 공지(9/14)
 *
 * 내리는 법 — 아래 MINI_HACKATHON_ENABLED 를 false 로 두면 히어로 띠·섹션이 함께 사라진다.
 * 손대지 않아도 행사가 끝나면(9/18 저녁) 자동으로 사라진다.
 */

/** 노출 스위치. false 면 사이트 어디에도 안 나온다. */
export const MINI_HACKATHON_ENABLED = true;

/** 접수 폼(구글폼 공식 단축 주소). 비우면 신청 버튼이 «문의 안내»로 바뀐다. */
export const MINI_HACKATHON_FORM_URL = 'https://forms.gle/LLw3itcFGpmo2TXV8';

/** 조교 배포 포스터(카카오톡 공지본). */
export const MINI_HACKATHON_POSTER = '/images/minihackathon_2026.png';

/** 문의처 — 실습조교 */
export const MINI_HACKATHON_CONTACT_KO = '정은채 실습조교 031-850-9054';
export const MINI_HACKATHON_CONTACT_EN = 'Eunchae Jung, TA · 031-850-9054';

/** 접수 마감 = 2026. 9. 15.(화) 23:59 KST */
const 접수마감 = Date.UTC(2026, 8, 15, 14, 59, 59);

/** 행사 종료 = 2026. 9. 18.(금) 19:00 KST (+30분 여유를 두고 내린다) */
const 행사종료 = Date.UTC(2026, 8, 18, 10, 30, 0);

/** 접수 마감일(자정 기준) — D-day 계산용 */
const 마감일자정 = Date.UTC(2026, 8, 15, 0, 0, 0);

/** 지금 화면에 걸어 둘 때인가 (행사가 끝나면 저절로 false) */
export function isMiniHackathonVisible(): boolean {
  return MINI_HACKATHON_ENABLED && Date.now() <= 행사종료;
}

/** 아직 신청을 받고 있는가 */
export function isMiniHackathonOpen(): boolean {
  return (
    MINI_HACKATHON_ENABLED && MINI_HACKATHON_FORM_URL !== '' && Date.now() <= 접수마감
  );
}

/** 한국 시간 기준 «그 날»의 0시 (D-day 를 시차 때문에 하루 틀리지 않게) */
function 한국날짜(ts: number): number {
  const d = new Date(ts + 9 * 60 * 60 * 1000);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

/** 접수 마감까지 남은 날 수. 0 이면 마감 당일, 음수면 이미 지났다. */
export function daysLeftToApply(): number {
  return Math.round((한국날짜(마감일자정) - 한국날짜(Date.now())) / 86400000);
}

/** 「D-2」·「D-DAY」 — 마감이 지났으면 빈 문자열 */
export function applyDdayLabel(): string {
  const 남은 = daysLeftToApply();
  if (남은 < 0) return '';
  return 남은 === 0 ? 'D-DAY' : `D-${남은}`;
}

/** 접수 폼 열기 — 닫혔으면 아무 일도 하지 않는다(버튼 자체가 안 나온다) */
export function openMiniHackathonForm() {
  if (!isMiniHackathonOpen()) return;
  window.open(MINI_HACKATHON_FORM_URL, '_blank', 'noopener,noreferrer');
}
