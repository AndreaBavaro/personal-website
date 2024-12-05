import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ flex: 1 }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Andrea Bavaro
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 3, color: '#666' }}
            >
              Welcome to my digital space
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, color: '#666', maxWidth: '600px' }}
            >
              I'm passionate about [Your interests/profession]. Through this website, 
              I'd love to share my journey, projects, and experiences with you.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '28px',
                  textTransform: 'none',
                  px: 4,
                }}
              >
                View Portfolio
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: '28px',
                  textTransform: 'none',
                  px: 4,
                }}
              >
                Contact Me
              </Button>
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ flex: 1 }}
          >
            <Box
              component="img"
              src="/placeholder-profile.jpg"
              alt="Andrea Bavaro"
              sx={{
                width: '100%',
                maxWidth: '500px',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              }}
            />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
