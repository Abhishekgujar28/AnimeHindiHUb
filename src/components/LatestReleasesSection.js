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
  Stack,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const LatestReleasesSection = ({ animeList }) => {
  if (!animeList || animeList.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      {animeList.map((anime) => (
        <Grid item xs={12} sm={6} md={3} key={anime.id}>
          <Card 
            className="anime-card"
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              bgcolor: '#1a1a1a',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component={RouterLink}
                to={`/anime/${anime.id}`}
                sx={{ 
                  height: 200,
                  backgroundPosition: 'top',
                }}
                image={anime.cover}
                title={anime.title}
              />
              
              {anime.episodesList && anime.episodesList.length > 0 && (
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 8, 
                    right: 8, 
                    bgcolor: '#ffb6c1',
                    color: '#000',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 'bold',
                    fontSize: '0.75rem'
                  }}
                >
                  EP {anime.episodesList[anime.episodesList.length - 1].number}
                </Box>
              )}
              
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 8, 
                  left: 8, 
                  bgcolor: anime.type === 'Movie' ? '#e91e63' : '#3f51b5',
                  color: 'white',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 'bold',
                  fontSize: '0.75rem'
                }}
              >
                {anime.type}
              </Box>
            </Box>
            
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              <Typography 
                variant="subtitle1" 
                component={RouterLink}
                to={`/anime/${anime.id}`}
                sx={{ 
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                  display: 'block',
                  mb: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.3,
                  '&:hover': {
                    color: '#ffb6c1',
                  }
                }}
              >
                {anime.title}
              </Typography>
              
              <Stack 
                direction="row" 
                spacing={2} 
                alignItems="center"
                divider={<Box sx={{ height: 15, borderLeft: 1, borderColor: 'divider' }} />}
                sx={{ mb: 1.5 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                  <CalendarTodayIcon sx={{ fontSize: 12, mr: 0.5 }} />
                  <Typography variant="caption">
                    {anime.season} {anime.year}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {anime.status}
                </Typography>
              </Stack>
              
              <Box sx={{ mb: 2 }}>
                {anime.genres.slice(0, 2).map((genre, index) => (
                  <Chip 
                    key={index} 
                    label={genre} 
                    size="small" 
                    sx={{ 
                      mr: 0.5, 
                      mb: 0.5, 
                      bgcolor: 'rgba(255,255,255,0.1)', 
                      fontSize: '0.7rem',
                      height: 22 
                    }} 
                  />
                ))}
              </Box>
            </CardContent>
            
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button 
                variant="contained" 
                fullWidth 
                startIcon={<PlayArrowIcon />}
                component={RouterLink}
                to={`/anime/${anime.id}`}
                size="small"
                sx={{ 
                  bgcolor: '#ffb6c1',
                  color: '#000',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: '#ff99a8',
                  }
                }}
              >
                Watch Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LatestReleasesSection; 