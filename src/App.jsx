import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, Typography, Container, Button, CssBaseline, Paper } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { useState, useEffect } from 'react';
import About from './pages/About';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Generator from './pages/Generator';
import Photos from './components/Photos';
import CountryPhotos from './components/CountryPhotos';
import { isEurope } from './utils/geolocation';

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
  const [isEuropeanUser, setIsEuropeanUser] = useState(false);

  useEffect(() => {
    const detectLocation = async () => {
      const isEU = await isEurope();
      setIsEuropeanUser(isEU);
    };
    detectLocation();
  }, []);

  const generatorButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
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
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper 
              elevation={3} 
              sx={{
                backgroundColor: 'rgba(13, 31, 45, 0.85)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#B8C5D1',
                  marginBottom: '16px',
                  fontWeight: 600,
                  borderBottom: '2px solid rgba(99, 140, 177, 0.5)',
                  paddingBottom: '8px',
                }}
              >
                About Me
              </Typography>
              <Typography sx={{ color: '#D5DFE9', mb: 3, lineHeight: 1.8 }}>
                I'm a passionate Full Stack Software Developer currently working at Citi. I also enjoying creating side projects that you can view in my Portfolio.
              </Typography>
              <Typography sx={{ color: '#D5DFE9', mb: 3, lineHeight: 1.8 }}>
                Outside of work I love spending time with friends and family. On my free time I like staying active through excercise and playing sports like tennis, and soccer. 
              </Typography>
              <Typography sx={{ color: '#D5DFE9', mb: 1, lineHeight: 1.8 }}>
                I am most passionate about capturing moments, people, and the wonders of the world through travelling and photography.
              </Typography>
              <Typography sx={{ color: '#D5DFE9', mb: 3, lineHeight: 1.8 }}>
              </Typography>
              <Typography sx={{ color: '#D5DFE9', lineHeight: 1.8 }}>
                My main goal in life is to improve the lives of others, and make the world a more meaningful place through passionate work and hobbies.
              </Typography>
            </Paper>
            {activeSection === 'about' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button
                    component={Link}
                    to="/photos"
                    sx={{
                      borderRadius: '50px',
                      padding: '12px 30px',
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    See The World!
                  </Button>
                </Box>
              </motion.div>
            )}
          </motion.div>
        );
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
            {!activeSection && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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

                {/* Welcome Section */}
                <Box
                  sx={{
                    position: { xs: 'static', md: 'fixed' },
                    margin: { xs: '20px auto', md: 0 },
                    left: { md: '150px' },
                    top: { md: '45%' },
                    transform: { md: 'translateY(-50%)' },
                    width: { xs: '90%', sm: '300px' },
                    maxWidth: '300px',
                    minHeight: { xs: 'auto', md: '450px' },
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '15px',
                    padding: { xs: '20px 15px', md: '30px 20px' },
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: '15px', md: '25px' },
                    zIndex: 10
                  }}
                >
                  <Box
                    component="img"
                    src="/profile.jpg"
                    alt="Andrea Wolfgang"
                    sx={{
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: 'center 35%',
                      transform: 'scale(0.777) rotate(5deg)',
                      border: '3px solid rgba(255, 255, 255, 0.2)',
                      marginTop: '20px'
                    }}
                  />
                  <Typography
                    sx={{
                      color: 'white',
                      fontSize: '1.3rem',
                      marginBottom: '0.33rem',
                      textAlign: 'center'
                    }}
                  >
                    Welcome to my personally developed website!
                  </Typography>
                  <Typography
                    sx={{
                      color: '#8BA6C7',
                      textAlign: 'center',
                      fontSize: '1.1rem',
                      lineHeight: 1.6
                    }}
                  >
                    {isEuropeanUser 
                      ? "I'm a Full Stack Software Developer for based in Toronto, and I also reside in Italy part-time."
                      : "I'm a Full Stack Software Developer for based in Toronto."}
                  </Typography>
                </Box>
              </motion.div>
            )}

            <NavigationButtons 
              activeSection={activeSection} 
              onSectionChange={setActiveSection}
            />
          </>
        )}

        <Box sx={{ width: '100%', mt: activeSection ? 8 : 4 }}>
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

function App() {
  const { theme } = useTheme();
  
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/photos/:countryName" element={<CountryPhotos />} />
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
