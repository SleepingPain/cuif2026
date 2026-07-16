import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Badge } from './ui/badge';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export function FAQSection() {
  const teamExamples = [
    { valid: true, description: "✅ 2인 팀: 재학생 2인" },
    { valid: true, description: "✅ 5인 팀: 재학생 5인" },
    { valid: true, description: "✅ 7인 팀: 재학생 5인 + 지역 구성원 2인" },
    { valid: true, description: "✅ 4인 팀: 재학생 3인 + 지역 구성원 1인" },
    { valid: true, description: "✅ 3인 팀: 재학생 2인 + 지역 구성원 1인" },
    { valid: false, description: "❌ 6인 팀: 재학생 6인 (재학생 최대 5인 초과)" },
    { valid: false, description: "❌ 8인 팀: 재학생 5인 + 지역 구성원 3인 (지역 구성원 최대 2인 초과)" },
    { valid: false, description: "❌ 1인 팀: 재학생 1인 (최소 2인 이상 필요)" },
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            팀 구성 안내
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            예선 평가 가산점 및 팀 구성
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            팀 구성 방법과 예선 평가 시 가산점을 받을 수 있는 조건을 안내합니다.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* 예선 평가 가산점 */}
          <div className="bg-background rounded-lg border border-border p-8">
            <h3 className="text-2xl mb-6">예선 평가 가산점</h3>
            
            <div className="space-y-6">
              {/* 학과/학년 융합 구성 */}
              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  학과/학년 융합 구성
                </h4>
                <ul className="space-y-2 ml-6 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">1.</span>
                    <span>다양한 학과 소속 학생들의 팀 구성</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">2.</span>
                    <span>다양한 학년 분포</span>
                  </li>
                </ul>
              </div>

              {/* 지역구성원 */}
              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  지역구성원: 최대 2인까지 포함 가능
                </h4>
                
                <div className="ml-6 space-y-4">
                  <div>
                    <p className="mb-2">
                      <span className="text-primary mr-2">1.</span>
                      지역 구성원 정의:
                    </p>
                    <ul className="space-y-2 ml-6 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">›</span>
                        <span>삼천(포천, 연천, 동두천) 지역 거주민</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">›</span>
                        <span>지역 내 학교 재학생 (초·중·고·대학생)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">›</span>
                        <span>지역 내 기업/기관 재직자</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">›</span>
                        <span>지역 내 사업체 운영자</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2">
                      <span className="text-primary mr-2">2.</span>
                      지역 구성원 포함 팀의 경우 본선 진출 시 증빙서류 제출 필수
                    </p>
                    <ul className="space-y-2 ml-6 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">›</span>
                        <span>거주민: 주민등록등본</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">›</span>
                        <span>재학생: 재학증명서</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">›</span>
                        <span>재직자/사업자: 재직증명서 또는 사업자등록증</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-amber-900 mb-1">중요</p>
                      <p className="text-amber-800">
                        차의과학대학교 재학생은 거주지와 관계없이 '본교 재학생' 자격으로만 참여 가능 (지역 구성원 자격 중복 불가)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 팀 구성 예시 */}
          <div className="bg-background rounded-lg border border-border p-8">
            <h3 className="text-2xl mb-6">팀 구성 예시</h3>
            
            <div className="space-y-3">
              {teamExamples.map((example, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    example.valid 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  {example.valid ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={example.valid ? 'text-green-900' : 'text-red-900'}>
                    {example.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 참고사항 */}
          <div className="bg-background rounded-lg border border-border p-8">
            <h3 className="text-2xl mb-6">참고사항</h3>
            
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>팀 구성: 최소 2인 이상, 최대 7인 이하 (본교 재학생 최대 5인 + 지역 구성원 최대 2인)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>지역 구성원 참여는 필수가 아닌 선택사항입니다. 다만, 지역사회 연계 창업 아이디어 도출을 위해 권장합니다. </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>학과/학년 융합 구성 및 지역 구성원 포함 시 예선 평가 가산점이 부여됩니다</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>팀 구성 변경은 예선 결과 발표 전까지만 가능합니다</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
