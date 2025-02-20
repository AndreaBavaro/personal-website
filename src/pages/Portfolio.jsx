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
      title: 'OpenAPI Migration Automation Tool',
      description: 'Developed an internal Python tool for Citi to automate the migration of Java Spring Boot projects from Swagger 2 to OpenAPI 3.0. Built recursive file processing functionality to batch-convert entire projects, with an optional substring-based directory filter, streamlining large-scale microservices migration efforts.',
      technologies: ['Python', 'Regular Expressions', 'Java Spring Boot'],
      demoLink: null,
    },
    {
      title: 'Personal Investment Platform',
      description: 'Developed a financial portfolio manager web application using React for the front end, Java Spring Boot for the back end, and MySQL for data storage. Created and integrated REST APIs to deliver real-time stock information and deployed the application on Google Cloud using Docker, enabling users to manage their portfolios with up-to-date market data and analytics.',
      technologies: ['React', 'Java Spring Boot', 'MySQL', 'Docker', 'Google Cloud'],
      demoLink: 'https://youtu.be/-7F3vuJG5Ts',
    },
    {
      title: 'E-Commerce Inventory Tracker',
      description: 'Utilized Selenium to scrape HTML elements and monitor product availability in real time. Integrated Discord notifications for immediate stock update alerts.',
      technologies: ['Python', 'Selenium', 'Requests', 'Discord'],
      demoLink: null,
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
                  {project.demoLink && (
                    <Link href={project.demoLink} target="_blank" rel="noopener noreferrer" sx={linkStyle}>
                      View Demo →
                    </Link>
                  )}
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
