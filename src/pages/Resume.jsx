import { Box, Container, Typography, Paper, Chip, Grid, Divider, useTheme, Button, Link } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import DownloadIcon from '@mui/icons-material/Download';

const Resume = () => {
  const theme = useTheme();

  const sectionStyle = {
    backgroundColor: 'rgba(13, 31, 45, 0.85)', // Deep blue with transparency
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    color: '#B8C5D1', // Light blue-grey
    marginBottom: '16px',
    fontWeight: 600,
    borderBottom: '2px solid rgba(99, 140, 177, 0.5)', // Muted blue
    paddingBottom: '8px',
  };

  const chipStyle = {
    backgroundColor: 'rgba(99, 140, 177, 0.2)', // Light blue with transparency
    color: '#B8C5D1',
    margin: '4px',
    border: '1px solid rgba(99, 140, 177, 0.3)',
    '&:hover': {
      backgroundColor: 'rgba(99, 140, 177, 0.3)',
    },
  };

  const linkStyle = {
    color: '#8BA6C7', // Lighter blue
    textDecoration: 'none',
    '&:hover': {
      color: '#B8C5D1',
      textDecoration: 'underline',
    },
  };

  const skills = {
    languages: ['Python', 'Java', 'C/C++', 'UNIX', 'SQL', 'HTML/CSS', 'R', 'JavaScript', 'TypeScript', 'Microsoft Excel'],
    tools: ['Command-Line Terminal', 'JUnit', 'Postman', 'JIRA', 'Bitbucket', 'Git', 'VS Code', 'OpenShift', 'RedHat', 
           'Docker', 'AWS', 'SSH', 'SFTP', 'GDB Debugging', 'Jenkins', 'Maven', 'Kubernetes', 'GraphQL', 'Harness'],
    frameworks: ['pandas', 'NumPy', 'Matplotlib', 'SciKit', 'Selenium', 'OpenGL', 'React', 'Redux', 'Express.js', 'Node.js']
  };

  const handleDownload = () => {
    window.open('/Andrea_Diano-Bavaro_Resume.pdf', '_blank');
  };

  const Section = ({ icon, title, children }) => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {icon}
        <Typography variant="h5" sx={{ ml: 1, fontWeight: 600, color: '#B8C5D1' }}>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 1.5 }} />
      {children}
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 2, color: '#D5DFE9' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper elevation={3} sx={sectionStyle}>
          {/* Header with Download Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" sx={{ mb: 0.5, color: '#B8C5D1' }}>Andrea Wolfgang Diano-Bavaro</Typography>
              <Typography variant="subtitle1" color="#8BA6C7">
                andreab-b@hotmail.com | LinkedIn
              </Typography>
              <Typography variant="subtitle1" color="#8BA6C7">
                Citizenship: (EU) Italian, Canadian
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{ height: 'fit-content', backgroundColor: 'rgba(99, 140, 177, 0.2)', color: '#B8C5D1', '&:hover': { backgroundColor: 'rgba(99, 140, 177, 0.3)' } }}
            >
              Download PDF
            </Button>
          </Box>

          {/* Main Content in Grid Layout */}
          <Grid container spacing={2}>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <Section icon={<SchoolIcon color="#B8C5D1" />} title="Education">
                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="h6" sx={{ color: '#B8C5D1' }}>University of Western Ontario</Typography>
                  <Typography variant="subtitle1" sx={{ color: '#8BA6C7' }}>Bachelor of Science in Computer Science</Typography>
                  <Typography sx={{ color: '#8BA6C7', mb: 2 }}>Sep. 2021 - June 2024 | London, CA | Aarhus, DE</Typography>
                </Box>
              </Section>

              <Section icon={<WorkIcon color="#B8C5D1" />} title="Experience">
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#B8C5D1' }}>Software Developer</Typography>
                  <Typography variant="subtitle2" sx={{ color: '#8BA6C7' }}>
                    Citibank | May 2023 - Aug. 2023 | Jul 2024 - Present | Mississauga, CA
                  </Typography>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#D5DFE9' }}>
                    <li>Contributed to test-driven development of microservices and wrote JUnit test cases achieving 80% code coverage</li>
                    <li>Developed and tested APIs with Java Spring Boot, Postman, and GraphQL</li>
                    <li>Contributed to entire software development life cycle</li>
                  </ul>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#B8C5D1' }}>Junior Software Developer</Typography>
                  <Typography variant="subtitle2" sx={{ color: '#8BA6C7' }}>
                    Western Algorithmic Trading Club | Sep. 2022 - June 2024 | London, CA
                  </Typography>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#D5DFE9' }}>
                    <li>Implemented Python Selenium ingestion engine for real-time financial updates</li>
                    <li>Developed Sentiment Analysis engine for stock viability scoring</li>
                    <li>Visualized sentiment analysis using Matplotlib</li>
                  </ul>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#B8C5D1' }}>Financial and Software Analyst Intern</Typography>
                  <Typography variant="subtitle2" sx={{ color: '#8BA6C7' }}>
                    YDM Incorporated | May 2022 - Aug. 2022 | Toronto, CA
                  </Typography>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#D5DFE9' }}>
                    <li>Analyzed financial data using pandas in Python to compute overhead costs and net profit, and made predictions for future profitability</li>
                    <li>Conducted time series analysis to identify areas for cost reduction and growth opportunities, resulting in improved financial performance</li>
                    <li>Decreased overhead costs by 10% and increased product net profit by 7%</li>
                  </ul>
                </Box>
              </Section>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={6}>
              <Section icon={<CodeIcon color="#B8C5D1" />} title="Projects">
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#B8C5D1' }}>OpenAPI Migration Automator</Typography>
                  <Typography variant="subtitle2" sx={{ color: '#8BA6C7' }}>Python, Regular Expressions (re), Java Spring Boot</Typography>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#D5DFE9' }}>
                    <li>Developed a custom Python tool for Citi to automate the migration of Java Spring Boot projects from Swagger 2 to OpenAPI 3.0</li>
                    <li>Built recursive file processing functionality to batch-convert entire projects, with an optional substring-based directory filter, streamlining large-scale microservices migration efforts</li>
                  </ul>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#B8C5D1' }}>
                    Personal Investment Application{" "}
                    <Link href="https://youtu.be/-7F3vuJG5Ts" target="_blank" sx={linkStyle}>
                      | Demo
                    </Link>
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: '#8BA6C7' }}>React, Java Spring Boot, Git, Google Cloud, Docker</Typography>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#D5DFE9' }}>
                    <li>Developed a financial portfolio manager web application using React for the front end, Java Spring Boot for the back end, and MySQL for data storage</li>
                    <li>Created and integrated REST APIs to fetch real-time stock information, enabling users to manage their portfolios with up-to-date market data and analytics</li>
                    <li>Deployed the application on AWS Cloud using Docker for containerization</li>
                  </ul>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ color: '#B8C5D1' }}>E-Commerce Inventory Tracker</Typography>
                  <Typography variant="subtitle2" sx={{ color: '#8BA6C7' }}>Python, Anaconda, Selenium, Requests, Discord</Typography>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#D5DFE9' }}>
                    <li>Used Selenium library to scrape HTML elements of desirable fashion products and monitor their status updates</li>
                    <li>Monitored status updates including stock numbers and availability</li>
                  </ul>
                </Box>
              </Section>
            </Grid>

            {/* Full Width Technical Skills Section */}
            <Grid item xs={12}>
              <Section icon={<BuildIcon color="#B8C5D1" />} title="Technical Skills">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ mb: { xs: 2, md: 0 } }}>
                      <Typography variant="subtitle1" sx={{ mb: 0.5, color: '#B8C5D1' }}>Certifications:</Typography>
                      <Chip label="Certified Scrum Master (CSM)" size="small" sx={chipStyle} />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ mb: { xs: 2, md: 0 } }}>
                      <Typography variant="subtitle1" sx={{ mb: 0.5, color: '#B8C5D1' }}>Languages:</Typography>
                      <Typography variant="body2" sx={{ color: '#8BA6C7' }}>English (Native), Italian (Fluent)</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="subtitle1" sx={{ mb: 0.5, color: '#B8C5D1' }}>Programming Languages:</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {skills.languages.map((skill) => (
                          <Chip key={skill} label={skill} variant="outlined" size="small" sx={chipStyle} />
                        ))}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 0.5, color: '#B8C5D1' }}>Frameworks & Tools:</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {[...skills.frameworks, ...skills.tools].map((item) => (
                          <Chip key={item} label={item} variant="outlined" size="small" sx={chipStyle} />
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Section>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Resume;
