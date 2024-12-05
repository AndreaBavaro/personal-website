import { Box, Typography, Paper, Grid, Chip, Link } from '@mui/material';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const sectionStyle = {
    backgroundColor: 'rgba(13, 31, 45, 0.85)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '24px',
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
      title: 'Personal Investment Application',
      description: 'A full-stack investment tracking application built with React and Node.js. Features real-time stock data integration and portfolio management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Material-UI', 'Chart.js'],
      demoLink: 'https://github.com/yourusername/investment-app',
    },
    {
      title: 'AI-Powered Code Generator',
      description: 'Developed an AI-powered code generation tool using Python and OpenAI\'s GPT-3 API with web interface for code generation and editing.',
      technologies: ['Python', 'Flask', 'OpenAI API', 'React', 'PostgreSQL'],
      demoLink: 'https://github.com/yourusername/code-generator',
    },
    {
      title: 'E-Commerce Inventory Tracker',
      description: 'Built an automated inventory tracking system using Python and Selenium for monitoring product availability and stock updates.',
      technologies: ['Python', 'Selenium', 'BeautifulSoup', 'Discord API'],
      demoLink: 'https://github.com/yourusername/inventory-tracker',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <Paper elevation={0} sx={sectionStyle}>
          <Typography variant="h4" sx={headingStyle}>
            Portfolio
          </Typography>
          
          <Grid container spacing={3}>
            {projects.map((project, index) => (
              <Grid item xs={12} key={index}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ color: '#B8C5D1', mb: 1 }}>
                    {project.title}
                  </Typography>
                  <Link href={project.demoLink} target="_blank" sx={linkStyle}>
                    Demo →
                  </Link>
                  <Typography sx={{ color: '#D5DFE9', my: 2, lineHeight: 1.8 }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {project.technologies.map((tech) => (
                      <Chip key={tech} label={tech} sx={chipStyle} />
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
