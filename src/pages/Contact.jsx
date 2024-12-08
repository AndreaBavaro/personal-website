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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.current.user_name.value,
          from_email: form.current.user_email.value,
          message: form.current.message.value,
          to_email: 'andread-b@hotmail.com'
        }
      );

      if (result.text === 'OK') {
        setSnackbar({
          open: true,
          message: 'Message sent successfully!',
          severity: 'success'
        });
        form.current.reset();
      }
    } catch (error) {
      console.error('Detailed error:', error);
      setSnackbar({
        open: true,
        message: `Failed to send message: ${error.message}`,
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
