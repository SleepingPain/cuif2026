import '../styles/apply-cta.css';

/**
 * 참가 신청 창구 — 사이트 전체가 여기 한 줄을 본다.
 *
 * 폼은 김정환 교수 구글 계정 소유이고, 제출이 들어올 때마다
 * Apps Script 가 교수·조교 3인에게 알림 메일을 보낸다.
 * (스크립트 원본 = lecture-materials repo `scripts/CUIF2026_참가신청폼_알림_AppsScript.gs`)
 *
 * 접수를 닫을 때는 APPLY_FORM_URL 을 빈 문자열로 두면 된다.
 * 그러면 버튼이 자동으로 「참가 신청 안내」(공지사항)로 되돌아가고,
 * 코랄 맥박 애니메이션도 같이 꺼진다.
 */
export const APPLY_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdYhj4RsxKLG_EuYTn5pLSCI4GcsYhYFrXVGqCBlaLdeosmxw/viewform';

/** 신청 폼이 열려 있는가 */
export const IS_APPLY_OPEN = APPLY_FORM_URL !== '';

/** 버튼 문구 — 언어별. 화면에서는 t(APPLY_LABEL_KO, APPLY_LABEL_EN) 으로 쓴다 */
export const APPLY_LABEL_KO = IS_APPLY_OPEN ? '참가 신청하기' : '참가 신청 안내';
export const APPLY_LABEL_EN = IS_APPLY_OPEN ? 'Apply Now' : 'How to Apply';

/** 접수 중일 때만 CTA에 코랄 맥박을 준다 (크림·흰 배경용) */
export const APPLY_CTA_CLASS = IS_APPLY_OPEN ? 'cuif-apply-cta' : '';

/** 다크 배경(히어로) 위에서 쓰는 강조 클래스 */
export const APPLY_CTA_CLASS_DARK = IS_APPLY_OPEN
  ? 'cuif-apply-cta cuif-apply-cta--on-dark'
  : '';

/** 신청 폼 열기 — 폼이 아직 없으면 공지사항으로 보낸다 */
export function openApplyForm() {
  if (IS_APPLY_OPEN) {
    window.open(APPLY_FORM_URL, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = '/inform';
  }
}
