import { I } from "./stackIcons";

/** Curated set for the falling physics — keeps the stage readable */
export const fallingStackItems = [
  { label: "React", icon: I.react, tone: "paper" },
  { label: "Node.js", icon: I.node, tone: "lemon" },
  { label: "Express.js", icon: I.express, tone: "ember" },
  { label: "MERN", icon: I.mern, tone: "lemon" },
  { label: "Next.js", icon: I.nextjs, tone: "paper" },
  { label: "Python", icon: I.python, tone: "paper" },
  { label: "MongoDB", icon: I.mongodb, tone: "lemon" },
  { label: "Figma", icon: I.figma, tone: "paper" },
  { label: "Supabase", icon: I.supabase, tone: "ember" },
  { label: "AI Automations", icon: I.aiAuto, tone: "ember" },
  { label: "LangChain", icon: I.langchain, tone: "soft" },
  { label: "Gemini", icon: I.gemini, tone: "paper" },
  { label: "n8n", icon: I.n8n, tone: "lemon" },
  { label: "Vercel", icon: I.vercel, tone: "soft" },
  { label: "Cursor", icon: I.cursor, tone: "paper" },
];

/** Full toolkit — shown in the organized grid section */
export const stackCategories = [
  {
    id: "build",
    label: "Build",
    index: "01",
    vibe: "code → product",
    blurb: "Frontend, backend, databases — the engine room.",
    tone: "ink",
    items: [
      { label: "HTML / CSS", icon: I.html },
      { label: "React", icon: I.react },
      { label: "Node.js", icon: I.node },
      { label: "Express.js", icon: I.express },
      { label: "Python", icon: I.python },
      { label: "PHP", icon: I.php },
      { label: "MySQL", icon: I.mysql },
      { label: "MERN", icon: I.mern },
      { label: "Fast API", icon: I.fastapi },
      { label: "C++", icon: I.cpp },
      { label: "MongoDB", icon: I.mongodb },
      { label: "Supabase", icon: I.supabase },
    ],
  },
  {
    id: "design",
    label: "Design",
    index: "02",
    vibe: "pixels → polish",
    blurb: "Visuals that actually slap.",
    tone: "lemon",
    items: [
      { label: "Webflow", icon: I.webflow },
      { label: "UI/UX Design", icon: I.ui },
      { label: "Canva", icon: I.canva },
      { label: "Adobe Photoshop", icon: I.photoshop },
      { label: "Figma", icon: I.figma },
      { label: "Framer", icon: I.framer },
    ],
  },
  {
    id: "ship",
    label: "Ship",
    index: "03",
    vibe: "push → live",
    blurb: "Deploy, automate, move fast.",
    tone: "glass",
    items: [
      { label: "Netlify", icon: I.netlify },
      { label: "Vercel", icon: I.vercel },
      { label: "n8n", icon: I.n8n },
      { label: "Cursor", icon: I.cursor },
      { label: "Automations", icon: I.zap },
    ],
  },
];
