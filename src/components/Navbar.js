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
import { useAuth } from '../contexts/AuthContext';

const pages = [
  { title: 'Home', path: '/', icon: <HomeIcon /> },
  { title: 'Trending', path: '/trending', icon: <TrendingUpIcon /> },
  { title: 'Movies', path: '/movies', icon: <MovieIcon /> },
  { title: 'Series', path: '/series', icon: <LiveTvIcon /> },
  { title: 'Schedule', path: '/schedule', icon: <ScheduleIcon /> },
];

const adminPages = [
  { title: 'Dashboard', path: '/admin/dashboard', icon: <AdminPanelSettingsIcon /> },
  { title: 'Add Anime', path: '/admin/add-anime', icon: <MovieIcon /> },
  { title: 'Add Episode', path: '/admin/add-episode', icon: <VideoLibraryIcon /> },
];

const userPages = [
  { title: 'My Profile', path: '/profile' },
  { title: 'My Watchlist', path: '/watchlist' },
  { title: 'History', path: '/history' },
  { title: 'Settings', path: '/settings' },
  { title: 'Admin Panel', path: '/admin/dashboard' },
  { title: 'Logout', path: '/logout' },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

  const isAdminSection = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    logout();
    setAnchorElUser(null);
    navigate('/');
  };

  const userMenuItems = isAuthenticated ? [
    { title: 'My Profile', path: '/profile' },
    { title: 'My Watchlist', path: '/watchlist' },
    { title: 'History', path: '/history' },
    { title: 'Settings', path: '/settings' },
    ...(isAdmin ? [{ title: 'Admin Panel', path: '/admin/dashboard' }] : []),
    { title: 'Logout', path: '/logout', icon: <LogoutIcon />, onClick: handleLogout },
  ] : [
    { title: 'Login', path: '/login' },
  ];

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
            
            {/* Admin Quick Link */}
            <Button
              component={RouterLink}
              to="/admin/dashboard"
              sx={{
                my: 2,
                color: isAdminSection ? '#ffb6c1' : '#aaa',
                display: 'flex',
                alignItems: 'center',
                fontWeight: isAdminSection ? 'bold' : 'normal',
                borderBottom: isAdminSection ? '2px solid #ffb6c1' : 'none',
                borderRadius: 0,
                '&:hover': {
                  color: '#ffb6c1',
                  bgcolor: 'transparent',
                },
                mx: 0.5,
              }}
            >
              <AdminPanelSettingsIcon sx={{ mr: 0.5 }} />
              Admin
            </Button>
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

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={isAuthenticated ? "Open settings" : "Login"}>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar sx={{ bgcolor: '#ffb6c1', color: '#000' }}>
                  {isAuthenticated ? 'U' : 'L'}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userMenuItems.map((item) => (
                <MenuItem 
                  key={item.title} 
                  onClick={item.onClick || handleCloseUserMenu}
                  sx={{
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {item.icon && <Box sx={{ mr: 1 }}>{item.icon}</Box>}
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
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
            YourLie
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
          {userMenuItems.map((item) => (
            <ListItem key={item.title} disablePadding onClick={item.onClick || handleDrawerToggle}>
              <ListItemButton
                component={item.onClick ? 'div' : RouterLink}
                to={item.onClick ? undefined : item.path}
                selected={isActive(item.path)}
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
                <ListItemIcon sx={{ color: isActive(item.path) ? '#ffb6c1' : 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.title} 
                  sx={{ 
                    '& .MuiListItemText-primary': { 
                      color: isActive(item.path) ? '#ffb6c1' : 'white',
                      fontWeight: isActive(item.path) ? 'bold' : 'normal',
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