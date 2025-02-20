import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, TextField, Container, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const geoUrl = "/data/world-110m.json";

// Map for handling different country name formats
const countryNameMapping = {
  "United States of America": "United States",
  "United States": "United States",
  "Great Britain": "United Kingdom",
  "Czech Republic": "Czechia",
  "Republic of Korea": "South Korea",
};

const Photos = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState(null);

  useEffect(() => {
    // Log the fetch attempt
    console.log('Fetching photo data...');
    fetch('/photoData.json')
      .then(response => {
        console.log('Response received:', response);
        return response.json();
      })
      .then(data => {
        console.log('Photo data loaded:', data);
        setPhotos(data);
      })
      .catch(error => {
        console.error('Error loading photo data:', error);
        setPhotos({});
      });
  }, []);

  const getPhotoCountryName = (geoName) => {
    // First check if there's a direct match
    if (photos[geoName]) {
      return geoName;
    }

    // Then check if there's a mapping
    const mappedName = countryNameMapping[geoName];
    if (mappedName && photos[mappedName]) {
      return mappedName;
    }

    return null;
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    if (!query) {
      setSearchMessage(null);
      return;
    }

    const searchResults = Object.keys(photos).filter(country => 
      country.toLowerCase().includes(query.toLowerCase())
    );

    if (searchResults.length > 0) {
      const country = searchResults[0];
      setSearchMessage({
        type: 'success',
        text: `Found photos from ${country}!`,
        country: country
      });
    } else {
      setSearchMessage({
        type: 'info',
        text: "No photos found from this country yet!"
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && searchMessage?.type === 'success') {
      navigate(`/photos/${searchMessage.country}`);
    }
  };

  const handleCountryClick = (geo) => {
    console.log('Country clicked:', geo.properties.name);
    const countryName = getPhotoCountryName(geo.properties.name);
    if (countryName) {
      console.log('Navigating to:', countryName);
      navigate(`/photos/${countryName}`);
    }
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh',
      backgroundImage: 'url(/background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: 4,
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
    }}>
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: '#fff',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          zIndex: 1000
        }}
      >
        <CloseIcon />
      </IconButton>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#fff',
            mb: 3,
            textAlign: 'center'
          }}
        >
          Travel Photography
        </Typography>

        <Box sx={{ 
          width: '100%', 
          maxWidth: 500, 
          mx: 'auto', 
          mb: 4 
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for a country..."
            value={searchQuery}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                opacity: 1,
              },
            }}
          />
          <AnimatePresence>
            {searchMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Alert 
                  severity={searchMessage.type === 'success' ? 'success' : 'info'}
                  sx={{
                    mt: 1,
                    backgroundColor: searchMessage.type === 'success' 
                      ? 'rgba(99, 140, 177, 0.2)' 
                      : 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    '& .MuiAlert-icon': {
                      color: searchMessage.type === 'success' ? '#8BA6C7' : '#fff',
                    },
                  }}
                >
                  {searchMessage.text}
                  {searchMessage.type === 'success' && (
                    <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.8 }}>
                      Press Enter to view photos
                    </Typography>
                  )}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        <Box sx={{ 
          width: '100%',
          height: '60vh',
          position: 'relative',
          backgroundColor: 'rgba(13, 31, 45, 0.7)',
          borderRadius: 2,
          padding: 3,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 130,
              center: [0, 20]
            }}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent'
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = getPhotoCountryName(geo.properties.name);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      data-tooltip-id="country-tooltip"
                      data-tooltip-content={countryName ? `${geo.properties.name} - Click to view photos` : geo.properties.name}
                      onClick={() => handleCountryClick(geo)}
                      style={{
                        default: {
                          fill: countryName ? '#638CB1' : '#1C3D5A',
                          stroke: '#0D1F2D',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        hover: {
                          fill: countryName ? '#8BA6C7' : '#1C3D5A',
                          stroke: '#0D1F2D',
                          strokeWidth: 0.5,
                          outline: 'none',
                          cursor: countryName ? 'pointer' : 'default',
                        },
                        pressed: {
                          fill: countryName ? '#8BA6C7' : '#1C3D5A',
                          stroke: '#0D1F2D',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
          <Tooltip 
            id="country-tooltip" 
            style={{
              backgroundColor: 'rgba(13, 31, 45, 0.9)',
              color: '#fff',
              borderRadius: '4px',
              padding: '8px 12px',
              fontSize: '14px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 1000
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Photos;
