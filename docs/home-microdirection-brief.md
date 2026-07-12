# 홈페이지 마이크로 디렉션 디자인 브리프

## 1. 목표와 근거

홈페이지의 역할을 “포트폴리오 쇼케이스”보다 **연구자 약력과 작업 기록으로 들어가는 차분한 인덱스**로 좁힌다. 방문자가 첫 화면부터 다음 순서로 읽을 수 있어야 한다.

1. 누구인가 — 이름과 짧은 자기소개
2. 무엇을 연구하는가 — Research Interests
3. 어디에서 공부하고 연구했는가 — Education
4. 어떤 인정을 받았는가 — Awards
5. 어떤 결과물을 만들었는가 — Patent / Software
6. 더 자세히 볼 곳은 어디인가 — 상단 Projects / Blog 내비게이션

이 방향은 현재 실제 콘텐츠인 KAIST SAIL, mechanistic interpretability, attention head/circuit, MCP 기반 agent, 생성 텍스트 분류 작업에서 출발한다. 경력이나 특허는 추정하지 않는다.

### 현재 화면에서 확인한 문제

- `/`의 이름은 `--fs-950: clamp(2.15rem, 4.2vw, 3.65rem)`이며, 자기소개가 없어 이름 다음에 바로 두 열짜리 Research/Profile이 나온다. 이름 자체보다 “누구이며 무엇을 하는가”가 첫 문단에서 함께 읽혀야 한다.
- Research와 Profile이 처음부터 2:1 비대칭 열로 분리되어, 기본 약력이 research interests와 경쟁한다.
- Awards가 Profile 안의 CV 안에 중첩되어 정보 구조가 `Profile → CV → Awards`로 불필요하게 깊다.
- Projects와 Writing 미리보기가 홈 본문을 길게 만들고, 독립 페이지로 가는 상단 내비게이션과 역할이 중복된다.
- 배경, 카드, 그림자 사용은 이미 많이 절제되었지만 점이 붙은 대문자 section label이 모든 섹션에 반복되어 균일한 템플릿 리듬이 남아 있다.

## 2. 제안하는 최종 정보 구조

```text
Home
├─ Identity
│  ├─ Yonguk Park / 박용욱
│  └─ Short bio (편집 가능, 1–2문장)
├─ Research Interests (single column)
├─ Education (single column)
├─ Awards (single column)
└─ Outputs
   ├─ Patent
   └─ Software
```

Projects와 Blog는 홈 본문에서 제거하고 `_includes/nav.html`의 독립 경로를 유지한다. Profile이라는 별도 섹션도 만들지 않는다. 검증된 affiliation, GitHub, Email이 필요하다면 짧은 자기소개 아래의 조용한 metadata 행으로 이동할 수 있지만, 이번 구조의 필수 항목은 아니다.

### 콘텐츠가 없을 때의 원칙

- Education, Patent, Software의 사실 데이터는 현재 저장소에서 확인되지 않았다. 임의 학교명, 학위, 연구실 기간, 특허번호, 소프트웨어명을 렌더링하지 않는다.
- 구현 단계에서는 **HTML 주석으로 된 content-author 슬롯**과 i18n 키/데이터 모양만 준비하고, 검증된 항목이 없으면 해당 섹션 전체를 렌더링하지 않는다.
- “추후 업데이트”, “Coming soon”, 빈 카드 같은 공개 placeholder는 사용하지 않는다. 빈 상태보다 섹션 미노출이 신뢰에 유리하다.

권장 데이터 모양(구조 설명용이며 사실값이 아님):

```text
bio: 1–2문장
education[]: institution, lab(optional), role_or_program, start, end_or_present
awards[]: title, issuer_or_context, year(optional)
patents[]: title, jurisdiction_or_number(optional), status, year(optional), url(optional)
software[]: name, one_line_purpose, status_or_version(optional), url(optional)
```

## 3. 데스크톱 구조

### 전체 폭

- `#main`의 외곽 폭은 기존 `--maxw-wide: 1080px`와 `--pad-x`를 유지한다.
- 실제 읽기 열은 `min(100%, 780px)`를 기본으로 한다. Patent/Software 묶음만 1080px까지 확장한다.
- 왼쪽 기준선을 모든 single-column 섹션에서 공유한다. 가운데 정렬된 카드 묶음으로 바꾸지 않는다.

### Identity

