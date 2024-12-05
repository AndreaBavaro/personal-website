import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, Typography, Container, Button, CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { useState } from 'react';
import About from './pages/About';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Generator from './pages/Generator';

const NavigationButtons = ({ activeSection, onSectionChange }) => {
  const buttonStyle = (section) => ({
    borderRadius: '50px',
    padding: '12px 30px',
    margin: '10px',
    fontSize: '1.1rem',
    textTransform: 'none',
    color: 'white',
    backdropFilter: 'blur(10px)',
    backgroundColor: activeSection === section ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.05)',
    },
    '&:active': {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      transform: 'scale(0.95)',
    }
  });

  const handleClick = (section) => {
    if (activeSection === section) {
      onSectionChange(null);
    } else {
      onSectionChange(section);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        mb: 4
      }}
    >
      <Button onClick={() => handleClick('about')} sx={buttonStyle('about')}>
        About Me
      </Button>
      <Button onClick={() => handleClick('resume')} sx={buttonStyle('resume')}>
        Resume
      </Button>
      <Button onClick={() => handleClick('portfolio')} sx={buttonStyle('portfolio')}>
        Portfolio
      </Button>
      <Button onClick={() => handleClick('contact')} sx={buttonStyle('contact')}>
        Contact
      </Button>
    </Box>
  );
};

const AppContent = () => {
  const { theme } = useTheme();
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const generatorButtonStyle = {
    position: 'fixed',
    top: '20px',
    right: '40px',
    zIndex: 1000,
    borderRadius: '50px',
    padding: '8px 20px',
    fontSize: '0.9rem',
    textTransform: 'none',
    color: 'white',
    backdropFilter: 'blur(10px)',
    backgroundColor: isGeneratorOpen ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.05)',
    },
    '&:active': {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      transform: 'scale(0.95)',
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'resume':
        return <Resume />;
      case 'portfolio':
        return <Portfolio />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 8,
          pb: 4
        }}
      >
        <Button
          onClick={() => {
            setIsGeneratorOpen(!isGeneratorOpen);
            setActiveSection(isGeneratorOpen ? null : 'generator');
          }}
          sx={generatorButtonStyle}
        >
          {isGeneratorOpen ? '← Back' : 'Make Your Own!'}
        </Button>

        {!isGeneratorOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  mb: 6,
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 600,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Andrea Wolfgang Diano-Bavaro
              </Typography>
            </motion.div>

            <NavigationButtons 
              activeSection={activeSection} 
              onSectionChange={setActiveSection}
            />
          </>
        )}

        <Box sx={{ width: '100%', mt: 4 }}>
          {isGeneratorOpen ? (
            <Generator />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderContent()}
            </motion.div>
          )}
        </Box>
      </Container>
    </Box>
  );
};

const App = () => {
  const { theme } = useTheme();
  
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent />
    </MuiThemeProvider>
  );
};

export default App;
