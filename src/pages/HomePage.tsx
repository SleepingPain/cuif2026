import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { NoticeSection } from '../components/NoticeSection';
import { TopicsSection } from '../components/TopicsSection';
import { GuidelinesSection } from '../components/GuidelinesSection';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';
import { Lightbulb } from 'lucide-react';

export function HomePage() {
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
                <h3 className="text-2xl">CUIF+ 2025</h3>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                학생들의 창의적이고 혁신적인 아이디어를 발굴하고 실현하여 지역사회 발전에 기여합니다.
              </p>
            </div>
            
            <div>
              <h4 className="mb-4">바로가기</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground">대회 소개</a></li>
                <li><a href="/inform" className="hover:text-foreground">공지사항</a></li>
                <li><a href="#topics" className="hover:text-foreground">공모 주제</a></li>
                <li><a href="#guidelines" className="hover:text-foreground">참가 안내</a></li>
                <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">연락처</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>차의과학대학교</li>
                <li>경기도 포천시 해룡로 120</li>
                <li>031-850-8945/9054</li>
                <li>(의료홍보미디어학과/미디어커뮤니케이션학전공)</li>
                <li>seran14@cha.ac.kr / jiny05@cha.ac.kr</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 CUIF+ 3川지역 정책 아이디어 경진대회. 차의과학대학교 RISE사업단</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
