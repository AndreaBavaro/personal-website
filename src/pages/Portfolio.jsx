import { Box, Typography, Paper, Grid, Chip, Link } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { motion } from 'framer-motion';
import { globalResume } from '../data/resumeData';

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
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: '#8BA6C7',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    '&:hover': {
      color: '#B8C5D1',
      textDecoration: 'underline',
    },
  };

  const projects = globalResume.projects;

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
            {projects.map((project) => (
              <Grid item xs={12} key={project.title}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ color: '#B8C5D1', mb: 1, fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' } }}>
                    {project.title}
                  </Typography>
                  {project.links && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 1 }}>
                      {project.links.map((link) => (
                        <Link key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" sx={linkStyle}>
                          {link.label} <LaunchIcon sx={{ fontSize: '1rem' }} />
                        </Link>
                      ))}
                    </Box>
                  )}
                  <Box component="ul" sx={{ color: '#D5DFE9', my: 2, pl: 2.5, '& li': { mb: 1, lineHeight: 1.8, fontSize: { xs: '0.9rem', sm: '1rem' } } }}>
                    {project.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </Box>
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
