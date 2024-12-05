import { Box, Typography, Paper, TextField, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Generator = () => {
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

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    calendlyLink: '',
    about: '',
    githubLink: '',
    linkedinLink: '',
  });
  const [resume, setResume] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'resume') {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file for the resume');
        return;
      }
      setResume(file);
    } else if (type === 'background') {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file for the background');
        return;
      }
      setBackgroundImage(file);
    }
    setError('');
  };

  const generateWebsite = async () => {
    setLoading(true);
    setError('');
    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !resume || !backgroundImage) {
        throw new Error('Please fill in all required fields');
      }

      const zip = new JSZip();
      
      // Create a copy of the current project structure
      const projectFiles = {
        'package.json': JSON.stringify({
          name: formData.fullName.toLowerCase().replace(/\s+/g, '-') + '-portfolio',
          private: true,
          version: '1.0.0',
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'vite build',
            preview: 'vite preview'
          },
          dependencies: {
            '@emotion/react': '^11.11.3',
            '@emotion/styled': '^11.11.0',
            '@fontsource/poppins': '^5.0.8',
            '@mui/icons-material': '^5.15.6',
            '@mui/material': '^5.15.6',
            'framer-motion': '^11.0.3',
            'react': '^18.2.0',
            'react-dom': '^18.2.0',
            'react-router-dom': '^6.21.3',
            'react-calendly': '^4.3.0'
          }
        }, null, 2),
        'README.md': `# ${formData.fullName}'s Portfolio Website\n\nThis is a personal portfolio website generated using the Portfolio Generator.\n\n## Getting Started\n\n1. Install dependencies:\n\`\`\`bash\nnpm install\n\`\`\`\n\n2. Run the development server:\n\`\`\`bash\nnpm run dev\n\`\`\`\n\n3. Build for production:\n\`\`\`bash\nnpm run build\n\`\`\``,
      };

      // Add all project files to the zip
      Object.entries(projectFiles).forEach(([filename, content]) => {
        zip.file(filename, content);
      });

      // Add the resume to public folder
      zip.file('public/resume.pdf', resume);
      zip.file('public/background.jpg', backgroundImage);

      // Generate the zip file
      const content = await zip.generateAsync({ type: 'blob' });
      
      // Save the zip file
      saveAs(content, `${formData.fullName.toLowerCase().replace(/\s+/g, '-')}-portfolio.zip`);
      
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const zip = new JSZip();
    
    // Add files to the zip
    zip.file("index.html", generateHTML(formData));
    zip.file("styles.css", generateCSS());
    zip.file("script.js", generateJS());
    
    // Generate and save the zip file
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "portfolio-website.zip");
  };

  const generateHTML = (formData) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.get('name')}'s Portfolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>${formData.get('name')}</h1>
            <p>${formData.get('title')}</p>
        </header>
        <main>
            <section id="about">
                <h2>About Me</h2>
                <p>${formData.get('about')}</p>
            </section>
            <section id="contact">
                <h2>Contact</h2>
                <p>Email: ${formData.get('email')}</p>
            </section>
        </main>
    </div>
    <script src="script.js"></script>
</body>
</html>`;
  };

  const generateCSS = () => {
    return `
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #0d1f2d;
    color: #d5dfe9;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

header {
    text-align: center;
    padding: 4rem 0;
    background-color: rgba(13, 31, 45, 0.85);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    margin-bottom: 2rem;
}

section {
    background-color: rgba(13, 31, 45, 0.85);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

h1, h2 {
    color: #b8c5d1;
    border-bottom: 2px solid rgba(99, 140, 177, 0.5);
    padding-bottom: 0.5rem;
}

a {
    color: #8ba6c7;
    text-decoration: none;
}

a:hover {
    color: #b8c5d1;
    text-decoration: underline;
}`;
  };

  const generateJS = () => {
    return `
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box sx={{ maxWidth: '900px', margin: '0 auto' }}>
        <Paper elevation={0} sx={sectionStyle}>
          <Typography variant="h4" sx={headingStyle}>
            Website Generator
          </Typography>
          
          <Typography sx={{ color: '#D5DFE9', mb: 3, lineHeight: 1.8 }}>
            Fill in the form below to generate your personalized portfolio website. Once submitted,
            you'll receive a ZIP file containing all the necessary files for your website.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Full Name"
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  name="title"
                  label="Professional Title"
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="about"
                  label="About Me"
                  multiline
                  rows={4}
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="email"
                  label="Email"
                  type="email"
                  sx={inputStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={buttonStyle}
                >
                  Generate Website
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default Generator;
