import { Box, Typography, Paper, TextField, Button, Grid, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { InlineWidget } from 'react-calendly';
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    emailjs.init({
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

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

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      color: '#D5DFE9',
      '& fieldset': {
        borderColor: 'rgba(99, 140, 177, 0.3)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(99, 140, 177, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#8BA6C7',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#8BA6C7',
      '&.Mui-focused': {
        color: '#B8C5D1',
      },
    },
  };

  const buttonStyle = {
    backgroundColor: 'rgba(99, 140, 177, 0.2)',
    color: '#B8C5D1',
    border: '1px solid rgba(99, 140, 177, 0.3)',
    '&:hover': {
      backgroundColor: 'rgba(99, 140, 177, 0.3)',
    },
  };

  const validateInput = (name, email, message) => {
    if (!name || name.length < 2 || name.length > 50) {
      throw new Error('Name must be between 2 and 50 characters');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Please enter a valid email address');
    }
    if (!message || message.length < 10 || message.length > 1000) {
      throw new Error('Message must be between 10 and 1000 characters');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const name = form.current.user_name.value.trim();
      const email = form.current.user_email.value.trim();
      const message = form.current.message.value.trim();

      validateInput(name, email, message);

      // Add rate limiting using localStorage
      const lastSubmit = localStorage.getItem('lastSubmitTime');
      const now = Date.now();
      if (lastSubmit && now - parseInt(lastSubmit) < 60000) { // 1 minute cooldown
        throw new Error('Please wait a minute before sending another message');
      }

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message: message.replace(/<[^>]*>/g, ''), // Strip HTML
          to_email: 'andread-b@hotmail.com'
        }
      );

      if (result.text === 'OK') {
        localStorage.setItem('lastSubmitTime', now.toString());
        setSnackbar({
          open: true,
          message: 'Message sent successfully!',
          severity: 'success'
        });
        form.current.reset();
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to send message. Please try again later.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <Grid container spacing={3}>
          {/* Contact Form Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={sectionStyle}>
              <Typography variant="h4" sx={headingStyle}>
                Contact Me
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography sx={{ color: '#D5DFE9', mb: 2, lineHeight: 1.8 }}>
                  I'm always interested in hearing about new opportunities and collaborations. Feel free to reach out!
                </Typography>
                <Typography sx={{ color: '#8BA6C7', mb: 1 }}>
                  Email: andread-b@hotmail.com
                </Typography>
                <Typography sx={{ color: '#8BA6C7', mb: 1 }}>
                  LinkedIn: <Link href="https://www.linkedin.com/in/andreawdb/" target="_blank" rel="noopener noreferrer" sx={{ color: '#8BA6C7', '&:hover': { color: '#B8C5D1' } }}>linkedin.com/in/andreawdb</Link>
                </Typography>
                <Typography sx={{ color: '#8BA6C7' }}>
                  GitHub: <Link href="https://github.com/AndreaBavaro" target="_blank" rel="noopener noreferrer" sx={{ color: '#8BA6C7', '&:hover': { color: '#B8C5D1' } }}>github.com/AndreaBavaro</Link>
                </Typography>
              </Box>
              
              <Box component="form" ref={form} onSubmit={handleSubmit} noValidate>
                <TextField
                  fullWidth
                  label="Name"
                  name="user_name"
                  margin="normal"
                  required
                  sx={inputStyle}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="user_email"
                  margin="normal"
                  type="email"
                  required
                  sx={inputStyle}
                />
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  margin="normal"
                  multiline
                  rows={4}
                  required
                  sx={inputStyle}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ ...buttonStyle, mt: 2 }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: '#B8C5D1' }} />
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Calendly Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={sectionStyle}>
              <Typography variant="h5" sx={headingStyle}>
                Schedule a Meeting
              </Typography>
              <Box sx={{ 
                height: '700px', 
                overflow: 'hidden',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& iframe': {
                  border: 'none',
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'transparent'
                }
              }}>
                <InlineWidget
                  url="https://calendly.com/andread-b/30min"
                  styles={{
                    height: '100%',
                    minWidth: '320px'
                  }}
                  prefill={{
                    email: form.current?.user_email?.value || '',
                    name: form.current?.user_name?.value || ''
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default Contact;
