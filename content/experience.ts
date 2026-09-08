export type Role = {
  period: string;
  start: string;
  title: string;
  company: string;
  note?: string;
  location: string;
  bullets: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    period: "Apr 2023 — Present",
    start: "2023",
    title: "Senior Software Engineer (Tech Lead)",
    company: "Thryv Inc.",
    note: "Keap, acquired by Thryv",
    location: "Phoenix, AZ",
    bullets: [
      "Architected and shipped a Python agent orchestration service — a multi-tenant API where internal product teams register, configure and run their own LLM agents — replacing per-team one-off integrations across a CRM and marketing-automation platform serving 15,000+ small businesses.",
      "Built Model Context Protocol (MCP) tool servers giving agents access to product data and internal APIs, cutting new AI integration effort from weeks to days.",
      "Designed a memory RAG pipeline on a vector database that grounds agent responses in company data, and delivered the in-product AI chat experience end to end — streaming responses, conversation state, retry and fallback handling — in Vue 3 and React.",
      "Own front-end architecture platform-wide: drove the Webpack-to-Vite migration and a shared Vue and React component library that cut CI build times ~30% and removed ~40% of duplicated UI code.",
      "Lead and mentor onshore and offshore engineers; introduced distributed tracing and Datadog instrumentation that cut time to diagnose cross-service faults ~35%.",
    ],
    tags: ["Agent orchestration", "MCP", "RAG", "Vue 3", "React", "Python", "Datadog"],
  },
  {
    period: "Mar 2021 — Mar 2023",
    start: "2021",
    title: "Senior Software Engineer",
    company: "USAA",
    location: "Plano, TX",
    bullets: [
      "Built and shipped a React and TypeScript eligibility platform determining member qualification for USAA banking and insurance products, serving a member base in the millions.",
      "Implemented route-level code splitting with React Router, reducing initial bundle size 15% and improving first contentful paint.",
      "Architected Redux state management for a multi-step SPA and a reusable component system in JSX and SCSS, standardising data flow across 3+ feature teams and eliminating a recurring class of state-sync defects.",
      "Partnered with backend engineers on REST contract design and deployed through GitLab CI to AWS with Docker and Kubernetes in two-week Agile sprints.",
    ],
    tags: ["React", "TypeScript", "Redux", "Kubernetes", "AWS", "GitLab CI"],
  },
  {
    period: "Sep 2020 — Mar 2021",
    start: "2020",
    title: "Software Engineer",
    company: "PayPal Inc.",
    location: "San Jose, CA",
    bullets: [
      "Built single-page payment-flow front ends in React and Redux with action-based store updates, plus JWT authorisation and Node.js data-exchange layers between clients and backend services.",
      "Established the production build pipeline — Webpack, Babel, Sass — and raised release confidence with Jest, Enzyme, Selenium and TestNG suites, increasing coverage to 97%.",
    ],
    tags: ["React", "Redux", "Node.js", "JWT", "Jest", "Selenium"],
  },
  {
    period: "Jan 2020 — Sep 2020",
    start: "2020",
    title: "Front End Developer",
    company: "SGDRIL Lab — Washington State University",
    location: "Pullman, WA",
    bullets: [
      "Built a MERN-stack visualisation application for anomaly detection on electrical grid data, published as the CP-SAM security assessment tool.",
      "Developed RESTful services in Node.js and Express with MongoDB, including JWT authentication, and automated build and test steps through Jenkins CI.",
    ],
    tags: ["MERN", "MongoDB", "Data viz", "Jenkins", "Research"],
  },
  {
    period: "Mar 2014 — Dec 2017",
    start: "2014",
    title: "Front End Developer",
    company: "Paramount Tech Solutions & Services Pvt. Ltd",
    note: "intern → part-time → full-time",
    location: "India",
    bullets: [
      "Joined as an intern while completing my B.Tech, moved to part-time through my degree, then full-time after graduating — the four years where I learned to ship.",
      "Delivered client-facing web applications in Angular, React, JavaScript, HTML5 and CSS3 for 50+ enterprise clients, improving page render performance.",
      "Authored the database queries, stored procedures and triggers behind those screens.",
    ],
    tags: ["Angular", "React", "JavaScript", "SQL"],
  },
];

export const education = [
  {
    school: "Washington State University",
    degree: "M.Sc. Computer Science",
    year: "May 2020",
  },
  {
    school: "",
    degree: "B.Tech, Electronics & Telecommunication",
    year: "June 2016",
  },
];

export const certifications = [
  "AWS and React — Creating a Full-Stack Application (LinkedIn Learning)",
];