- 이름: `clamp(1.9rem, 3vw, 2.75rem)`, 600–650 weight, line-height 1.08–1.15.
- 현재 최대 3.65rem보다 확실히 작게 만든다. 내비게이션 브랜드보다 크되 페이지 전체를 billboard처럼 점유하지 않아야 한다.
- 이름 아래 간격: 0.75–1rem.
- 자기소개: 최대 42–48rem, `1rem–1.125rem`, line-height 1.65–1.75, muted ink. 한글 기준 1–2문장/약 2–4줄을 목표로 한다.
- Identity 아래에 1px 구분선을 두고 2.5–3.5rem의 첫 section pause를 만든다.

### Single-column sections

Research Interests → Education → Awards를 차례로 한 열에 둔다.

- 섹션 사이: 데스크톱 3.5–4.5rem.
- `h2`: `clamp(1.35rem, 2vw, 1.75rem)`, weight 600–650, line-height 1.2.
- section label은 필수가 아니다. 유지한다면 녹색 점을 제거하고 `Research`, `Education`처럼 작은 mono label만 쓰거나, 더 단순하게 h2만 사용한다.
- h2와 첫 항목 사이: 1.25–1.5rem.
- 항목은 카드가 아니라 얇은 상단 구분선을 가진 행으로 만든다. 행 패딩 0.9–1.15rem 0.

Research Interests:

- 현재 검증된 3개 관심사 문구를 재사용한다.
- `01/02/03` 번호는 authored index의 구체적인 디테일이므로 유지 가능하다.
- 데스크톱에서 `2rem + 본문` 두 칸, 본문 line-height 1.6–1.7.

Education:

- 각 행은 `기간 | 학교·연구실 / 재학·소속 정보` 구조를 권장한다.
- 기간은 8–11rem 너비의 mono metadata, 본문은 나머지 폭을 사용한다.
- institution, lab, role/program 사이의 위계를 텍스트 weight와 줄바꿈으로 만든다. 박스나 로고는 사용하지 않는다.
- 실제 데이터가 확보되기 전에는 렌더링하지 않는다.

Awards:

- 현재 확인된 “Kakao × KSC · MCP 기반 AI Agent — 대상”, “인간/AI 생성 텍스트 분류기 — 우수상”만 재사용한다.
- 가능하면 연도 필드를 별도로 받되, 검증되지 않은 연도를 만들지 않는다.
- 제목/맥락/연도의 단순 행으로 표현하고 수상 배지, 트로피 아이콘, 강조 카드 사용을 피한다.

### Patent / Software double-column

- 데스크톱 `grid-template-columns: repeat(2, minmax(0, 1fr))`.
- 열 사이 간격 2.5–4rem. 바깥 카드 테두리는 사용하지 않는다.
- 각 열 상단에 h2를 두고, 그 아래 항목은 1px 구분선 행으로 쌓는다.
- 두 열의 콘텐츠 길이가 달라도 억지로 같은 높이를 만들지 않는다. 이 비대칭이 실제 기록의 양을 드러내는 인간적인 리듬이다.
- 검증된 Patent 또는 Software가 한쪽에만 있으면 두 열 레이아웃을 강제하지 말고 존재하는 섹션만 읽기 열에 표시한다.

## 4. 모바일 구조 (320–620px)

순서는 데스크톱과 동일하며 모든 섹션을 한 열로 쌓는다.

```text
Name
Bio
Research Interests
Education
Awards
Patent
Software
```

- 본문 좌우 여백: 기존 `--pad-x`를 사용하되 최소 약 1.1rem을 유지한다.
- 이름: `1.9–2.25rem`; 긴 영문 이름도 한 줄을 우선하되 320px에서 강제 축소나 잘림이 없어야 한다.
- Identity 이후 간격: 2–2.5rem.
- 섹션 사이: 2.75–3.5rem.
- Education의 기간/내용 열은 한 열로 바꾸고 기간을 본문 위에 둔다. gap 0.25–0.4rem.
- Patent/Software grid는 1열, 두 섹션 사이 2.75–3.5rem.
- Research 번호 열은 1.75–2rem을 유지한다.
- 내비게이션은 현재 620px 이하 2행 구조(브랜드/토글, Home/Projects/Blog)를 유지한다. Projects와 Blog가 홈 본문에서 사라져도 둘 다 키보드와 터치로 선택 가능해야 한다.
- 320px에서 page-level 가로 스크롤이 없어야 한다. 이메일·특허번호·URL은 `overflow-wrap: anywhere`를 적용한다.

