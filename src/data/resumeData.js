const baseResume = {
  header: {
    name: "Andrea Wolfgang Diano-Bavaro",
    contact: {
      email: "andread-b@hotmail.com",
      links: [
        { text: "GitHub", url: "https://github.com/AndreaBavaro" },
        { text: "LinkedIn", url: "https://www.linkedin.com/in/andreawdb/" }
      ]
    }
  },
  summary: `I discovered my passion for programming at the age of 15, learning Python. Now at 23, I developed a strong foundation in Java and Python throughout my studies. I have a diverse professional exposure as both a data scientist as a full-stack web developer. As a CSM I am comfortable working in a fast-paced agile enviornment. I have almost 2 years of experience developing microservices and managing the software development lifecycle. My technical passion lies in automating and streamlining processes while working alongside a strong team. I'm at my best when I'm collaborating with a team—communicating clearly, developing efficient solutions, and crafting meaningful experiences for end users.`,
  experience: [
    {
      title: "Full Stack Software Developer",
      company: "Citi",
      location: "Toronto, CA",
      date: "May 2023 - Present*",
      bullets: [
        "Implemented test-driven development for microservices—writing JUnit test cases to achieve 80% code coverage in SonarQube—and developed and tested APIs using Java Spring Boot, Postman, and GraphQL.",
        "Contributed to entire software development life cycle, using Docker, Harness, and Redhat.",
        "Migrated 20+ microservices from Swagger 2 to OpenAPI 3, integrated Swagger UI for enhanced documentation, and configured and tested gateway and commons repositories to ensure reliable and maintainable services."
      ]
    },
    {
      title: "Junior Software Developer",
      company: "Western Algorithmic Trading Club - Alternative Data Team",
      location: "London, CA",
      date: "Sep. 2022 - June 2024",
      bullets: [
        "Implemented an ingestion engine using Python Selenium to gather financial updates from Twitter in real time.",
        "Developed a Sentiment Analysis engine determining stock viability scores with historical data inputs.",
        "Visualized sentiment data using Matplotlib to analyze trends across financial sectors."
      ]
    },
    {
      title: "Financial and Software Analyst Intern",
      company: "YDM Incorporated",
      location: "Toronto, CA",
      date: "May 2022 - Aug. 2022",
      bullets: [
        "Analyzed financial data using Python pandas to compute overhead costs, net profit, and profitability predictions.",
        "Implemented time series analysis to identify cost-saving strategies and growth opportunities.",
        "Reduced overhead costs by 10% and increased product net profit by 7%."
      ]
    }
  ],
  projects: [
    {
      title: "OpenAPI Migration Automation Tool",
      technologies: "Python, Regular Expressions, Java Spring Boot",
      bullets: [
        "Developed an internal Python tool for Citi to automate the migration of Java Spring Boot projects from Swagger 2 to OpenAPI 3.0",
        "Built recursive file processing functionality to batch-convert entire projects, with an optional substring-based directory filter, streamlining large-scale microservices migration efforts."
      ]
    },
    {
      title: "Personal Investment Platform",
      demoLink: "https://youtu.be/-7F3vuJG5Ts",
      technologies: ["React", "Java Spring Boot", "MySQL", "Docker", "Google Cloud"],
      bullets: [
        "Developed a financial portfolio manager web application using React for the front end, Java Spring Boot for the back end, and MySQL for data storage.",
        "Created and integrated REST APIs to deliver real-time stock information and deployed the application on Google Cloud using Docker, enabling users to manage their portfolios with up-to-date market data and analytics."
      ]
    },
    {
      title: "E-Commerce Inventory Tracker",
      technologies: "Python, Selenium, Requests, Discord",
      bullets: [
        "Utilized Selenium to scrape HTML elements and monitor product availability in real time.",
        "Integrated Discord notifications for immediate stock update alerts."
      ]
    }
  ],
  education: [
    {
      school: "University of Western Ontario",
      location: "London, CA | Aarhus, DE",
      degree: "Bachelor of Science in Computer Science",
      date: "Sep. 2021 - June 2024"
    },
    {
      school: "St. Michael's College School",
      location: "Toronto, CA",
      degree: "Ontario Secondary School Diploma —Basilian Book Award Winner (90% + average)",
      date: "2015 - 2019"
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
