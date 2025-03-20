import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import bgImage from "../assets/images/1.jpg";
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Container,
  Paper,
  Chip,
  Stack,
  Divider,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

function HomePage() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated data (in a real app, this would come from API)
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setTrending([
        {
          id: 3,
          title: 'Attack on Titan',
          description: 'In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.',
          type: 'TV',
          episodes: 87,
          status: 'Completed',
          cover: 'https://flxt.tmsimg.com/assets/p10701949_b_v9_ah.jpg',
          rating: 4.9,
          views: 3300000,
          genres: ['Action', 'Drama', 'Fantasy']
        },
        {
          id: 2,
          title: 'Demon Slayer',
          description: 'A young man seeks revenge against demons after his family is slaughtered and his sister is turned into a demon.',
          type: 'TV',
          episodes: 26,
          status: 'Completed',
          cover: 'https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg',
          rating: 4.8,
          views: 2500000,
          genres: ['Action', 'Fantasy', 'Historical']
        },
        {
          id: 7,
          title: 'Jujutsu Kaisen',
          description: 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman school to be able to locate the demon\'s other body parts and thus exorcise himself.',
          type: 'TV',
          episodes: 24,
          status: 'Completed',
          cover: 'https://m.media-amazon.com/images/M/MV5BMTMwMDM3NzQzOV5BMl5BanBnXkFtZTcwNDIwMjA2NA@@._V1_.jpg',
          rating: 4.8,
          views: 2400000,
          genres: ['Action', 'Fantasy', 'School']
        },
        {
          id: 5,
          title: 'My Hero Academia',
          description: 'In a world where people with superpowers known as "Quirks" are the norm, a boy without powers dreams of becoming a superhero.',
          type: 'TV',
          episodes: 113,
          status: 'Ongoing',
          cover: 'https://m.media-amazon.com/images/M/MV5BOGZmYjdjN2UtNjAwZi00YmEyLWFhNTEtNjM1MTFjYWJiMzcwXkEyXkFqcGdeQXVyMTA1NjQyNjkw._V1_.jpg',
          rating: 4.7,
          views: 2800000,
          genres: ['Action', 'Comedy', 'School']
        },
      ]);
      
      setTopRated([
        {
          id: 1,
          title: 'Your Lie in April',
          description: 'A piano prodigy who lost his ability to play after suffering a traumatic event meets a violinist who helps him return to the music world.',
          type: 'TV',
          episodes: 22,
          status: 'Completed',
          cover: 'https://m.media-amazon.com/images/M/MV5BYThlNWY5ZDgtYTIxNC00ZjdiLWJmNGUtMDFjMDlmZTAzOWFiXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
          rating: 4.9,
          views: 1250000,
          genres: ['Drama', 'Music', 'Romance']
        },
        {
          id: 8,
          title: 'Fullmetal Alchemist: Brotherhood',
          description: 'Two brothers search for a Philosopher\'s Stone after an attempt to revive their deceased mother goes wrong and leaves them in damaged physical forms.',
          type: 'TV',
          episodes: 64,
          status: 'Completed',
          cover: 'https://m.media-amazon.com/images/M/MV5BZmEzN2YzOTItMDI5MS00MGU4LWI1NWQtOTg5ZThhNGQwYTEzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
          rating: 4.9,
          views: 2900000,
          genres: ['Action', 'Adventure', 'Drama']
        },
        {
          id: 6,
          title: 'Spirited Away',
          description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
          type: 'Movie',
          episodes: 1,
          status: 'Completed',
          cover: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
          rating: 4.9,
          views: 1850000,
          genres: ['Adventure', 'Award Winning', 'Fantasy']
        },
        {
          id: 3,
          title: 'Attack on Titan',
          description: 'In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason.',
          type: 'TV',
          episodes: 87,
          status: 'Completed',
          cover: 'https://flxt.tmsimg.com/assets/p10701949_b_v9_ah.jpg',
          rating: 4.9,
          views: 3300000,
          genres: ['Action', 'Drama', 'Fantasy']
        },
      ]);
      
      setMovies([
        {
          id: 6,
          title: 'Spirited Away',
          description: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
          type: 'Movie',
          episodes: 1,
          status: 'Completed',
          cover: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
          rating: 4.9,
          views: 1850000,
          genres: ['Adventure', 'Award Winning', 'Fantasy']
        },
        {
          id: 10,
          title: 'Demon Slayer: Mugen Train',
          description: 'After his family was brutally murdered and his sister turned into a demon, Tanjiro Kamado\'s journey as a demon slayer began. Tanjiro and his comrades embark on a new mission aboard the Mugen Train.',
          type: 'Movie',
          episodes: 1,
          status: 'Completed',
          cover: 'https://m.media-amazon.com/images/M/MV5BODI2NjdlYWItMTE1ZC00YzI2LTlhZGQtNzE3NzA4MWM0ODYzXkEyXkFqcGdeQXVyNjU1OTg4OTM@._V1_.jpg',
          rating: 4.8,
          views: 1650000,
          genres: ['Action', 'Fantasy', 'Supernatural']
        },
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  // Function to render anime cards
  const renderAnimeCard = (anime) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={anime.id}>
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.03)',
          }
        }}
      >
        <CardMedia
          component={RouterLink}
          to={`/anime/${anime.id}`}
          sx={{ 
            height: 340,
            backgroundPosition: 'top',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '40%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
            }
          }}
          image={anime.cover}
          title={anime.title}
        />
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            display: 'flex', 
            alignItems: 'center',
            bgcolor: 'rgba(0,0,0,0.7)',
            px: 1,
            py: 0.5,
            borderRadius: 1
          }}
        >
          <StarIcon sx={{ color: '#FFD700', fontSize: 18, mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
            {anime.rating}
          </Typography>
        </Box>
        
        <Box sx={{ position: 'absolute', bottom: 130, left: 10 }}>
          <Chip 
            label={anime.type} 
            size="small" 
            sx={{ 
              bgcolor: anime.type === 'Movie' ? '#e91e63' : '#3f51b5',
              color: 'white',
              fontWeight: 'bold',
            }} 
          />
        </Box>
        
        <CardContent sx={{ flexGrow: 1, pt: 2 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component={RouterLink}
            to={`/anime/${anime.id}`}
            sx={{ 
              textDecoration: 'none',
              color: 'white',
              '&:hover': {
                color: '#ffb6c1',
              }
            }}
          >
            {anime.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
              {anime.episodes > 1 ? `${anime.episodes} Episodes` : 'Movie'}
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />
            <Typography variant="body2" color="text.secondary">
              {anime.status}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            {anime.genres.slice(0, 3).map((genre, index) => (
              <Chip 
                key={index} 
                label={genre} 
                size="small" 
                sx={{ mr: 0.5, mb: 0.5, bgcolor: 'rgba(255,255,255,0.1)' }} 
              />
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ height: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {anime.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<DownloadIcon />}
            component={RouterLink}
            to={`/anime/${anime.id}`}
            sx={{ 
              bgcolor: '#ffb6c1',
              color: '#000',
              '&:hover': {
                bgcolor: '#ff99a8',
              }
            }}
          >
            Download
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
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
          height: '500px',
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
        <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography 
            component="h1" 
            variant="h2" 
            color="inherit" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              textShadow: '0 2px 10px rgba(0,0,0,0.7)',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MusicNoteIcon sx={{ mr: 2, fontSize: 40, color: '#ffb6c1' }} />
            AnimeStream
          </Typography>
          <Typography 
            variant="h5" 
            color="inherit" 
            paragraph
            sx={{ 
              maxWidth: '700px',
              mx: 'auto',
              mb: 4,
              opacity: 0.9
            }}
          >
            Download all episodes in high quality
          </Typography>
          
          <TextField
            fullWidth
            placeholder="Search anime..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              sx: { 
                bgcolor: 'rgba(255,255,255,0.1)', 
                borderRadius: 2,
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffb6c1',
                },
                '&::placeholder': {
                  color: 'rgba(255,255,255,0.7)',
                },
              }
            }}
            sx={{ 
              maxWidth: '600px', 
              mx: 'auto',
              mb: 3,
              '& .MuiInputBase-input': {
                color: 'white',
              }
            }}
          />
          
          <Stack direction="row" spacing={2} justifyContent="center">
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
                }
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
                }
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
                }
              }}
            >
              TV Series
            </Button>
          </Stack>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon sx={{ color: '#FFD700', mr: 0.5 }} />
              <Typography variant="body1">HD Quality</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
            <Typography variant="body1">Fast Downloads</Typography>
            <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
            <Typography variant="body1">Multiple Servers</Typography>
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
            {trending.map(anime => renderAnimeCard(anime))}
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
              {topRated.map(anime => renderAnimeCard(anime))}
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
            {movies.map(anime => renderAnimeCard(anime))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default HomePage; 