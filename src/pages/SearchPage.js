import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  CircularProgress,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import StarIcon from '@mui/icons-material/Star';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filterType, setFilterType] = useState('all');
  const [filterGenre, setFilterGenre] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life'
  ];

  const statuses = ['All', 'Ongoing', 'Completed'];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      // Sample data
      const sampleAnimeList = [
        {
          id: 1,
          title: 'Your Lie in April',
          description: 'A piano prodigy who lost his ability to play after suffering a traumatic event meets a violinist who helps him return to the music world.',
          type: 'TV',
          episodes: 22,
          status: 'Completed',
          cover: 'https://m.media-amazon.com/images/M/MV5BYThlNWY5ZDgtYTIxNC00ZjdiLWJmNGUtMDFjMDlmZTAzOWFiXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
          rating: 4.9,
          genres: ['Drama', 'Music', 'Romance']
        },
        // Add more sample anime here...
      ];

      // Filter based on search query and filters
      let filteredList = sampleAnimeList.filter(anime => {
        const matchesQuery = anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           anime.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || anime.type === filterType;
        const matchesGenre = filterGenre === 'all' || anime.genres.includes(filterGenre);
        const matchesStatus = filterStatus === 'all' || anime.status === filterStatus;
        return matchesQuery && matchesType && matchesGenre && matchesStatus;
      });

      setAnimeList(filteredList);
      setTotalPages(Math.ceil(filteredList.length / 12)); // 12 items per page
      setLoading(false);
    }, 1000);
  }, [searchQuery, filterType, filterGenre, filterStatus]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchParams({ q: searchQuery });
      setPage(1);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
          component="img"
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
            component="div"
            sx={{ 
              color: 'white',
              '&:hover': {
                color: '#ffb6c1',
              },
            }}
          >
            {anime.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {anime.description}
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
            {anime.genres.slice(0, 2).map((genre) => (
              <Chip 
                key={genre} 
                label={genre} 
                size="small" 
                sx={{ 
                  bgcolor: 'rgba(255, 182, 193, 0.1)', 
                  borderColor: '#ffb6c1',
                  fontSize: '0.7rem' 
                }} 
              />
            ))}
          </Stack>
        </CardContent>
        <CardActions>
          <Button 
            startIcon={<DownloadIcon />}
            size="small"
            sx={{ 
              color: '#ffb6c1',
              '&:hover': {
                color: '#ff99a8',
              },
            }}
          >
            Download
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Search Anime
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={filterType}
                label="Type"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="TV">TV Series</MenuItem>
                <MenuItem value="Movie">Movie</MenuItem>
                <MenuItem value="OVA">OVA</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Genre</InputLabel>
              <Select
                value={filterGenre}
                label="Genre"
                onChange={(e) => setFilterGenre(e.target.value)}
              >
                <MenuItem value="all">All Genres</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: '#ffb6c1' }} />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {animeList.slice((page - 1) * 12, page * 12).map(renderAnimeCard)}
          </Grid>
          
          {animeList.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange}
                color="secondary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'white',
                  },
                  '& .Mui-selected': {
                    bgcolor: '#ffb6c1',
                    color: '#000',
                    '&:hover': {
                      bgcolor: '#ff99a8',
                    },
                  },
                }}
              />
            </Box>
          )}
          
          {animeList.length === 0 && !loading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No anime found matching your search criteria.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default SearchPage; 