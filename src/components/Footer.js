import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack,
} from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
 

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box sx={{ bgcolor: '#0a0a0a', color: 'white', py: 6, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ffb6c1' }}>
              AnimeHindiHub
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your ultimate destination for high-quality anime streaming and downloads.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: '#0088cc' }}>
                <TelegramIcon />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/trending" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Trending Anime
            </Link>
            <Link component={RouterLink} to="/movies" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Anime Movies
            </Link>
            <Link component={RouterLink} to="/series" color="inherit" sx={{ display: 'block', mb: 1 }}>
              TV Series
            </Link>
            <Link component={RouterLink} to="/schedule" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Release Schedule
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Genres
            </Typography>
            <Link component={RouterLink} to="/genre/action" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Action
            </Link>
            <Link component={RouterLink} to="/genre/romance" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Romance
            </Link>
            <Link component={RouterLink} to="/genre/comedy" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Comedy
            </Link>
            <Link component={RouterLink} to="/genre/drama" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Drama
            </Link>
            <Link component={RouterLink} to="/genre/fantasy" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Fantasy
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Support
            </Typography>
            <Link component={RouterLink} to="/contact" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Contact Us
            </Link>
            <Link component={RouterLink} to="/faq" color="inherit" sx={{ display: 'block', mb: 1 }}>
              FAQ
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Terms of Service
            </Link>
            <Link component={RouterLink} to="/privacy" color="inherit" sx={{ display: 'block', mb: 1 }}>
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/dmca" color="inherit" sx={{ display: 'block', mb: 1 }}>
              DMCA
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} AnimeHindiHub. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with ❤️ for anime fans
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 