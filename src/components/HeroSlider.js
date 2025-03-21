import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  MobileStepper,
  useTheme,
  IconButton,
  Stack,
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import animeData from '../data/animeData.json';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const HeroSlider = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [featuredAnime, setFeaturedAnime] = useState([]);
  
  useEffect(() => {
    // Get the top 5 highest rated anime as featured content
    const featured = animeData.animeList
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
    
    setFeaturedAnime(featured);
  }, []);
  
  const maxSteps = featuredAnime.length;
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1 === maxSteps ? 0 : prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1 < 0 ? maxSteps - 1 : prevActiveStep - 1);
  };
  
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  
  if (featuredAnime.length === 0) {
    return null;
  }
  
  return (
    <Box sx={{ position: 'relative' }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={6000}
      >
        {featuredAnime.map((anime, index) => (
          <div key={anime.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                sx={{
                  height: { xs: '70vh', md: '80vh' },
                  maxHeight: 700,
                  position: 'relative',
                  backgroundImage: `url(${anime.banner || anime.cover})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  "&::before": {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 100%)',
                    zIndex: 1
                  }
                }}
              >
                <Container 
                  maxWidth="xl" 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                    pt: { xs: 4, md: 0 }
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: { xs: '100%', md: '60%' },
                      pl: { xs: 0, md: 4 },
                      pr: { xs: 0, md: 10 },
                      textAlign: { xs: 'center', md: 'left' }
                    }}
                  >
                    <Typography 
                      variant="overline" 
                      component="div" 
                      sx={{ 
                        color: '#ffb6c1',
                        fontWeight: 'bold',
                        letterSpacing: 2,
                        mb: 1,
                        textShadow: '0 2px 10px rgba(0,0,0,0.7)'
                      }}
                    >
                      {anime.type}
                    </Typography>
                    
                    <Typography 
                      variant="h2" 
                      component="h1" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'white',
                        mb: 2,
                        textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' }
                      }}
                    >
                      {anime.title}
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.8)',
                        mb: 4,
                        textShadow: '0 2px 5px rgba(0,0,0,0.5)',
                        display: { xs: 'none', sm: 'block' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box'
                      }}
                    >
                      {anime.description}
                    </Typography>
                    
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={2} 
                      sx={{ 
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        mb: { xs: 2, md: 0 }
                      }}
                    >
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={`/anime/${anime.id}`}
                        startIcon={<PlayArrowIcon />}
                        size="large"
                        sx={{ 
                          bgcolor: '#ffb6c1',
                          color: '#000',
                          fontWeight: 'bold',
                          px: 3,
                          py: 1,
                          '&:hover': {
                            bgcolor: '#ff99a8',
                          }
                        }}
                      >
                        Watch Now
                      </Button>
                      
                      <Button
                        variant="outlined"
                        component={RouterLink}
                        to={`/anime/${anime.id}`}
                        startIcon={<DownloadIcon />}
                        size="large"
                        sx={{ 
                          borderColor: 'white',
                          color: 'white',
                          fontWeight: 'bold',
                          px: 3,
                          py: 1,
                          '&:hover': {
                            borderColor: '#ffb6c1',
                            color: '#ffb6c1',
                            bgcolor: 'rgba(255,255,255,0.1)'
                          }
                        }}
                      >
                        Download
                      </Button>
                    </Stack>
                  </Box>
                </Container>
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ 
          bgcolor: 'transparent',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          '& .MuiMobileStepper-dot': {
            bgcolor: 'rgba(255,255,255,0.3)',
          },
          '& .MuiMobileStepper-dotActive': {
            bgcolor: '#ffb6c1',
          }
        }}
        nextButton={
          <IconButton 
            size="large" 
            onClick={handleNext}
            sx={{ 
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              position: 'absolute',
              right: { xs: 8, md: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
              }
            }}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
        }
        backButton={
          <IconButton 
            size="large" 
            onClick={handleBack}
            sx={{ 
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              position: 'absolute',
              left: { xs: 8, md: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
              }
            }}
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
        }
      />
    </Box>
  );
};

export default HeroSlider; 