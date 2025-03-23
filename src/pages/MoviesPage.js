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
  Card,
  CardMedia,
  CardContent,
  CardActions,
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
      {/* For mobile, keep the current card style */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
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
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: { xs: 0.5, sm: 1.5 }, flexWrap: 'wrap', justifyContent: 'center' }}>
                {anime.genres && anime.genres.slice(0, 3).map((genre, idx) => (
                  <Chip 
                    key={idx} 
                    label={genre} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: { xs: '0.55rem', sm: '0.65rem' },
                      height: { xs: 16, sm: 20 },
                      mb: 0.5,
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
                component={RouterLink}
                to={`/anime/${anime.id}`}
                startIcon={<DownloadIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                fullWidth
                sx={{
                  bgcolor: '#e91e63',
                  color: 'white',
                  py: { xs: 0.5, sm: 0.8 },
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#c2185b',
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
      </Box>

      {/* For desktop/laptop, use the AnimePage card style */}
      <Card 
        sx={{ 
          height: '100%', 
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            bgcolor: 'rgba(255, 255, 255, 0.08)',
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height={250}
            image={anime.cover}
            alt={anime.title}
            sx={{ objectFit: 'cover' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: 1,
              px: 1,
              py: 0.5,
            }}
          >
            <StarIcon sx={{ color: '#FFD700', fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
              {anime.rating}
            </Typography>
          </Box>
          <Chip
            label="Movie"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              bgcolor: '#e53935',
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </Box>
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
            {anime.title}
          </Typography>
          
          <Box sx={{ display: 'flex', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
            {anime.genres && anime.genres.slice(0, 3).map((genre, index) => (
              <Chip 
                key={index} 
                label={genre} 
                size="small" 
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                }} 
              />
            ))}
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            Movie • {anime.year} • {anime.language || 'Hindi'}
          </Typography>
        </CardContent>
        
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            component={RouterLink}
            to={`/anime/${anime.id}`}
            variant="contained"
            size="small"
            startIcon={<DownloadIcon />}
            sx={{ 
              bgcolor: '#ffb6c1',
              color: '#000',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#ff99a8',
              },
              flexGrow: 1
            }}
          >
            Download Movie
          </Button>
        </CardActions>
      </Card>
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