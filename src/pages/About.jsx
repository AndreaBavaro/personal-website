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
            I'm a passionate Full Stack Software Developer currently working at Citi. Outside of work I also enjoying creating side projects that you can view in my Portfolio.
          </Typography>
          <Typography sx={{ color: '#D5DFE9', mb: 3, lineHeight: 1.8 }}>
            I love spending time with friends and family. On my free time I like staying active through excercise and playing sports like tennis, and soccer. 
          </Typography>
          <Typography sx={{ color: '#D5DFE9', lineHeight: 1.8 }}>
            I am most passionate about capturing moments, discovering people, and the world through travelling and photography. Check out all of the countries I've travelled to and the pictures I've taken.
          </Typography>
          <Typography sx={{ color: '#D5DFE9', lineHeight: 1.8 }}>
          My main goal in life is to improve the lives of others, and make the world a more meaningful place through passionate work and hobbies.
          </Typography>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default About;
