import { Box, Typography, Paper, Grid, Chip, Link } from '@mui/material';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const sectionStyle = {
    backgroundColor: 'rgba(13, 31, 45, 0.85)',
    backdropFilter: 'blur(10px)',
    borderRadius: { xs: '12px', md: '16px' },
    padding: { xs: '16px', sm: '20px', md: '24px' },
    marginBottom: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    color: '#B8C5D1',
    marginBottom: '16px',
    fontWeight: 600,
    borderBottom: '2px solid rgba(99, 140, 177, 0.5)',
    paddingBottom: '8px',
  };

  const chipStyle = {
    backgroundColor: 'rgba(99, 140, 177, 0.2)',
    color: '#B8C5D1',
    margin: '4px',
    border: '1px solid rgba(99, 140, 177, 0.3)',
    '&:hover': {
      backgroundColor: 'rgba(99, 140, 177, 0.3)',
    },
  };

  const linkStyle = {
    color: '#8BA6C7',
    textDecoration: 'none',
    '&:hover': {
      color: '#B8C5D1',
      textDecoration: 'underline',
    },
  };

  const projects = [
    {
      title: 'AI Interview Insights Pipeline',
      description: 'Built an automated system to capture Zoom recordings, performing facial sentiment analysis (Hume AI) and LLM-driven transcription to generate comprehensive PDF interview reports.',
      technologies: ['Python', 'Hume AI SDK', 'Zoom SDK', 'OpenAI', 'FPDF'],
      demoLink: null,
    },
    {
      title: 'Wearable Haptic Massage Sleeve',
      description: 'Designed and wired a custom electrical circuit for a self-massaging leg sleeve; programmed an Arduino chip to regulate haptic feedback patterns and motor pressure intervals.',
      technologies: ['Arduino', 'C++', 'Electrical Circuitry', 'Hardware Prototyping'],
      demoLink: null,
    },
    {
      title: 'Night Finder (iOS)',
      description: 'Deployed a Toronto-focused discovery app with a custom matching engine and a real-time Supabase backend, using Windsurf for agentic refactoring and rapid prototyping.',
      technologies: ['Swift', 'Supabase', 'PostgreSQL', 'Windsurf AI'],
      demoLink: null,
    },
    {
      title: 'OpenAPI Migration Automation Tool',
      description: 'Engineered a Python-based engine to migrate 20+ microservices from Swagger 2 to OpenAPI 3.0, reducing manual migration effort at Citi by 85%.',
      technologies: ['Python', 'Regex', 'Java Spring Boot'],
      demoLink: null,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box sx={{ maxWidth: '900px', margin: '0 auto', px: { xs: 2, sm: 0 } }}>
        <Paper elevation={0} sx={sectionStyle}>
          <Typography variant="h4" sx={{ ...headingStyle, fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } }}>
            Portfolio
          </Typography>
          
          <Grid container spacing={3}>
            {projects.map((project, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ color: '#B8C5D1', mb: 1, fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}>
                    {project.title}
                  </Typography>
                  {project.demoLink && (
                    <Link href={project.demoLink} target="_blank" rel="noopener noreferrer" sx={linkStyle}>
                      View Demo →
                    </Link>
                  )}
                  <Typography sx={{ color: '#D5DFE9', my: 2, lineHeight: 1.8, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {project.technologies.map((tech) => (
                      <Chip key={tech} label={tech} size="small" sx={{ ...chipStyle, fontSize: { xs: '0.75rem', sm: '0.875rem' } }} />
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default Portfolio;
