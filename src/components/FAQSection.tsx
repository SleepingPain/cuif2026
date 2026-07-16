import { Badge } from './ui/badge';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export function FAQSection() {
  const teamExamples = [
    { valid: true, description: "✅ 3인 팀: 재학생 3인" },
    { valid: true, description: "✅ 4인 팀: 재학생 3인 + 1학년 신입생 1인 (가산점)" },
    { valid: true, description: "✅ 5인 팀: 재학생 4인 + 포천·동두천·연천 지역 시민 1인 (가산점)" },
    { valid: true, description: "✅ 5인 팀: 재학생 3인 + 신입생 1인 + 지역 시민 1인 (가산점 2종)" },
    { valid: false, description: "❌ 2인 팀: 최소 3인 이상 필요" },
    { valid: false, description: "❌ 6인 팀: 최대 5인 초과" },
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            팀 구성 안내 · Team
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            팀 구성 및 예선 가산점
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            팀 규모는 3~5인입니다. 친구든 후배든 지역 주민이든, 지금 함께할 팀을 만들어 보세요.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* 예선 평가 가산점 */}
          <div className="bg-background rounded-lg border border-border p-8">
            <h3 className="text-2xl mb-6">예선 평가 가산점 2종</h3>

            <div className="space-y-6">
              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  ① 1학년 신입생 포함
                </h4>
                <ul className="space-y-2 ml-6 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">›</span>
                    <span>팀에 1학년 신입생이 포함되어 있으면 예선 심사에서 가산점을 받습니다</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  ② 포천·동두천·연천 지역 시민 포함
                </h4>
                <ul className="space-y-2 ml-6 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">›</span>
                    <span>해당 지역에 살며 문제를 직접 겪는 시민이 팀에 포함되면 가산점을 받습니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">›</span>
                    <span>지역의 진짜 목소리가 아이디어의 현장감을 높여줍니다</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-amber-900 mb-1">안내</p>
                  <p className="text-amber-800">
                    가산점 인정 기준·증빙 절차 등 세부 사항은 공지사항을 통해 안내됩니다.
                  </p>
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
                <span>팀 구성: 3인 이상 5인 이하</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>참가 대상: 경기북부 연합 7개 대학(차의과학대·가톨릭대·경민대·대진대·동양대·부천대·중부대) 재학생</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>지역 시민 참여는 필수가 아닌 선택사항입니다. 다만 지역 현안 해결 아이디어의 현장성을 위해 권장합니다</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>1학년 신입생 포함, 지역 시민 포함 시 예선 평가 가산점이 부여됩니다</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
