import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';

/**
 * OAuth Redirect Component
 * 
 * This component handles OAuth redirects from third-party services.
 * It extracts authorization codes or tokens from the URL and displays
 * appropriate feedback to the user.
 */
const OAuthRedirect = () => {
  const [status, setStatus] = useState('processing');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const processOAuthRedirect = async () => {
      try {
        // Extract query parameters from URL
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');
        const error = params.get('error');
        const error_description = params.get('error_description');

        // Handle error case
        if (error) {
          console.error('OAuth Error:', error, error_description);
          setStatus('error');
          setMessage(error_description || 'Authentication failed. Please try again.');
          return;
        }

        // If no code is present, show error
        if (!code) {
          setStatus('error');
          setMessage('No authorization code received. Please try again.');
          return;
        }

        // Log the authorization code (in a real app, you would send this to your backend)
        console.log('Authorization code received:', code);
        console.log('State parameter:', state);

        // For demonstration purposes, we're just showing success
        // In a real application, you would:
        // 1. Send the code to your backend
        // 2. Your backend would exchange it for an access token
        // 3. Store the token securely
        
        setStatus('success');
        setMessage('Authentication successful! You can close this window.');

        // Optional: Redirect back to home page after a delay
        setTimeout(() => {
          // When using HashRouter, we need to use relative paths
          navigate('/');
        }, 3000);
      } catch (error) {
        console.error('Error processing OAuth redirect:', error);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    processOAuthRedirect();
  }, [location, navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'rgba(13, 31, 45, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        {status === 'processing' && (
          <>
            <CircularProgress sx={{ color: '#B8C5D1', mb: 3 }} />
            <Typography variant="h5" sx={{ color: '#B8C5D1', mb: 2 }}>
              Processing Authentication
            </Typography>
            <Typography sx={{ color: '#D5DFE9' }}>
              Please wait while we complete the authentication process...
            </Typography>
          </>
        )}

        {status === 'success' && (
          <>
            <Typography variant="h5" sx={{ color: '#B8C5D1', mb: 2 }}>
              Authentication Successful
            </Typography>
            <Typography sx={{ color: '#D5DFE9', mb: 2 }}>
              {message}
            </Typography>
            <Typography sx={{ color: '#D5DFE9', fontSize: '0.9rem' }}>
              Redirecting you back to the homepage...
            </Typography>
          </>
        )}

        {status === 'error' && (
          <>
            <Typography variant="h5" sx={{ color: '#B8C5D1', mb: 2 }}>
              Authentication Error
            </Typography>
            <Typography sx={{ color: '#D5DFE9', mb: 2 }}>
              {message}
            </Typography>
            <Typography sx={{ color: '#D5DFE9', fontSize: '0.9rem' }}>
              You can close this window and try again.
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default OAuthRedirect;
