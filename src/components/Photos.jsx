import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Container, Tooltip, IconButton, Grid } from '@mui/material';
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

  const countries = Object.keys(photos);

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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {countries.map((country) => (
            <Grid item xs={4} sm={4} md={4} key={country}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
                onClick={() => handleCountryClick({ properties: { name: country } })}
              >
                <Typography variant="h6" component="h2" gutterBottom sx={{ 
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  textAlign: 'center'
                }}>
                  {country}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Photos;
