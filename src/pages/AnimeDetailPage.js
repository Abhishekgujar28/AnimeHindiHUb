import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
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

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        
        // Fetch anime details
        // In a real app, this would be an API call
        // const animeRes = await axios.get(`/api/anime/${id}`);
        // const episodesRes = await axios.get(`/api/anime/${id}/episodes`);
        
        // For demo purposes, we're simulating the API response
        setTimeout(() => {
          // Mock data based on our server.js structure
          const mockAnime = {
            id: parseInt(id),
            title: 'Demon Slayer',
            description: 'A young man seeks revenge against demons after his family is slaughtered and his sister is turned into a demon.',
            type: 'TV',
            episodes: 26,
            status: 'Completed',
            aired: 'Apr 2019 to Sep 2019',
            cover: 'https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg',
            banner: 'https://wallpapercave.com/wp/wp4771870.jpg',
            rating: 4.8,
            views: 2500000,
            genres: ['Action', 'Fantasy', 'Historical', 'Supernatural'],
            studios: ['ufotable'],
            year: 2019,
            season: 'Spring',
            duration: '23 min per episode',
          };
          
          const mockEpisodes = [
            {
              id: 1,
              animeId: parseInt(id),
              title: 'Episode 1: Cruelty',
              number: 1,
              description: 'Tanjiro Kamado is a kind-hearted and intelligent boy who lives with his family in the mountains.',
              thumbnail: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/9/94/Episode_1.png',
              videoUrl: 'https://example.com/demonslayer/episode1',
              downloadUrl: 'https://example.com/download/demonslayer/episode1',
              duration: '23 min',
              views: 65000,
              releaseDate: 'April 6, 2019',
              quality: '1080p',
              fileSize: '400MB',
            },
            {
              id: 2,
              animeId: parseInt(id),
              title: 'Episode 2: Trainer Sakonji Urokodaki',
              number: 2,
              description: 'Tanjiro heads for Mt. Sagiri, where a demon slayer named Giyu Tomioka told him to seek out Sakonji Urokodaki.',
              thumbnail: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/e/e9/Episode_2.png',
              videoUrl: 'https://example.com/demonslayer/episode2',
              downloadUrl: 'https://example.com/download/demonslayer/episode2',
              duration: '23 min',
              views: 58000,
              releaseDate: 'April 13, 2019',
              quality: '1080p',
              fileSize: '400MB',
            },
            {
              id: 3,
              animeId: parseInt(id),
              title: 'Episode 3: Sabito and Makomo',
              number: 3,
              description: 'Tanjiro undergoes rigorous training to strengthen his body in preparation for the Final Selection exam.',
              thumbnail: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/a/a8/Episode_3.png',
              videoUrl: 'https://example.com/demonslayer/episode3',
              downloadUrl: 'https://example.com/download/demonslayer/episode3',
              duration: '23 min',
              views: 55000,
              releaseDate: 'April 20, 2019',
              quality: '1080p',
              fileSize: '400MB',
            },
            {
              id: 4,
              animeId: parseInt(id),
              title: 'Episode 4: Final Selection',
              number: 4,
              description: 'Tanjiro heads to Mt. Fujikasane to take the Final Selection test, where he must survive for seven days on a mountain infested with demons.',
              thumbnail: 'https://static.wikia.nocookie.net/kimetsu-no-yaiba/images/d/df/Episode_4.png',
              videoUrl: 'https://example.com/demonslayer/episode4',
              downloadUrl: 'https://example.com/download/demonslayer/episode4',
              duration: '23 min',
              views: 52000,
              releaseDate: 'April 27, 2019',
              quality: '1080p',
              fileSize: '400MB',
            },
          ];
          
          setAnime(mockAnime);
          setEpisodes(mockEpisodes);
          setLoading(false);
        }, 800);
        
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
    setSelectedEpisode(episode);
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
          backgroundImage: `url(${anime.banner})`,
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
            backgroundImage: 'linear-gradient(to top, #121212 0%, rgba(18, 18, 18, 0.8) 50%, rgba(18, 18, 18, 0.4) 100%)',
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
                  width: { xs: '200px', md: '220px' },
                  height: { xs: '300px', md: '320px' },
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  mb: { xs: '-40px', md: '-60px' },
                  border: '3px solid #1e1e1e',
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
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                {anime.title}
              </Typography>
              
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
                      }
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
                  <StarIcon sx={{ color: '#FFD700', mr: 0.5 }} />
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {anime.rating}/5
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MovieIcon sx={{ color: '#ffb6c1', mr: 0.5 }} />
                  <Typography variant="body1">
                    {anime.episodes} Episodes
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <HighQualityIcon sx={{ color: '#4CAF50', mr: 0.5 }} />
                  <Typography variant="body1">
                    1080p Quality
                  </Typography>
                </Box>
                
                <Chip 
                  label={anime.status} 
                  color={anime.status === 'Ongoing' ? 'primary' : 'success'}
                  sx={{ 
                    fontWeight: 'bold',
                    bgcolor: anime.status === 'Ongoing' ? '#3f51b5' : '#388e3c'
                  }}
                />
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex',
                  gap: 2,
                  mt: 3,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<DownloadIcon />}
                  sx={{ 
                    bgcolor: '#ffb6c1',
                    color: '#000',
                    fontWeight: 'bold',
                    px: 3,
                    '&:hover': {
                      bgcolor: '#ff99a8',
                    }
                  }}
                >
                  Download All Episodes
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ 
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Add to Favorites
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Content Tabs */}
      <Container maxWidth="xl" sx={{ mt: { xs: 8, md: 8 } }}>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="anime tabs"
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
                  }
                }}
              />
              <Tab 
                label="Episodes" 
                id="episodes-tab"
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    color: '#ffb6c1',
                  }
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
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                    <InfoIcon sx={{ mr: 1, color: '#ffb6c1' }} />
                    Synopsis
                  </Typography>
                  <Typography paragraph sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
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
                              <Typography variant="body2" color="text.secondary">Type</Typography>
                              <Typography variant="body2" fontWeight="bold">{anime.type}</Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary">Episodes</Typography>
                              <Typography variant="body2" fontWeight="bold">{anime.episodes}</Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary">Status</Typography>
                              <Typography variant="body2" fontWeight="bold">{anime.status}</Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary">Aired</Typography>
                              <Typography variant="body2" fontWeight="bold">{anime.aired}</Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)' }}>
                          <Stack spacing={2}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary">Studios</Typography>
                              <Typography variant="body2" fontWeight="bold">{anime.studios.join(', ')}</Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary">Season</Typography>
                              <Typography variant="body2" fontWeight="bold">{anime.season} {anime.year}</Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary">Duration</Typography>
                              <Typography variant="body2" fontWeight="bold">{anime.duration}</Typography>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" color="text.secondary">Quality</Typography>
                              <Typography variant="body2" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
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
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Views</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {anime.views.toLocaleString()}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Download Size</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {anime.episodes * 400}MB (All Episodes)
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    
                    <Typography variant="body2" paragraph sx={{ mb: 2 }}>
                      All episodes available for download in high quality
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
                    >
                      Download All Episodes
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
            style={{ padding: '24px 0' }}
          >
            {tabValue === 1 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    All Episodes ({episodes.length})
                  </Typography>
                  
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    sx={{ 
                      bgcolor: '#ffb6c1',
                      color: '#000',
                      fontWeight: 'bold',
                      '&:hover': {
                        bgcolor: '#ff99a8',
                      }
                    }}
                  >
                    Download All Episodes
                  </Button>
                </Box>
                
                {episodes.map((episode) => (
                  <Card 
                    key={episode.id} 
                    sx={{ 
                      mb: 2, 
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                      }
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12} sm={4} md={3}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={episode.thumbnail}
                          alt={episode.title}
                          sx={{
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={8} md={9}>
                        <CardContent>
                          <Typography 
                            variant="h6" 
                            component="div" 
                            sx={{ fontWeight: 'bold', mb: 1 }}
                          >
                            {episode.title}
                          </Typography>
                          
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              flexWrap: 'wrap',
                              alignItems: 'center', 
                              mb: 2,
                              gap: { xs: 1, md: 2 } 
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <DateRangeIcon sx={{ fontSize: 16, mr: 0.5, color: '#b0b0b0' }} />
                              <Typography variant="body2" color="text.secondary">
                                {episode.releaseDate}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <ClosedCaptionIcon sx={{ fontSize: 16, mr: 0.5, color: '#b0b0b0' }} />
                              <Typography variant="body2" color="text.secondary">
                                {episode.duration}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <HdIcon sx={{ fontSize: 16, mr: 0.5, color: '#4CAF50' }} />
                              <Typography variant="body2" color="text.secondary">
                                {episode.quality}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CheckCircleIcon sx={{ fontSize: 16, mr: 0.5, color: '#ffb6c1' }} />
                              <Typography variant="body2" color="text.secondary">
                                {episode.fileSize}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {episode.description}
                          </Typography>
                          
                          <CardActions sx={{ p: 0 }}>
                            <Tooltip title="Download">
                              <IconButton
                                onClick={() => handleDownloadClick(episode)}
                                sx={{ 
                                  color: '#ffb6c1',
                                  '&:hover': {
                                    bgcolor: 'rgba(255, 182, 193, 0.1)',
                                  },
                                }}
                              >
                                <DownloadIcon />
                              </IconButton>
                            </Tooltip>
                            
                            <Button 
                              variant="outlined" 
                              startIcon={<PlayArrowIcon />}
                              href={episode.videoUrl}
                              target="_blank"
                              sx={{ 
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'white',
                                '&:hover': {
                                  borderColor: 'white',
                                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                                }
                              }}
                            >
                              Watch Online
                            </Button>
                          </CardActions>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                ))}
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
      />
    </Box>
  );
}

export default AnimeDetailPage; 