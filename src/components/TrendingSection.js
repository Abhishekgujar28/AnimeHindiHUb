import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import StarIcon from '@mui/icons-material/Star';

const TrendingSection = ({ animeList }) => {
  if (!animeList || animeList.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {animeList.map((anime) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={anime.id}>
          <Card 
            className="anime-card"
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              bgcolor: '#1a1a1a',
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)'
            }}
          >
            <Box sx={{ position: 'relative' }}>
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
                  top: 12, 
                  right: 12, 
                  display: 'flex', 
                  alignItems: 'center',
                  bgcolor: 'rgba(0,0,0,0.7)',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1
                }}
              >
                <StarIcon sx={{ color: '#FFD700', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {anime.rating}
                </Typography>
              </Box>
              
              <Box sx={{ position: 'absolute', bottom: 12, left: 12 }}>
                <Chip 
                  label={anime.type} 
                  size="small" 
                  sx={{ 
                    bgcolor: anime.type === 'Movie' ? '#e91e63' : '#3f51b5',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.75rem'
                  }} 
                />
              </Box>
            </Box>
            
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
              <Typography 
                gutterBottom 
                variant="h6" 
                component={RouterLink}
                to={`/anime/${anime.id}`}
                sx={{ 
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                  display: 'block',
                  mb: 1,
                  '&:hover': {
                    color: '#ffb6c1',
                  }
                }}
              >
                {anime.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                  {anime.episodes > 1 ? `${anime.episodes} Episodes` : 'Movie'}
                </Typography>
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
                    sx={{ mr: 0.5, mb: 0.5, bgcolor: 'rgba(255,255,255,0.1)', fontSize: '0.75rem' }} 
                  />
                ))}
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.5
                }}
              >
                {anime.description}
              </Typography>
            </CardContent>
            
            <CardActions sx={{ p: 3, pt: 0 }}>
              <Button 
                variant="contained" 
                fullWidth 
                startIcon={<DownloadIcon />}
                component={RouterLink}
                to={`/anime/${anime.id}`}
                className="download-button"
                sx={{ 
                  bgcolor: '#ffb6c1',
                  color: '#000',
                  fontWeight: 'bold',
                  py: 1,
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
      ))}
    </Grid>
  );
};

export default TrendingSection; 