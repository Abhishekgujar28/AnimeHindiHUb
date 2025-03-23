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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import animeData from '../data/animeData.json';

const bgImage = 'https://wallpapercave.com/wp/wp5114436.jpg';

function HomePage() {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
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
      const term = searchTerm.toLowerCase().trim();
      
      // Show loading indicator and open dialog
      setSearchLoading(true);
      setSearchDialogOpen(true);
      setSearchResults([]);
      setNoResults(false);
      
      try {
        // Search in the animeData JSON file
        const results = animeData.animeList.filter(anime => {
          // Check title
          if (anime.title.toLowerCase().includes(term)) return true;
          
          // Check alternate title
          if (anime.alternateTitle && anime.alternateTitle.toLowerCase().includes(term)) return true;
          
          // Check genres
          if (anime.genres && anime.genres.some(genre => genre.toLowerCase().includes(term))) return true;
          
          // Check description for keywords
          if (anime.description && anime.description.toLowerCase().includes(term)) return true;
          
          return false;
        });
        
        setSearchResults(results);
        setNoResults(results.length === 0);
      } catch (error) {
        console.error("Search error:", error);
        setNoResults(true);
      } finally {
        setSearchLoading(false);
      }
    }
  };

  const handleSearchItemClick = (animeId) => {
    setSearchDialogOpen(false);
    navigate(`/anime/${animeId}`);
  };

  const handleCloseSearchDialog = () => {
    setSearchDialogOpen(false);
    setNoResults(false);
  };

  const renderAnimeCard = (anime) => (
    <Grid item xs={6} sm={6} md={4} lg={3} key={anime.id}>
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
                top: 10,
                left: 10,
                bgcolor: anime.type === 'Movie' ? '#e91e63' : '#3f51b5',
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '0.6rem', sm: '0.7rem' },
                borderRadius: 1,
                px: 0.8,
                py: 0.2,
                zIndex: 2,
              }}
            >
              {anime.type === 'Movie' ? 'Movie' : 'Series'}
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
                {anime.year} • Hindi
              </Typography>
            </Box>

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
                  bgcolor: '#ffb6c1',
                  color: '#000',
                  py: { xs: 0.5, sm: 0.8 },
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#ff99a8',
                    transform: 'scale(1.05)',
                  },
                  mt: 'auto',
                  minHeight: { xs: 24, sm: 32 },
                }}
              >
                {anime.type === 'Movie' ? 'Download Movie' : 'Download Episodes'}
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
          {anime.type === 'Movie' ? (
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
          ) : (
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
            }} 
          />
          )}
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
              flexGrow: 1
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
           Here you can download Anime series/ Movies in Hindi Dubbed <span style={{color: '#ffb6c1'}}>(Dual Audio) </span> Languages <span style={{color: '#ffb6c1'}}>(  HD print ) </span>
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

      {/* Search Results Dialog */}
      <Dialog 
        open={searchDialogOpen} 
        onClose={handleCloseSearchDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { 
            bgcolor: '#1a1a1a', 
            color: 'white',
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          pb: 2
        }}>
          <Typography variant="h6">
            Search Results for "{searchTerm}"
          </Typography>
          <Button 
            onClick={handleCloseSearchDialog} 
            sx={{ color: 'white', minWidth: 'auto', p: 0.5 }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
          {searchLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
              <CircularProgress sx={{ color: '#ffb6c1' }} />
            </Box>
          ) : noResults ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                No results found for "{searchTerm}"
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try different keywords or browse our collection.
              </Typography>
            </Box>
          ) : (
            <List sx={{ py: 0 }}>
              {searchResults.map((anime) => (
                <ListItem 
                  key={anime.id}
                  button
                  onClick={() => handleSearchItemClick(anime.id)}
                  sx={{ 
                    borderRadius: 1, 
                    mb: 1,
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.08)' 
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      src={anime.cover} 
                      variant="rounded" 
                      sx={{ width: 60, height: 80, borderRadius: 1, mr: 1 }}
                    />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {anime.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {anime.type || 'TV'} • {anime.year || '-'} • {(anime.genres && anime.genres.length > 0) ? anime.genres.slice(0, 2).join(', ') : 'Unknown'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <StarIcon sx={{ color: '#FFD700', fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                            {anime.rating || '?'}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Button 
            onClick={handleCloseSearchDialog}
            sx={{ 
              color: 'white', 
              borderColor: 'rgba(255,255,255,0.3)',
              '&:hover': { borderColor: 'white' }
            }}
            variant="outlined"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              handleCloseSearchDialog();
              navigate(`/anime?q=${encodeURIComponent(searchTerm.trim())}`);
            }}
            variant="contained"
            sx={{ 
              bgcolor: '#ffb6c1',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#ff99a8' }
            }}
          >
            Browse All Results
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default HomePage; 