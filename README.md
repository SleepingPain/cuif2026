
# 2026 CUIF+ — 경기북부 대학생 정책 아이디어 페스티벌

This is a code bundle for 2026 CUIF+ (originally CUIF PLUS 2025). The original project is available at https://www.figma.com/design/JGNCV5u8EYZYT66KDOJ2xE/CUIF-PLUS-2025.

## 환경 설정

### Supabase 환경 변수 설정 (선택사항)

프로젝트는 Supabase 연결 없이도 데모 모드로 실행됩니다. 실제 데이터베이스를 사용하려면:

1. 프로젝트 루트에 `.env` 파일을 생성하세요:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

2. [Supabase 대시보드](https://supabase.com/dashboard)에서:
   - 새 프로젝트 생성
   - Settings > API에서 URL과 anon key 확인
   - `src/lib/supabase-setup.sql` 파일의 SQL을 실행하여 테이블 생성

3. 환경 변수를 설정하지 않으면 자동으로 데모 모드로 실행됩니다.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.
  