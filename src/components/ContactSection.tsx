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

export function ContactSection() {
  const contactInfo = [
    {
      icon: School,
      title: "주최/주관",
      details: [
        "차의과학대학교 의료홍보미디어학과/미디어커뮤니케이션학전공",
        "차의과학대학교 RISE사업단"
      ]
    },
    {
      icon: Phone,
      title: "담당자 연락처",
      details: ["031-850-8945/9054", 
        "(의료홍보미디어학과",
        "미디어커뮤니케이션학전공)"]
    },
    {
      icon: Mail,
      title: "이메일 문의",
      details: ["seran14@cha.ac.kr / jiny05@cha.ac.kr",
         "(의료홍보미디어학과",
         "미디어커뮤니케이션학전공)"]
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            문의하기
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            Contact & 문의사항
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
                  <h3 className="text-xl mb-2">차의과학대학교</h3>
                  <p className="text-muted-foreground mb-4">
                    혁신적인 아이디어로 지역사회에 기여하는 대학
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">캠퍼스 주소</Badge>
                    <p className="text-sm">경기도 포천시 해룡로 120</p>
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
