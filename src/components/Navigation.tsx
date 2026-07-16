import { Button } from './ui/button';
import { Menu, X, Lightbulb } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="hover:text-primary transition-colors">
              대회 소개
            </a>
            <a href="/inform" className="hover:text-primary transition-colors">
              공지사항
            </a>
            <a href="#topics" className="hover:text-primary transition-colors">
              공모 주제
            </a>
            <a href="#guidelines" className="hover:text-primary transition-colors">
              참가 안내
            </a>
            <a href="#faq" className="hover:text-primary transition-colors">
              FAQ
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              문의
            </a>
            <Button onClick={() => { window.location.href = '/inform'; }}>
              참가 신청 안내
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a 
                href="#about" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                대회 소개
              </a>
              <a 
                href="/inform" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                공지사항
              </a>
              <a 
                href="#topics" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                공모 주제
              </a>
              <a 
                href="#guidelines" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                참가 안내
              </a>
              <a 
                href="#faq" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <a 
                href="#contact" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                문의
              </a>
              <Button
                className="w-full"
                onClick={() => {
                  window.location.href = '/inform';
                  setIsMenuOpen(false);
                }}
              >
                참가 신청 안내
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}