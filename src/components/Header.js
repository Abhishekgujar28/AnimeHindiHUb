import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Stack,
  InputBase,
  alpha,
  TextField,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Dialog from '@mui/material/Dialog';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleOpenSearch = () => {
    setSearchOpen(true);
  };
  
  const handleCloseSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/anime?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      handleCloseSearch();
    }
  };
  
  const toggleMobileSearchOpen = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };
  
  const handleMobileSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/anime?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      handleCloseSearch();
    }
  };
  
  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };
  
  const handleLogout = () => {
    // Implement logout functionality
  };
  
  const handleLogin = () => {
    // Implement login functionality
  };
  
  // Drawer content
  const drawerContent = (
    <Box sx={{ width: 280, bgcolor: '#1a1a1a', height: '100%' }}>
      <Box sx={{ py: 2, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ 
          color: 'white', 
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Box component="span" sx={{ color: '#ffb6c1', mr: 0.5 }}>Anime</Box>
          HindiHub
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <MenuIcon />
        </IconButton>
      </Box>
      
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
      
      <List>
        <ListItem button component={RouterLink} to="/" onClick={() => setDrawerOpen(false)}>
          <ListItemIcon>
            <HomeIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        
        <ListItem button component={RouterLink} to="/trending" onClick={() => setDrawerOpen(false)}>
          <ListItemIcon>
            <WhatshotIcon sx={{ color: '#e53935' }} />
          </ListItemIcon>
          <ListItemText primary="Trending" />
        </ListItem>
        
        <ListItem button component={RouterLink} to="/movies" onClick={() => setDrawerOpen(false)}>
          <ListItemIcon>
            <MovieIcon sx={{ color: '#ffb6c1' }} />
          </ListItemIcon>
          <ListItemText primary="Movies" />
        </ListItem>
        
        <ListItem button component={RouterLink} to="/series" onClick={() => setDrawerOpen(false)}>
          <ListItemIcon>
            <TvIcon sx={{ color: '#3f51b5' }} />
          </ListItemIcon>
          <ListItemText primary="TV Series" />
        </ListItem>
        
        <ListItem button component={RouterLink} to="/anime" onClick={() => setDrawerOpen(false)}>
          <ListItemIcon>
            <ExploreIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Browse All" />
        </ListItem>
        
        <ListItem button component={RouterLink} to="/about" onClick={() => setDrawerOpen(false)}>
          <ListItemIcon>
            <InfoIcon sx={{ color: '#4caf50' }} />
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#121212' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            component="span"
            sx={{
              color: '#ffb6c1',
              mr: 0.5,
            }}
          >
            Anime
          </Box>
          HindiHub
        </Typography>
        
        {!isMobile && (
          <Stack direction="row" spacing={1}>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/trending"
              sx={{ 
                fontSize: '0.9rem',
                '&:hover': { color: '#ffb6c1' }
              }}
            >
              Trending
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/movies"
              sx={{ 
                fontSize: '0.9rem',
                '&:hover': { color: '#ffb6c1' }
              }}
            >
              Movies
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/series"
              sx={{ 
                fontSize: '0.9rem',
                '&:hover': { color: '#ffb6c1' }
              }}
            >
              Series
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/about"
              sx={{ 
                fontSize: '0.9rem',
                '&:hover': { color: '#ffb6c1' }
              }}
            >
              About
            </Button>
          </Stack>
        )}
        
        {searchOpen ? (
          <Box 
            component="form" 
            onSubmit={handleSearch}
            sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: alpha('#fff', 0.15),
              '&:hover': {
                backgroundColor: alpha('#fff', 0.25),
              },
              marginRight: 2,
              marginLeft: 0,
              width: '100%',
              display: 'flex',
              [theme => theme.breakpoints.up('sm')]: {
                marginLeft: 3,
                width: 'auto',
              },
            }}
          >
            <InputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              sx={{
                color: 'inherit',
                '& .MuiInputBase-input': {
                  padding: '8px 8px 8px 0',
                  paddingLeft: `calc(1em + ${8}px)`,
                  transition: theme => theme.transitions.create('width'),
                  width: '100%',
                  [theme => theme.breakpoints.up('md')]: {
                    width: '20ch',
                  },
                },
              }}
            />
            <Button type="submit" sx={{ color: 'white' }}>
              <SearchIcon />
            </Button>
            <Button onClick={handleCloseSearch} sx={{ color: 'white' }}>
              Cancel
            </Button>
          </Box>
        ) : (
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleOpenSearch}
          >
            <SearchIcon />
          </IconButton>
        )}
      </Toolbar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            color: 'white',
          }
        }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Header; 