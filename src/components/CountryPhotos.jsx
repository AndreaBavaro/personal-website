import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Container, IconButton, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';

const CountryPhotos = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rotation, setRotation] = useState(0);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      let photoList;

      if (import.meta.env.DEV) {
        // In development, use the API endpoint
        const response = await fetch(`/api/photos/${encodeURIComponent(countryName)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        photoList = await response.json();
      } else {
        // In production, use the static JSON file
        const response = await fetch('/photoData.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allPhotos = await response.json();
        photoList = allPhotos[countryName] || [];
      }

      if (photoList.length > 0) {
        const photoUrls = photoList.map(file => `/photos/${countryName}/${encodeURIComponent(file.name)}`);
        console.log('Found photos:', photoUrls);
        setPhotos(photoUrls);
      } else {
        console.error('No photos found for country:', countryName);
        navigate('/photos');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Failed to load photos');
      navigate('/photos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [countryName, navigate]);

  const handleNext = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    setRotation(0); // Reset rotation when changing photos
  };

  const handlePrevious = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setRotation(0); // Reset rotation when changing photos
  };

  const handleClose = () => {
    navigate('/photos');
  };

  const handleImageError = (event) => {
    console.error('Failed to load image:', event.target.src);
    setError('Failed to load image');
  };

  const handleRotateLeft = () => {
    setRotation((prev) => prev - 90);
  };

  const handleRotateRight = () => {
    setRotation((prev) => prev + 90);
  };

  const preventRightClick = (e) => {
    e.preventDefault();
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!photos.length) return null;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: 'url("/background.jpg") no-repeat center center fixed',
        backgroundSize: 'cover',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(10, 25, 47, 0.85)',
          backdropFilter: 'blur(2px)',
          pointerEvents: 'none',
          zIndex: 1,
        },
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 2, sm: 4 },
          px: { xs: 1, sm: 2, md: 3 },
          position: 'relative', 
          zIndex: 2 
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ width: '100%', maxWidth: '900px' }}
        >
          <Paper
            elevation={3}
            sx={{
              backgroundColor: 'rgba(13, 31, 45, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: { xs: '8px', sm: '16px' },
              padding: { xs: '16px', sm: '24px' },
              marginBottom: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: { xs: 2, sm: 3 },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#B8C5D1',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  fontWeight: 600,
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                {countryName}
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                gap: 1,
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <IconButton
                  onClick={handleRotateLeft}
                  sx={{
                    color: '#B8C5D1',
                    backgroundColor: 'rgba(13, 31, 45, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(13, 31, 45, 0.7)',
                    },
                  }}
                >
                  <RotateLeftIcon />
                </IconButton>
                <IconButton
                  onClick={handleRotateRight}
                  sx={{
                    color: '#B8C5D1',
                    backgroundColor: 'rgba(13, 31, 45, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(13, 31, 45, 0.7)',
                    },
                  }}
                >
                  <RotateRightIcon />
                </IconButton>
                <IconButton
                  onClick={handleClose}
                  sx={{
                    color: '#B8C5D1',
                    backgroundColor: 'rgba(13, 31, 45, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(13, 31, 45, 0.7)',
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                minHeight: 0,
                aspectRatio: { xs: '4/3', sm: '16/9' },
                backgroundColor: 'rgba(13, 31, 45, 0.3)',
                borderRadius: { xs: '4px', sm: '8px' },
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <CircularProgress sx={{ color: '#B8C5D1' }} />
                </Box>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhotoIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={photos[currentPhotoIndex]}
                        alt={`Photo ${currentPhotoIndex + 1} of ${photos.length}`}
                        onError={handleImageError}
                        onContextMenu={preventRightClick}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          transform: `rotate(${rotation}deg)`,
                          transition: 'transform 0.3s ease',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          MozUserSelect: 'none',
                          msUserSelect: 'none',
                        }}
                        draggable="false"
                      />
                      <IconButton
                        onClick={handlePrevious}
                        sx={{
                          position: 'absolute',
                          left: 0,
                          color: '#B8C5D1',
                          backgroundColor: 'rgba(13, 31, 45, 0.5)',
                          '&:hover': {
                            backgroundColor: 'rgba(13, 31, 45, 0.7)',
                          },
                        }}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                      <IconButton
                        onClick={handleNext}
                        sx={{
                          position: 'absolute',
                          right: 0,
                          color: '#B8C5D1',
                          backgroundColor: 'rgba(13, 31, 45, 0.5)',
                          '&:hover': {
                            backgroundColor: 'rgba(13, 31, 45, 0.7)',
                          },
                        }}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </Box>
                  </motion.div>
                </AnimatePresence>
              )}
            </Box>

            <Box sx={{ 
              mt: { xs: 1, sm: 2 },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap',
              px: { xs: 1, sm: 2 }
            }}>
              <Typography
                variant="body1"
                sx={{
                  color: '#B8C5D1',
                  textAlign: 'center',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                }}
              >
                Photo {currentPhotoIndex + 1} of {photos.length}
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CountryPhotos;
