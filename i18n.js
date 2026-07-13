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
    "nav.theme.aria.toDark": "어두운 테마로 전환",
    "nav.theme.aria.toLight": "밝은 테마로 전환",
    "nav.lang.label": "EN",
    "nav.lang.aria": "Switch to English",

    /* category labels (contract §4) */
    "cat.interp": "기계적 해석가능성",
    "cat.llm": "LLM 및 NLP",
    "cat.build": "agent와 도구 개발",

    /* home */
    "home.intro.name": "박용욱",
    "home.intro.bio": "짧은 소개 문구를 여기에 입력하세요.",
    "home.avatar.kicker": "Research snapshot",
    "home.avatar.title": "LLM 내부 계산을 작게 쪼개 관찰합니다.",
    "home.avatar.note": "관심사는 attention head, circuit-level hypotheses, knowledge editing, 그리고 도구를 사용하는 agent 시스템입니다.",
    "home.avatar.metric1.value": "SAIL",
    "home.avatar.metric1.label": "KAIST",
    "home.avatar.metric2.value": "MCP",
    "home.avatar.metric2.label": "agents",
    "home.avatar.metric3.value": "MI",
    "home.avatar.metric3.label": "circuits",
    "home.interests.heading": "요즘 관심 있는 것",
    "home.interests.item1": "Mechanistic interpretability — attention head와 circuit이 어떤 계산을 맡는지 추적하기",
    "home.interests.item2": "LLM 및 NLP — 생성 텍스트를 분석하고, 모델의 흔적을 더 정직하게 구분하기",
    "home.interests.item3": "AI Agent와 도구 개발 — MCP처럼 외부 도구를 다루는 에이전트를 직접 만들고 평가하기",
    "home.education.heading": "학력",
    "home.education.period": "[기간 입력]",
    "home.education.institution": "[학교 입력]",
    "home.education.lab": "[연구실 입력]",
    "home.education.program": "[과정 입력 — 선택]",
    "home.awards.heading": "수상",
    "home.patents.heading": "특허",
    "home.patents.title": "특허 정보를 여기에 입력하세요.",
    "home.patents.meta": "[출원·등록 정보 입력 — 선택]",
    "home.software.heading": "소프트웨어",
    "home.software.name": "소프트웨어 정보를 여기에 입력하세요.",
    "home.software.purpose": "[용도 입력 — 선택]",
    "home.software.meta": "[링크·배포 정보 입력 — 선택]",
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

    /* CV — 학교와 연구실을 한 항목으로 관리하고, 검증되지 않은 하위 섹션은 렌더링하지 않는다. */
    "home.cv.heading": "이력",
    "cv.edu.heading": "학교와 연구실",
    "cv.edu.1.period": "재학 기간: TODO",
    "cv.edu.1.title": "학교 · 전공/학위: TODO",
    "cv.edu.1.desc": "연구실: KAIST SAIL",
    "cv.gpa.heading": "학점",
    "cv.awards.heading": "수상",
    "cv.awards.1.title": "대상",
    "cv.awards.1.desc": "Kakao × KSC · MCP 기반 AI Agent",
    "cv.awards.2.title": "우수상",
    "cv.awards.2.desc": "인간/AI 생성 텍스트 분류기",
    "cv.publications.heading": "논문",

    /* section labels (mono eyebrow — 재량으로 영문 유지) */
    "label.interests": "Interests",
    "label.cv": "Curriculum",
    "label.projects": "Projects",
    "label.latest": "Writing",
    "label.connect": "Profile",
    "label.blog": "Blog — Notes & Experiments",

    /* projects (순서 고정) */
    "projects.heading": "프로젝트",
    "projects.intro": "연구와 개발 작업을 mechanistic interpretability를 중심으로 정리했습니다.",
    "project.links.aria": "프로젝트 외부 링크",
    "project.link.demo": "데모",
    "project.link.repository": "저장소",
    "project.link.paper": "논문",
    "project.link.details": "자세히",

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
    "nav.theme.aria.toDark": "Switch to dark theme",
    "nav.theme.aria.toLight": "Switch to light theme",
    "nav.lang.label": "한국어",
    "nav.lang.aria": "한국어로 전환",

    /* category labels (contract §4) */
    "cat.interp": "mechanistic interpretability",
    "cat.llm": "LLM & NLP",
    "cat.build": "Agents & tooling",

    /* home */
    "home.intro.name": "Yonguk Park",
    "home.intro.bio": "Add a short introduction here.",
    "home.avatar.kicker": "Research snapshot",
    "home.avatar.title": "Breaking LLM computations into pieces small enough to inspect.",
    "home.avatar.note": "I focus on attention heads, circuit-level hypotheses, knowledge editing, and tool-using agent systems.",
    "home.avatar.metric1.value": "SAIL",
    "home.avatar.metric1.label": "KAIST",
    "home.avatar.metric2.value": "MCP",
    "home.avatar.metric2.label": "agents",
    "home.avatar.metric3.value": "MI",
    "home.avatar.metric3.label": "circuits",
    "home.interests.heading": "What I'm interested in",
    "home.interests.item1": "Mechanistic interpretability — tracing what attention heads and circuits are actually computing",
    "home.interests.item2": "LLM & NLP — analyzing generated text and separating model traces more honestly",
    "home.interests.item3": "AI agents & tooling — building and evaluating tool-using agents, including MCP-based systems",
    "home.education.heading": "Education",
    "home.education.period": "[Add period]",
    "home.education.institution": "[Add institution]",
    "home.education.lab": "[Add lab]",
    "home.education.program": "[Add program — optional]",
    "home.awards.heading": "Awards",
    "home.patents.heading": "Patents",
    "home.patents.title": "Add patent information here.",
    "home.patents.meta": "[Add application or registration details — optional]",
    "home.software.heading": "Software",
    "home.software.name": "Add software information here.",
    "home.software.purpose": "[Add purpose — optional]",
    "home.software.meta": "[Add link or release details — optional]",
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

    /* CV — keep school and lab in one entry; omit unverified subsections from the markup. */
    "home.cv.heading": "CV",
    "cv.edu.heading": "Education & labs",
    "cv.edu.1.period": "Dates attended: TODO",
    "cv.edu.1.title": "School · major/degree: TODO",
    "cv.edu.1.desc": "Lab: KAIST SAIL",
    "cv.gpa.heading": "GPA",
    "cv.awards.heading": "Awards",
    "cv.awards.1.title": "Grand Prize",
    "cv.awards.1.desc": "Kakao × KSC · MCP-based AI agent",
    "cv.awards.2.title": "Excellence Award",
    "cv.awards.2.desc": "Human vs. AI-generated text classifier",
    "cv.publications.heading": "Publications",

    /* section labels (mono eyebrow) */
    "label.interests": "Interests",
    "label.cv": "Curriculum",
    "label.projects": "Projects",
    "label.latest": "Writing",
    "label.connect": "Profile",
    "label.blog": "Blog — Notes & Experiments",

    /* projects (fixed order) */
    "projects.heading": "Projects",
    "projects.intro": "Selected research and development work, centered on mechanistic interpretability.",
    "project.links.aria": "External project links",
    "project.link.demo": "Demo",
    "project.link.repository": "Repository",
    "project.link.paper": "Paper",
    "project.link.details": "Details",

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
