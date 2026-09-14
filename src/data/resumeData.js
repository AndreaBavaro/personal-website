const baseResume = {
  header: {
    name: "Andrea Wolfgang Diano-Bavaro",
    contact: {
      email: "andread-b@hotmail.com",
      links: [
        { text: "GitHub", url: "https://github.com/AndreaBavaro" },
        { text: "LinkedIn", url: "https://www.linkedin.com/in/andreawdb/" }
      ]
    },
    languages: "Bilingual: English & Italian"
  },
  skills: {
    programming: ["Go", "Java", "TypeScript", "Node.js", "Python", "Swift", "SQL", "C++", "Arduino/C", "Bash"],
    aiFrameworks: ["Anthropic Claude (Claude Code)", "OpenAI API", "Hume AI", "Windsurf AI", "React", "SwiftUI", "Angular", "Flask", "Pandas", "Spring Boot", "Robot Framework"],
    toolsCloud: ["Supabase", "PostgreSQL", "Oracle SQL", "AWS", "Docker", "Harness", "OpenShift", "GraphQL", "REST APIs", "Agile/Scrum", "Git"]
  },
  experience: [
    {
      title: "Full Stack Developer",
      company: "Citi",
      location: "Toronto, CA",
      date: "May 2023 - Present*",
      bullets: [
        "Engineering Automation: Engineered a Python-based migration engine to automate the transition of 20+ microservices from Swagger 2 to OpenAPI 3.0, and built a Go Update Server — reducing manual developer effort by 85% and presenting the solution to international engineering teams.",
        "Developer Experience: Spearheaded a UI/UX overhaul of a proprietary VS Code Extension (TypeScript/Node.js), modernizing internal workflows and establishing it as the primary productivity tool for the global engineering organization; built a Robot Framework validation layer for service health monitoring.",
        "Platform Integration: Independently architected a full-stack Python (Streamlit) data visualization dashboard backed by custom Oracle SQL views to track registry onboarding metrics; iterated on stakeholder feedback and migrated the solution into Citi's internal React production UI.",
        "AI-First Delivery: Standardized an AI-first development workflow across platform projects using Devin, GitHub Copilot and Delphyne, with shared prompt patterns and review practices adopted by the team, improving shipping speed by over 50%.",
        "Credit Data Migration: Built the GraphQL and Java backend queries behind a move to a new datastore covering hundreds of thousands of credit agreements, powering systems underwriters rely on to close corporate deals."
      ]
    },
    {
      title: "Junior Software Developer",
      company: "Western Algorithmic Trading Club",
      location: "London, CA",
      date: "Sep. 2022 - June 2024",
      bullets: [
        "Data Ingestion Pipeline: Architected a real-time sentiment analysis engine using Python and Selenium to automate the scraping of social media data, transforming text into actionable market signals."
      ]
    },
    {
      title: "Software Developer / Data Analyst",
      company: "YDM Incorporated",
      location: "Toronto, CA",
      date: "May 2022 - Aug. 2022",
      bullets: [
        "Operational Optimization: Leveraged Python (pandas) and SQL to identify structural cost inefficiencies, informing strategic shifts that resulted in a 10% reduction in costs."
      ]
    }
  ],
  projects: [
    {
      title: "Nitely (iOS)",
      technologies: ["Swift", "SwiftUI", "Supabase (PostgreSQL)", "Mapbox", "Next.js", "Claude Code"],
      links: [
        { label: "nitely.ca", url: "https://nitely.ca" },
        { label: "Download on the App Store", url: "https://apps.apple.com/us/app/nitely-toronto/id6758633905" }
      ],
      bullets: [
        "Full-stack iOS app (solo, end-to-end): Shipped a Toronto nightlife app to the App Store (140+ users, 5-star rated) with a Swift/SwiftUI front end and a Supabase backend (79 tables, 165+ RPCs, 10 edge functions, 24 cron jobs), plus a Next.js admin web app.",
        "Self-Growing Catalog (LLM pipelines): Built the ingest and enrichment system behind a catalog of 880+ venues assembled with zero manual data entry. Multimodal vision scores venue photos and reads drink prices off menu images; wait times and cover charges are extracted from free-text reviews. Every model call is schema-constrained with a closed vocabulary, re-validated after parsing and coerced again in SQL, so schema drift degrades to a missing field rather than a failed write.",
        "Reliability Under Real Constraints: Rotate across a three-model fallback chain on quota errors rather than backing off, since each model carries its own daily quota; a 70% quorum rule stops a rate limit from silently masquerading as a quality decision; drink prices use a median with a 3-MAD outlier trim instead of a mean.",
        "Agent-Orchestrated Development: Ran parallel Claude Code agents in isolated git worktrees with a hook-enforced pre-merge review gate that blocks a session from ending while code changes remain unreviewed, cutting code-review effort ~40% across 200+ builds.",
        "Recommendation Engine: Built a multi-section weighted recommendation engine (weighted Jaccard vibe and music overlap, exponential geo decay, Bayesian shrinkage for unrated venues) and operationalized Claude Code as a parallel-agent dev pipeline with a custom .claude/skills/ library and git-hook policy enforcement across 50+ Linear tickets."
      ]
    },
    {
      title: "AI Interview Insights Pipeline",
      technologies: ["Python", "Hume AI SDK", "Zoom SDK", "OpenAI", "FPDF"],
      bullets: [
        "Multi-Modal Pipeline: Built an automated system to capture Zoom recordings, performing facial sentiment analysis (Hume AI) and LLM-driven transcription to generate comprehensive PDF interview reports."
      ]
    },
    {
      title: "Wearable Haptic Massage Sleeve",
      technologies: ["Arduino", "C++", "Electrical Circuitry", "Hardware Prototyping"],
      bullets: [
        "Embedded Engineering: Designed and wired a custom electrical circuit for a self-massaging leg sleeve; programmed an Arduino chip to regulate haptic feedback patterns and motor pressure intervals."
      ]
    }
  ],
  education: [
    {
      school: "University of Western Ontario",
      location: "London, CA",
      degree: "Bachelor of Science in Computer Science",
      date: "2021 - 2024",
      details: "Relevant Coursework: OOP, Data Structures, Java, C++, Computer Networks"
    },
    {
      school: "Aarhus University",
      location: "Aarhus, DK",
      degree: "MSc Coursework (Study Abroad)",
      date: "2023",
      details: "Master's Level Credits: Wearable Hardware and Design, Augmented Reality Project"
    },
    {
      school: "St. Michael's College School",
      location: "Toronto, CA",
      degree: "Ontario Secondary School Diploma",
      date: "2015 - 2019",
      details: "Basilian Book Award (+90% Average)"
    }
  ]
};

export const europeanResume = {
  ...baseResume,
  header: {
    ...baseResume.header,
    citizenship: "(EU) Italian"
  }
};

export const globalResume = {
  ...baseResume,
  header: {
    ...baseResume.header,
    citizenship: "Canadian, (EU) Italian"
  }
};