## 5. 타이포그래피·간격 토큰 제안

기존 IBM Plex Sans KR / IBM Plex Sans / IBM Plex Mono 조합은 실제 한영 연구 텍스트와 metadata를 구분하므로 유지한다. 새 폰트나 display serif를 추가하지 않는다.

| 역할 | 범위 | 비고 |
|---|---:|---|
| Name | `clamp(1.9rem, 3vw, 2.75rem)` | 현재보다 명확히 축소 |
| Bio | `clamp(1rem, 1.25vw, 1.125rem)` | 최대 42–48rem |
| Section h2 | `clamp(1.35rem, 2vw, 1.75rem)` | 모든 섹션 동일 단계 |
| Item title | `1rem–1.125rem` | 560–620 weight |
| Body/detail | `0.95rem–1rem` | line-height 1.6–1.72 |
| Metadata | `0.75rem–0.82rem` | mono, uppercase 강제 금지 |

권장 간격은 기존 0.25rem 기반 토큰을 재사용한다.

- identity top/bottom: 0 / `--space-7`
- section pause: `--space-7`에서 `--space-8` 사이
- heading → list: `--space-5`
- list row vertical padding: `0.9–1.15rem`
- Patent/Software column gap: `--space-7`에서 `--space-8` 사이

모든 섹션에 같은 padding box를 반복하지 않는다. 큰 pause, 작은 행 간격, 구분선의 조합으로 밀도 차이를 만든다.

## 6. 색과 표면

### 콘텐츠 중심 역할 설명

- `--bg`는 긴 약력과 기록을 읽는 종이 역할이다.
- `--ink`는 이름·섹션 제목·항목 제목 등 사실의 우선순위를 만든다.
- `--ink-muted`는 자기소개와 설명, `--ink-faint`는 날짜/기간처럼 보조적인 증거를 담당한다.
- `--hairline`은 카드 대신 기록의 경계를 만든다.
- `--accent`/`--accent-ink`는 링크, 현재 내비게이션, focus, Research 번호 중 필요한 곳에만 사용한다.

현재 warm paper/ink/green 역할은 연구 기록에 맞으므로 색을 새로 늘리지 않는다. `--rust`, `--blue`, category 색은 홈에서 사용하지 않는다. 배경 gradient, glow, 투명 카드도 추가하지 않는다.

접근성 목표:

- 본문, 링크, 작은 label: 배경 대비 4.5:1 이상.
- focus ring, 현재 내비게이션의 비텍스트 경계: 인접 색 대비 3:1 이상.
- active 상태를 녹색만으로 알리지 말고 underline/border 및 `aria-current`를 함께 유지한다.

## 7. 파일별 구현 지침

### `index.html`

1. `.cover-head` 안 이름 바로 아래에 bio 문단 슬롯을 추가한다. 예: `data-i18n="home.intro.bio"`; 실제 문구는 content-author가 검증 후 작성한다.
2. 현재 `.cover-grid`의 Research/Profile 2열 구조를 해체한다.
3. Research Interests를 독립 single-column section으로 둔다.
4. Profile 및 중첩된 `.home-cv` 구조를 제거하고 Education, Awards를 각각 같은 레벨의 독립 section으로 둔다.
5. Education에는 기간, 학교, 연구실, 재학/소속 상태를 담을 수 있는 반복 행 구조를 준비하되 검증된 데이터가 없으면 section을 렌더링하지 않는다.
6. Awards에는 현재 검증된 2개 항목만 이동한다.
7. Patent와 Software를 감싸는 `.home-outputs` grid를 추가한다. 데이터가 없는 섹션은 공개 placeholder 없이 숨긴다.
8. `.home-projects`와 `.home-latest` 전체를 홈에서 제거한다. 독립 `projects.html`, `blog.html`, posts는 수정하지 않는다.
9. semantic 순서는 h1 뒤에 h2들만 오도록 단순화한다. 불필요한 CV h3/Awards h4 중첩을 없앤다.

### `i18n.js`

