import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import animeData from '../data/animeData.json';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Rating,
  Stack,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import MovieIcon from '@mui/icons-material/Movie';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HdIcon from '@mui/icons-material/Hd';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DownloadDialog from '../components/DownloadDialog';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`anime-tabpanel-${index}`}
      aria-labelledby={`anime-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function AnimeDetailPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState(null);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        
        // Find the anime with the matching ID in the JSON data
        // Compare as strings to avoid type mismatch issues
        const foundAnime = animeData.animeList.find(anime => String(anime.id) === String(id));
        
        if (foundAnime) {
          // Add views property if it doesn't exist
          const animeWithViews = {
            ...foundAnime,
            views: foundAnime.views || 10000 // Default value if views property doesn't exist
          };
          
          setAnime(animeWithViews);
          setEpisodes(foundAnime.episodesList || []);
        } else {
          setError('Anime not found');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching anime details:', err);
        setError('Failed to load anime details. Please try again later.');
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDownloadClick = (episode) => {
    // Get the specific download URL for the selected quality
    const quality = episode.quality || '1080p';
    const downloadUrl = episode.downloadUrls ? 
      episode.downloadUrls[quality.replace('p', '')] : 
      episodes.find(ep => ep.number === episode.number)?.downloadUrls?.[quality.replace('p', '')];
    
    setSelectedEpisode({
      ...episode,
      downloadUrl
    });
    setDownloadDialogOpen(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress sx={{ color: '#ffb6c1' }} size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', color: 'error.main' }}>
        <Typography variant="h5">{error}</Typography>
      </Box>
    );
  }

  if (!anime) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography variant="h5">Anime not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#121212', pb: 6 }}>
      {/* Banner Section */}
      <Box
        sx={{
          height: { xs: '300px', md: '400px' },
          backgroundImage: `url(${anime.banner || anime.cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(to top, rgba(18, 18, 18, 0.9) 0%, rgba(18, 18, 18, 0.7) 50%, rgba(18, 18, 18, 0.4) 100%)',
          },
        }}
      >
        <Container maxWidth="xl" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
          <Grid 
            container 
            sx={{ 
              height: '100%', 
              alignItems: 'flex-end',
              pb: 4 
            }}
          >
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Box
                component="img"
                src={anime.cover}
                alt={anime.title}
                sx={{
                  width: { xs: '180px', md: '220px' },
                  height: { xs: '270px', md: '320px' },
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  mb: { xs: '-20px', md: '-60px' },
                  border: '3px solid #1e1e1e',
                  zIndex: 10,
                }}
              />
            </Grid>
            <Grid item xs={12} md={9} sx={{ pl: { md: 4 }, mt: { xs: 2, md: 0 } }}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  mb: 1,
                  textAlign: { xs: 'center', md: 'left' },
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }
                }}
              >
                {anime.title}
              </Typography>
              {anime.alternateTitle && (
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffb6c1', 
                    mb: 2, 
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    textAlign: { xs: 'center', md: 'left' },
                    fontSize: { xs: '0.8rem', sm: '1rem' }
                  }}
                >
                  {anime.alternateTitle}
                </Typography>
              )}
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                {anime.genres.map((genre, index) => (
                  <Chip 
                    key={index} 
                    label={genre} 
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                      },
                      fontSize: { xs: '0.65rem', sm: '0.75rem' },
                      height: { xs: '24px', sm: '32px' }
                    }} 
                  />
                ))}
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  gap: { xs: 2, md: 3 }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon sx={{ color: '#FFD700', mr: 0.5, fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.9rem' } }}>
                    {anime.rating}/5
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MovieIcon sx={{ color: '#ffb6c1', mr: 0.5, fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  <Typography variant="body1" sx={{ fontSize: { xs: '0.75rem', sm: '0.9rem' } }}>
                    {anime.type === 'Movie' ? 'Movie' : `${anime.episodes} Episodes`}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <HighQualityIcon sx={{ color: '#4CAF50', mr: 0.5, fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                  <Typography variant="body1" sx={{ fontSize: { xs: '0.75rem', sm: '0.9rem' } }}>
                    1080p Quality
                  </Typography>
                </Box>
                
                <Chip 
                  label={anime.status} 
                  color={anime.status === 'Ongoing' ? 'primary' : 'success'}
                  sx={{ 
                    fontWeight: 'bold',
                    bgcolor: anime.status === 'Ongoing' ? '#3f51b5' : '#388e3c',
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    height: { xs: '24px', sm: '32px' }
                  }}
                />
              </Box>
              
              <Box 
                sx={{ 
                  display: 'none',
                  gap: { xs: 1, md: 2 },
                  mt: 3,
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  position: { xs: 'relative', md: 'static' },
                  zIndex: { xs: 10, md: 1 },
                  top: { xs: '60px', md: 'auto' }
                }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<DownloadIcon />}
                  sx={{ 
                    bgcolor: '#4CAF50',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    '&:hover': {
                      bgcolor: '#45a049',
                    }
                  }}
                  onClick={() => handleDownloadClick({ animeId: anime.id, number: null, quality: '1080p' })}
                >
                  1080p
                </Button>
                
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<DownloadIcon />}
                  sx={{ 
                    bgcolor: '#2196F3',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    '&:hover': {
                      bgcolor: '#0b7dda',
                    }
                  }}
                  onClick={() => handleDownloadClick({ animeId: anime.id, number: null, quality: '720p' })}
                >
                  720p
                </Button>
                
                <Button
                  variant="contained"
                  size="medium"
                  startIcon={<DownloadIcon />}
                  sx={{ 
                    bgcolor: '#FFC107',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    '&:hover': {
                      bgcolor: '#e0aa00',
                    }
                  }}
                  onClick={() => handleDownloadClick({ animeId: anime.id, number: null, quality: '480p' })}
                >
                  480p
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Content Tabs */}
      <Container maxWidth="xl" sx={{ mt: { xs: 15, md: 8 } }}>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="anime tabs"
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: '#ffb6c1',
                },
                '& .Mui-selected': {
                  color: '#ffb6c1 !important',
                },
              }}
            >
              <Tab 
                label="Overview" 
                id="overview-tab" 
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    color: '#ffb6c1',
                  },
                  fontSize: { xs: '0.85rem', sm: '1rem' }
                }}
              />
              <Tab 
                label={anime.type === 'Movie' ? 'Movie' : 'Episodes'} 
                id="episodes-tab"
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    color: '#ffb6c1',
                  },
                  fontSize: { xs: '0.85rem', sm: '1rem' }
                }}
              />
            </Tabs>
          </Box>
          
          {/* Overview Tab */}
          <div
            role="tabpanel"
            hidden={tabValue !== 0}
            id="overview-tabpanel"
            aria-labelledby="overview-tab"
            style={{ padding: '24px 0' }}
          >
            {tabValue === 0 && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" gutterBottom sx={{ 
                    fontWeight: 'bold', 
                    display: 'flex', 
                    alignItems: 'center',
                    fontSize: { xs: '1.1rem', sm: '1.5rem' }
                  }}>
                    <InfoIcon sx={{ mr: 1, color: '#ffb6c1' }} />
                    Synopsis
                  </Typography>
                  <Typography paragraph sx={{ 
                    color: 'text.secondary', 
                    lineHeight: 1.8,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}>
                    {anime.description}
                  </Typography>
                  
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                      Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Type</Typography>
                              <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{anime.type}</Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Episodes</Typography>
                              <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                                {anime.type === 'Movie' ? 'Movie' : anime.episodes}
                              </Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Status</Typography>
                              <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{anime.status}</Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Aired</Typography>
                              <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{anime.aired}</Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Studios</Typography>
                              <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{anime.studios.join(', ')}</Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Season</Typography>
                              <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{anime.season} {anime.year}</Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Duration</Typography>
                              <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{anime.duration}</Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Quality</Typography>
                              <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' }, display: 'flex', alignItems: 'center' }}>
                                <HdIcon sx={{ fontSize: 16, mr: 0.5, color: '#4CAF50' }} />
                                1080p
                              </Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                      Ratings & Stats
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating
                        value={anime.rating}
                        precision={0.1}
                        readOnly
                        sx={{
                          '& .MuiRating-iconFilled': {
                            color: '#FFD700',
                          }
                        }}
                      />
                      <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                        {anime.rating}/5
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Based on user ratings
                    </Typography>
                    
                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    
                    <Typography variant="body2" paragraph sx={{ mb: 2 }}>
                      {anime.type === 'Movie' ? 'Movie available for download in high quality' : 'All episodes available for download in high quality'}
                    </Typography>
                    
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<DownloadIcon />}
                      sx={{ 
                        bgcolor: '#ffb6c1',
                        color: '#000',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: '#ff99a8',
                        }
                      }}
                      onClick={() => {
                        setTabValue(1); // Switch to episodes tab
                        window.scrollTo({
                          top: document.getElementById('episodes-tabpanel').offsetTop - 100,
                          behavior: 'smooth'
                        });
                      }}
                    >
                      {anime.type === 'Movie' ? 'Download Movie' : 'Download All Episodes'}
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </div>
          
          {/* Episodes Tab */}
          <div
            role="tabpanel"
            hidden={tabValue !== 1}
            id="episodes-tabpanel"
            aria-labelledby="episodes-tab"
          >
            {tabValue === 1 && (
              <Box>
                {episodes.length === 0 ? (
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                      {anime.type === 'Movie' ? 'Movie will be available soon' : 'No episodes available'}
                  </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {episodes.map((episode) => (
                      <Grid item xs={12} sm={6} md={4} key={episode.id || episode.number}>
                        <Card 
                    sx={{ 
                            bgcolor: '#1e1e1e', 
                            borderRadius: 2,
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.05)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <Box
                    sx={{ 
                              position: 'relative',
                              pt: '56.25%', // 16:9 aspect ratio
                            }}
                          >
                        <CardMedia
                          component="img"
                              image={episode.thumbnail || anime.cover}
                              alt={`Episode ${episode.number}`}
                          sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                          <Box 
                            sx={{ 
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                bgcolor: 'rgba(0,0,0,0.7)',
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                              }}
                            >
                              <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                                Episode {episode.number}
                              </Typography>
                            </Box>
                          </Box>
                          <CardContent sx={{ p: 1.5, flexGrow: 1 }}>
                            <Typography variant="subtitle1" gutterBottom sx={{ 
                              fontSize: { xs: '0.85rem', sm: '0.95rem' },
                              fontWeight: 'bold',
                              mb: 1,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {episode.title || `Episode ${episode.number}`}
                          </Typography>
                          
                            <Typography variant="body2" sx={{ 
                              color: 'text.secondary', 
                              mb: 1.5,
                              fontSize: { xs: '0.75rem', sm: '0.8rem' },
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              height: '2.4em',
                            }}>
                              {episode.description || 'No description available for this episode.'}
                            </Typography>
                          </CardContent>
                          <CardActions sx={{ p: 1.5, pt: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ 
                              display: 'flex', 
                              gap: 1,
                              width: '100%',
                              justifyContent: 'space-between'
                            }}>
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<DownloadIcon sx={{ fontSize: '0.85rem' }} />}
                                sx={{ 
                                  bgcolor: '#4CAF50',
                                  color: '#fff',
                                  fontWeight: 'bold',
                                  fontSize: '0.7rem',
                                  py: 0.5,
                                  '&:hover': {
                                    bgcolor: '#45a049',
                                  },
                                  flex: 1
                                }}
                                onClick={() => handleDownloadClick({ ...episode, quality: '1080p' })}
                              >
                                1080p
                              </Button>
                              
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<DownloadIcon sx={{ fontSize: '0.85rem' }} />}
                                sx={{ 
                                  bgcolor: '#2196F3',
                                  color: '#fff',
                                  fontWeight: 'bold',
                                  fontSize: '0.7rem',
                                  py: 0.5,
                                  '&:hover': {
                                    bgcolor: '#0b7dda',
                                  },
                                  flex: 1
                                }}
                                onClick={() => handleDownloadClick({ ...episode, quality: '720p' })}
                              >
                                720p
                              </Button>
                            
                            <Button 
                                variant="contained"
                                size="small"
                                startIcon={<DownloadIcon sx={{ fontSize: '0.85rem' }} />}
                              sx={{ 
                                  bgcolor: '#FFC107',
                                  color: '#000',
                                  fontWeight: 'bold',
                                  fontSize: '0.7rem',
                                  py: 0.5,
                                '&:hover': {
                                    bgcolor: '#e0aa00',
                                  },
                                  flex: 1
                                }}
                                onClick={() => handleDownloadClick({ ...episode, quality: '480p' })}
                              >
                                480p
                            </Button>
                            </Box>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                    </Grid>
                )}
              </Box>
            )}
          </div>
        </Box>
      </Container>

      <DownloadDialog
        open={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
        animeTitle={anime.title}
        episodeNumber={selectedEpisode?.number}
        quality={selectedEpisode?.quality}
        downloadUrl={selectedEpisode?.downloadUrl}
      />
    </Box>
  );
}

export default AnimeDetailPage; 