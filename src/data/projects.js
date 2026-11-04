/** Work shelf copy */
export const work = {
  badge: "04 — Work",
  title: "Things I've shipped.",
  blurb:
    "Live products in the wild — agency systems, client platforms, and sites that book revenue.",
  note: "Live builds · founding engineer · Editco Media",
  scrollHint: "Open a project for the full case",
};

/**
 * Full project library.
 * Case pages at `/work/[id]` use summary, problem, method, stackNotes, shipped, images.
 * Zig-zag: Agency(wide)+Cubic | Dentin+Hazel(wide) | Editco(wide)+HRMS
 */
export const projects = [
  {
    id: "agency-erp",
    featured: true,
    wide: true,
    title: "Agency ERP",
    category: "SaaS",
    discipline: "Interior ERP",
    tag: "SaaS · Interior ERP",
    year: "2025 —",
    period: "2025 – Present",
    role: "Founding Engineer",
    org: "Editco Media",
    blurb:
      "One system for clients, projects, people, and money — instead of a pile of spreadsheets.",
    summary:
      "Agency ERP is the operating system for an interior agency that grew past WhatsApp and Sheets. One login for leads, pipeline, BDAs, clients, and money — so the team stops asking “where’s the latest file?” and starts working from a single source of truth.",
    problem:
      "Interior agencies scale messy. Leads live in DMs. Follow-ups die in notebooks. Pipeline is a gut feeling. Finance finds out late. When every BDA has their own spreadsheet, leadership can’t see who’s contacting, what’s stuck, or which deals are real. Tools don’t talk. Handoffs leak. Revenue becomes guesswork.",
    method:
      "Mapped the real agency day — lead → contact → qualify → proposal → project → invoice — then built a role-based workspace around it. Live dashboards for BDA performance, open pipeline, and deals. Not another CRM skin: an ops spine that Editco actually runs on.",
    outcome:
      "One workspace for clients, teams, and money. Less tab-switching. Cleaner handoffs. Leadership sees the floor without chasing screenshots.",
    shipped: [
      "Client + project CRM on one spine — from first lead to active delivery",
      "Team & role management so BDAs, admins, and founders see the right slice",
      "Invoicing & payments tied to the same client record as the pipeline",
      "Live ops dashboard — who’s contacting, open pipeline, follow-ups due, open deals",
    ],
    features: [
      "Client + project CRM",
      "Team & role management",
      "Invoicing & payments",
      "Ops dashboard",
    ],
    stack: ["Next.js", "Supabase", "Tailwind", "REST"],
    stackNotes: [
      {
        name: "Next.js",
        note: "App shell for dashboards, auth gates, and fast internal tooling",
      },
      {
        name: "Supabase",
        note: "Auth, data, and real-time ops without babysitting a custom backend",
      },
      {
        name: "Tailwind",
        note: "Dense admin UI that stays readable under daily use",
      },
      {
        name: "REST",
        note: "APIs for leads, pipeline, and team stats that other surfaces can reuse",
      },
    ],
    images: [
      {
        src: "/work/agency-erp/01-dashboard.png",
        alt: "Agency ERP sales team dashboard for Editco Media",
        caption:
          "Live Agency ERP dashboard — BDA performance, pipeline, and open deals",
      },
      {
        src: "/work/agency-erp/02-dashboard.png",
        alt: "Agency ERP sign-in workspace",
        caption: "Agency login — email and password into the workspace",
      },
    ],
    href: "https://dashboards.editcomedia.com/dashboard",
  },
  {
    id: "cubic-pms",
    featured: true,
    title: "Cubic PMS",
    category: "SaaS",
    discipline: "Project Management",
    tag: "SaaS · Project Mgmt",
    year: "2025 —",
    period: "2025 – Present",
    role: "Full-Stack Developer",
    org: "Editco Media",
    blurb:
      "Tasks, boards, BOQ, and site work — one workspace for an interior studio.",
    summary:
      "Cubic (Clyro) is the interior studio OS — enquiries, drawings, quotations, materials, site, and billing in one workspace. Built so architects and site teams stop bouncing between boards, BOQs, and WhatsApp threads that never agree.",
    problem:
      "Studio leads plan on boards. Site teams live on the floor. Estimates sit in a separate file. By handover, nobody trusts the “latest” BOQ. Generic project tools don’t speak joinery, drawings, or vendor shortlists — so studios duct-tape five apps and still miss deadlines.",
    method:
      "Designed a board-first PMS with BOQ baked into the same project spine as tasks and site progress. React + Node stack for lists, boards, files, and comments next to the work — from first brief to handover, not another Notion clone with a construction sticker.",
    outcome:
      "Studio + site on one timeline. Faster updates. Fewer “where’s the latest BOQ?” moments. One workspace from enquiry to billing.",
    shipped: [
      "Kanban + task boards that stay synced with the same project as estimates",
      "BOQ / estimate workflows sitting beside drawings and vendor shortlists",
      "Site progress tracking so the floor and the studio share one status",
      "Team collaboration — files, comments, and assignments without a side chat",
    ],
    features: [
      "Kanban + task boards",
      "BOQ / estimate workflows",
      "Site progress tracking",
      "Team collaboration",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    stackNotes: [
      {
        name: "React",
        note: "Studio UI for boards, tasks, and product landing that sells the OS",
      },
      {
        name: "Node.js",
        note: "API layer for projects, auth, and studio workflows under load",
      },
      {
        name: "Express",
        note: "Routes for tasks, BOQ, and collaboration without a heavy framework tax",
      },
      {
        name: "MongoDB",
        note: "Flexible project docs — boards, estimates, and site data that evolve together",
      },
    ],
    images: [
      {
        src: "/work/cubic-pms/01-login.png",
        alt: "Cubic PMS / Clyro product landing",
        caption: "Clyro — interior architecture OS with studio dashboard preview",
      },
      {
        src: "/work/cubic-pms/02-login.png",
        alt: "Cubic PMS product details",
        caption: "One workspace from first brief to handover",
      },
    ],
    href: "https://pms-cubic.vercel.app/login",
  },
  {
    id: "dentin",
    featured: true,
    title: "Dentin Oral Experts",
    category: "Web",
    discipline: "Booking",
    tag: "Web · Booking",
    year: "2025 —",
    period: "2025 – Present",
    role: "Web + Growth",
    org: "Editco Media",
    blurb:
      "Dental clinic site with live calendar booking — SEO and sales up ~60%.",
    summary:
      "Dentin is a clinic site rebuilt around one job: get the patient on the calendar. Live booking, clear services, and local SEO — so “painless dental care” isn’t just a headline, it’s a path that converts search into appointments.",
    problem:
      "The clinic was losing people to phone tag. The old site looked fine and converted poorly. Local search didn’t send intent to a bookable moment. Patients bounced. Front desk chased callbacks. Growth was stuck behind “call us during hours.”",
    method:
      "Stripped the brochure fluff. Hero leads to booking. Services show proof and a next step. Calendar opens in a secure flow — no app download. Local SEO and page structure aimed at Hyderabad intent. Friction cut until booking felt obvious.",
    outcome:
      "SEO + sales lifted ~60%. Patients book without calling first. The site earns its keep as a growth channel, not a digital visiting card.",
    shipped: [
      "Live calendar booking that opens cleanly — hygiene and consult slots without phone tag",
      "Clinic service pages with clear proof points and a path to book",
      "SEO + local search structure aimed at people already looking for care nearby",
      "Lead capture flows that don’t dump everything into a dead contact form",
    ],
    features: [
      "Live calendar booking",
      "Clinic service pages",
      "SEO + local search",
      "Lead capture flows",
    ],
    stack: ["Webflow", "Calendar API", "SEO"],
    stackNotes: [
      {
        name: "Webflow",
        note: "Fast, editable marketing site the clinic can evolve without a deploy ritual",
      },
      {
        name: "Calendar API",
        note: "Real slots, real bookings — not a “we’ll call you back” form",
      },
      {
        name: "SEO",
        note: "Local intent mapped to pages that actually convert, not vanity rankings",
      },
    ],
    images: [
      {
        src: "/work/dentin/01-hero.png",
        alt: "Dentin Oral Experts homepage",
        caption: "Clinic homepage oriented around booking, not phone tag",
      },
      {
        src: "/work/dentin/02-services.png",
        alt: "Dentin services and booking",
        caption: "Live calendar booking and clinic services",
      },
    ],
    href: "https://www.dentinoralexperts.com/",
  },
  {
    id: "hazel-india",
    featured: true,
    wide: true,
    title: "Hazel India",
    category: "Web",
    discipline: "Facility Management",
    tag: "Web · Facility",
    year: "2025 —",
    period: "2025 – Present",
    role: "Full-Stack Developer",
    org: "Editco Media",
    blurb:
      "AI-led green facility site for Hyderabad — services, sectors, and the audit path in.",
    summary:
      "Marketing site for an AI-led green facility company in Hyderabad — services, sectors, and a free facility audit as the main path in. Soft IFM and technical services in one catalog, built to educate and convert without brochure fluff.",
    problem:
      "Facility brands often look interchangeable online: stock photos, vague “end-to-end solutions,” and a contact form that goes nowhere. Hazel needed a site that explained green IFM, showed real service breadth, and made the free audit the obvious next step — not a buried PDF request.",
    method:
      "Led with the audit in the hero. Catalogued non-technical and technical services with clear photography and paths. Sectors from residential through healthcare. Transparency and engagement models on-page. Next.js + Tailwind for a fast, SEO-ready public face that still feels human.",
    outcome:
      "One public site for Hazel’s facility offer — from housekeeping and MEP through waste, F&B, emergency, and logistics — ending in an audit request people can actually take.",
    shipped: [
      "Hero that leads with the audit, not a brochure",
      "Soft and technical IFM services in one catalog — housekeeping through logistics",
      "Sectors from residential through healthcare with clear entry points",
      "Transparency and engagement models on the same page as the offer",
    ],
    features: [
      "Service + sector pages",
      "Audit lead funnel",
      "AI-assisted content",
      "SEO-ready structure",
    ],
    stack: ["Next.js", "Tailwind CSS", "SEO"],
    stackNotes: [
      {
        name: "Next.js",
        note: "Marketing performance + structured pages for services and sectors",
      },
      {
        name: "Tailwind CSS",
        note: "Clean IFM visual system — light, credible, conversion-first",
      },
      {
        name: "SEO",
        note: "Hyderabad facility intent mapped to audit CTAs, not empty blog filler",
      },
    ],
    images: [
      {
        src: "/work/hazel-india/01-hero.jpg",
        alt: "Hazel India homepage: smarter facilities, cleaner spaces, and a free audit call to action",
        caption:
          "Hazel India homepage: smarter facilities, cleaner spaces, and a free audit call to action",
      },
      {
        src: "/work/hazel-india/02-services.jpg",
        alt: "IFM services including waste management, F&B, ambulance, transport, mailroom, and logistics",
        caption:
          "IFM services — waste, F&B, emergency preparedness, transport, mailroom, and logistics",
      },
    ],
    href: "https://www.hazelindia.com/",
  },
  {
    id: "editco",
    featured: true,
    wide: true,
    title: "Editco Media",
    category: "Web",
    discipline: "Agency",
    tag: "Web · Agency",
    year: "2025 —",
    period: "2025 – Present",
    role: "Founder · Design + Eng",
    org: "Editco Media",
    blurb:
      "The studio front door — websites, AI calling agents, and growth systems.",
    summary:
      "Editco’s own front door — the site that has to sell websites, AI calling agents, and growth systems the way we actually build them. Brand-first, conversion-shaped, and honest about broken systems being the real customer problem.",
    problem:
      "Agency sites usually look like every other agency site: soft claims, vague “digital solutions,” zero proof of how the studio thinks. Editco needed a presence that matches the product work — sharp, opinionated, and able to turn curiosity into a booked call.",
    method:
      "Built the brand and the site together. Big type, dark grid, productized services, AI agent offerings, and CTAs that don’t apologize. Motion where it earns attention. Pages structured so a founder understands the offer in under a minute.",
    outcome:
      "A front door that matches the work — and books conversations. The studio looks like what it ships.",
    shipped: [
      "Services + selected works that show systems, not just pretty mocks",
      "AI agent offerings framed as growth infrastructure, not buzzwords",
      "Brand system strong enough to carry products and proposals",
      "Conversion-focused pages — book a call and growth calculator as real paths",
    ],
    features: [
      "Services + case studies",
      "AI agent offerings",
      "Brand system",
      "Conversion-focused pages",
    ],
    stack: ["Next.js", "Tailwind", "Motion"],
    stackNotes: [
      {
        name: "Next.js",
        note: "Studio site that stays fast while the brand and offers evolve",
      },
      {
        name: "Tailwind",
        note: "Tight visual system — ink, lemon, and type at display scale",
      },
      {
        name: "Motion",
        note: "Presence and hierarchy on scroll — not decorative noise",
      },
    ],
    images: [
      {
        src: "/work/editco/01-hero.png",
        alt: "Editco Media homepage",
        caption: "Studio homepage — brand-first, conversion-ready",
      },
      {
        src: "/work/editco/02-services.png",
        alt: "Editco services and AI agents",
        caption: "Productized services and growth systems",
      },
    ],
    href: "https://www.editcomedia.com/",
  },
  {
    id: "hrms",
    featured: true,
    title: "HRMS",
    category: "Business",
    discipline: "Ops",
    tag: "Business · Ops",
    year: "2025",
    period: "2025",
    role: "Full-Stack Developer",
    org: "Editco Media",
    blurb:
      "HR system with attendance, live location, and an employee dashboard on Firebase.",
    summary:
      "An HRMS built for teams that don’t all sit at desks — attendance, leave, offers, onboarding, and payroll in one green-ops suite. Managers see the floor; HR stops chasing spreadsheets for who’s present, pending, or paid.",
    problem:
      "Field and hybrid teams break traditional HR tools. Attendance becomes a trust exercise. Leave and offers live in inboxes. Payroll is a monthly panic. Managers need one dashboard; employees need a clear directory — not five portals and a shared drive.",
    method:
      "React + Firebase suite: workforce KPIs, attendance trends, offer pipeline, action center, and an employees directory with department filters. Built for daily HR admin use — add employee, review leave, track offers, process payroll — without enterprise bloat.",
    outcome:
      "Clearer attendance. Less chase. Managers and HR share one picture of the floor, the pipeline, and what’s pending.",
    shipped: [
      "Dashboard with workforce, present-today, leave exceptions, and pending HR actions",
      "Attendance trends and offer-letter pipeline in the same ops view",
      "Employees directory — search, department filters, status, and edit paths",
      "Payroll snapshot and action center so reviews don’t hide in email",
    ],
    features: [
      "Attendance tracking",
      "Live location",
      "Employee dashboard",
      "Firebase backend",
    ],
    stack: ["React", "Firebase"],
    stackNotes: [
      {
        name: "React",
        note: "Dense HR UI — tables, filters, and cards that stay usable all day",
      },
      {
        name: "Firebase",
        note: "Auth and data for attendance, employees, and admin roles without heavy ops",
      },
    ],
    images: [
      {
        src: "/work/hrms/01-dashboard.png",
        alt: "HRMS dashboard with attendance, offers, and payroll",
        caption:
          "HRMS dashboard — workforce, attendance trends, offers, and payroll",
      },
      {
        src: "/work/hrms/02-employees.png",
        alt: "HRMS employees directory with filters and status",
        caption:
          "Employees directory — search, department filters, and active roster",
      },
    ],
    href: null,
  },
  {
    id: "spark",
    featured: true,
    title: "Spark",
    category: "Analytics",
    discipline: "Rankings",
    tag: "Analytics · Rankings",
    year: "2026",
    period: "2026",
    role: "Product Engineer",
    org: "Editco Media",
    blurb:
      "Live UGC leaderboard — 649 creators scored and ranked daily for NxtWave.",
    summary:
      "Spark is a live UGC leaderboard for creator programs — hundreds of creators scored on posts and growth, ranked daily, with a public board that feels fair and an admin path when ops need to intervene.",
    problem:
      "Creator challenges die when rankings are a weekly spreadsheet. Opaque scores kill trust. Delayed updates kill momentum. Ops need overrides without looking arbitrary. Participants need a board they can believe — live, ranked, and clear about what earns points.",
    method:
      "Built a scoring pipeline and live board: ingest signals, rank by Spark points, surface top creators with progress bars and tiers. Public leaderboard for creators; admin portal for controls. Cron + APIs so the board refreshes without a human paste job.",
    outcome:
      "648+ creators on a live board. Transparent points. Ops can steer without breaking trust. The challenge stays competitive because the scoreboard stays honest.",
    shipped: [
      "Daily scoring engine that turns posts and growth into Spark points",
      "Live leaderboard — rank, creator, tier badges, progress, and points",
      "Creator search and program context so participants know the window and rules",
      "Admin ranking controls for audits and overrides when the program needs them",
    ],
    features: [
      "Daily scoring engine",
      "Live leaderboard",
      "Creator analytics",
      "Admin ranking controls",
    ],
    stack: ["Next.js", "APIs", "Tailwind", "Cron"],
    stackNotes: [
      {
        name: "Next.js",
        note: "Public board + admin surfaces that stay fast under creator traffic",
      },
      {
        name: "APIs",
        note: "Ingest and rank signals without hand-maintained sheets",
      },
      {
        name: "Tailwind",
        note: "Dark, high-contrast competition UI — readable ranks at a glance",
      },
      {
        name: "Cron",
        note: "Daily scoring jobs so the board doesn’t wait on someone to hit refresh",
      },
    ],
    images: [
      {
        src: "/work/spark/01-leaderboard.png",
        alt: "Spark live creator leaderboard",
        caption:
          "Spark leaderboard — top creators by points, live across 648 creators",
      },
    ],
    href: "https://spark.editcomedia.com/admin-dashboard",
  },
  {
    id: "buildtrack",
    featured: true,
    title: "BuildTrack",
    category: "AI",
    discipline: "Construction",
    tag: "AI · Construction",
    year: "2026",
    period: "2025 – 2026",
    role: "Co-builder · BRAVE Winner",
    org: "Editco Media",
    blurb:
      "AI construction cost intelligence — budgets, materials, and leakage detection that won BRAVE 2026.",
    summary:
      "BuildTrack is construction cost intelligence for owners who are tired of finding out the truth after the money is gone. One workspace for budgets, materials, procurement, and AI flags when spend drifts — so a site in Chennai doesn’t become a black box for someone overseas.",
    problem:
      "Building a home or apartment block in India is messy money. Owners and NRIs get WhatsApp updates, paper BOQs, and vendor bills that never line up. By the time someone asks “where did the budget go?”, labour, materials, and change orders have already eaten the margin. Spreadsheets lag the site. Photos don’t explain cost. Nobody has a live planned-vs-actual spine.",
    method:
      "We treated the site like a product, not a report. Mapped the real loop — plan budget → track daily spend → watch materials & procurement → flag leakage early — then shipped a React + Python workspace with project overview, budget graphs, category breakdowns, and alerts. AI sits on the numbers, not as a gimmick: it surfaces drift so humans can decide. Validated end-to-end through BRAVE 2026 with a live Sunrise Apartments-style workspace.",
    outcome:
      "1st place at BRAVE 2026. National press. A live platform owners and teams can open today — clarity before the money disappears, not after.",
    shipped: [
      "Budget planning with phase baselines and remaining runway — not a static Excel dump",
      "Material tracking tied to what actually moved on site, not what was promised on paper",
      "Procurement workflows so purchase orders and vendor spend sit next to the plan",
      "Cost leakage detection that flags when actual spend pulls away from planned",
      "Reports & analytics — planned vs actual curves, category spend, and executive overview in one place",
    ],
    features: [
      "Budget planning",
      "Material tracking",
      "Procurement workflows",
      "Cost leakage detection",
      "Reports & analytics",
    ],
    stack: ["React", "Python", "AI", "APIs"],
    stackNotes: [
      {
        name: "React",
        note: "Owner-facing workspace — overview, charts, and daily ops without spreadsheet chaos",
      },
      {
        name: "Python",
        note: "Cost logic, aggregations, and the brains behind planned-vs-actual",
      },
      {
        name: "AI",
        note: "Leakage and drift signals on real project numbers — assistive, not theatrical",
      },
      {
        name: "APIs",
        note: "Project data, auth, and live updates across planning, materials, and reports",
      },
    ],
    images: [
      {
        src: "/work/buildtrack/01-dashboard.png",
        alt: "BuildTrack project overview dashboard",
        caption:
          "Sunrise Apartments workspace — budget used, remaining runway, planned vs actual, and spend by category",
      },
      {
        src: "/work/buildtrack/02-login.png",
        alt: "BuildTrack platform login",
        caption:
          "Platform login — real estate teams into a project dashboard, not another folder of sheets",
      },
    ],
    href: "https://buildtrack.editcomedia.com/project/p-4/overview",
  },
  {
    id: "easymove",
    featured: true,
    title: "EasyMove",
    category: "Healthcare",
    discipline: "Physio",
    tag: "Healthcare",
    year: "2025",
    period: "2025",
    role: "Full-Stack Developer",
    org: "Editco Media",
    blurb:
      "Physiotherapy management — exercises, QR flows, and a patient dashboard clinics can run.",
    summary:
      "EasyMove digitizes the physio care loop — exercise library, QR handoff, patient dashboard, and session tracking — so clinics stop printing plans that vanish between visits.",
    problem:
      "Physio adherence dies on paper. Clinics print exercise sheets. Patients lose them. Therapists can’t see what happened between sessions. Continuity depends on memory and WhatsApp photos. Scaling a clinic shouldn’t mean scaling printers.",
    method:
      "Built a React + Firebase flow: therapists assign from an exercise library, patients pick up via QR, dashboard tracks sessions. Designed for clinic ops first — assign, follow, adjust — not a consumer fitness app in a lab coat.",
    outcome:
      "Clinics assign. Patients follow. Less paper. Better continuity between sessions.",
    shipped: [
      "Exercise library therapists can assign without reinventing every plan",
      "QR code handoff so patients open the right plan without app-store friction",
      "Patient dashboard for what’s due between visits",
      "Session tracking so the clinic sees adherence, not guesses",
    ],
    features: [
      "Exercise library",
      "QR code generation",
      "Patient dashboard",
      "Session tracking",
    ],
    stack: ["React", "Firebase"],
    stackNotes: [
      {
        name: "React",
        note: "Clinic and patient surfaces that stay simple under real appointment pressure",
      },
      {
        name: "Firebase",
        note: "Auth, plans, and session data without standing up heavy hospital IT",
      },
    ],
    images: [
      {
        src: null,
        alt: "EasyMove patient dashboard",
        caption: "Patient dashboard with QR exercise handoff",
      },
    ],
    href: null,
  },
  {
    id: "healthcare-ai",
    featured: true,
    title: "Healthcare AI",
    category: "AI",
    discipline: "Health",
    tag: "AI · Health",
    year: "2025",
    period: "2025",
    role: "AI + Product",
    org: "Editco Media",
    blurb:
      "Medical AI assistant — prescriptions, reports, and X-ray support in one clinical workflow.",
    summary:
      "A clinical assistant layer for first-pass help on prescriptions, reports, and X-ray support — upload, interpret, summarize — with humans kept firmly in the loop. Built to speed triage, not replace judgment.",
    problem:
      "Clinicians drown in documents. Prescriptions, lab reports, and imaging land faster than anyone can first-pass them. Full EHRs are heavy. Generic chatbots are reckless. Teams needed assistive speed with clear boundaries — not another black-box diagnosis toy.",
    method:
      "Productized an upload → interpret → summarize path in React + Python/AI APIs. Prescriptions and reports get structured help; X-ray support stays assistive. Every flow assumes a human makes the call. No fake certainty.",
    outcome:
      "Faster triage of documents. Assistive, not reckless. Clinicians keep authority; the tool removes grind.",
    shipped: [
      "Prescription upload with structured first-pass assistance",
      "AI medical assistant framed as support, not autonomous care",
      "Report summaries that shorten time-to-read without inventing findings",
      "X-ray analysis support with human-in-the-loop boundaries",
    ],
    features: [
      "Prescription upload",
      "AI medical assistant",
      "Report summaries",
      "X-ray analysis support",
    ],
    stack: ["Python", "AI APIs", "React"],
    stackNotes: [
      {
        name: "Python",
        note: "Document and model pipelines behind the clinical assistant",
      },
      {
        name: "AI APIs",
        note: "Interpretation and summarization with explicit human review steps",
      },
      {
        name: "React",
        note: "Clear upload and review UI — speed without hiding uncertainty",
      },
    ],
    images: [
      {
        src: null,
        alt: "Healthcare AI assistant",
        caption: "Upload → interpret → summarize with human-in-the-loop",
      },
    ],
    href: null,
  },
  {
    id: "thinker",
    featured: true,
    title: "Thinker",
    category: "AI",
    discipline: "Research",
    tag: "AI · Research",
    year: "2026",
    period: "2026",
    role: "Full-Stack · AI Research",
    org: "Editco Media",
    blurb:
      "Evidence-first research workspace — search public sources, score what actually came back, and brief startup ideas without fake data.",
    summary:
      "Thinker (Content Radar) is an evidence-first research workspace. It searches public sources, stores what actually returned — URL, time, real metrics only — and helps founders score ideas, hooks, and startup briefs without inventing the internet.",
    problem:
      "Most “research” tools hallucinate engagement, blur sources, or fill empty APIs with sample posts. Founders making bets need receipts: what did Hacker News, GitHub, or News actually return? When a source is offline, the UI should say so — not fake a feed.",
    method:
      "FastAPI + React app with workspaces, roles, and a research pipeline. Public connectors for HN, Wikipedia, Google News, GitHub, RSS; paid sources stay dark until keys exist. Scoring, clusters, hooks, opportunities, monitors, calendars, and PDF/CSV reports run on stored rows only. AI writer is optional and key-gated.",
    outcome:
      "A research spine that never fabricates posts. Missing metrics stay missing. Scores explain their inputs. Founders can think with evidence, not vibes.",
    shipped: [
      "Multi-source research search with source status — not_configured stays empty, not faked",
      "Evidence-backed scoring & clusters from stored items only",
      "Hooks, ideas, and opportunity boards pulled from real titles and signals",
      "Startup briefs that keep competitors unconfirmed until a human marks them",
      "Monitors, calendar planning, and workspace roles for a real research team",
      "Optional AI writer — visibly off until credentials exist",
    ],
    features: [
      "Multi-source research search",
      "Evidence-backed scoring & clusters",
      "Hooks, ideas & opportunity board",
      "Startup briefs & PDF/CSV reports",
      "Monitors, calendar & workspace roles",
      "Optional AI writer (key-gated)",
    ],
    stack: ["React", "FastAPI", "Python", "SQLite", "AI"],
    stackNotes: [
      {
        name: "React",
        note: "Research UI — search, library, hooks, and briefs without inventing chrome",
      },
      {
        name: "FastAPI",
        note: "Auth, orgs, jobs, and connectors with clear failure modes",
      },
      {
        name: "Python",
        note: "Pipelines for ingest, scoring, analysis, and reports",
      },
      {
        name: "SQLite",
        note: "Local-first evidence store — every hit keeps URL and collection time",
      },
      {
        name: "AI",
        note: "Optional writer and embeddings — never used to fake source data",
      },
    ],
    images: [
      {
        src: null,
        alt: "Thinker research workspace",
        caption: "Evidence-first search across public sources",
      },
      {
        src: null,
        alt: "Thinker startup brief",
        caption: "Startup briefs built only from stored rows",
      },
    ],
    href: null,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(id) {
  return projects.find((p) => p.id === id) || null;
}

/** Normalize fields for the /work/[id] case page. */
export function getProjectCase(project) {
  if (!project) return null;
  const tagParts = String(project.tag || "")
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    id: project.id,
    title: project.title,
    category: project.category || tagParts[0] || "Project",
    discipline: project.discipline || tagParts[1] || "",
    role: project.role || "Builder",
    period: project.period || project.year || "",
    org: project.org || "Editco Media",
    summary: project.summary || project.blurb || "",
    problem: project.problem || "",
    method: project.method || "",
    shipped: project.shipped || project.features || [],
    outcome: project.outcome || "",
    stack: project.stack || [],
    stackNotes: project.stackNotes || null,
    images: project.images || [],
    href: project.href || null,
  };
}
