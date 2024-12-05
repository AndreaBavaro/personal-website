import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <Paper elevation={0} sx={sectionStyle}>
          <Typography variant="h4" sx={headingStyle}>
            About Me
          </Typography>
          <Typography sx={{ color: '#D5DFE9', mb: 3, lineHeight: 1.8 }}>
            Hello! I'm Andrea Wolfgang Diano-Bavaro, a Computer Science student at the University of Western Ontario with a passion for software development and problem-solving. I specialize in full-stack development and have experience with a wide range of technologies and frameworks.
          </Typography>
          <Typography sx={{ color: '#D5DFE9', mb: 3, lineHeight: 1.8 }}>
            Currently, I'm focused on developing scalable web applications and exploring new technologies. My experience includes working with Java Spring Boot, React, and various cloud platforms. I enjoy tackling complex problems and creating efficient, user-friendly solutions.
          </Typography>
          <Typography sx={{ color: '#D5DFE9', lineHeight: 1.8 }}>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or learning about the latest developments in the tech world. I'm always eager to take on new challenges and collaborate on innovative projects.
          </Typography>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default About;
