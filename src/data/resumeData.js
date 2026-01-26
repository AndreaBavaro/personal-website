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
    aiFrameworks: ["Hume AI", "OpenAI API", "Spring Boot", "Robot Framework", "React", "SwiftUI", "Angular", "Flask", "Pandas"],
    toolsCloud: ["Supabase", "AWS", "Docker", "Harness", "OpenShift", "GraphQL", "Windsurf AI", "Circuit Design", "Git"]
  },
  experience: [
    {
      title: "Full Stack Developer",
      company: "Citi",
      location: "Toronto, CA",
      date: "May 2023 - Present*",
      bullets: [
        "Engineering Automation: Engineered a Python migration engine and a Go \"Update Server,\" reducing manual developer effort by 85% and automating global infrastructure lifecycle updates.",
        "Developer Tools & Reliability: Spearheaded a UI/UX overhaul of a proprietary VS Code Extension (TypeScript/Node.js) and built a Robot Framework validation layer for global service health monitoring.",
        "Platform Engineering: Optimized CI/CD pipelines using Docker, Harness, and OpenShift while managing scalable Java (Spring Boot) microservices and GraphQL integrations."
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
    },
    {
      title: "Night Finder (iOS)",
      technologies: ["Swift", "Supabase", "PostgreSQL", "Windsurf AI"],
      bullets: [
        "Algorithmic Matching Engine: Deployed a Toronto-focused discovery app with a custom matching engine and a real-time Supabase backend, using Windsurf for agentic refactoring and rapid prototyping."
      ]
    },
    {
      title: "OpenAPI Migration Automation Tool",
      technologies: ["Python", "Regex", "Java Spring Boot"],
      bullets: [
        "Enterprise Automation: Engineered a Python-based engine to migrate 20+ microservices from Swagger 2 to OpenAPI 3.0, reducing manual migration effort at Citi by 85%."
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
