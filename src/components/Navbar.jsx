import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { themeMode, setThemeMode } = useTheme();

  const menuItems = ['Home', 'About', 'Portfolio', 'Resume', 'Contact'];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleTheme = () => {
    setThemeMode(themeMode === 'personal' ? 'professional' : 'personal');
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem button key={item} onClick={() => {
          navigate(`/${item.toLowerCase()}`);
          handleDrawerToggle();
        }}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Andrea Bavaro
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item}
                color="inherit"
                onClick={() => navigate(`/${item.toLowerCase()}`)}
              >
                {item}
              </Button>
            ))}
            <Tooltip title={`Switch to ${themeMode === 'personal' ? 'Professional' : 'Personal'} Mode`}>
              <IconButton
                color="inherit"
                onClick={toggleTheme}
                sx={{
                  ml: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {themeMode === 'personal' ? <WorkIcon /> : <PersonIcon />}
              </IconButton>
            </Tooltip>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
