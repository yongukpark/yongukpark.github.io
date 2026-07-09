/*
 * i18n.js — OWNED BY content-author.
 * 계약: window.I18N = { ko: { "<key>": "문구", ... }, en: { "<key>": "text", ... } }
 * 키 목록/개수는 _workspace/01_architect_contract.md §2 인벤토리 기준.
 * script.js(frontend)가 window.I18N[lang][key]로 [data-i18n] textContent를,
 * data-i18n-aria="key"로 aria-label을 스왑한다.
 * ko / en 두 객체는 반드시 동일한 키 집합을 갖는다.
 */
window.I18N = {
  ko: {
    /* a11y / footer */
    "a11y.skip": "본문으로 건너뛰기",
    "footer.github": "GitHub",
    "footer.email": "이메일",
    "footer.rss": "RSS",
    "footer.copyright": "© 2026 박용욱",

    /* nav */
    "nav.brand": "박용욱",
    "nav.home": "홈",
    "nav.projects": "프로젝트",
    "nav.blog": "블로그",
    "nav.theme.label": "테마",
    "nav.theme.aria": "밝은/어두운 테마 전환",
    "nav.lang.label": "EN",
    "nav.lang.aria": "English로 전환",

    /* category labels (contract §4) */
    "cat.interp": "기계적 해석가능성",
    "cat.llm": "LLM 및 NLP",
    "cat.build": "agent와 도구 개발",

    /* home */
    "home.intro.eyebrow": "KAIST SAIL — Mechanistic Interpretability",
    "home.intro.name": "박용욱",
    "home.intro.role": "KAIST SAIL · LLM mechanistic interpretability 연구",
    "home.intro.bio": "KAIST SAIL에서 LLM과 Transformer의 mechanistic interpretability를 연구합니다. 주로 attention head 단위에서 모델 내부 계산을 분석하고, 그 이해를 knowledge editing으로 검증하는 데 관심이 있습니다.",
    "home.interests.heading": "연구 관심사",
    "home.interests.item1": "Mechanistic interpretability — attention head와 circuit 단위의 내부 동작 분석 (knowledge editing으로 이해를 검증)",
    "home.interests.item2": "LLM 및 NLP — 생성 텍스트의 분석과 분류",
    "home.interests.item3": "AI Agent와 도구 개발 — MCP 기반 도구 사용 에이전트",
    "home.projects.heading": "대표 프로젝트",
    "home.projects.viewall": "프로젝트 전체 보기 →",
    "home.latest.heading": "최신 글",
    "home.latest.viewall": "글 전체 보기 →",
    "home.connect.heading": "프로필",
    "home.connect.github": "GitHub",
    "home.connect.email": "이메일",

    /* profile (home §04) */
    "profile.affiliation.dt": "소속",
    "profile.affiliation.dd": "KAIST SAIL",
    "profile.focus.dt": "연구 분야",
    "profile.focus.dd": "Mechanistic interpretability",
    "profile.github.dt": "GitHub",
    "profile.email.dt": "이메일",

    /* CV 스캐폴드 (홈 §03) — 아래 값들을 실제 이력으로 교체하면 된다 (ko/en 짝 유지) */
    "home.cv.heading": "이력",
    "cv.edu.heading": "학력",
    "cv.edu.1.period": "0000.00 — 현재",
    "cv.edu.1.title": "대학교 · 전공",
    "cv.edu.1.desc": "GPA, 비고 등 한 줄",
    "cv.exp.heading": "연구 경력",
    "cv.exp.1.period": "0000.00 — 0000.00",
    "cv.exp.1.title": "연구실 · 역할",
    "cv.exp.1.desc": "연구 주제 한 줄",
    "cv.exp.2.period": "0000.00 — 현재",
    "cv.exp.2.title": "연구실 · 역할",
    "cv.exp.2.desc": "연구 주제 한 줄",
    "cv.awards.heading": "수상",
    "cv.awards.1.period": "0000",
    "cv.awards.1.title": "대회명 · 주최",
    "cv.awards.1.desc": "수상 내역 한 줄",
    "cv.awards.2.period": "0000",
    "cv.awards.2.title": "대회명 · 주최",
    "cv.awards.2.desc": "수상 내역 한 줄",
    "cv.certs.heading": "자격 · 기타",
    "cv.certs.1.period": "0000",
    "cv.certs.1.title": "자격증 / 특허 / 장학",
    "cv.certs.1.desc": "내용 한 줄",

    /* section labels (mono eyebrow — 재량으로 영문 유지) */
    "label.interests": "Research",
    "label.cv": "Curriculum",
    "label.projects": "Projects",
    "label.latest": "Writing",
    "label.connect": "Profile",
    "label.blog": "Blog — Notes & Experiments",

    /* projects (순서 고정) */
    "projects.heading": "프로젝트",
    "projects.intro": "연구와 개발 작업을 mechanistic interpretability를 중심으로 정리했습니다.",

    "project.1.title": "Attention head 수준의 mechanistic interpretability",
    "project.1.meta": "KAIST SAIL · 연구 진행 중 · Transformer 내부 분석",
    "project.1.desc": "Transformer의 개별 attention head가 수행하는 계산을 mechanistic 수준에서 분석합니다. 특정 head의 역할을 규명하고, 그 이해를 knowledge editing으로 검증하는 방향을 함께 살핍니다.",

    "project.2.title": "MCP 기반 AI Agent",
    "project.2.meta": "Kakao × KSC · 대상 · Model Context Protocol",
    "project.2.desc": "Model Context Protocol로 외부 도구를 연결해 작업을 수행하는 도구 사용 에이전트입니다. Kakao × KSC에서 대상을 수상했습니다.",

    "project.3.title": "인간/AI 생성 텍스트 분류기",
    "project.3.meta": "우수상 · DeBERTa 파인튜닝 · 텍스트 분류",
    "project.3.desc": "DeBERTa를 파인튜닝해 사람이 쓴 글과 AI가 생성한 글을 분류합니다. 우수상을 수상했습니다.",

    "project.4.title": "냉장고 재료 기반 레시피 추천",
    "project.4.meta": "개인 프로젝트 · 추천 시스템",
    "project.4.desc": "보유한 냉장고 재료를 입력하면 만들 수 있는 레시피를 추천합니다.",

    "project.5.title": "국민체력100 기반 운동 추천",
    "project.5.meta": "개인 프로젝트 · 추천 시스템",
    "project.5.desc": "국민체력100 측정 데이터를 활용해 개인에게 맞는 운동을 추천합니다.",

    /* blog */
    "blog.heading": "블로그",
    "blog.intro": "interpretability를 중심으로 연구 노트와 실험 기록을 남깁니다.",
    "blog.map.heading": "아이디어 맵",
    "blog.map.disclaimer": "이 맵의 점 위치는 주제적 거리를 나타내기 위해 저자가 직접 배치한 것으로, 실제 t-SNE나 임베딩 결과가 아닙니다.",
    "blog.list.heading": "전체 글",
    "blog.empty": "아직 글이 없습니다.",

    /* post */
    "post.back": "← 블로그",
    "post.related": "관련 글",
    "post.prev": "이전 글",
    "post.next": "다음 글",

    /* 404 */
    "notfound.title": "페이지를 찾을 수 없습니다",
    "notfound.desc": "주소가 바뀌었거나 삭제된 페이지입니다.",
    "notfound.back": "← 홈으로"
  },
  en: {
    /* a11y / footer */
    "a11y.skip": "Skip to content",
    "footer.github": "GitHub",
    "footer.email": "Email",
    "footer.rss": "RSS",
    "footer.copyright": "© 2026 Yonguk Park",

    /* nav */
    "nav.brand": "Yonguk Park",
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.theme.label": "Theme",
    "nav.theme.aria": "Toggle light/dark theme",
    "nav.lang.label": "한국어",
    "nav.lang.aria": "Switch to Korean",

    /* category labels (contract §4) */
    "cat.interp": "mechanistic interpretability",
    "cat.llm": "LLM & NLP",
    "cat.build": "Agents & tooling",

    /* home */
    "home.intro.eyebrow": "KAIST SAIL — Mechanistic Interpretability",
    "home.intro.name": "Yonguk Park",
    "home.intro.role": "KAIST SAIL · LLM mechanistic interpretability",
    "home.intro.bio": "I research the mechanistic interpretability of LLMs and Transformers at KAIST SAIL. My work analyzes model internals at the level of individual attention heads, and probes that understanding through knowledge editing.",
    "home.interests.heading": "Research interests",
    "home.interests.item1": "Mechanistic interpretability — analyzing internal behavior at the attention-head and circuit level (validated through knowledge editing)",
    "home.interests.item2": "LLM & NLP — analysis and classification of generated text",
    "home.interests.item3": "AI agents & tooling — MCP-based tool-using agents",
    "home.projects.heading": "Representative projects",
    "home.projects.viewall": "All projects →",
    "home.latest.heading": "Latest posts",
    "home.latest.viewall": "All posts →",
    "home.connect.heading": "Profile",
    "home.connect.github": "GitHub",
    "home.connect.email": "Email",

    /* profile (home §04) */
    "profile.affiliation.dt": "Affiliation",
    "profile.affiliation.dd": "KAIST SAIL",
    "profile.focus.dt": "Research focus",
    "profile.focus.dd": "Mechanistic interpretability",
    "profile.github.dt": "GitHub",
    "profile.email.dt": "Email",

    /* CV scaffold (home §03) — replace these with real entries (keep ko/en in sync) */
    "home.cv.heading": "CV",
    "cv.edu.heading": "Education",
    "cv.edu.1.period": "0000.00 — present",
    "cv.edu.1.title": "University · Major",
    "cv.edu.1.desc": "One line: GPA, notes",
    "cv.exp.heading": "Research experience",
    "cv.exp.1.period": "0000.00 — 0000.00",
    "cv.exp.1.title": "Lab · Role",
    "cv.exp.1.desc": "One line on the research topic",
    "cv.exp.2.period": "0000.00 — present",
    "cv.exp.2.title": "Lab · Role",
    "cv.exp.2.desc": "One line on the research topic",
    "cv.awards.heading": "Awards",
    "cv.awards.1.period": "0000",
    "cv.awards.1.title": "Competition · Host",
    "cv.awards.1.desc": "One line on the award",
    "cv.awards.2.period": "0000",
    "cv.awards.2.title": "Competition · Host",
    "cv.awards.2.desc": "One line on the award",
    "cv.certs.heading": "Certifications & more",
    "cv.certs.1.period": "0000",
    "cv.certs.1.title": "Certification / Patent / Scholarship",
    "cv.certs.1.desc": "One line",

    /* section labels (mono eyebrow) */
    "label.interests": "Research",
    "label.cv": "Curriculum",
    "label.projects": "Projects",
    "label.latest": "Writing",
    "label.connect": "Profile",
    "label.blog": "Blog — Notes & Experiments",

    /* projects (fixed order) */
    "projects.heading": "Projects",
    "projects.intro": "Selected research and development work, centered on mechanistic interpretability.",

    "project.1.title": "Attention-head mechanistic interpretability",
    "project.1.meta": "KAIST SAIL · ongoing research · Transformer internals",
    "project.1.desc": "Analyzes the computation performed by individual attention heads in Transformers at a mechanistic level. Identifies the role of specific heads and probes that understanding through knowledge editing.",

    "project.2.title": "MCP-based AI agent",
    "project.2.meta": "Kakao × KSC · Grand Prize · Model Context Protocol",
    "project.2.desc": "A tool-using agent that connects external tools through the Model Context Protocol to carry out tasks. Awarded the Grand Prize at Kakao × KSC.",

    "project.3.title": "Human vs. AI-generated text classifier",
    "project.3.meta": "Excellence Award · DeBERTa fine-tuning · text classification",
    "project.3.desc": "Fine-tunes DeBERTa to distinguish human-written text from AI-generated text. Received the Excellence Award.",

    "project.4.title": "Fridge-ingredient recipe recommender",
    "project.4.meta": "Personal project · recommender system",
    "project.4.desc": "Recommends recipes you can make from the ingredients currently in your fridge.",

    "project.5.title": "Fitness-data exercise recommender",
    "project.5.meta": "Personal project · recommender system",
    "project.5.desc": "Uses Korea's Gukmin Cheryeok 100 fitness assessment data to recommend personalized exercises.",

    /* blog */
    "blog.heading": "Blog",
    "blog.intro": "Research notes and experiment logs, centered on interpretability.",
    "blog.map.heading": "Idea map",
    "blog.map.disclaimer": "The positions on this map are hand-placed by the author to suggest thematic distance. They are not an actual t-SNE or embedding result.",
    "blog.list.heading": "All posts",
    "blog.empty": "No posts yet.",

    /* post */
    "post.back": "← Blog",
    "post.related": "Related posts",
    "post.prev": "Previous",
    "post.next": "Next",

    /* 404 */
    "notfound.title": "Page not found",
    "notfound.desc": "This page may have been moved or removed.",
    "notfound.back": "← Back home"
  }
};
