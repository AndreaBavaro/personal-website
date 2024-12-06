import { Box, Typography, Paper, TextField, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { InlineWidget } from 'react-calendly';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get form data
    const formData = new FormData(form.current);
    const templateParams = {
      to_email: 'andread-b@hotmail.com',
      user_name: formData.get('user_name'),
      user_email: formData.get('user_email'),
      message: formData.get('message')
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setSnackbar({
        open: true,
        message: 'Message sent successfully!',
        severity: 'success'
      });
      
      // Clear form
      form.current.reset();
    } catch (error) {
      console.error('Email error:', error);
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
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
                  Email: andreab-b@hotmail.com
                </Typography>
                <Typography sx={{ color: '#8BA6C7', mb: 1 }}>
                  LinkedIn: [Your LinkedIn]
                </Typography>
                <Typography sx={{ color: '#8BA6C7' }}>
                  GitHub: [Your GitHub]
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
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{ ...buttonStyle, mt: 2 }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Calendly Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={sectionStyle}>
              <Typography variant="h4" sx={headingStyle}>
                Schedule a Meeting
              </Typography>
              <Box sx={{ height: '600px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', overflow: 'hidden' }}>
                <InlineWidget
                  url="https://calendly.com/andread-b"
                  styles={{
                    height: '100%',
                    width: '100%',
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
