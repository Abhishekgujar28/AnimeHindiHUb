import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  IconButton,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Skeleton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GetAppIcon from '@mui/icons-material/GetApp';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import MovieIcon from '@mui/icons-material/Movie';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import animeData from '../data/animeData.json';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.9rem',
  minWidth: 100,
  '&.Mui-selected': {
    color: '#ffb6c1',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#ffb6c1',
  },
}));

const ProfilePage = () => {
  const { section = 'account' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [animeData, setAnimeData] = useState({ total: 0, recent: [] });
  
  useEffect(() => {
    // Attempt to load user data from localStorage
    const userDataStr = localStorage.getItem('animeUser');
    if (!userDataStr) {
      // If not logged in, redirect to home
      navigate('/');
      return;
    }
    
    const loadedUser = JSON.parse(userDataStr);
    setUserData(loadedUser);
    
    // Mock data for favorites and history
    // In a real app, this would be loaded from a backend
    
    // Randomly select some anime for favorites
    const allAnime = animeData.animeList || [];
    const randomFavorites = allAnime
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .map(anime => ({
        id: anime.id,
        title: anime.title,
        cover: anime.cover,
        type: anime.type,
        addedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      }));
    
    // Create mock download history
    const randomHistory = allAnime
      .sort(() => 0.5 - Math.random())
      .slice(0, 8)
      .map(anime => {
        const randomEpisode = anime.episodesList && anime.episodesList.length > 0 
          ? anime.episodesList[Math.floor(Math.random() * anime.episodesList.length)] 
          : null;
        
        return {
          id: anime.id,
          animeId: anime.id,
          title: anime.title,
          episodeTitle: randomEpisode ? `Episode ${randomEpisode.number}` : 'Full Movie',
          episodeNumber: randomEpisode ? randomEpisode.number : null,
          cover: anime.cover,
          downloadedAt: new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000).toISOString(),
          quality: '1080p',
        };
      });
    
    setFavorites(randomFavorites);
    setHistory(randomHistory);
    
    // Determine which tab to show based on the URL param
    switch (section) {
      case 'favorites':
        setTabValue(1);
        break;
      case 'history':
        setTabValue(2);
        break;
      case 'settings':
        setTabValue(3);
        break;
      default:
        setTabValue(0);
    }
    
    setLoading(false);
  }, [section, navigate]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const sections = ['account', 'favorites', 'history', 'settings'];
    navigate(`/profile/${sections[newValue]}`);
  };
  
  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };
  
  const handleClearHistory = () => {
    setHistory([]);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#ffb6c1' }} />
      </Box>
    );
  }
  
  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: 'white' }}>
          My Profile
        </Typography>
        
        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ width: 80, height: 80, bgcolor: '#ffb6c1', color: '#000', mb: 2 }}>
                  {userData.username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {userData.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {userData.email}
                </Typography>
                <Chip 
                  label="Free User" 
                  size="small" 
                  sx={{ mt: 1, bgcolor: '#2196f3', color: 'white' }} 
                />
              </Box>
              
              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
              
              <Box sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mb: 2,
                    bgcolor: '#ffb6c1',
                    color: '#000',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: '#ff99a8',
                    }
                  }}
                >
                  Upgrade to Pro
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    }
                  }}
                  onClick={() => {
                    localStorage.removeItem('animeUser');
                    navigate('/');
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#ffb6c1',
                    },
                  }}
                >
                  <StyledTab icon={<PersonIcon />} label="Dashboard" />
                  <StyledTab icon={<BookmarkIcon />} label="Favorites" />
                  <StyledTab icon={<HistoryIcon />} label="History" />
                  <StyledTab icon={<SettingsIcon />} label="Settings" />
                </Tabs>
              </Box>
              
              {/* Dashboard Tab */}
              <TabPanel value={tabValue} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', color: 'white' }}>
                      <CardContent>
                        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <FavoriteIcon sx={{ mr: 1, color: '#e91e63' }} />
                          Favorites
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                          {favorites.length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', color: 'white' }}>
                      <CardContent>
                        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <GetAppIcon sx={{ mr: 1, color: '#4caf50' }} />
                          Downloads
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                          {history.length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)', color: 'white' }}>
                      <CardContent>
                        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <MovieIcon sx={{ mr: 1, color: '#ffb6c1' }} />
                          Days Active
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                          {Math.floor(Math.random() * 30) + 1}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>Recent Activity</Typography>
                    <Paper sx={{ bgcolor: 'rgba(255, 255, 255, 0.03)', p: 0 }}>
                      <List>
                        {history.slice(0, 3).map((item) => (
                          <ListItem key={item.id} divider>
                            <ListItemAvatar>
                              <Avatar variant="rounded" src={item.cover} />
                            </ListItemAvatar>
                            <ListItemText 
                              primary={item.title} 
                              secondary={`Downloaded ${item.episodeTitle} (${item.quality}) - ${formatDate(item.downloadedAt)}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body1">
                        Welcome to your profile dashboard! Here you can keep track of your favorite anime and download history.
                      </Typography>
                    </Alert>
                  </Grid>
                </Grid>
              </TabPanel>
              
              {/* Favorites Tab */}
              <TabPanel value={tabValue} index={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">Your Favorite Anime ({favorites.length})</Typography>
                </Box>
                
                {favorites.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <BookmarkIcon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.2)', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      You haven't added any favorites yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Browse anime and click the heart icon to add to your favorites
                    </Typography>
                  </Box>
                ) : (
                  <List>
                    {favorites.map((anime) => (
                      <Paper 
                        key={anime.id} 
                        sx={{ 
                          mb: 2, 
                          bgcolor: 'rgba(255, 255, 255, 0.03)',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.08)',
                          }
                        }}
                      >
                        <ListItem
                          secondaryAction={
                            <IconButton edge="end" onClick={() => handleRemoveFavorite(anime.id)}>
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar 
                              variant="rounded" 
                              src={anime.cover}
                              sx={{ width: 60, height: 60, mr: 1 }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={anime.title}
                            secondary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                <Chip 
                                  label={anime.type} 
                                  size="small" 
                                  sx={{ 
                                    bgcolor: anime.type === 'Movie' ? '#e91e63' : '#3f51b5',
                                    color: 'white',
                                  }} 
                                />
                                <Typography variant="body2" color="text.secondary">
                                  Added on {formatDate(anime.addedAt)}
                                </Typography>
                              </Box>
                            }
                            sx={{ ml: 1 }}
                          />
                        </ListItem>
                      </Paper>
                    ))}
                  </List>
                )}
              </TabPanel>
              
              {/* History Tab */}
              <TabPanel value={tabValue} index={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">Download History ({history.length})</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={handleClearHistory}
                    disabled={history.length === 0}
                    sx={{
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      }
                    }}
                  >
                    Clear History
                  </Button>
                </Box>
                
                {history.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <HistoryIcon sx={{ fontSize: 60, color: 'rgba(255,255,255,0.2)', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No download history found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Your download history will appear here
                    </Typography>
                  </Box>
                ) : (
                  <List>
                    {history.map((item) => (
                      <Paper 
                        key={item.id} 
                        sx={{ 
                          mb: 2, 
                          bgcolor: 'rgba(255, 255, 255, 0.03)',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.08)',
                          }
                        }}
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar 
                              variant="rounded" 
                              src={item.cover}
                              sx={{ width: 60, height: 60, mr: 1 }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                {item.title}
                              </Typography>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  {item.episodeTitle}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                  <Chip 
                                    label={item.quality} 
                                    size="small" 
                                    sx={{ 
                                      bgcolor: '#2196f3',
                                      color: 'white',
                                    }}
                                  />
                                  <Typography variant="body2" color="text.secondary">
                                    Downloaded on {formatDate(item.downloadedAt)}
                                  </Typography>
                                </Box>
                              </Box>
                            }
                            sx={{ ml: 1 }}
                          />
                        </ListItem>
                      </Paper>
                    ))}
                  </List>
                )}
              </TabPanel>
              
              {/* Settings Tab */}
              <TabPanel value={tabValue} index={3}>
                <Typography variant="h6" gutterBottom>
                  Account Settings
                </Typography>
                
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'rgba(255, 255, 255, 0.03)' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Profile Information
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Username
                      </Typography>
                      <Typography variant="body1">{userData.username}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body1">{userData.email}</Typography>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#ffb6c1',
                        color: '#000',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: '#ff99a8',
                        }
                      }}
                    >
                      Edit Profile
                    </Button>
                  </Box>
                </Paper>
                
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'rgba(255, 255, 255, 0.03)' }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    App Preferences
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          color: 'white',
                          '&:hover': {
                            borderColor: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)',
                          },
                          mr: 2
                        }}
                      >
                        Clear Cache
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                      >
                        Delete Account
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
                
                <Alert severity="info">
                  <Typography variant="body2">
                    Your account is currently on the free plan. Upgrade to PRO for ad-free experience and premium features.
                  </Typography>
                </Alert>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage; 