import React, { useState } from 'react';
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
  Container,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Divider,
  Chip,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import StarIcon from '@mui/icons-material/Star';

// Mock data for episodes
const allEpisodes = [
  {
    id: 1,
    title: 'Episode 1: Monotone/Colorful',
    description: 'Kousei Arima was a piano prodigy until his mother died when he was eleven years old.',
    image: 'https://m.media-amazon.com/images/M/MV5BYThlNWY5ZDgtYTIxNC00ZjdiLWJmNGUtMDFjMDlmZTAzOWFiXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    season: 1,
    duration: '23 min',
    releaseDate: 'October 9, 2014',
    size: '350MB',
    quality: '1080p',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Episode 2: Friend A',
    description: 'Kaori forces Kousei to be her accompanist for a violin competition, but he refuses.',
    image: 'https://m.media-amazon.com/images/M/MV5BMTQ5MjExMzQtMzJlZS00NWU3LTg3NDItYTY5YzU4YzYwZTRjXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    season: 1,
    duration: '23 min',
    releaseDate: 'October 16, 2014',
    size: '350MB',
    quality: '1080p',
    rating: 4.7,
  },
  {
    id: 3,
    title: 'Episode 3: Inside Spring',
    description: 'Kousei reluctantly agrees to be Kaori\'s accompanist, but his trauma prevents him from hearing the piano.',
    image: 'https://m.media-amazon.com/images/M/MV5BNzg5MmI0ZDctODg1Ny00ZDgxLWI0MDgtYmNhZmFiYzM2MWZmXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    season: 1,
    duration: '23 min',
    releaseDate: 'October 23, 2014',
    size: '350MB',
    quality: '1080p',
    rating: 4.9,
  },
  {
    id: 4,
    title: 'Episode 4: The Journey',
    description: 'Kousei and Kaori perform at the competition, but Kousei freezes on stage.',
    image: 'https://m.media-amazon.com/images/M/MV5BYThlNWY5ZDgtYTIxNC00ZjdiLWJmNGUtMDFjMDlmZTAzOWFiXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    season: 1,
    duration: '23 min',
    releaseDate: 'October 30, 2014',
    size: '350MB',
    quality: '1080p',
    rating: 4.8,
  },
  {
    id: 5,
    title: 'Episode 5: Gray Skies',
    description: 'Despite Kousei\'s breakdown during the performance, Kaori\'s playing captivates the audience.',
    image: 'https://m.media-amazon.com/images/M/MV5BMTQ5MjExMzQtMzJlZS00NWU3LTg3NDItYTY5YzU4YzYwZTRjXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    season: 1,
    duration: '23 min',
    releaseDate: 'November 6, 2014',
    size: '350MB',
    quality: '1080p',
    rating: 4.7,
  },
  {
    id: 6,
    title: 'Episode 6: On the Way Home',
    description: 'Kousei begins to face his past and decides to enter a piano competition.',
    image: 'https://m.media-amazon.com/images/M/MV5BNzg5MmI0ZDctODg1Ny00ZDgxLWI0MDgtYmNhZmFiYzM2MWZmXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    season: 1,
    duration: '23 min',
    releaseDate: 'November 13, 2014',
    size: '350MB',
    quality: '1080p',
    rating: 4.9,
  },
  {
    id: 7,
    title: 'Episode 7: The Shadows Whisper',
    description: 'Kousei struggles with his decision to play the piano again as memories of his mother resurface.',
    image: 'https://m.media-amazon.com/images/M/MV5BYThlNWY5ZDgtYTIxNC00ZjdiLWJmNGUtMDFjMDlmZTAzOWFiXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    season: 1,
    duration: '23 min',
    releaseDate: 'November 20, 2014',
    size: '350MB',
    quality: '1080p',
    rating: 4.8,
  },
  {
    id: 8,
    title: 'Episode 8: Let It Ring',
    description: 'Kousei meets a young pianist who reminds him of his younger self.',
    image: 'https://m.media-amazon.com/images/M/MV5BMTQ5MjExMzQtMzJlZS00NWU3LTg3NDItYTY5YzU4YzYwZTRjXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    season: 1,
    duration: '23 min',
    releaseDate: 'November 27, 2014',
    size: '350MB',
    quality: '1080p',
    rating: 4.7,
  },
];

function EpisodesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [qualityFilter, setQualityFilter] = useState('all');

  // Filter episodes based on search term and quality filter
  const filteredEpisodes = allEpisodes.filter((episode) => {
    const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesQuality = qualityFilter === 'all' || episode.quality === qualityFilter;
    
    return matchesSearch && matchesQuality;
  });

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle quality filter change
  const handleQualityChange = (event) => {
    setQualityFilter(event.target.value);
  };

  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
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
          <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 0, fontWeight: 600, color: '#ffb6c1' }}>
            Your Lie in April Episodes
          </Typography>
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
              Total Episodes: {allEpisodes.length}
            </Typography>
          </Box>
        </Box>
        
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: '#1e1e1e', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search episodes..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ffb6c1',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ffb6c1',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'white',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="quality-filter-label" sx={{ color: 'rgba(255,255,255,0.7)' }}>Quality</InputLabel>
                <Select
                  labelId="quality-filter-label"
                  id="quality-filter"
                  value={qualityFilter}
                  label="Quality"
                  onChange={handleQualityChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterListIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                    </InputAdornment>
                  }
                  sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ffb6c1',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#ffb6c1',
                    },
                    '.MuiSvgIcon-root': {
                      color: 'rgba(255,255,255,0.7)',
                    }
                  }}
                >
                  <MenuItem value="all">All Qualities</MenuItem>
                  <MenuItem value="1080p">1080p Full HD</MenuItem>
                  <MenuItem value="720p">720p HD</MenuItem>
                  <MenuItem value="480p">480p SD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button 
                fullWidth 
                variant="contained" 
                color="secondary"
                startIcon={<DownloadIcon />}
                sx={{ 
                  height: '56px',
                  fontWeight: 600,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}
              >
                Download All Episodes
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="secondary"
            textColor="secondary"
            sx={{ mb: 2 }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All Episodes" />
            <Tab label="Season 1" />
            <Tab label="OVAs" />
          </Tabs>
          
          <Divider sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />
        </Box>
        
        <Grid container spacing={3}>
          {filteredEpisodes.map((episode) => (
            <Grid item key={episode.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  borderRadius: 2,
                  bgcolor: '#1e1e1e',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                  },
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={episode.image}
                    alt={episode.title}
                  />
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10, 
                    bgcolor: '#ffb6c1', 
                    color: '#000',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 'bold'
                  }}>
                    EP {episode.id}
                  </Box>
                  <Box sx={{ 
                    position: 'absolute', 
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'rgba(0,0,0,0.8)', 
                    color: 'white',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                      <StarIcon sx={{ color: '#FFD700', fontSize: 16, mr: 0.5 }} />
                      {episode.rating}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                      {episode.quality} • {episode.size}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography gutterBottom variant="subtitle1" component="h2" sx={{ fontWeight: 'bold', color: '#ffb6c1' }}>
                    {episode.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '40px', overflow: 'hidden' }}>
                    {episode.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      label={`${episode.duration}`} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.7rem', borderColor: 'rgba(255,255,255,0.2)' }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Released: {episode.releaseDate}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    component={RouterLink}
                    to={`/episodes/${episode.id}`}
                    startIcon={<DownloadIcon />}
                    sx={{ 
                      borderRadius: 1,
                      fontWeight: 600,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}
                  >
                    Download Options
                  </Button>
                  <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ 
                        flex: 1, 
                        fontSize: '0.7rem', 
                        borderRadius: 1,
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.8)',
                        '&:hover': {
                          borderColor: '#ffb6c1',
                          backgroundColor: 'rgba(255,182,193,0.1)'
                        }
                      }}
                    >
                      720p
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      sx={{ 
                        flex: 1, 
                        fontSize: '0.7rem', 
                        borderRadius: 1,
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.8)',
                        '&:hover': {
                          borderColor: '#ffb6c1',
                          backgroundColor: 'rgba(255,182,193,0.1)'
                        }
                      }}
                    >
                      1080p
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {filteredEpisodes.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 5, bgcolor: '#1e1e1e', borderRadius: 2, mt: 4, boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Typography variant="h6" color="text.secondary">
              No episodes found matching your search.
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              sx={{ 
                mt: 2,
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
              onClick={() => {
                setSearchTerm('');
                setQualityFilter('all');
              }}
            >
              Clear Filters
            </Button>
          </Box>
        )}

        {/* Download Information */}
        <Paper sx={{ p: 3, mt: 5, borderRadius: 2, bgcolor: '#1e1e1e', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ffb6c1' }}>
            Download Information
          </Typography>
          <Divider sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
            • All episodes of "Your Lie in April" are available in multiple qualities: 1080p, 720p, and 480p.
          </Typography>
          <Typography variant="body2" paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
            • Each episode has multiple download servers for your convenience.
          </Typography>
          <Typography variant="body2" paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
            • If one server doesn't work, please try another server.
          </Typography>
          <Typography variant="body2" paragraph sx={{ color: 'rgba(255,255,255,0.8)' }}>
            • For any issues with downloads, please contact us.
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 2, color: 'rgba(255,255,255,0.5)' }}>
            Note: This website is for educational purposes only. "Your Lie in April" and all related content belong to their respective owners.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default EpisodesPage; 