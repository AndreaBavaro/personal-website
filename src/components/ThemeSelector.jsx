import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';

const ThemeSelector = () => {
  const { setThemeMode, setHasSelectedTheme } = useTheme();

  const handleThemeSelect = (mode) => {
    setThemeMode(mode);
    setHasSelectedTheme(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        gap: 6,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome to My World
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            color: '#666',
            mb: 6,
          }}
        >
          Choose how you'd like to know me
        </Typography>
      </motion.div>

      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2, md: 6 },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => handleThemeSelect('professional')}
            sx={{
              width: 280,
              height: 280,
              borderRadius: '20px',
              background: 'rgba(19, 47, 76, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: 4,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(19, 47, 76, 0.95)',
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              },
            }}
          >
            <WorkIcon sx={{ fontSize: 60, color: '#fff' }} />
            <Typography variant="h5" sx={{ color: '#fff' }}>
              Professional
            </Typography>
            <Typography variant="body2" sx={{ color: '#B2BAC2' }}>
              View my work experience and professional achievements
            </Typography>
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => handleThemeSelect('personal')}
            sx={{
              width: 280,
              height: 280,
              borderRadius: '20px',
              background: 'rgba(255, 107, 107, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: 4,
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255, 107, 107, 0.95)',
                transform: 'translateY(-5px)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              },
            }}
          >
            <PersonIcon sx={{ fontSize: 60, color: '#fff' }} />
            <Typography variant="h5" sx={{ color: '#fff' }}>
              Personal
            </Typography>
            <Typography variant="body2" sx={{ color: '#fff' }}>
              Get to know me beyond the professional sphere
            </Typography>
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ThemeSelector;
