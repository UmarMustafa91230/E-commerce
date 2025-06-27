import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00FFFF', // Electric blue
      light: '#4DFFFF',
      dark: '#00B3B3',
      contrastText: '#0e0e10',
    },
    secondary: {
      main: '#a020f0', // Purple neon
      light: '#b44df0',
      dark: '#7a1bb3',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0e0e10', // Very dark background
      paper: 'rgba(255, 255, 255, 0.05)', // Glassmorphism
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    success: {
      main: '#00FF88', // Neon green
    },
    warning: {
      main: '#FFD700', // Gold
    },
    error: {
      main: '#FF0066', // Neon pink
    },
    cta: {
      main: '#FF00FF', // Cyber pink
    },
  },
  typography: {
    fontFamily: '"Poppins", "Orbitron", "Rajdhani", sans-serif',
    h1: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 700,
      color: '#ffffff',
      letterSpacing: '0.05em',
      textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
    },
    h2: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      color: '#ffffff',
      letterSpacing: '0.03em',
      textShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
    },
    h3: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 600,
      color: '#ffffff',
      letterSpacing: '0.02em',
    },
    h4: {
      fontFamily: '"Rajdhani", sans-serif',
      fontWeight: 500,
      color: '#ffffff',
      letterSpacing: '0.01em',
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      color: '#ffffff',
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      color: '#ffffff',
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
      color: 'rgba(255, 255, 255, 0.8)',
      letterSpacing: '0.01em',
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
      color: 'rgba(255, 255, 255, 0.7)',
      letterSpacing: '0.005em',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 600,
          letterSpacing: '0.02em',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #00FFFF 0%, #a020f0 100%)',
          color: '#0e0e10',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4DFFFF 0%, #b44df0 100%)',
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.3)',
            transform: 'translateY(-2px) scale(1.02)',
          },
        },
        outlined: {
          border: '2px solid #00FFFF',
          color: '#00FFFF',
          background: 'rgba(0, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            background: 'rgba(0, 255, 255, 0.1)',
            borderColor: '#4DFFFF',
            color: '#4DFFFF',
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
            transform: 'translateY(-1px)',
          },
        },
        text: {
          color: '#00FFFF',
          '&:hover': {
            background: 'rgba(0, 255, 255, 0.1)',
            color: '#4DFFFF',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 255, 255, 0.1)',
            borderColor: 'rgba(0, 255, 255, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(0, 255, 255, 0.3)',
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)',
            },
            '&.Mui-focused': {
              borderColor: '#00FFFF',
              boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-focused': {
              color: '#00FFFF',
            },
          },
          '& .MuiInputBase-input': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(14, 14, 16, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          '&.MuiChip-colorSuccess': {
            background: 'rgba(0, 255, 136, 0.2)',
            borderColor: 'rgba(0, 255, 136, 0.4)',
            color: '#00FF88',
          },
          '&.MuiChip-colorWarning': {
            background: 'rgba(255, 215, 0, 0.2)',
            borderColor: 'rgba(255, 215, 0, 0.4)',
            color: '#FFD700',
          },
          '&.MuiChip-colorError': {
            background: 'rgba(255, 0, 102, 0.2)',
            borderColor: 'rgba(255, 0, 102, 0.4)',
            color: '#FF0066',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(14, 14, 16, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(14, 14, 16, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 16,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: 'rgba(14, 14, 16, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme; 