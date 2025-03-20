import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Divider,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Card,
  CardContent,
  LinearProgress,
  TablePagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MovieIcon from '@mui/icons-material/Movie';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import DownloadIcon from '@mui/icons-material/Download';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [animeList, setAnimeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [animeToDelete, setAnimeToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [stats, setStats] = useState({
    totalAnime: 0,
    totalEpisodes: 0,
    totalUsers: 0,
    totalDownloads: 0
  });

  useEffect(() => {
    // Simulate loading data from backend
    setTimeout(() => {
      // Sample data for demonstration
      const sampleAnimeList = [
        { 
          id: 1, 
          title: 'Your Lie in April', 
          episodeCount: 22, 
          status: 'Completed', 
          type: 'TV',
          rating: 4.9,
          genres: ['Drama', 'Music', 'Romance'],
          downloads: 15420
        },
        { 
          id: 2, 
          title: 'Demon Slayer', 
          episodeCount: 26, 
          status: 'Ongoing', 
          type: 'TV',
          rating: 4.8,
          genres: ['Action', 'Supernatural'],
          downloads: 45210
        },
        { 
          id: 3, 
          title: 'Attack on Titan', 
          episodeCount: 75, 
          status: 'Completed', 
          type: 'TV',
          rating: 4.7,
          genres: ['Action', 'Drama', 'Fantasy'],
          downloads: 67800
        },
        { 
          id: 4, 
          title: 'One Punch Man', 
          episodeCount: 24, 
          status: 'Ongoing', 
          type: 'TV',
          rating: 4.6,
          genres: ['Action', 'Comedy'],
          downloads: 32150
        },
        { 
          id: 5, 
          title: 'My Hero Academia', 
          episodeCount: 113, 
          status: 'Ongoing', 
          type: 'TV',
          rating: 4.5,
          genres: ['Action', 'Superhero'],
          downloads: 50380
        },
        { 
          id: 6, 
          title: 'Jujutsu Kaisen', 
          episodeCount: 24, 
          status: 'Ongoing', 
          type: 'TV',
          rating: 4.7,
          genres: ['Action', 'Supernatural'],
          downloads: 38970
        },
        { 
          id: 7, 
          title: 'Fullmetal Alchemist: Brotherhood', 
          episodeCount: 64, 
          status: 'Completed', 
          type: 'TV',
          rating: 4.9,
          genres: ['Action', 'Adventure', 'Fantasy'],
          downloads: 78920
        },
        { 
          id: 8, 
          title: 'Death Note', 
          episodeCount: 37, 
          status: 'Completed', 
          type: 'TV',
          rating: 4.8,
          genres: ['Mystery', 'Psychological', 'Thriller'],
          downloads: 89450
        },
        { 
          id: 9, 
          title: 'A Silent Voice', 
          episodeCount: 1, 
          status: 'Completed', 
          type: 'Movie',
          rating: 4.9,
          genres: ['Drama', 'Romance'],
          downloads: 43120
        },
        { 
          id: 10, 
          title: 'Naruto', 
          episodeCount: 220, 
          status: 'Completed', 
          type: 'TV',
          rating: 4.6,
          genres: ['Action', 'Adventure'],
          downloads: 102450
        },
        { 
          id: 11, 
          title: 'Cowboy Bebop', 
          episodeCount: 26, 
          status: 'Completed', 
          type: 'TV',
          rating: 4.9,
          genres: ['Action', 'Adventure', 'Sci-Fi'],
          downloads: 52000
        },
        { 
          id: 12, 
          title: 'Steins;Gate', 
          episodeCount: 24, 
          status: 'Completed', 
          type: 'TV',
          rating: 4.9,
          genres: ['Sci-Fi', 'Thriller'],
          downloads: 61240
        },
      ];
      
      setAnimeList(sampleAnimeList);
      
      // Calculate stats
      const totalAnime = sampleAnimeList.length;
      const totalEpisodes = sampleAnimeList.reduce((sum, anime) => sum + anime.episodeCount, 0);
      const totalDownloads = sampleAnimeList.reduce((sum, anime) => sum + anime.downloads, 0);
      
      setStats({
        totalAnime,
        totalEpisodes,
        totalUsers: 45000,
        totalDownloads
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const handleDeleteClick = (anime) => {
    setAnimeToDelete(anime);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (animeToDelete) {
      // In a real app, you would call your API here
      // For demo purposes, we're just removing it from the state
      setAnimeList(animeList.filter(anime => anime.id !== animeToDelete.id));
      
      // Update stats
      setStats({
        ...stats,
        totalAnime: stats.totalAnime - 1,
        totalEpisodes: stats.totalEpisodes - animeToDelete.episodeCount,
        totalDownloads: stats.totalDownloads - animeToDelete.downloads
      });
    }
    setDeleteDialogOpen(false);
    setAnimeToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAnimeToDelete(null);
  };

  // Filter anime list based on search query
  const filteredAnimeList = animeList.filter(anime => 
    anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    anime.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    anime.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    anime.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Apply pagination
  const paginatedAnimeList = filteredAnimeList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#ffb6c1' }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <DashboardIcon sx={{ mr: 1, color: '#ffb6c1' }} />
          Admin Dashboard
        </Typography>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1e1e1e', borderLeft: '4px solid #ffb6c1', height: '100%' }}>
            <CardContent>
              <Typography color="text.secondary" variant="overline">
                Total Anime
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.totalAnime}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <MovieIcon sx={{ color: '#ffb6c1', mr: 1 }} />
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(100, (stats.totalAnime / 20) * 100)} 
                  sx={{ 
                    width: '100%',
                    borderRadius: 1,
                    backgroundColor: 'rgba(255, 182, 193, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#ffb6c1',
                    }
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1e1e1e', borderLeft: '4px solid #83c5be', height: '100%' }}>
            <CardContent>
              <Typography color="text.secondary" variant="overline">
                Total Episodes
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.totalEpisodes.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <VideoLibraryIcon sx={{ color: '#83c5be', mr: 1 }} />
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(100, (stats.totalEpisodes / 1000) * 100)} 
                  sx={{ 
                    width: '100%',
                    borderRadius: 1,
                    backgroundColor: 'rgba(131, 197, 190, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#83c5be',
                    }
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1e1e1e', borderLeft: '4px solid #a2d2ff', height: '100%' }}>
            <CardContent>
              <Typography color="text.secondary" variant="overline">
                Registered Users
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.totalUsers.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <PeopleIcon sx={{ color: '#a2d2ff', mr: 1 }} />
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(100, (stats.totalUsers / 100000) * 100)} 
                  sx={{ 
                    width: '100%',
                    borderRadius: 1,
                    backgroundColor: 'rgba(162, 210, 255, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#a2d2ff',
                    }
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#1e1e1e', borderLeft: '4px solid #f8ad9d', height: '100%' }}>
            <CardContent>
              <Typography color="text.secondary" variant="overline">
                Total Downloads
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {stats.totalDownloads.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <DownloadIcon sx={{ color: '#f8ad9d', mr: 1 }} />
                <LinearProgress 
                  variant="determinate" 
                  value={Math.min(100, (stats.totalDownloads / 1000000) * 100)} 
                  sx={{ 
                    width: '100%',
                    borderRadius: 1,
                    backgroundColor: 'rgba(248, 173, 157, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#f8ad9d',
                    }
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Action Buttons */}
      <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/add-anime')}
          sx={{ 
            bgcolor: '#ffb6c1', 
            color: '#000',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#ff99a8'
            }
          }}
        >
          Add New Anime
        </Button>
        
        <Button
          variant="contained"
          startIcon={<VideoLibraryIcon />}
          onClick={() => navigate('/admin/add-episode')}
          sx={{ 
            bgcolor: '#83c5be', 
            color: '#000',
            fontWeight: 'bold',
            '&:hover': {
              bgcolor: '#70b4ac'
            }
          }}
        >
          Add New Episode
        </Button>
      </Box>
      
      {/* Search and Anime List */}
      <Paper sx={{ p: 3, bgcolor: '#1e1e1e', mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <LibraryBooksIcon sx={{ mr: 1, color: '#ffb6c1' }} />
            Anime Library
          </Typography>
          
          <TextField
            placeholder="Search anime..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', sm: '300px' } }}
          />
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Episodes</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Genres</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Downloads</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAnimeList.length > 0 ? (
                paginatedAnimeList.map((anime) => (
                  <TableRow
                    key={anime.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {anime.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{anime.type}</TableCell>
                    <TableCell align="center">{anime.episodeCount}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={anime.status} 
                        color={anime.status === 'Completed' ? 'success' : 'warning'} 
                        size="small" 
                        variant="outlined" 
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
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
                        {anime.genres.length > 2 && (
                          <Chip 
                            label={`+${anime.genres.length - 2}`} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'rgba(255, 182, 193, 0.1)', 
                              borderColor: '#ffb6c1',
                              fontSize: '0.7rem' 
                            }} 
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {anime.rating}
                    </TableCell>
                    <TableCell align="center">
                      {anime.downloads.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton 
                          size="small" 
                          color="primary" 
                          onClick={() => navigate(`/admin/edit-anime/${anime.id}`)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => handleDeleteClick(anime)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body1" sx={{ py: 2 }}>
                      No anime found matching your search criteria.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAnimeList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>
          {"Delete Anime?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{animeToDelete?.title}"? This action cannot be undone and will remove all associated episodes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminDashboardPage; 