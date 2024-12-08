import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Container, IconButton } from '@mui/material';
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
        maxWidth="md" 
        sx={{ 
          py: 2,
          px: { xs: 2, sm: 3 },
          position: 'relative', 
          zIndex: 2,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
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
              borderRadius: '16px',
              p: { xs: 2, sm: 3 },
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: 'calc(100vh - 48px)',
              width: '100%'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 2,
              minHeight: '48px'
            }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#B8C5D1',
                  fontWeight: 600,
                }}
              >
                {countryName}
              </Typography>
              <Box>
                <IconButton
                  onClick={handleRotateLeft}
                  sx={{
                    color: '#B8C5D1',
                    mr: 1,
                  }}
                >
                  <RotateLeftIcon />
                </IconButton>
                <IconButton
                  onClick={handleRotateRight}
                  sx={{
                    color: '#B8C5D1',
                    mr: 1,
                  }}
                >
                  <RotateRightIcon />
                </IconButton>
                <IconButton
                  onClick={handleClose}
                  sx={{
                    color: '#B8C5D1',
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
              }}
            >
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
                      alt={photos[currentPhotoIndex]}
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
            </Box>

            <Box sx={{ mt: 2, minHeight: '60px' }}>
              <Typography
                sx={{
                  color: '#D5DFE9',
                  textAlign: 'center',
                  fontSize: '1.1rem',
                  mb: 1,
                  display: 'none',
                }}
              >
                {photos[currentPhotoIndex]}
              </Typography>
              <Typography
                sx={{
                  color: '#B8C5D1',
                  textAlign: 'center',
                  fontSize: '0.9rem',
                  display: 'none',
                }}
              >
                {currentPhotoIndex + 1} / {photos.length}
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CountryPhotos;
