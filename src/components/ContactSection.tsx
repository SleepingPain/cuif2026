import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Phone,
  Mail,
  FileText,
  MessageCircle,
  School
} from 'lucide-react';
import { useLang } from '../lib/i18n';

export function ContactSection() {
  const { t } = useLang();

  const contactInfo = [
    {
      icon: School,
      title: t('주최/주관', 'Host & Organiser'),
      details: [
        t(
          '차의과학대학교 의료홍보미디어학과/미디어커뮤니케이션학전공',
          'CHA University, Dept. of Health & Strategic Communication',
        ),
        t('차의과학대학교 RISE사업단', 'CHA University RISE Initiative')
      ]
    },
    {
      icon: Phone,
      title: t('담당자 연락처', 'Phone'),
      details: [
        '031-850-8945/9054',
        t('(의료홍보미디어학과', '(Dept. of Health &'),
        t('미디어커뮤니케이션학전공)', 'Strategic Communication)')
      ]
    },
    {
      icon: Mail,
      title: t('이메일 문의', 'Email'),
      details: [
        'seran14@cha.ac.kr / jiny05@cha.ac.kr',
        t('(의료홍보미디어학과', '(Dept. of Health &'),
        t('미디어커뮤니케이션학전공)', 'Strategic Communication)')
      ]
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {t('문의하기', 'Get in Touch')}
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            {t('Contact & 문의사항', 'Contact')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{info.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


              </div>
            </div>
          </div>

          {/* University Information */}
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                <div>
                  <School className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl mb-2">{t('차의과학대학교', 'CHA University')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t(
                      '혁신적인 아이디어로 지역사회에 기여하는 대학',
                      'A university that gives back to its region through new ideas',
                    )}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">{t('캠퍼스 주소', 'Campus')}</Badge>
                    <p className="text-sm">
                      {t('경기도 포천시 해룡로 120', '120 Haeryong-ro, Pocheon, Gyeonggi-do, Korea')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
