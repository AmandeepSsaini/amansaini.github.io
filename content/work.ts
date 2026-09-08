export type Project = {
  id: string;
  kicker: string;
  title: string;
  blurb: string;
  stack: string;
  at: string;
};

export const work: Project[] = [
  {
    id: "agent-orchestration",
    kicker: "01 / AI PLATFORM",
    title: "Agent Orchestration Service",
    blurb:
      "A multi-tenant Python API where internal product teams register, configure and run their own LLM agents — replacing the per-team one-off integrations that came before it across a CRM and marketing-automation platform serving 15,000+ small businesses.",
    stack: "Python · Multi-tenant API · LLM providers",
    at: "Current role",
  },
  {
    id: "mcp-servers",
    kicker: "02 / TOOLING",
    title: "MCP Tool Servers",
    blurb:
      "Model Context Protocol servers giving agents governed access to product data and internal APIs. Cut the effort to add a new AI integration from weeks to days.",
    stack: "MCP · Python · Internal APIs",
    at: "Current role",
  },
  {
    id: "memory-rag",
    kicker: "03 / RETRIEVAL",
    title: "Memory RAG Pipeline",
    blurb:
      "A retrieval pipeline on a vector database that grounds agent responses in company data — embeddings, retrieval and conversation memory, so answers cite the business rather than the model's priors.",
    stack: "Vector DB · Embeddings · RAG",
    at: "Current role",
  },
  {
    id: "ai-chat",
    kicker: "04 / PRODUCT",
    title: "In-Product AI Chat",
    blurb:
      "The end-to-end chat experience: streaming responses, conversation state, retry and fallback handling — built in Vue 3 and React against the orchestration service.",
    stack: "Vue 3 · React · Streaming",
    at: "Current role",
  },
  {
    id: "frontend-platform",
    kicker: "05 / PLATFORM",
    title: "Front-End Platform & Vite Migration",
    blurb:
      "Platform-wide front-end architecture — a shared Vue and React component library plus the Webpack-to-Vite migration. Cut CI build times ~30% and removed ~40% of duplicated UI code.",
    stack: "Vite · Vue 3 · React · Design system",
    at: "Current role",
  },
  {
    id: "eligibility",
    kicker: "06 / FINTECH",
    title: "Member Eligibility Platform",
    blurb:
      "React and TypeScript platform determining member qualification for USAA banking and insurance products, serving a member base in the millions. Route-level code splitting cut initial bundle size 15%.",
    stack: "React · TypeScript · Redux · K8s",
    at: "USAA",
  },
  {
    id: "payments",
    kicker: "07 / PAYMENTS",
    title: "Payment Flow Front Ends",
    blurb:
      "Single-page payment flows in React and Redux with JWT authorisation and Node.js data-exchange layers — plus the build pipeline and test suites that took coverage to 97%.",
    stack: "React · Redux · Node.js · Jest",
    at: "PayPal",
  },
  {
    id: "cpsam",
    kicker: "08 / RESEARCH",
    title: "CP-SAM — Grid Anomaly Detection",
    blurb:
      "A MERN-stack visualisation application for anomaly detection on electrical grid data, published as the CP-SAM security assessment tool at Washington State University.",
    stack: "MERN · MongoDB · Data viz",
    at: "WSU · SGDRIL Lab",
  },
];

/* Architecture of the agent orchestration platform built in the current role. */
export type NodeSpec = {
  id: string; x: number; y: number; w: number; h: number;
  title: string; kind: string; detail: string; points: string[];
};

export const archNodes: NodeSpec[] = [
  { id: "chat", x: 18, y: 165, w: 104, h: 52, title: "AI Chat", kind: "product",
    detail: "The in-product chat surface, built in Vue 3 and React. Streams tokens as they arrive, holds conversation state, and degrades gracefully with retry and fallback handling.",
    points: ["Streaming responses", "Conversation state", "Retry + fallback"] },
  { id: "registry", x: 168, y: 58, w: 118, h: 46, title: "Registry", kind: "multi-tenant",
    detail: "Where internal product teams register and configure their own agents — model, tools, prompts, limits — instead of each team wiring a bespoke integration.",
    points: ["Self-serve agent config", "Per-team isolation", "Versioned definitions"] },
  { id: "orch", x: 168, y: 165, w: 118, h: 52, title: "Orchestrator", kind: "python service",
    detail: "The core service that runs the agent loop: resolves the tenant's configuration, plans tool calls, executes them, and assembles the response.",
    points: ["Multi-tenant API", "Agent execution loop", "Tool-call planning"] },
  { id: "mcp", x: 340, y: 58, w: 122, h: 46, title: "MCP Servers", kind: "tool layer",
    detail: "Model Context Protocol servers exposing product data and internal APIs to agents behind one contract — which is what took new integrations from weeks to days.",
    points: ["Governed data access", "Internal API bridge", "Weeks → days to integrate"] },
  { id: "rag", x: 340, y: 165, w: 122, h: 46, title: "Memory RAG", kind: "retrieval",
    detail: "Retrieval over a vector database that grounds every response in company data, plus the conversation memory the agent carries between turns.",
    points: ["Vector database", "Embedding + retrieval", "Grounded in company data"] },
  { id: "llm", x: 340, y: 272, w: 122, h: 46, title: "LLM Providers", kind: "inference",
    detail: "OpenAI and Anthropic models behind a provider abstraction, so a team can change model without changing their agent.",
    points: ["OpenAI · Anthropic", "Provider abstraction", "Prompt engineering"] },
  { id: "obs", x: 516, y: 272, w: 118, h: 46, title: "Observability", kind: "telemetry",
    detail: "Distributed tracing and Datadog instrumentation across services — the change that cut time to diagnose cross-service faults by roughly a third.",
    points: ["Distributed tracing", "Datadog dashboards", "~35% faster diagnosis"] },
  { id: "stream", x: 516, y: 165, w: 118, h: 52, title: "Response", kind: "egress",
    detail: "The assembled answer streamed back to the product surface with its tool calls and retrieved context accounted for.",
    points: ["Token streaming", "Tool-call trace", "Graceful degradation"] },
  { id: "k8s", x: 668, y: 165, w: 74, h: 52, title: "K8s", kind: "deploy",
    detail: "Containerised and deployed on Kubernetes through GitHub Actions, with the front end built by Vite.",
    points: ["Docker + Kubernetes", "GitHub Actions", "Vite builds"] },
];

export const archEdges: [string, string][] = [
  ["chat", "orch"], ["registry", "orch"], ["orch", "mcp"], ["orch", "rag"],
  ["orch", "llm"], ["orch", "stream"], ["mcp", "stream"], ["rag", "stream"],
  ["llm", "obs"], ["obs", "stream"], ["stream", "k8s"],
];

export const logLines: [string, string][] = [
  ["agent", "tenant <u>marketing</u> · agent <u>campaign-assist</u> resolved"],
  ["mcp", "contacts.search ok · <u>62ms</u>"],
  ["rag", "vector recall <u>0.93</u> · 18 chunks → 5"],
  ["llm", "streaming · <u>claude</u> · first token <u>310ms</u>"],
  ["mcp", "invoice.lookup ok · <u>88ms</u>"],
  ["trace", "span <u>orchestrator→mcp→rag</u> complete"],
  ["chat", "streamed <u>842</u> tokens · session retained"],
  ["k8s", "rollout <u>agent-orchestrator</u> · 3/3 healthy"],
];
