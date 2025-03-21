import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import DownloadIcon from '@mui/icons-material/Download';
import animeData from '../data/animeData.json';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load movie data from the comprehensive JSON file
    const loadMovieData = () => {
      try {
        setLoading(true);
        
        // Get only movies from the anime list
        const allAnime = animeData.animeList || [];
        const moviesList = allAnime.filter(anime => anime.type === 'Movie');
        
        // Sort by year (newest first)
        const sortedMovies = [...moviesList].sort((a, b) => b.year - a.year);
        setMovies(sortedMovies);
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to load movie data:", error);
        setLoading(false);
      }
    };

    loadMovieData();
  }, []);

  const renderAnimeCard = (anime) => (
    <Grid item xs={6} sm={4} md={3} key={anime.id}>
      <Box
        component={RouterLink}
        to={`/anime/${anime.id}`}
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'block',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}
      >
        <Box
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            aspectRatio: '2/3',
            bgcolor: '#333',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            mb: 1,
          }}
        >
          <Box
            component="img"
            src={anime.cover}
            alt={anime.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              bgcolor: 'rgba(0,0,0,0.7)',
              borderRadius: 1,
              px: 1,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              zIndex: 2,
            }}
          >
            <StarIcon sx={{ color: '#FFD700', fontSize: { xs: 14, sm: 16 }, mr: 0.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
              {anime.rating}
            </Typography>
          </Box>
          
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: { xs: 1, sm: 1.5 },
              background:
                'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#e91e63',
                    fontWeight: 'bold',
                    display: 'inline-block',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    px: 0.8,
                    py: 0.2,
                    borderRadius: 0.8,
                    mb: 0.8,
                    fontSize: { xs: '0.6rem', sm: '0.7rem' },
                  }}
                >
                  Movie
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="h3"
                  sx={{
                    fontWeight: 'bold',
                    display: '-webkit-box',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    fontSize: { xs: '0.75rem', sm: '0.85rem' },
                    mb: 0.8,
                  }}
                >
                  {anime.title}
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.6rem', sm: '0.7rem' } }}>
              {anime.year}
            </Typography>
          </Box>
          
          {/* Overlay details that appear on hover over bottom half */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.85)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: { xs: 1, sm: 2 },
              opacity: 0,
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 1,
              },
              zIndex: 3,
            }}
          >
            <Typography 
              variant="subtitle2" 
              component="h3" 
              sx={{ 
                fontWeight: 'bold',
                color: 'white',
                mb: 0.5,
                textAlign: 'center',
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
              }}
            >
              {anime.title}
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'white', 
                textAlign: 'center', 
                mb: { xs: 0.5, sm: 1.5 },
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                opacity: 0.9,
              }}
            >
              {anime.description || 'No description available.'}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center', mb: { xs: 0.5, sm: 1.5 } }}>
              {anime.genres && anime.genres.slice(0, 3).map((genre, idx) => (
                <Chip 
                  key={idx} 
                  label={genre} 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(137, 87, 229, 0.3)',
                    color: 'white',
                    fontSize: { xs: '0.55rem', sm: '0.65rem' },
                    height: { xs: 16, sm: 20 },
                    '& .MuiChip-label': {
                      padding: { xs: '0 6px', sm: '0 8px' },
                    }
                  }} 
                />
              ))}
            </Box>
            
            <Button
              size="small"
              variant="contained"
              startIcon={<DownloadIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
              fullWidth
              sx={{
                bgcolor: '#8957e5',
                color: 'white',
                py: { xs: 0.5, sm: 0.8 },
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#7548c7',
                  transform: 'scale(1.05)',
                },
                mt: 'auto',
                minHeight: { xs: 24, sm: 32 },
              }}
            >
              Download Movie
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );

  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', pt: 3, pb: 6 }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              mb: 1,
              color: 'white',
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            Anime Movies
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            Complete collection of high-quality anime movies dubbed in Hindi
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#ffb6c1' }} />
          </Box>
        ) : movies.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center', my: 8, color: 'text.secondary' }}>
            No movies found
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {movies.map(movie => renderAnimeCard(movie))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default MoviesPage; 