1. ko/en 양쪽에 같은 키 집합으로 bio, education, awards, patent, software heading과 실제 항목 필드를 추가한다.
2. `home.intro.bio`는 사실 확인 전 빈 문자열을 공개 렌더링하지 않는다. writer/content-author가 작성할 수 있는 명시적 편집 지점으로 남긴다.
3. 현재 Awards 문구는 사실을 바꾸지 않고 재사용한다.
4. 삭제된 홈 Projects/Latest 마크업 전용 키는 다른 페이지에서 쓰이는지 검색한 뒤 제거한다. `project.*`, `projects.*`, `blog.*`는 독립 페이지에서 사용하므로 유지한다.
5. Education/Patent/Software는 검증된 값이 들어오기 전 실제 사실 문자열을 추가하지 않는다.

### `style.css`

1. `.home-intro h1`과 `--fs-950` 사용 범위를 점검하고 홈 이름을 위의 1.9–2.75rem로 제한한다.
2. `.intro-bio`를 실제 새 bio 문단에 연결하고 최대 폭/line-height를 적용한다.
3. `.cover-grid`, `.cover-col`, `.home-profile`, `.home-cv`, 홈 전용 project/latest 규칙 중 더 이상 쓰이지 않는 selector를 정리한다. 독립 Projects/Blog/Post 규칙은 건드리지 않는다.
4. `.home-section`, `.home-list`, `.home-row`, `.education-row`, `.home-outputs`처럼 역할이 드러나는 소수의 selector로 single-column과 output grid를 구현한다.
5. 620px 이하에서 `.home-outputs`와 `.education-row`를 한 열로 바꾼다.
6. 점이 붙은 `.section-label::before`는 홈에서 제거하거나 홈 label 자체를 생략한다. 다른 페이지 적용 여부를 확인한 뒤 전역 삭제 여부를 결정한다.
7. hover 효과는 링크 underline/ink 변화 정도로 제한한다. 행 전체가 클릭되지 않는다면 hover surface를 만들지 않는다.

### `_includes/nav.html`

- Home, Projects, Blog 링크와 `aria-current`를 그대로 유지한다. 홈 본문 제거 이후 Projects/Blog로 가는 유일한 주 경로이므로 삭제하거나 메뉴 안에 숨기지 않는다.
- 테마/언어 토글의 accessible name을 유지한다.

### `_layouts/default.html`, `projects.html`, `blog.html`

- 구조 변경 대상이 아니다. 기본 layout의 skip link와 `<main>`을 유지한다.
- Projects/Blog 독립 페이지가 정상 동작하는지만 회귀 검사한다.

## 8. 편집 책임 위치

- 짧은 자기소개: `i18n.js`의 `home.intro.bio` ko/en — writer/content-author 작성, Yonguk Park 사실 확인 필요.
- Research Interests: 기존 `home.interests.item1..3` — 현재 문구 재사용 가능, 사실 수정 시 writer 검토.
- Education: 새 education 키/행 — 학교, 연구실, 재학/소속 기간을 Yonguk Park 또는 Team Lead가 제공한 뒤 content-author 입력.
- Awards: 기존 `cv.awards.*` — 현재 저장소의 검증된 두 항목 이동.
- Patent: 새 patent 데이터 — 제목/번호/status/year/link를 제공받은 뒤 입력.
- Software: 새 software 데이터 — 이름/한 줄 역할/status/version/link를 제공받은 뒤 입력.
- 레이아웃과 responsive CSS: developer.
- 접근성/시각 회귀: reviewer 및 accessibility 담당.

## 9. 피해야 할 패턴

- 큰 이름 아래 vague slogan을 넣어 SaaS hero로 만드는 것.
- Education, Award, Patent, Software 각각을 둥근 카드로 감싸는 것.
- 특허/소프트웨어가 없는데 “Coming soon” 카드로 빈 공간을 채우는 것.
- AI 연구자라는 이유로 보라–파랑 gradient, glow node, 회로 그림, robot/brain icon을 넣는 것.
- 모든 h2에 동일한 녹색 점, 대문자 eyebrow, 동일 padding을 기계적으로 반복하는 것.
- 기간이나 status를 임의로 보완하는 것.
- Patent와 Software의 높이를 맞추기 위해 빈 공간이나 가짜 항목을 추가하는 것.
- Projects와 Blog를 홈에서 제거한 뒤 상단 내비게이션에서도 제거하는 것.

