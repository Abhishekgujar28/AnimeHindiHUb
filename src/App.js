import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import EpisodesPage from './pages/EpisodesPage';
import EpisodeDetailPage from './pages/EpisodeDetailPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import TrendingPage from './pages/TrendingPage';
import TopRatedPage from './pages/TopRatedPage';
import MostWatchedPage from './pages/MostWatchedPage';
import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import AnimeDetailPage from './pages/AnimeDetailPage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminAddAnimePage from './pages/admin/AdminAddAnimePage';
import AdminAddEpisodePage from './pages/admin/AdminAddEpisodePage';

// Create a dark theme for Your Lie in April
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5', // Indigo
      light: '#757de8',
      dark: '#002984',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffb6c1', // Light pink
      light: '#ffc8d1',
      dark: '#ff99a8',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          '&:hover': {
            boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
          },
        },
        containedPrimary: {
          backgroundColor: '#3f51b5',
          '&:hover': {
            backgroundColor: '#303f9f',
          },
        },
        containedSecondary: {
          backgroundColor: '#ffb6c1',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#ff99a8',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.23)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
        head: {
          backgroundColor: '#272727',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05) !important',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.23)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 160px)' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/episodes" element={<EpisodesPage />} />
            <Route path="/episodes/:id" element={<EpisodeDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/most-watched" element={<MostWatchedPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/anime/:id" element={<AnimeDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<SearchPage />} />
            
            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-anime"
              element={
                <ProtectedRoute>
                  <AdminAddAnimePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-episode"
              element={
                <ProtectedRoute>
                  <AdminAddEpisodePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-anime/:id"
              element={
                <ProtectedRoute>
                  <AdminAddAnimePage />
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 