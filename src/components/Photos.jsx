import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Container, Tooltip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
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

  useEffect(() => {
    const loadPhotoData = async () => {
      try {
        const response = await fetch('/data/photoLocations.json');
        const data = await response.json();
        console.log('Loaded photo data:', data);
        setPhotos(data);
      } catch (error) {
        console.error('Error loading photo data:', error);
        setPhotos({});
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
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper 
            elevation={3} 
            sx={{
              backgroundColor: 'rgba(13, 31, 45, 0.85)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              position: 'relative', 
            }}
          >
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                position: 'absolute',
                right: '16px',
                top: '16px',
                color: '#B8C5D1',
                zIndex: 3,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography 
              variant="h3" 
              sx={{ 
                color: '#B8C5D1',
                marginBottom: '16px',
                fontWeight: 600,
                borderBottom: '2px solid rgba(99, 140, 177, 0.5)',
                paddingBottom: '8px',
                paddingRight: '48px', 
              }}
            >
              Travel Photography
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#D5DFE9',
                marginBottom: '24px'
              }}
            >
              Explore my photography journey around the world. Click on the highlighted countries to view photos from that location.
            </Typography>

            <Box sx={{ mb: 4 }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 150,
                  center: [0, 30]
                }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryName = getPhotoCountryName(geo.properties.name);
                      const isActive = !!countryName;
                      return (
                        <Tooltip
                          key={geo.rsmKey}
                          title={isActive ? countryName : ""}
                          arrow
                          placement="top"
                        >
                          <g>
                            <Geography
                              geography={geo}
                              onClick={isActive ? () => handleCountryClick(geo) : undefined}
                              style={{
                                default: {
                                  fill: isActive ? "#638CB1" : "#243B53",
                                  stroke: "#FFFFFF",
                                  strokeWidth: 0.5,
                                  outline: "none",
                                  cursor: isActive ? "pointer" : "default",
                                  opacity: isActive ? 1 : 0.5,
                                },
                                hover: {
                                  fill: isActive ? "#7FA8CD" : "#243B53",
                                  stroke: "#FFFFFF",
                                  strokeWidth: 0.5,
                                  outline: "none",
                                  cursor: isActive ? "pointer" : "default",
                                  opacity: isActive ? 1 : 0.5,
                                },
                                pressed: {
                                  fill: isActive ? "#638CB1" : "#243B53",
                                  stroke: "#FFFFFF",
                                  strokeWidth: 0.5,
                                  outline: "none",
                                  cursor: isActive ? "pointer" : "default",
                                  opacity: isActive ? 1 : 0.5,
                                },
                              }}
                            />
                          </g>
                        </Tooltip>
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Photos;
