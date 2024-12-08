import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Chip, Grid, Divider, useTheme, Button, Link, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import { europeanResume, globalResume } from '../data/resumeData';
import { isEurope } from '../utils/geolocation';

const Resume = () => {
  const [resumeData, setResumeData] = useState(globalResume);
  const [isEuropeanUser, setIsEuropeanUser] = useState(false);

  useEffect(() => {
    const detectLocation = async () => {
      const isEU = await isEurope();
      setIsEuropeanUser(isEU);
      setResumeData(isEU ? europeanResume : globalResume);
    };
    detectLocation();
  }, []);

  const theme = useTheme();

  const sectionStyle = {
    backgroundColor: 'rgba(13, 31, 45, 0.85)', // Deep blue with transparency
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    color: '#B8C5D1', // Light blue-grey
    marginBottom: '16px',
    fontWeight: 600,
    borderBottom: '2px solid rgba(99, 140, 177, 0.5)', // Muted blue
    paddingBottom: '8px',
  };

  const chipStyle = {
    backgroundColor: 'rgba(99, 140, 177, 0.2)', // Light blue with transparency
    color: '#B8C5D1',
    margin: '4px',
    border: '1px solid rgba(99, 140, 177, 0.3)',
    '&:hover': {
      backgroundColor: 'rgba(99, 140, 177, 0.3)',
    },
  };

  const linkStyle = {
    color: '#8BA6C7', // Lighter blue
    textDecoration: 'none',
    '&:hover': {
      color: '#B8C5D1',
      textDecoration: 'underline',
    },
  };

  const handleDownload = () => {
    const pdfName = isEuropeanUser ? 'Andrea_EU_Resume.pdf' : 'Andrea_CA_Resume.pdf';
    window.open(`/${pdfName}`, '_blank');
  };

  const Section = ({ icon, title, children }) => (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {icon}
        <Typography variant="h5" sx={{ ml: 1, fontWeight: 600, color: '#B8C5D1' }}>
          {title}
        </Typography>
      </Box>
      <Divider sx={{ mb: 1.5 }} />
      {children}
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 2, color: '#D5DFE9' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Paper elevation={3} sx={sectionStyle}>
          {/* Header with Download Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" sx={{ mb: 0.5, color: '#B8C5D1' }}>{resumeData.header.name}</Typography>
              <Typography variant="subtitle1" color="#8BA6C7">
                {resumeData.header.contact.email} | {resumeData.header.contact.links.map((link, index) => (
                  <React.Fragment key={link.url}>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: '#8BA6C7', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                    >
                      {link.text}
                    </Link>
                    {index < resumeData.header.contact.links.length - 1 && ' | '}
                  </React.Fragment>
                ))}
              </Typography>
              <Typography variant="subtitle1" color="#8BA6C7">
                Citizenship: {isEuropeanUser ? resumeData.header.citizenshipEU : resumeData.header.citizenship}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{ height: 'fit-content', backgroundColor: 'rgba(99, 140, 177, 0.2)', color: '#B8C5D1', '&:hover': { backgroundColor: 'rgba(99, 140, 177, 0.3)' } }}
            >
              Download PDF
            </Button>
          </Box>

          {/* Professional Summary */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ color: '#B8C5D1', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon /> Professional Summary
            </Typography>
            <Typography sx={{ color: '#D5DFE9', lineHeight: 1.8 }}>
              {resumeData.summary}
            </Typography>
          </Box>

          {/* Main Content Grid */}
          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <Section icon={<WorkIcon color="#B8C5D1" />} title="Experience">
                {resumeData.experience.map((experience, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ color: '#B8C5D1' }}>{experience.title}</Typography>
                    <Typography variant="subtitle2" sx={{ color: '#8BA6C7' }}>
                      {experience.company} | {experience.location} | {experience.date}
                    </Typography>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#D5DFE9' }}>
                      {experience.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  </Box>
                ))}
              </Section>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={6}>
              <Section icon={<SchoolIcon color="#B8C5D1" />} title="Education">
                {resumeData.education.map((education, index) => (
                  <Box key={index} sx={{ mb: 1.5 }}>
                    <Typography variant="h6" sx={{ color: '#B8C5D1' }}>{education.school}</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#8BA6C7' }}>{education.degree}</Typography>
                    <Typography sx={{ color: '#8BA6C7', mb: 2 }}>{education.location} | {education.date}</Typography>
                  </Box>
                ))}
              </Section>

              <Section icon={<CodeIcon color="#B8C5D1" />} title="Projects">
                {resumeData.projects.map((project, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h6" sx={{ color: '#B8C5D1' }}>
                        {project.title}
                      </Typography>
                      {project.demoLink && (
                        <Link
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ color: '#8BA6C7', textDecoration: 'none', '&:hover': { color: '#B8C5D1', textDecoration: 'underline' } }}
                        >
                          View Demo →
                        </Link>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                      {Array.isArray(project.technologies) ? 
                        project.technologies.map((tech, techIndex) => (
                          <Chip key={techIndex} label={tech} sx={chipStyle} />
                        )) : 
                        project.technologies.split(', ').map((tech, techIndex) => (
                          <Chip key={techIndex} label={tech} sx={chipStyle} />
                        ))
                      }
                    </Box>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#D5DFE9' }}>
                      {project.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  </Box>
                ))}
              </Section>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Resume;
