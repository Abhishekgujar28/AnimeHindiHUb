import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  TextField,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';

const pages = [
  { title: 'Home', path: '/', icon: <HomeIcon /> },
  { title: 'Trending', path: '/trending', icon: <TrendingUpIcon /> },
  { title: 'Movies', path: '/movies', icon: <MovieIcon /> },
  { title: 'Series', path: '/series', icon: <LiveTvIcon /> },
  { title: 'About Us', path: '/about', icon: <InfoIcon /> },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue('');
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#0a0a0a', boxShadow: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <IconButton
              size="large"
              aria-label="menu"
              color="inherit"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#ffb6c1',
              textDecoration: 'none',
            }}
          >
          AnimeHindiHub
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={RouterLink}
                to={page.path}
                sx={{
                  my: 2,
                  color: isActive(page.path) ? '#ffb6c1' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: isActive(page.path) ? 'bold' : 'normal',
                  borderBottom: isActive(page.path) ? '2px solid #ffb6c1' : 'none',
                  borderRadius: 0,
                  '&:hover': {
                    color: '#ffb6c1',
                    bgcolor: 'transparent',
                  },
                  mx: 0.5,
                }}
              >
                {page.icon && <Box sx={{ mr: 0.5 }}>{page.icon}</Box>}
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Search Bar */}
          <Box sx={{ display: 'flex', flexGrow: { xs: 1, md: 0 }, mr: { xs: 1, md: 2 } }}>
            <TextField
              size="small"
              placeholder="Search anime..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }
              }}
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                width: { sm: 200, md: 250 },
              }}
            />
          </Box>
        </Toolbar>
      </Container>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 280,
            bgcolor: '#121212',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#ffb6c1',
              textDecoration: 'none',
            }}
          >
            AnimeHindiHub
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search anime..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <List>
          {pages.map((page) => (
            <ListItem key={page.title} disablePadding onClick={handleDrawerToggle}>
              <ListItemButton
                component={RouterLink}
                to={page.path}
                selected={isActive(page.path)}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'rgba(255, 182, 193, 0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 182, 193, 0.15)',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive(page.path) ? '#ffb6c1' : 'white', minWidth: 40 }}>
                  {page.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={page.title} 
                  sx={{ 
                    '& .MuiListItemText-primary': { 
                      color: isActive(page.path) ? '#ffb6c1' : 'white',
                      fontWeight: isActive(page.path) ? 'bold' : 'normal',
                    } 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Navbar; 