import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Container, TextField, Alert, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useNavigate } from 'react-router-dom';

const geoUrl = "/data/world-110m.json";

// Map for handling different country name formats
const countryNameMapping = {
  "United States of America": "USA",
  "United States": "USA",
  "Czech Republic": "Czechia",
  "United States Virgin Islands": "USA",
  "U.S. Virgin Islands": "USA",
  "The Bahamas": "Bahamas",
  "Republic of Korea": "South Korea",
  "Democratic People's Republic of Korea": "North Korea",
  "United Kingdom of Great Britain and Northern Ireland": "United Kingdom",
  "Great Britain": "United Kingdom",
};

const Photos = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMessage, setSearchMessage] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [photoCount, setPhotoCount] = useState({});

  useEffect(() => {
    const loadPhotoData = async () => {
      try {
        const response = await fetch('/data/photoLocations.json');
        const data = await response.json();
        console.log('Loaded photo data:', data);
        setPhotos(data);

        // Load photo counts
        const counts = {};
        for (const [country, paths] of Object.entries(data)) {
          counts[country] = paths.length;
        }
        setPhotoCount(counts);
      } catch (error) {
        console.error('Error loading photo data:', error);
        setPhotos({});
        setPhotoCount({});
      }
    };

    loadPhotoData();
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

    // Finally check if the geo name exists in our mappings as a value
    const reverseMapping = Object.entries(countryNameMapping).find(([_, value]) => value === geoName);
    if (reverseMapping && photos[geoName]) {
      return geoName;
    }

    return null;
  };

  const handleCountryClick = (geo) => {
    const countryName = getPhotoCountryName(geo.properties.name);
    if (countryName) {
      navigate(`/photos/${countryName}`);
    }
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
        text: "Sorry, I haven't been there yet!"
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && searchMessage?.type === 'success') {
      navigate(`/photos/${searchMessage.country}`);
    }
  };

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
      <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 2 }}>
        <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Typography variant="h4" component="h1" sx={{ 
            color: 'white', 
            textAlign: 'center'
          }}>
            Photo Locations
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for a country..."
              value={searchQuery}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2a9d8f',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
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
                  style={{ marginTop: '8px' }}
                >
                  <Alert 
                    severity={searchMessage.type === 'success' ? 'success' : 'info'}
                    sx={{
                      backgroundColor: searchMessage.type === 'success' 
                        ? 'rgba(42, 157, 143, 0.1)' 
                        : 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      '& .MuiAlert-icon': {
                        color: searchMessage.type === 'success' ? '#2a9d8f' : 'white',
                      },
                    }}
                  >
                    {searchMessage.text}
                    {searchMessage.type === 'success' && (
                      <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                        Press Enter to view photos
                      </Typography>
                    )}
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
        <Box sx={{ width: '100%', height: '75vh' }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 180,
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = getPhotoCountryName(geo.properties.name);
                  const tooltipText = countryName || geo.properties.name;
                  
                  return (
                    <Tooltip
                      key={geo.rsmKey}
                      title={tooltipText}
                      arrow
                      placement="top"
                      sx={{
                        '& .MuiTooltip-tooltip': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          color: '#1a1a1a',
                          fontSize: '0.875rem',
                          padding: '8px 12px',
                          borderRadius: '4px',
                        },
                        '& .MuiTooltip-arrow': {
                          color: 'rgba(255, 255, 255, 0.9)',
                        },
                      }}
                    >
                      <Geography
                        geography={geo}
                        onClick={() => countryName && handleCountryClick(geo)}
                        style={{
                          default: {
                            fill: countryName ? "#2a9d8f" : "#333333",
                            stroke: "#FFFFFF",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          hover: {
                            fill: countryName ? "#e76f51" : "#333333",
                            stroke: "#FFFFFF",
                            strokeWidth: 0.5,
                            outline: "none",
                            cursor: countryName ? "pointer" : "default",
                          },
                          pressed: {
                            fill: countryName ? "#e76f51" : "#333333",
                            stroke: "#FFFFFF",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                        }}
                      />
                    </Tooltip>
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </Box>
      </Container>
    </Box>
  );
};

export default Photos;
