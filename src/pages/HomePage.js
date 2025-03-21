import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Divider,
  Stack,
  Paper,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import DownloadIcon from '@mui/icons-material/Download';
import animeData from '../data/animeData.json';

const bgImage = 'https://wallpapercave.com/wp/wp5114436.jpg';

function HomePage() {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Load anime data from the comprehensive JSON file
    const loadAnimeData = () => {
      try {
        setLoading(true);
        
        // Get the anime list from the JSON data
        const allAnime = animeData.animeList || [];
        
        // Sort by rating for popular anime
        const sortedByRating = [...allAnime].sort((a, b) => b.rating - a.rating);
        setPopularAnime(sortedByRating.slice(0, 6));
        
        // Get most recent anime for trending
        const sortedByYear = [...allAnime].sort((a, b) => b.year - a.year);
        setTrendingAnime(sortedByYear.slice(0, 4));
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to load anime data:", error);
        setLoading(false);
      }
    };

    loadAnimeData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/anime?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const renderAnimeCard = (anime) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={anime.id}>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
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
          {anime.type === 'Movie' && (
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
                fontSize: '0.7rem',
              }}
            />
          )}
          {anime.type === 'TV' && (
            <Chip
              label="Series"
              size="small"
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                bgcolor: '#3f51b5',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.7rem',
              }}
            />
          )}
        </Box>
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ 
            fontWeight: 'bold', 
            mb: 1,
            fontSize: '1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.2,
            height: '2.4em'
          }}>
            {anime.title}
          </Typography>
          
          <Box sx={{ display: 'flex', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
            {anime.genres.slice(0, 3).map((genre, index) => (
              <Chip 
                key={index} 
                label={genre} 
                size="small" 
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  height: '24px'
                }} 
              />
            ))}
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            {anime.episodes > 1 ? `${anime.episodes} Episodes • ` : 'Movie • '}
            {anime.year} • Hindi
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
              flexGrow: 1,
              fontSize: '0.8rem'
            }}
          >
            {anime.type === 'Movie' ? 'Download Movie' : 'Download Episodes'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <>
      <Box sx={{ bgcolor: '#121212' }}>
        {/* Hero Section */}
        <Paper 
          sx={{
            position: 'relative',
            backgroundColor: 'grey.900',
            color: '#fff',
            mb: 0,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${bgImage})`,
            height: { xs: '550px', md: '500px' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 0,
          }}
        >
          {/* Background overlay */}
          <Box
            sx={{ 
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.7)',
              backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%)',
            }}
          />
          <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center', px: { xs: 2, sm: 3, md: 4 } }}>
            <Typography 
              component="h1" 
               variant="h2" 
               color="inherit" 
               gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                 textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                 mb: 3,
                 fontSize: { xs: '2.2rem', sm: '3rem', md: '3.75rem' },
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 flexWrap: 'wrap'
              }}
            >
               <MusicNoteIcon sx={{ mr: 1, fontSize: { xs: 30, sm: 40 }, color: '#ffb6c1' }} />
               AnimeHindiHub
            </Typography>
            <Typography 
               variant="h5" 
               color="inherit" 
               paragraph
               sx={{ 
                 maxWidth: '700px',
                 mx: 'auto',
                 mb: 4,
                 opacity: 0.9,
                 fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
               }}
             >
               Download all episodes in high quality
             </Typography>
             
             <form onSubmit={handleSearchSubmit}>
               <TextField
                 fullWidth
                 placeholder="Search anime..."
                 variant="outlined"
                 value={searchTerm}
                 onChange={handleSearchChange}
                 InputProps={{
                   startAdornment: (
                     <InputAdornment position="start">
                       <SearchIcon sx={{ color: 'white', fontSize: 28 }} />
                     </InputAdornment>
                   ),
                   endAdornment: (
                     <InputAdornment position="end">
                       <Button 
                         type="submit"
                         variant="contained"
                         sx={{ 
                           bgcolor: '#ffb6c1',
                           color: 'black',
                           fontWeight: 'bold',
                           py: 1.5,
                           px: 2.5,
                           borderRadius: 1.5,
                           '&:hover': { 
                             bgcolor: '#ff99a8' 
                           }
                         }}
                       >
                         Search
                       </Button>
                     </InputAdornment>
                   ),
                   sx: { 
                     bgcolor: 'rgba(255,255,255,0.15)', 
                     borderRadius: 2,
                     color: 'white',
                     py: 0.8,
                     '& .MuiOutlinedInput-notchedOutline': {
                       borderColor: 'rgba(255,255,255,0.4)',
                       borderWidth: 2,
                     },
                     '&:hover .MuiOutlinedInput-notchedOutline': {
                       borderColor: 'rgba(255,255,255,0.6)',
                     },
                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                       borderColor: '#ffb6c1',
                       borderWidth: 2,
                     },
                     '&::placeholder': {
                       color: 'rgba(255,255,255,0.7)',
                       fontWeight: 'bold',
                     },
                   }
                 }}
                 sx={{ 
                   maxWidth: '800px', 
                   mx: 'auto',
                   mb: 4,
                   '& .MuiInputBase-input': {
                     color: 'white',
                     py: 2,
                     px: 2,
                     fontSize: '1.1rem',
                   }
                 }}
               />
             </form>
             
             <Stack 
               direction={{ xs: 'column', sm: 'row' }} 
               spacing={{ xs: 1.5, sm: 2 }} 
               justifyContent="center"
               sx={{ mb: { xs: 3, md: 0 } }}
             >
               <Button
                 variant="contained"
                 component={RouterLink}
                 to="/trending"
                 size="large"
                 startIcon={<WhatshotIcon />}
                 sx={{ 
                   py: 1.2,
                   borderRadius: 2,
                   fontWeight: 'bold',
                   bgcolor: '#ffb6c1',
                   color: '#000',
                   '&:hover': {
                     bgcolor: '#ff99a8',
                   },
                   width: { xs: '100%', sm: 'auto' }
                 }}
               >
                 Trending
               </Button>
               
               <Button
                 variant="contained"
                 component={RouterLink}
                 to="/movies"
                 size="large"
                 startIcon={<MovieIcon />}
                 sx={{ 
                   py: 1.2,
                   borderRadius: 2,
                   fontWeight: 'bold',
                   bgcolor: '#e91e63',
                   color: 'white',
                   '&:hover': {
                     bgcolor: '#c2185b',
                   },
                   width: { xs: '100%', sm: 'auto' }
                 }}
               >
                 Movies
               </Button>
               
               <Button
                 variant="contained"
                 component={RouterLink}
                 to="/series"
                 size="large"
                 startIcon={<TvIcon />}
                 sx={{ 
                   py: 1.2,
                   borderRadius: 2,
                   fontWeight: 'bold',
                   bgcolor: '#3f51b5',
                   color: 'white',
                   '&:hover': {
                     bgcolor: '#303f9f',
                   },
                   width: { xs: '100%', sm: 'auto' }
                 }}
               >
                 TV Series
               </Button>
             </Stack>
             
             <Box sx={{ 
               mt: 4, 
               display: 'flex', 
               justifyContent: 'center', 
               gap: { xs: 1.5, sm: 3 },
               flexWrap: { xs: 'wrap', sm: 'nowrap' },
               fontSize: { xs: '0.85rem', sm: '1rem' }
             }}>
               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                 <StarIcon sx={{ color: '#FFD700', mr: 0.5, fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                 <Typography variant="body2" sx={{ fontSize: 'inherit' }}>HD Quality</Typography>
               </Box>
               <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)', display: { xs: 'none', sm: 'block' } }} />
               <Typography variant="body2" sx={{ fontSize: 'inherit' }}>Fast Downloads</Typography>
               <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)', display: { xs: 'none', sm: 'block' } }} />
               <Typography variant="body2" sx={{ fontSize: 'inherit' }}>Multiple Servers</Typography>
             </Box>
          </Container>
        </Paper>

        {/* Trending Anime Section */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <WhatshotIcon sx={{ color: '#ffb6c1', mr: 1, fontSize: 30 }} />
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 0 }}>
              Trending Anime
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button 
              variant="outlined" 
              component={RouterLink} 
              to="/trending"
              sx={{ 
                borderColor: '#ffb6c1',
                color: '#ffb6c1',
                '&:hover': {
                  borderColor: '#ff99a8',
                  backgroundColor: 'rgba(255, 182, 193, 0.1)',
                }
              }}
            >
              View All
            </Button>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress sx={{ color: '#ffb6c1' }} />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {trendingAnime.map(anime => renderAnimeCard(anime))}
            </Grid>
          )}
        </Container>
        
        {/* Top Rated Section */}
        <Box sx={{ bgcolor: '#1a1a1a', py: 4 }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <StarIcon sx={{ color: '#ffb6c1', mr: 1, fontSize: 30 }} />
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 0 }}>
                Top Rated Anime
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button 
                variant="outlined" 
                component={RouterLink} 
                to="/top-rated"
                sx={{ 
                  borderColor: '#ffb6c1',
                  color: '#ffb6c1',
                  '&:hover': {
                    borderColor: '#ff99a8',
                    backgroundColor: 'rgba(255, 182, 193, 0.1)',
                  }
                }}
              >
                View All
              </Button>
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress sx={{ color: '#ffb6c1' }} />
              </Box>
            ) : (
              <Grid container spacing={3}>
                {popularAnime.map(anime => renderAnimeCard(anime))}
              </Grid>
            )}
          </Container>
        </Box>
        
        {/* Movies Section */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <MovieIcon sx={{ color: '#ffb6c1', mr: 1, fontSize: 30 }} />
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 0 }}>
              Anime Movies
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button 
              variant="outlined" 
              component={RouterLink} 
              to="/movies"
              sx={{ 
                borderColor: '#ffb6c1',
                color: '#ffb6c1',
                '&:hover': {
                  borderColor: '#ff99a8',
                  backgroundColor: 'rgba(255, 182, 193, 0.1)',
                }
              }}
            >
              View All
            </Button>
          </Box>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
              <CircularProgress sx={{ color: '#ffb6c1' }} />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {popularAnime.map(anime => renderAnimeCard(anime))}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
}

export default HomePage; 