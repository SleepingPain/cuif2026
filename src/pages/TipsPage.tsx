/**
 * (대)상 받는 공모전 TIP — 최준혁 선배 특강  (/tips)
 *
 * 원본: 최준혁(차의과학대학교 의료홍보미디어학과 21학번, 2022 CUIF 대상 /
 *       2025 CUIF+ 대상·경기도의회 의장상)이 공개한 Notion 아카이브.
 *       https://protective-ankle-0ad.notion.site/TIP-3cdb31cd05778005a7b4d9d1d70c9c82
 * ※ 원본 색인 페이지에 있던 최준혁 개인 휴대전화 번호는 공개 사이트 게재에 부적절하여 옮기지 않았다.
 *
 * 2026.9.15 — 본문·UI 문구를 src/content/lectures/choijunhyeok/<언어>.json 으로 옮기고
 * 화면은 LectureView 공용 컴포넌트가 그린다. 주소(/tips)와 섹션 앵커(#tip-00 … #tip-05)는
 * 그대로다 — 공지·카카오톡으로 이미 돌린 링크가 살아 있어야 해서.
 */
import { LectureView } from '../components/LectureView';

export function TipsPage() {
  return <LectureView slug="choijunhyeok" />;
}