더 인간적인 대안은 실제 기록의 길이 차이를 그대로 두고, 이름 아래 구체적인 자기소개 한 문장, 번호가 있는 연구 질문, 기간이 보이는 교육 행, 얇은 구분선으로 리듬을 만드는 것이다.

## 10. 검증 기준

### 구조/콘텐츠

- [ ] `/`의 visible 순서가 Name → Bio → Research Interests → Education → Awards → Patent/Software이다. 데이터가 없는 섹션은 숨길 수 있다.
- [ ] Projects와 Latest posts가 홈 본문에 렌더링되지 않는다.
- [ ] 상단 Home / Projects / Blog가 모두 보이고 각 독립 경로가 동작한다.
- [ ] 이름 아래 bio 편집 지점이 ko/en 모두 존재한다.
- [ ] Education은 학교·연구실·기간을 담을 수 있다.
- [ ] 저장소에 없던 개인정보, 경력, 기간, 특허, 소프트웨어가 창작되지 않았다.
- [ ] ko/en i18n 키 집합이 동일하다.

### 시각/반응형

- [ ] 데스크톱 이름 최대 크기가 2.75rem 이하이며 현재보다 명확히 작다.
- [ ] Research, Education, Awards가 single-column이다.
- [ ] Patent/Software만 충분한 폭에서 2열이고 620px 이하에서 1열이다.
- [ ] 320px, 360px, 620px, 900px, 1280px에서 page-level 가로 스크롤이 없다.
- [ ] 200% zoom에서 콘텐츠나 내비게이션이 겹치거나 잘리지 않는다.
- [ ] 긴 이메일, URL, 특허번호가 컨테이너 밖으로 넘치지 않는다.
- [ ] 카드, gradient, glow, 불필요한 icon 없이도 정보 위계가 명확하다.

### 접근성/동작

- [ ] h1은 하나이고 이후 section heading은 논리적인 h2 순서이다.
- [ ] 키보드로 skip link, Home, Projects, Blog, 테마/언어 토글, 본문 링크에 접근 가능하다.
- [ ] focus ring이 light/dark 양쪽에서 3:1 이상 구분된다.
- [ ] 본문/링크/작은 label이 WCAG AA 4.5:1 목표를 충족한다.
- [ ] 현재 내비게이션은 색뿐 아니라 underline/border 및 `aria-current`로 표시된다.
- [ ] JavaScript가 실패해도 핵심 홈 콘텐츠와 내비게이션이 보인다.

### 실행 검사

- `bundle exec jekyll build`
- 생성된 홈 DOM에서 `.home-projects`, `.home-latest` 부재 확인
- ko/en 전환 후 새 section heading과 bio 확인
- light/dark 양쪽 desktop/mobile 스크린샷 비교
- Projects, Blog, 최소 한 개 post 링크 회귀 확인

## 11. Human vs AI-like 체크

1. **콘텐츠에서 출발했는가?** 예. KAIST SAIL, mechanistic interpretability, 실제 두 수상 항목과 독립 Projects/Blog 경로가 구조를 결정했다.
2. **모호한 스타일 수식어 없이 설명 가능한가?** 예. 이름 축소는 bio와 research hierarchy를 만들고, single-column은 약력을 순서대로 읽게 하며, 유일한 2열은 Patent/Software라는 동급 output을 비교하기 위해서다.
3. **장식을 빼도 성립하는가?** 예. typography, 간격, 기간/번호, 구분선만으로 성립한다.
4. **사람의 리듬이 있는가?** 예. 긴 section pause와 조밀한 기록 행, 실제 콘텐츠 길이 차이를 함께 둔다.
5. **의도적인 비대칭/절제가 있는가?** Patent와 Software의 높이를 맞추지 않고, 정보가 없는 섹션은 노출하지 않는다.
6. **AI 생성처럼 보일 위험과 대안은?** 모든 섹션을 동일 카드/eyebrow로 반복할 위험이 있다. 카드 대신 읽기 열과 구분선, 실데이터의 길이 차이, 이름 아래 저자 고유의 짧은 bio를 사용한다.

## 12. 이번 브리프 작성 시 확인한 자료

- `index.html`
- `_includes/nav.html`
- `_layouts/default.html`
- `style.css`
- `i18n.js`
- `_config.yml`
- `projects.html`
- `blog.html`
- 로컬 Jekyll 빌드로 생성한 `/` 데스크톱 렌더

사이트 코드는 수정하지 않았다.
