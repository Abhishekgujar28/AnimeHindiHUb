import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import animeData from '../data/animeData.json';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

function AnimePage() {
  const location = useLocation();
  const [animeList, setAnimeList] = useState([]);
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    genres: [],
    status: 'all',
    type: 'all',
    year: 'all',
    language: 'all',
    sort: 'newest'
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Get unique values for filters
  const allGenres = [...new Set(animeList.flatMap(anime => anime.genres || []))].sort();
  const allYears = [...new Set(animeList.map(anime => anime.year))].sort((a, b) => b - a);
  const allLanguages = [...new Set(animeList.map(anime => anime.language))];

  // Parse search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);

  useEffect(() => {
    // Load anime data from comprehensive JSON file
    const loadAnimeData = () => {
      try {
        setLoading(true);
        const allAnime = animeData.animeList || [];
        setAnimeList(allAnime);
        setFilteredAnime(allAnime);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load anime data:", error);
        setLoading(false);
      }
    };

    loadAnimeData();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = [...animeList];
    
    // Apply search filter with improved matching
    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(anime => {
        // Check main title with more flexible matching
        if (anime.title.toLowerCase().includes(term)) return true;
        
        // Check alternate titles
        if (anime.altTitles && anime.altTitles.some(alt => alt.toLowerCase().includes(term))) return true;
        
        // Check genre matching
        if (anime.genres && anime.genres.some(genre => genre.toLowerCase().includes(term))) return true;
        
        // Check description for keywords
        if (anime.description && anime.description.toLowerCase().includes(term)) return true;
        
        return false;
      });
    }
    
    // Apply genre filter
    if (filters.genres.length > 0) {
      result = result.filter(anime => 
        filters.genres.every(genre => anime.genres.includes(genre))
      );
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(anime => anime.status === filters.status);
    }
    
    // Apply type filter
    if (filters.type !== 'all') {
      result = result.filter(anime => anime.type === filters.type);
    }
    
    // Apply year filter
    if (filters.year !== 'all') {
      const yearNumber = parseInt(filters.year);
      result = result.filter(anime => anime.year === yearNumber);
    }
    
    // Apply language filter
    if (filters.language !== 'all') {
      result = result.filter(anime => anime.language === filters.language);
    }
    
    // Apply sort
    if (filters.sort === 'popular') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === 'newest') {
      result.sort((a, b) => b.year - a.year);
    } else if (filters.sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredAnime(result);
  }, [animeList, searchTerm, filters]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleGenreToggle = (genre) => {
    const currentGenres = [...filters.genres];
    const currentIndex = currentGenres.indexOf(genre);
    
    if (currentIndex === -1) {
      currentGenres.push(genre);
    } else {
      currentGenres.splice(currentIndex, 1);
    }
    
    handleFilterChange('genres', currentGenres);
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
              }}
            />
          )}
        </Box>
        
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
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
                }} 
              />
            ))}
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            {anime.episodes > 1 ? `${anime.episodes} Episodes • ` : 'Movie • '}
            {anime.year} • {anime.language}
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
            Download
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  const filterDrawer = (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : 320,
          bgcolor: '#1a1a1a',
          color: 'white',
          p: 2
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="div">
          Filters
        </Typography>
        <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
        Sort By
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Select
          value={filters.sort}
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          displayEmpty
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffb6c1',
            },
            '.MuiSvgIcon-root': {
              color: 'white',
            }
          }}
        >
          <MenuItem value="popular">Popularity</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="rating">Highest Rated</MenuItem>
          <MenuItem value="alphabetical">Alphabetical</MenuItem>
        </Select>
      </FormControl>
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
        Type
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          displayEmpty
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffb6c1',
            },
            '.MuiSvgIcon-root': {
              color: 'white',
            }
          }}
        >
          <MenuItem value="all">All Types</MenuItem>
          <MenuItem value="TV">TV Series</MenuItem>
          <MenuItem value="Movie">Movies</MenuItem>
        </Select>
      </FormControl>
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
        Status
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          displayEmpty
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffb6c1',
            },
            '.MuiSvgIcon-root': {
              color: 'white',
            }
          }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
        Year
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Select
          value={filters.year}
          onChange={(e) => handleFilterChange('year', e.target.value)}
          displayEmpty
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffb6c1',
            },
            '.MuiSvgIcon-root': {
              color: 'white',
            }
          }}
        >
          <MenuItem value="all">All Years</MenuItem>
          {allYears.map(year => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
        Language
      </Typography>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <Select
          value={filters.language}
          onChange={(e) => handleFilterChange('language', e.target.value)}
          displayEmpty
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#ffb6c1',
            },
            '.MuiSvgIcon-root': {
              color: 'white',
            }
          }}
        >
          <MenuItem value="all">All Languages</MenuItem>
          {allLanguages.map(language => (
            <MenuItem key={language} value={language}>{language}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
        Genres
      </Typography>
      <Box sx={{ maxHeight: 200, overflow: 'auto', mb: 3 }}>
        <Grid container spacing={1}>
          {allGenres.map(genre => (
            <Grid item key={genre}>
              <Chip
                label={genre}
                clickable
                onClick={() => handleGenreToggle(genre)}
                color={filters.genres.includes(genre) ? "primary" : "default"}
                variant={filters.genres.includes(genre) ? "filled" : "outlined"}
                sx={{ 
                  bgcolor: filters.genres.includes(genre) ? '#ffb6c1' : 'transparent',
                  color: filters.genres.includes(genre) ? '#000' : 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          setFilters({
            genres: [],
            status: 'all',
            type: 'all',
            year: 'all',
            language: 'all',
            sort: 'newest'
          });
        }}
        sx={{ 
          bgcolor: '#ffb6c1',
          color: '#000',
          fontWeight: 'bold',
          '&:hover': {
            bgcolor: '#ff99a8',
          }
        }}
      >
        Reset Filters
      </Button>
    </Drawer>
  );

  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', pt: 3, pb: 6 }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            mb: 3,
            color: 'white',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          All Anime
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            mb: 4,
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <TextField
            placeholder="Search anime..."
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            fullWidth
            sx={{
              maxWidth: { md: '60%' },
              '.MuiOutlinedInput-root': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                color: 'white',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffb6c1',
                },
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                </InputAdornment>
              ),
            }}
          />
          
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={toggleDrawer(true)}
            sx={{ 
              bgcolor: '#ffb6c1',
              color: '#000',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#ff99a8',
              }
            }}
          >
            Filter & Sort
          </Button>
        </Box>
        
        {filters.genres.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {filters.genres.map(genre => (
              <Chip
                key={genre}
                label={genre}
                onDelete={() => handleGenreToggle(genre)}
                sx={{ 
                  bgcolor: '#ffb6c1',
                  color: '#000',
                  fontWeight: 'bold',
                }}
              />
            ))}
            <Chip
              label="Clear All"
              onClick={() => handleFilterChange('genres', [])}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                }
              }}
            />
          </Box>
        )}
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#ffb6c1' }} />
          </Box>
        ) : filteredAnime.length === 0 ? (
          <Paper 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom>
              No anime found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search or filters to find what you're looking for.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredAnime.map(anime => renderAnimeCard(anime))}
          </Grid>
        )}
      </Container>
      
      {filterDrawer}
    </Box>
  );
}

export default AnimePage; 