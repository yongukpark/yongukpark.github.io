# Yonguk Park — Researcher Portfolio & Tech Blog

박용욱(Yonguk Park)의 연구자 포트폴리오 + 기술 블로그. Jekyll 정적 사이트로 빌드되어
**GitHub Pages**에 배포된다. Mechanistic interpretability를 중심으로 한 연구 소개, 대표 프로젝트,
그리고 아이디어 맵이 있는 기술 블로그로 구성된다. 외부 프레임워크 없이 vanilla JS/CSS만 사용한다.

---

## 로컬 개발 (Local development)

**Prerequisites:** Ruby 3.x, Bundler.

```bash
bundle install                 # 의존성 설치 (Jekyll ~4.3)
bundle exec jekyll serve       # 로컬 서버 실행 (자동 재빌드)
```

브라우저에서 **http://localhost:4000** 접속. 빌드만 확인하려면 `bundle exec jekyll build`
(산출물은 `_site/`).

---

## 블로그 글 추가하기 (How to add a post)

`_posts/` 아래에 `YYYY-MM-DD-title.md` 파일 하나만 만들면 된다. front matter 스키마는 **고정**이다:

```yaml
---
layout: post
title: "글 제목"
date: 2026-07-01        # YYYY-MM-DD
cat: interp             # interp | llm | build 중 하나만
map_x: 0.40             # 0~1 실수, 손으로 배치 (아이디어 맵 가로 좌표)
map_y: 0.55             # 0~1 실수, 손으로 배치 (아이디어 맵 세로 좌표)
---

본문(마크다운)...
```

**`cat` 허용값 (철자 고정):**

| 코드 | 의미 (KR) | Meaning (EN) |
|------|-----------|--------------|
| `interp` | 기계적 해석가능성 | mechanistic interpretability |
| `llm` | LLM 및 NLP | LLM & NLP |
| `build` | agent와 도구 개발 | Agents & tooling |

파일 **하나**를 추가하면 다음이 **자동으로** 반영된다 (다른 파일 수정 불필요):

- **(a)** 상세 페이지 생성 → `/blog/YYYY/MM/DD/title/`
- **(b)** `/blog/` 글 목록에 추가
- **(c)** 홈(`/`)의 "최신 글 3개"에 노출
- **(d)** 아이디어 맵에 점(dot) 하나 표시

이 자동 전파의 단일 소스는 `_includes/posts-data.html`이다.

> **참고:** `map_x` / `map_y`는 **손으로 배치**해 주제적 거리감을 표현한 값이며,
> 실제 t-SNE 결과가 아니다. 블로그 페이지에도 이 고지가 표시된다.

---

## 프로젝트 구조 (Project structure)

```
.
├── _config.yml        # 사이트 설정, permalink(/blog/...), baseurl 안내
├── Gemfile            # Jekyll ~4.3 (github-pages gem 대안 주석 포함)
├── index.html         # 홈: 소개 / 연구 관심 / 대표 프로젝트 / 최신 3개 / 링크
├── projects.html      # /projects/ — 대표 프로젝트 5개
├── blog.html          # /blog/ — 글 목록 + 아이디어 맵
├── _layouts/
│   ├── default.html   # 공통 골격, 폰트, 테마 no-FOUC, nav/footer
│   └── post.html      # 글 상세 레이아웃
├── _includes/
│   ├── nav.html       # 네비 + 테마/언어 토글 버튼
│   └── posts-data.html# 맵/전파용 JSON 단일 소스
├── _posts/            # 블로그 글 (YYYY-MM-DD-title.md)
├── style.css          # 디자인 시스템 (라이트/다크, 반응형)
├── script.js          # 테마·언어 전환, 아이디어 맵, fade
├── i18n.js            # ko/en 번역 사전
└── README.md
```

> **`i18n.js`** 는 `window.I18N = { ko: {...}, en: {...} }` 형태의 한/영 사전을 담는다.
> 페이지의 모든 `data-i18n="key"` 요소는 여기서 텍스트를 스왑하므로,
> **모든 키는 ko·en 두 언어를 반드시 채워야 한다.**

---

## 기능 (Features)

- **라이트/다크 테마** — 토글 + `localStorage` 저장(`theme`), `<html data-theme>`에 적용. 첫 페인트 전 적용(no-FOUC).
- **한/영 전환** — 토글 + `localStorage` 저장(`lang`), `<html lang>` 갱신 + 모든 `data-i18n` 텍스트 스왑.
- **반응형** — 모바일 단일 컬럼.
- **접근성** — 시맨틱 HTML(header/nav/main/footer), heading 위계, skip-link, `aria-*`, 키보드 포커스.
- **모션 최소화** — 은은한 IntersectionObserver fade만 사용하며 `prefers-reduced-motion` 존중.

---

## GitHub Pages 배포 (Deployment)

1. 저장소에 push 한다.
2. 저장소 **Settings → Pages**에서 소스를 지정한다:
   - **Branch/root** 방식(가장 단순): 브랜치(예: `main`)의 루트(`/`)를 선택하면 GitHub이 자동 빌드한다.
   - 또는 **github-pages gem** 경로: `Gemfile`의 주석대로 `gem "github-pages"`로 교체해 서버 빌드 호환을 맞춘다.
3. **`_config.yml`의 `url` / `baseurl`:**
   - 이 저장소는 `username.github.io` 형태의 **user 사이트**이므로 `baseurl`은 **빈 값(`""`)** 으로 둔다.
   - 프로젝트 사이트(`github.com/user/repo`)로 배포할 경우에만 `baseurl: "/repo"`로 바꾼다.
   - 모든 링크와 posts-data는 `relative_url` 필터로 `baseurl`을 흡수하므로, 이 값만 맞으면 링크가 깨지지 않는다.
