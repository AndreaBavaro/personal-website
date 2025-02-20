import { createContext, useContext, useState } from 'react';
import { createTheme } from '@mui/material';

const personalTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF6B6B',
      light: '#FF8E8E',
      dark: '#FF4848',
    },
    secondary: {
      main: '#4ECDC4',
      light: '#71D8D1',
      dark: '#3BA39B',
    },
    background: {
      default: '#FFF9F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#95A5A6',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const professionalTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
      light: '#4dabf5',
      dark: '#1769aa',
    },
    secondary: {
      main: '#3f51b5',
      light: '#6573c3',
      dark: '#2c387e',
    },
    background: {
      default: '#0A1929',
      paper: '#132F4C',
    },
    text: {
      primary: '#ffffff',
      secondary: '#B2BAC2',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '3.5rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('personal');
  const [hasSelectedTheme, setHasSelectedTheme] = useState(false);

  const theme = themeMode === 'personal' ? personalTheme : professionalTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, hasSelectedTheme, setHasSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
