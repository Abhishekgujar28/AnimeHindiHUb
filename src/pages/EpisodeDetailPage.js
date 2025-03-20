import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  IconButton,
  Chip,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Tooltip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import LockIcon from '@mui/icons-material/Lock';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FileCopyIcon from '@mui/icons-material/FileCopy';

// Mock data for episodes
const allEpisodes = [
  {
    id: 1,
    title: 'Episode 1: Monotone/Colorful',
    description: 'Kousei Arima was a piano prodigy until his mother died when he was eleven years old. After her death, Kousei became unable to hear the sound of his piano, and he stopped playing. Two years later, Kousei still avoids the piano and lives a colorless life alongside his childhood friends Tsubaki and Watari. However, everything changes when Kousei meets the beautiful violinist Kaori Miyazono, who stirs up his world and sets him on a journey to face music again.',
    image: 'https://m.media-amazon.com/images/M/MV5BYThlNWY5ZDgtYTIxNC00ZjdiLWJmNGUtMDFjMDlmZTAzOWFiXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    videoUrl: 'https://example.com/episode1',
    season: 1,
    duration: '23 min',
    releaseDate: 'October 9, 2014',
    nextEpisode: 2,
    prevEpisode: null,
    relatedEpisodes: [2, 3, 4],
    totalEpisodes: 22,
    rating: 4.8,
    size: {
      '1080p': '350MB',
      '720p': '200MB',
      '480p': '120MB',
    },
    screenshots: [
      'https://m.media-amazon.com/images/M/MV5BYThlNWY5ZDgtYTIxNC00ZjdiLWJmNGUtMDFjMDlmZTAzOWFiXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BMTQ5MjExMzQtMzJlZS00NWU3LTg3NDItYTY5YzU4YzYwZTRjXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
      'https://m.media-amazon.com/images/M/MV5BNzg5MmI0ZDctODg1Ny00ZDgxLWI0MDgtYmNhZmFiYzM2MWZmXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    ],
    downloadLinks: {
      '1080p': [
        { server: 'Server 1', link: 'https://drive.google.com/file/d/1pjjADoin0jUuhWNmlQjgoQY7SV1pmv5B/view?usp=sharing', speed: 'Fast' },
        { server: 'Server 2', link: '1pjjADoin0jUuhWNmlQjgoQY7SV1pmv5B', speed: 'Medium' },
        { server: 'Server 3', link: '1pjjADoin0jUuhWNmlQjgoQY7SV1pmv5B', speed: 'Fast' },
        { server: 'Server 4', link: 'https://example.com/download/1080p/4', speed: 'Fast' },
      ],
      '720p': [
        { server: 'Server 1', link: 'https://example.com/download/720p/1', speed: 'Fast' },
        { server: 'Server 2', link: 'https://example.com/download/720p/2', speed: 'Fast' },
        { server: 'Server 3', link: 'https://example.com/download/720p/3', speed: 'Medium' },
      ],
      '480p': [
        { server: 'Server 1', link: 'https://example.com/download/480p/1', speed: 'Fast' },
        { server: 'Server 2', link: 'https://example.com/download/480p/2', speed: 'Fast' },
      ],
    },
    subtitles: ['English', 'Spanish', 'French', 'German'],
    audio: ['Japanese', 'English'],
  },
  {
    id: 2,
    title: 'Episode 2: Friend A',
    description: 'Kaori forces Kousei to be her accompanist for a violin competition, but he refuses. Tsubaki and Watari convince him to at least watch Kaori perform. At the competition, Kaori plays with a unique, free-spirited style that captivates the audience but upsets the judges. After her performance, she confronts Kousei about becoming her accompanist.',
    image: 'https://m.media-amazon.com/images/M/MV5BMTQ5MjExMzQtMzJlZS00NWU3LTg3NDItYTY5YzU4YzYwZTRjXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    videoUrl: 'https://example.com/episode2',
    season: 1,
    duration: '23 min',
    releaseDate: 'October 16, 2014',
    nextEpisode: 3,
    prevEpisode: 1,
    relatedEpisodes: [1, 3, 4],
  },
  {
    id: 3,
    title: 'Episode 3: Inside Spring',
    description: 'Kousei reluctantly agrees to be Kaori\'s accompanist, but his trauma prevents him from hearing the piano. As they practice together, Kaori tries to help Kousei overcome his fear. Meanwhile, Tsubaki begins to realize her feelings for Kousei might be more than just friendship.',
    image: 'https://m.media-amazon.com/images/M/MV5BNzg5MmI0ZDctODg1Ny00ZDgxLWI0MDgtYmNhZmFiYzM2MWZmXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    videoUrl: 'https://example.com/episode3',
    season: 1,
    duration: '23 min',
    releaseDate: 'October 23, 2014',
    nextEpisode: 4,
    prevEpisode: 2,
    relatedEpisodes: [1, 2, 4],
  },
  {
    id: 4,
    title: 'Episode 4: The Journey',
    description: 'Kousei and Kaori perform at the competition, but Kousei freezes on stage. Despite his panic, Kaori\'s playing helps him find his way back to the music. Their unconventional performance leaves a lasting impression on the audience.',
    image: 'https://m.media-amazon.com/images/M/MV5BYThlNWY5ZDgtYTIxNC00ZjdiLWJmNGUtMDFjMDlmZTAzOWFiXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    videoUrl: 'https://example.com/episode4',
    season: 1,
    duration: '23 min',
    releaseDate: 'October 30, 2014',
    nextEpisode: 5,
    prevEpisode: 3,
    relatedEpisodes: [1, 2, 3],
  },
];

function EpisodeDetailPage() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState('1080p');

  useEffect(() => {
    // Simulate API call to fetch episode details
    const fetchEpisode = () => {
      setLoading(true);
      // Find episode by id
      const foundEpisode = allEpisodes.find((ep) => ep.id === parseInt(id));
      setEpisode(foundEpisode);
      setLoading(false);
    };

    fetchEpisode();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleQualityChange = (quality) => {
    setSelectedQuality(quality);
  };

  if (loading || !episode) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">Loading episode...</Typography>
      </Container>
    );
  }

  // Get related episodes
  const relatedEpisodes = allEpisodes.filter((ep) => 
    episode.relatedEpisodes.includes(ep.id)
  );

  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Button
          component={RouterLink}
          to="/episodes"
          startIcon={<ArrowBackIcon />}
          sx={{ 
            mb: 3, 
            color: '#ffb6c1',
            '&:hover': {
              backgroundColor: 'rgba(255, 182, 193, 0.1)'
            }
          }}
        >
          Back to Episodes
        </Button>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          background: 'linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 70%, #3c3c3c 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          p: 3,
          borderRadius: 2,
          color: 'white',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 0, fontWeight: 600, color: '#ffb6c1' }}>
              {episode.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={`Season ${episode.season}`} 
                size="small" 
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }} 
              />
              <Chip 
                label={episode.duration} 
                size="small" 
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }} 
              />
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <StarIcon sx={{ color: '#FFD700', fontSize: 18, mr: 0.5 }} />
                <Typography variant="body2">{episode.rating}/5</Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            px: 2, 
            py: 1, 
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <DownloadIcon sx={{ color: '#ffb6c1' }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              Total Episodes: {episode.totalEpisodes}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* Episode Banner */}
            <Paper
              sx={{
                position: 'relative',
                backgroundColor: 'black',
                mb: 4,
                pt: '56.25%', // 16:9 Aspect Ratio
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundImage: `url(${episode.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                  }}
                />
                <Box sx={{ zIndex: 1, textAlign: 'center' }}>
                  <Typography variant="h4" component="div" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
                    Download {episode.title}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleQualityChange('1080p')}
                      sx={{ 
                        borderRadius: 2, 
                        px: 3, 
                        py: 1,
                        fontWeight: 600,
                        bgcolor: selectedQuality === '1080p' ? '#ffb6c1' : 'rgba(255,255,255,0.1)',
                        color: selectedQuality === '1080p' ? 'black' : 'white',
                        '&:hover': {
                          bgcolor: selectedQuality === '1080p' ? '#ff99a8' : 'rgba(255,255,255,0.2)',
                          color: selectedQuality === '1080p' ? 'black' : 'white',
                        }
                      }}
                    >
                      1080p ({episode.size['1080p']})
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleQualityChange('720p')}
                      sx={{ 
                        borderRadius: 2, 
                        px: 3, 
                        py: 1,
                        fontWeight: 600,
                        bgcolor: selectedQuality === '720p' ? '#ffb6c1' : 'rgba(255,255,255,0.1)',
                        color: selectedQuality === '720p' ? 'black' : 'white',
                        '&:hover': {
                          bgcolor: selectedQuality === '720p' ? '#ff99a8' : 'rgba(255,255,255,0.2)',
                          color: selectedQuality === '720p' ? 'black' : 'white',
                        }
                      }}
                    >
                      720p ({episode.size['720p']})
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleQualityChange('480p')}
                      sx={{ 
                        borderRadius: 2, 
                        px: 3, 
                        py: 1,
                        fontWeight: 600,
                        bgcolor: selectedQuality === '480p' ? '#ffb6c1' : 'rgba(255,255,255,0.1)',
                        color: selectedQuality === '480p' ? 'black' : 'white',
                        '&:hover': {
                          bgcolor: selectedQuality === '480p' ? '#ff99a8' : 'rgba(255,255,255,0.2)',
                          color: selectedQuality === '480p' ? 'black' : 'white',
                        }
                      }}
                    >
                      480p ({episode.size['480p']})
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>

            {/* Download Servers Section */}
            <Paper sx={{ mb: 4, borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', bgcolor: '#1e1e1e', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Box sx={{ bgcolor: '#272727', p: 2, color: 'white' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <CloudDownloadIcon sx={{ mr: 1, color: '#ffb6c1' }} />
                  Download Links - {selectedQuality} Quality
                </Typography>
              </Box>
              
              <Alert severity="info" sx={{ m: 2, bgcolor: 'rgba(41, 182, 246, 0.1)', color: '#81d4fa' }}>
                <Typography variant="body2">
                  Click on any server below to download. If one server doesn't work, try another.
                </Typography>
              </Alert>
              
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: '#272727' }}>
                    <TableRow>
                      <TableCell width="5%">#</TableCell>
                      <TableCell width="30%">Server Name</TableCell>
                      <TableCell width="20%">Quality</TableCell>
                      <TableCell width="20%">Size</TableCell>
                      <TableCell width="25%">Download</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {episode.downloadLinks[selectedQuality].map((link, index) => (
                      <TableRow key={index} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StorageIcon sx={{ mr: 1, color: '#ffb6c1' }} />
                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                              {link.server}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={selectedQuality} 
                            size="small" 
                            color="secondary" 
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{episode.size[selectedQuality]}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<CloudDownloadIcon />}
                            component={Link}
                            href={link.link}
                            target="_blank"
                            fullWidth
                            sx={{ 
                              borderRadius: 1,
                              fontWeight: 600,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                            }}
                          >
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Episode Info Tabs */}
            <Paper sx={{ borderRadius: 2, overflow: 'hidden', mb: 4, boxShadow: '0 2px 10px rgba(0,0,0,0.3)', bgcolor: '#1e1e1e', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.1)', bgcolor: '#272727' }}
              >
                <Tab label="Information" />
                <Tab label="Screenshots" />
                <Tab label="Subtitles" />
              </Tabs>
              
              <Box sx={{ p: 3, bgcolor: '#1e1e1e' }}>
                {tabValue === 0 && (
                  <Box>
                    <Typography variant="body1" paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      {episode.description}
                    </Typography>
                    <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={3}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Season
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ffb6c1', fontWeight: 500 }}>{episode.season}</Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Duration
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ffb6c1', fontWeight: 500 }}>{episode.duration}</Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Release Date
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ffb6c1', fontWeight: 500 }}>{episode.releaseDate}</Typography>
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Quality
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ffb6c1', fontWeight: 500 }}>Up to 1080p Full HD</Typography>
                      </Grid>
                    </Grid>
                    
                    <Divider sx={{ my: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
                    
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#ffb6c1' }}>
                      Audio Tracks
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      {episode.audio.map((lang, index) => (
                        <Chip key={index} label={lang} size="small" color="secondary" />
                      ))}
                    </Box>
                    
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: '#ffb6c1' }}>
                      Available Subtitles
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {episode.subtitles.map((lang, index) => (
                        <Chip key={index} label={lang} size="small" variant="outlined" color="secondary" />
                      ))}
                    </Box>
                  </Box>
                )}
                
                {tabValue === 1 && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#ffb6c1' }}>
                      Episode Screenshots
                    </Typography>
                    <Grid container spacing={2}>
                      {episode.screenshots.map((screenshot, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Card sx={{ 
                            borderRadius: 2, 
                            overflow: 'hidden',
                            bgcolor: '#272727',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            transition: '0.3s',
                            border: '1px solid rgba(255,255,255,0.05)',
                            '&:hover': {
                              transform: 'scale(1.02)',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                            }
                          }}>
                            <CardMedia
                              component="img"
                              height="160"
                              image={screenshot}
                              alt={`Screenshot ${index + 1}`}
                            />
                            <CardContent sx={{ p: 1, textAlign: 'center', bgcolor: '#272727' }}>
                              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                Screenshot {index + 1}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
                
                {tabValue === 2 && (
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#ffb6c1' }}>
                      Download Subtitles
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead sx={{ bgcolor: '#272727' }}>
                          <TableRow>
                            <TableCell>Language</TableCell>
                            <TableCell>Format</TableCell>
                            <TableCell>Download</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {episode.subtitles.map((lang, index) => (
                            <TableRow key={index} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}>
                              <TableCell>{lang}</TableCell>
                              <TableCell>SRT</TableCell>
                              <TableCell>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="secondary"
                                  startIcon={<DownloadIcon />}
                                  sx={{ 
                                    borderRadius: 1,
                                    '&:hover': {
                                      borderColor: '#ffb6c1',
                                      backgroundColor: 'rgba(255,182,193,0.1)'
                                    }
                                  }}
                                >
                                  Download
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </Box>
            </Paper>

            {/* Episode Navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackIcon />}
                component={RouterLink}
                to={episode.prevEpisode ? `/episodes/${episode.prevEpisode}` : '#'}
                disabled={!episode.prevEpisode}
                sx={{ 
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: '#ffb6c1',
                    backgroundColor: 'rgba(255,182,193,0.1)'
                  }
                }}
              >
                Previous Episode
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<ArrowForwardIcon />}
                component={RouterLink}
                to={episode.nextEpisode ? `/episodes/${episode.nextEpisode}` : '#'}
                disabled={!episode.nextEpisode}
                sx={{ 
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: '#ffb6c1',
                    backgroundColor: 'rgba(255,182,193,0.1)'
                  }
                }}
              >
                Next Episode
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Episode Info Card */}
            <Card sx={{ mb: 4, borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', bgcolor: '#1e1e1e', border: '1px solid rgba(255,255,255,0.05)' }}>
              <CardMedia
                component="img"
                height="200"
                image={episode.image}
                alt={episode.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#ffb6c1' }}>
                  {episode.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip label={`Season ${episode.season}`} size="small" color="primary" />
                  <Chip label={episode.duration} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                  <Chip label="HD" size="small" color="secondary" />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {episode.description.substring(0, 120)}...
                </Typography>
                <Divider sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#ffb6c1' }}>
                  Download Information
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">1080p Full HD:</Typography>
                  <Typography variant="body2" fontWeight="medium" sx={{ color: 'rgba(255,255,255,0.8)' }}>{episode.size['1080p']}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">720p HD:</Typography>
                  <Typography variant="body2" fontWeight="medium" sx={{ color: 'rgba(255,255,255,0.8)' }}>{episode.size['720p']}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">480p SD:</Typography>
                  <Typography variant="body2" fontWeight="medium" sx={{ color: 'rgba(255,255,255,0.8)' }}>{episode.size['480p']}</Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ p: 2, bgcolor: '#272727' }}>
                <Button 
                  fullWidth
                  variant="contained"
                  color="secondary"
                  startIcon={<DownloadIcon />}
                  sx={{ 
                    borderRadius: 1,
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                  }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Download Now
                </Button>
              </CardActions>
            </Card>

            {/* Related Episodes */}
            <Paper sx={{ p: 2, borderRadius: 2, mb: 4, boxShadow: '0 2px 10px rgba(0,0,0,0.3)', bgcolor: '#1e1e1e', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', pb: 1, borderBottom: '2px solid #ffb6c1', color: '#ffb6c1' }}>
                Related Episodes
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                {relatedEpisodes.map((relEpisode) => (
                  <Card
                    key={relEpisode.id}
                    sx={{
                      display: 'flex',
                      transition: '0.3s',
                      borderRadius: 2,
                      overflow: 'hidden',
                      bgcolor: '#272727',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                      },
                    }}
                    component={RouterLink}
                    to={`/episodes/${relEpisode.id}`}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 100 }}
                      image={relEpisode.image}
                      alt={relEpisode.title}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                      <CardContent sx={{ flex: '1 0 auto', py: 1 }}>
                        <Typography component="div" variant="subtitle2" noWrap sx={{ fontWeight: 'medium', color: '#ffb6c1' }}>
                          {relEpisode.title}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary" component="div">
                            {relEpisode.duration}
                          </Typography>
                          <Chip 
                            label="Download" 
                            size="small" 
                            color="secondary" 
                            sx={{ height: 20, fontSize: '0.65rem' }}
                          />
                        </Box>
                      </CardContent>
                    </Box>
                  </Card>
                ))}
              </Stack>
            </Paper>

            {/* Download Instructions */}
            <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.3)', bgcolor: '#1e1e1e', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', pb: 1, borderBottom: '2px solid #ffb6c1', color: '#ffb6c1' }}>
                How to Download
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Step 1: Choose your preferred quality (1080p, 720p, or 480p)"
                    primaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Step 2: Select one of the available download servers"
                    primaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Step 3: Click the download button and save the file"
                    primaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Step 4: Enjoy watching offline!"
                    primaryTypographyProps={{ sx: { color: 'rgba(255,255,255,0.8)' } }}
                  />
                </ListItem>
              </List>
              <Alert severity="info" sx={{ mt: 2, bgcolor: 'rgba(41, 182, 246, 0.1)', color: '#81d4fa' }}>
                <Typography variant="body2">
                  If one server doesn't work, please try another server. All servers provide the same file.
                </Typography>
              </Alert>
              <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
                Note: This website is for educational purposes only. "Your Lie in April" and all related content belong to their respective owners.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default EpisodeDetailPage; 