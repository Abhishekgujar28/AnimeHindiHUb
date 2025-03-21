import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import HomePage from './pages/HomePage';
import AnimePage from './pages/AnimePage';
import AnimeDetailPage from './pages/AnimeDetailPage';
import EpisodeDetailPage from './pages/EpisodeDetailPage';
import SearchPage from './pages/SearchPage';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import TrendingPage from './pages/TrendingPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminAddAnimePage from './pages/admin/AdminAddAnimePage';

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffb6c1',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontSize: '0.875rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
  },
});

// ScrollToTop component to handle scrolling on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  
  return null;
}

// Page wrapper for transition effects
const PageWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        animation: 'fadeInUp 0.5s ease-out',
        '@keyframes fadeInUp': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      }}
    >
      {children}
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <ScrollToTop />
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100vh',
            overflow: 'hidden' // Prevent horizontal overflow on mobile
          }}
        >
          <Header />
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1,
              pb: { xs: 2, md: 4 },
              // Add responsive padding to prevent content from being hidden under elements
              pt: { xs: 0, md: 0 },
              px: { xs: 0, md: 0 },
              overflow: 'hidden', // Prevent content overflow
            }}
          >
            <Routes>
              <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
              <Route path="/anime" element={<PageWrapper><AnimePage /></PageWrapper>} />
              <Route path="/anime/:id" element={<PageWrapper><AnimeDetailPage /></PageWrapper>} />
              <Route path="/episode/:id" element={<PageWrapper><EpisodeDetailPage /></PageWrapper>} />
              <Route path="/search" element={<PageWrapper><SearchPage /></PageWrapper>} />
              <Route path="/movies" element={<PageWrapper><MoviesPage /></PageWrapper>} />
              <Route path="/series" element={<PageWrapper><SeriesPage /></PageWrapper>} />
              <Route path="/trending" element={<PageWrapper><TrendingPage /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
              <Route path="/admin/add-anime" element={<PageWrapper><AdminAddAnimePage /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App; 