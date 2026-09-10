import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { NoticeSection } from '../components/NoticeSection';
import { TopicsSection } from '../components/TopicsSection';
import { GuidelinesSection } from '../components/GuidelinesSection';
import { TipsTeaserSection } from '../components/TipsTeaserSection';
import { FAQSection } from '../components/FAQSection';
import { BiggerStageSection } from '../components/BiggerStageSection';
import { ContactSection } from '../components/ContactSection';
import { Lightbulb } from 'lucide-react';
import { APPLY_LABEL_EN, APPLY_LABEL_KO, openApplyForm } from '../lib/apply';
import { useLang } from '../lib/i18n';

export function HomePage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen snap-y snap-mandatory overflow-y-scroll h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="snap-start">
        <HeroSection />
      </section>

      {/* Notice Section - 메인 섹션 바로 아래 배치 */}
      <section className="snap-start">
        <NoticeSection />
      </section>

      {/* About Section */}
      <section className="snap-start">
        <AboutSection />
      </section>

      {/* Topics Section */}
      <section className="snap-start">
        <TopicsSection />
      </section>

      {/* Guidelines Section */}
      <section className="snap-start">
        <GuidelinesSection />
      </section>

      {/* FAQ Section */}
      <section className="snap-start">
        <FAQSection />
      </section>

      {/* Tips Teaser — 2026 신설: 선배(최준혁) 공모전 노하우 아카이브 진입점 */}
      <section className="snap-start">
        <TipsTeaserSection />
      </section>

      {/* Bigger Stage Section — 2026 신설 */}
      <section className="snap-start">
        <BiggerStageSection />
      </section>

      {/* Contact Section */}
      <section className="snap-start">
        <ContactSection />
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12 snap-start">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-8 h-8 text-primary" />
                <h3 className="text-2xl">2026 CUIF+</h3>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                {t(
                  '경기북부 대학생 정책 아이디어 페스티벌. 여러분의 시선이, 곧 경기 북부의 미래입니다. 2026 CUIF+에서 만나요.',
                  'A policy idea festival by students of northern Gyeonggi. How you see this place is what it becomes. See you at 2026 CUIF+.',
                )}
              </p>
            </div>
            
            <div>
              <h4 className="mb-4">{t('바로가기', 'Quick Links')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <button
                    onClick={openApplyForm}
                    style={{
                      color: '#cc785c',
                      fontWeight: 600,
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      font: 'inherit',
                    }}
                  >
                    {t(APPLY_LABEL_KO, APPLY_LABEL_EN)} →
                  </button>
                </li>
                <li><a href="#about" className="hover:text-foreground">{t('대회 소개', 'About')}</a></li>
                <li><a href="/inform" className="hover:text-foreground">{t('공지사항', 'Notices')}</a></li>
                <li><a href="#topics" className="hover:text-foreground">{t('공모 주제', 'Missions')}</a></li>
                <li><a href="#guidelines" className="hover:text-foreground">{t('참가 안내', 'How to Enter')}</a></li>
                <li><a href="/tips" className="hover:text-foreground">{t('공모전 TIP', 'Winner Tips')}</a></li>
                <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">{t('연락처', 'Contact')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>{t('차의과학대학교', 'CHA University')}</li>
                <li>{t('경기도 포천시 해룡로 120', '120 Haeryong-ro, Pocheon, Gyeonggi-do')}</li>
                <li>031-850-8945/9054</li>
                <li>{t('(AI의료홍보미디어전공)', '(Dept. of AI Health & Strategic Communication)')}</li>
                <li>seran14@cha.ac.kr / jiny05@cha.ac.kr</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>
              {t(
                '\u00a9 2026 CUIF+ 경기북부 대학생 정책 아이디어 페스티벌. 차의과학대학교 RISE사업단',
                '\u00a9 2026 CUIF+ Northern Gyeonggi Student Policy Idea Festival. CHA University RISE Initiative',
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
