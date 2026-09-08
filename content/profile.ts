export const profile = {
  name: "Amandeep Singh Saini",
  short: "Aman Saini",
  titles: ["Tech Lead", "Senior AI Engineer", "Full-Stack Architect", "Agent Systems"],
  role: "Tech Lead · Senior AI Engineer",
  location: "Phoenix, Arizona",
  locationShort: "Phoenix, AZ",
  timezone: "America/Phoenix",
  tzLabel: "MST",
  email: "amandeepsingh.saini3174@gmail.com",
  linkedin: "https://www.linkedin.com/in/amandeepsingh-saini/",
  github: "https://github.com/AmandeepSsaini",
  resume: "/Amandeep_Singh_Saini_Resume.docx",
  available: "Open to Senior / Staff & AI engineering roles",

  headline: ["I ORCHESTRATE", "INTELLIGENT", "AGENTS."],

  tagline:
    "Senior engineer and tech lead with 10+ years building and scaling full-stack platforms across SaaS, fintech and enterprise — now shipping production AI: LLM agent orchestration, MCP tool servers and RAG pipelines over vector databases.",

  summary: [
    "I've spent ten years building the web platforms companies actually run on — CRM and marketing automation for small businesses, member eligibility at USAA, payment flows at PayPal. Front-end architecture is where I'm deepest: React, Vue 3, TypeScript, and the build systems and component libraries that decide whether a team of engineers ships weekly or monthly.",
    "For the last two years that work has pointed squarely at AI. I architected and shipped a Python agent orchestration service — a multi-tenant API where internal product teams register, configure and run their own LLM agents — replacing the per-team one-off integrations that came before it. Around it I built MCP tool servers, a memory RAG pipeline on a vector database, and the in-product AI chat experience end to end.",
    "I lead onshore and offshore engineers from architecture through Kubernetes deployment, and I care a great deal about the unglamorous half: distributed tracing, instrumentation, build times, and removing the duplicated code that quietly slows everyone down.",
  ],

  facts: [
    { k: "Based", v: "Phoenix, Arizona — open to remote" },
    { k: "Focus", v: "LLM agent orchestration · Front-end architecture" },
    { k: "Open to", v: "Senior / Staff engineering · Tech Lead · AI platform" },
    { k: "Response", v: "Usually within 24 hours" },
  ],
} as const;

export const stats = [
  { value: 10, suffix: "+", label: "Years shipping production software" },
  { value: 97, suffix: "%", label: "Test coverage established at PayPal" },
  { value: 40, prefix: "~", suffix: "%", label: "Duplicated UI code eliminated" },
  { value: 30, prefix: "~", suffix: "%", label: "CI build time cut via Vite migration" },
] as const;

export const marquee = [
  "LLM Agent Orchestration",
  "Model Context Protocol",
  "RAG & Vector Search",
  "Front-End Architecture",
  "React · Vue 3 · TypeScript",
  "Kubernetes & CI/CD",
] as const;
