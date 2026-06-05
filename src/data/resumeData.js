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
        "Platform Integration: Independently architected a full-stack Python (Streamlit) data visualization dashboard backed by custom Oracle SQL views to track registry onboarding metrics; iterated on stakeholder feedback and migrated the solution into Citi's internal React production UI."
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
        "Full-stack iOS app (solo, end-to-end): Shipped a Toronto nightlife app to the App Store (110+ users) with a Swift/SwiftUI front end and a Supabase backend (79 tables, 165+ RPCs, 10 edge functions, 24 cron jobs), plus a Next.js admin web app.",
        "Recommendation Engine: Built a 10-section weighted recommendation engine (cosine vibe-match, Jaccard music overlap, geo decay) and operationalized Claude Code as a parallel-agent dev pipeline with a custom .claude/skills/ library and git-hook policy enforcement across 50+ Linear tickets."
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
