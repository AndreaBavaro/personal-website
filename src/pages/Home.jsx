import { Box, Container, Typography, Button, IconButton, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SecureImage from '../components/SecureImage';
import { globalResume } from '../data/resumeData';

const Home = () => {
  const navigate = useNavigate();
  const { email, links } = globalResume.header.contact;
  const github = links.find((l) => l.text === 'GitHub')?.url;
  const linkedIn = links.find((l) => l.text === 'LinkedIn')?.url;

  const socials = [
    { label: 'GitHub', icon: <GitHubIcon />, href: github },
    { label: 'LinkedIn', icon: <LinkedInIcon />, href: linkedIn },
    { label: 'Email', icon: <EmailIcon />, href: `mailto:${email}` },
  ];

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
              Full Stack Developer @ Citi
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 4, color: '#666', maxWidth: '600px' }}
            >
              I'm a Computer Science graduate from the University of Western Ontario
              who loves building things end to end — from Python and Go automation
              engines and developer tooling at Citi to AI-driven side projects and a
              shipped iOS app. When I'm not coding, you'll find me travelling, playing
              sports, and capturing moments through photography.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/portfolio')}
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
                onClick={() => navigate('/contact')}
                sx={{
                  borderRadius: '28px',
                  textTransform: 'none',
                  px: 4,
                }}
              >
                Contact Me
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socials.map((social) => (
                <Tooltip key={social.label} title={social.label}>
                  <IconButton
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    sx={{
                      color: '#2196f3',
                      border: '1px solid rgba(33, 150, 243, 0.3)',
                      transition: 'transform 0.2s ease, background-color 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ flex: 1 }}
          >
            <SecureImage
              src="/placeholder-profile.jpg"
              alt="Profile"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px'
              }}
            />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
