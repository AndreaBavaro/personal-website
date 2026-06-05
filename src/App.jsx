import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, Typography, Container, Button, CssBaseline, Paper, IconButton, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { useState, useEffect } from 'react';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Photos from './components/Photos';
import CountryPhotos from './components/CountryPhotos';
import SecureImage from './components/SecureImage';
import OAuthRedirect from './components/OAuthRedirect';
import { isEurope } from './utils/geolocation';
import { globalResume } from './data/resumeData';

const { email, links } = globalResume.header.contact;
const githubUrl = links.find((l) => l.text === 'GitHub')?.url;
const linkedInUrl = links.find((l) => l.text === 'LinkedIn')?.url;

const socialLinks = [
  { label: 'GitHub', icon: <GitHubIcon />, href: githubUrl },
  { label: 'LinkedIn', icon: <LinkedInIcon />, href: linkedInUrl },
  { label: 'Email', icon: <EmailIcon />, href: `mailto:${email}` },
];

const NavigationButtons = ({ activeSection, onSectionChange }) => {
  const buttonStyle = (section) => ({
    borderRadius: '50px',
    padding: { xs: '10px 20px', sm: '12px 28px' },
    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
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
        gap: { xs: 1, sm: 1.5, md: 2 },
        mt: activeSection ? 0 : { xs: 2, md: 4 },
        mb: { xs: 2, md: 4 },
        px: { xs: 2, sm: 0 },
        width: '100%',
        maxWidth: '600px',
        mx: 'auto'
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

const tileBaseSx = {
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.14)',
  borderRadius: { xs: '14px', md: '18px' },
  p: { xs: 2.25, md: 2.75 },
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform .2s ease, background-color .2s ease',
};

const tileLinkSx = {
  cursor: 'pointer',
  '&:hover': { transform: 'translateY(-3px)', borderColor: 'rgba(255, 255, 255, 0.32)' },
};

const tileLabelSx = {
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: '#8fa6bf',
  mb: 1,
};

const tagSx = {
  fontSize: '0.7rem',
  px: 1.1,
  py: 0.4,
  borderRadius: '20px',
  backgroundColor: 'rgba(150, 180, 220, 0.2)',
  color: '#dbe6f2',
  whiteSpace: 'nowrap',
};

const AppContent = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState(null);
  const [isEuropeanUser, setIsEuropeanUser] = useState(false);

  useEffect(() => {
    const detectLocation = async () => {
      const isEU = await isEurope();
      setIsEuropeanUser(isEU);
    };
    detectLocation();
  }, []);

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
                borderRadius: { xs: '12px', md: '16px' },
                padding: { xs: '16px', sm: '20px', md: '24px' },
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
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                }}
              >
                About Me
              </Typography>
              <Typography sx={{ color: '#D5DFE9', mb: 3, lineHeight: 1.8, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Hey, I'm Andrea! I'm currently a Software Developer on the Platform Engineering team at Citi.
              </Typography>
              <Typography sx={{ color: '#D5DFE9', mb: 3, lineHeight: 1.8, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                I take pride in an unorthodox approach to problem-solving. I like to explore the unrealistic and the creative without constraints, then use first-principles thinking to leverage those ideas into the most effective course of action.
              </Typography>
              <Typography sx={{ color: '#D5DFE9', lineHeight: 1.8, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                On my free time I love travelling, especially to Italy, to learn more about my family and cultural history. I also enjoy experiences with loved ones and strangers too — through sharing meals, playing sports, watching sports, or just sitting and talking about life.
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
                      padding: { xs: '10px 24px', sm: '12px 30px' },
                      fontSize: { xs: '0.95rem', sm: '1.1rem' },
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
        backgroundAttachment: { xs: 'scroll', md: 'fixed' },
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
          justifyContent: activeSection ? 'flex-start' : { xs: 'flex-start', md: 'center' },
          minHeight: '100vh',
          pt: { xs: 4, sm: 6, md: 8 },
          pb: { xs: 2, md: 4 },
          px: { xs: 2, sm: 3 }
        }}
      >
        {!activeSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <Box sx={{ width: '100%', maxWidth: '1040px', mx: 'auto' }}>
              {/* Name banner */}
              <Box sx={{ mb: { xs: 2, md: 2.5 }, px: { xs: 0.5, md: 1 } }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    lineHeight: 1.02,
                    letterSpacing: '-0.015em',
                    textShadow: '0 2px 12px rgba(0,0,0,0.35)',
                    fontSize: { xs: '1.9rem', sm: '3rem', md: '3.6rem' },
                  }}
                >
                  Andrea Wolfgang Diano-Bavaro
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    color: '#9fc0e8',
                    fontWeight: 500,
                    fontSize: { xs: '0.95rem', md: '1.15rem' },
                  }}
                >
                  {isEuropeanUser ? 'Full Stack Developer · Toronto & Italy' : 'Full Stack Developer · Toronto'}
                </Typography>
              </Box>

              {/* Bento grid */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '0.95fr 1fr 1fr' },
                  gridTemplateRows: { sm: '1fr 1fr' },
                  gap: { xs: 1.5, md: 2 },
                  minHeight: { sm: '340px' },
                }}
              >
                {/* Photo + links */}
                <Box
                  sx={{
                    ...tileBaseSx,
                    gridRow: { sm: '1 / 3' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 2, md: 2.5 },
                  }}
                >
                  <SecureImage
                    src="/profile.jpg"
                    alt="Andrea Wolfgang"
                    sx={{
                      width: { xs: '140px', md: '172px' },
                      height: { xs: '140px', md: '172px' },
                      borderRadius: '50%',
                      objectFit: 'cover',
                      objectPosition: 'center 35%',
                      border: '3px solid rgba(255, 255, 255, 0.22)',
                    }}
                  />
                  <Box sx={{ display: 'flex', gap: 1.25 }}>
                    {socialLinks.map((social) => (
                      <Tooltip key={social.label} title={social.label}>
                        <IconButton
                          component="a"
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          sx={{
                            width: 56,
                            height: 56,
                            color: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.10)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            transition: 'all 0.2s ease',
                            '& svg': { fontSize: 26 },
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.22)',
                              transform: 'translateY(-3px)',
                            },
                          }}
                        >
                          {social.icon}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </Box>
                </Box>

                {/* Experience */}
                <Box sx={{ ...tileBaseSx, ...tileLinkSx }} onClick={() => setActiveSection('resume')}>
                  <Typography sx={tileLabelSx}>Experience</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        px: 1.5,
                        py: 1,
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
                        flexShrink: 0,
                      }}
                    >
                      <Box component="img" src="/citi.png" alt="Citi" sx={{ height: 22, display: 'block' }} />
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: { xs: '1rem', md: '1.1rem' }, color: '#fff' }}>
                      Full Stack Developer
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: 'auto', pt: 1.5, color: '#d7e2ee', fontSize: { xs: '0.85rem', md: '0.9rem' }, lineHeight: 1.5 }}>
                    <Box component="span" sx={{ color: '#9fc0e8', fontWeight: 600 }}>2 years</Box> shipping automation and developer tooling that cut manual effort 85% — across Go, Python, and TypeScript.
                  </Typography>
                </Box>

                {/* Nitely (accent) */}
                <Box
                  sx={{
                    ...tileBaseSx,
                    ...tileLinkSx,
                    background: 'linear-gradient(135deg, rgba(33,150,243,0.28), rgba(33,150,243,0.12))',
                    borderColor: 'rgba(33, 150, 243, 0.4)',
                  }}
                  onClick={() => setActiveSection('portfolio')}
                >
                  <Typography sx={tileLabelSx}>Shipped · App Store</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', md: '1.2rem' }, color: '#fff', mb: 0.5 }}>
                    Nitely (iOS)
                  </Typography>
                  <Typography sx={{ color: '#d7e2ee', fontSize: { xs: '0.82rem', md: '0.88rem' }, lineHeight: 1.5 }}>
                    Toronto nightlife app — Swift/SwiftUI front end on a Supabase backend (79 tables, 165+ RPCs).
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 'auto', pt: 1.5 }}>
                    {['Swift', 'SwiftUI', 'Supabase', 'Next.js'].map((t) => (
                      <Box key={t} component="span" sx={tagSx}>{t}</Box>
                    ))}
                  </Box>
                </Box>

                {/* About (wide) */}
                <Box
                  sx={{
                    ...tileBaseSx,
                    ...tileLinkSx,
                    gridColumn: { sm: '2 / 4' },
                    justifyContent: 'center',
                    '&:hover': { borderColor: 'rgba(255, 255, 255, 0.32)' },
                  }}
                  onClick={() => setActiveSection('about')}
                >
                  <Typography sx={tileLabelSx}>About</Typography>
                  <Typography sx={{ color: '#e2eaf3', fontSize: { xs: '0.85rem', md: '0.95rem' }, lineHeight: 1.6 }}>
                    Hey, I'm Andrea — a <Box component="span" sx={{ color: '#9fc0e8', fontWeight: 600 }}>Software Developer on Citi's Platform Engineering team</Box>. I pair unconstrained, creative problem-solving with first-principles thinking to land on the most effective path forward. Off the clock: travelling (especially to Italy for family &amp; culture), sports, and good conversations over a meal.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}

        <NavigationButtons
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
        />

        <Box sx={{ width: '100%', mt: activeSection ? { xs: 4, md: 6 } : { xs: 2, md: 4 } }}>
          {activeSection && (
            <Box sx={{ maxWidth: '900px', mx: 'auto', mb: 2 }}>
              <Button
                onClick={() => setActiveSection(null)}
                startIcon={<ChevronLeftIcon />}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  borderRadius: '50px',
                  px: 2,
                  py: 0.75,
                  backgroundColor: 'rgba(255, 255, 255, 0.10)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  transition: 'all 0.2s ease',
                  '& .MuiButton-startIcon': { mr: 0.25 },
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
                }}
              >
                Home
              </Button>
            </Box>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
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
          <Route path="/oauth/callback" element={<OAuthRedirect />} />
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
