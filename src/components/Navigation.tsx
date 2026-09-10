import { Button } from './ui/button';
import { Menu, X, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import type { CSSProperties } from 'react';
import { APPLY_CTA_CLASS, APPLY_LABEL_EN, APPLY_LABEL_KO, openApplyForm } from '../lib/apply';
import { useLang } from '../lib/i18n';
import { LangToggle } from './LangToggle';

// 사전 컴파일 Tailwind CSS 프로젝트 → 신규 스타일은 인라인으로
// 「공모전 TIP」 오른쪽 위에 붙는 NEW 배지 (2026.9 신설 페이지 안내)
const NEW_BADGE: CSSProperties = {
  display: 'inline-block',
  verticalAlign: 'super',
  marginLeft: '4px',
  backgroundColor: '#cc785c',
  color: '#ffffff',
  fontSize: '9px',
  fontWeight: 700,
  letterSpacing: '0.06em',
  lineHeight: 1,
  padding: '3px 5px',
  borderRadius: '4px',
  pointerEvents: 'none',
};

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLang();

  const links = [
    { href: '#about', label: t('대회 소개', 'About') },
    { href: '/inform', label: t('공지사항', 'Notices') },
    { href: '#topics', label: t('공모 주제', 'Missions') },
    { href: '#guidelines', label: t('참가 안내', 'How to Enter') },
    { href: '#faq', label: t('FAQ', 'FAQ') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Lightbulb className="w-8 h-8 text-primary" />
            <span className="text-xl">2026 CUIF+</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
            <a href="/tips" className="hover:text-primary transition-colors">
              {t('공모전 TIP', 'Winner Tips')}
              <span style={NEW_BADGE}>NEW</span>
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              {t('문의', 'Contact')}
            </a>
            <LangToggle />
            <Button className={APPLY_CTA_CLASS} onClick={openApplyForm}>
              {t(APPLY_LABEL_KO, APPLY_LABEL_EN)}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LangToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('메뉴 열기', 'Open menu')}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/tips"
                className="w-fit hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('공모전 TIP', 'Winner Tips')}
                <span style={NEW_BADGE}>NEW</span>
              </a>
              <a
                href="#contact"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('문의', 'Contact')}
              </a>
              <Button
                className={`w-full ${APPLY_CTA_CLASS}`}
                onClick={() => {
                  openApplyForm();
                  setIsMenuOpen(false);
                }}
              >
                {t(APPLY_LABEL_KO, APPLY_LABEL_EN)}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
