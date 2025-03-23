import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
  Avatar,
  ListItemIcon,
  IconButton,
} from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import QrCodeIcon from '@mui/icons-material/QrCode';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
// Import the actual QR code from assets folder
import QRCode from '../assets/qrcode.jpg';
// Remove the placeholder QR code URL
// const QRCode = "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg";

function AboutPage() {
  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', py: 5 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Paper 
          sx={{ 
            bgcolor: 'rgba(255,255,255,0.05)', 
            p: { xs: 3, md: 5 }, 
            mb: 5,
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              right: 0, 
              width: { xs: '100%', md: '50%' }, 
              height: '100%',
              opacity: 0.1,
              background: 'linear-gradient(135deg, transparent 0%, #ffb6c1 100%)',
              display: { xs: 'none', md: 'block' },
            }} 
          />
          
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InfoIcon sx={{ color: '#ffb6c1', mr: 2, fontSize: 36 }} />
                <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                  About Us
                </Typography>
              </Box>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                Your ultimate destination for high-quality anime downloads
              </Typography>
              <Typography paragraph>
                AnimeHindiHub was created with a simple mission: to provide anime lovers everywhere with a 
                convenient and reliable platform to download their favorite anime series and movies in 
                the highest quality possible with Hindi dubbing.
              </Typography>
              <Typography paragraph>
                What started as a small passion project has grown into a thriving community with thousands 
                of dedicated users. We're committed to curating the best collection of anime content and 
                delivering a seamless experience for all anime enthusiasts.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Contact Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
            Connect With Us
          </Typography>
          <Paper 
            elevation={3}
            sx={{ 
              p: 4, 
              textAlign: 'center',
              borderRadius: 2,
              bgcolor: '#1e1e1e',
            }}
          >
            <Typography variant="body1" paragraph>
              Have questions or suggestions? We'd love to hear from you!
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* <IconButton
                  size="large"
                  sx={{ 
                    color: '#ffb6c1',
                    bgcolor: 'rgba(255,182,193,0.1)',
                    mb: 1,
                    '&:hover': {
                      bgcolor: 'rgba(255,182,193,0.2)',
                    }
                  }}
                >
                  <EmailIcon fontSize="large" />
                </IconButton> */}
                {/* <Typography variant="body2">
                  info@animehindhub.com
                </Typography> */}
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton
                  href="https://t.me/animehindhub"
                  target="_blank"
                  rel="noopener"
                  size="large"
                  sx={{ 
                    color: '#0088cc',
                    bgcolor: 'rgba(0,136,204,0.1)',
                    mb: 1,
                    '&:hover': {
                      bgcolor: 'rgba(0,136,204,0.2)',
                    }
                  }}
                >
                  <TelegramIcon fontSize="large" />
                </IconButton>
                <Typography variant="body2">
                  Join our Telegram
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* <IconButton
                  size="large"
                  sx={{ 
                    color: '#E1306C',
                    bgcolor: 'rgba(225,48,108,0.1)',
                    mb: 1,
                    '&:hover': {
                      bgcolor: 'rgba(225,48,108,0.2)',
                    }
                  }}
                >
                  <InstagramIcon fontSize="large" />
                </IconButton> */}
                {/* <Typography variant="body2">
                  @animehindhub
                </Typography> */}
              </Box>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Join our community for updates, discussions, and more!
            </Typography>
            
            <Button
              variant="contained"
              href="https://t.me/Animehindi_Hub4all"
              target="_blank" 
              rel="noopener"
              startIcon={<TelegramIcon />}
              sx={{ 
                bgcolor: '#0088cc',
                '&:hover': {
                  bgcolor: '#0077b5',
                }
              }}
            >
              Join Our Telegram Channel
            </Button>
          </Paper>
        </Box>
        
        {/* Features Section */}
        <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 'bold' }}>
          What We Offer
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'rgba(255,255,255,0.05)', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#ffb6c1', mr: 2 }}>
                    <LocalMoviesIcon />
                  </Avatar>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                    Vast Library
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Access thousands of anime titles from classics to the latest releases, all in one place.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'rgba(255,255,255,0.05)', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#3f51b5', mr: 2 }}>
                    <CloudDownloadIcon />
                  </Avatar>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                    Quality Downloads
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Enjoy your favorite anime in high definition with multiple quality options up to 1080p.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'rgba(255,255,255,0.05)', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#e91e63', mr: 2 }}>
                    <WhatshotIcon />
                  </Avatar>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                    Latest Releases
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Stay up-to-date with the newest anime releases, updated regularly to bring you fresh content.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Donation Section */}
        <Paper 
          sx={{ 
            bgcolor: 'rgba(255,255,255,0.05)', 
            p: 4, 
            mb: 4, 
            borderRadius: 2,
            background: 'linear-gradient(145deg, rgba(255,182,193,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <QrCodeIcon sx={{ color: '#ffb6c1', mr: 2, fontSize: 36 }} />
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                  Support Our Project
                </Typography>
              </Box>
              
              <Typography paragraph sx={{ mb: 3 }}>
                AnimeHindiHub is maintained by a small team of passionate anime enthusiasts. We're committed to keeping 
                this platform ad-free and accessible to everyone. Your donations help us cover server costs, 
                development expenses, and enable us to add more content and features.
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <MovieIcon sx={{ color: '#e91e63' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Keep the servers running" 
                    secondary="Hosting thousands of high-quality anime files requires significant server resources"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CodeIcon sx={{ color: '#e91e63' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Support new features" 
                    secondary="Help us develop new features like mobile apps, better recommendation systems, and more"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CloudDownloadIcon sx={{ color: '#e91e63' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Expand our collection" 
                    secondary="Your support helps us add more anime titles and keep our library up-to-date"
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
              <Card 
                sx={{ 
                  maxWidth: 300, 
                  mx: 'auto', 
                  bgcolor: '#ffffff', 
                  p: 3, 
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 2,
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    mb: 2, 
                    color: '#000', 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <QrCodeIcon sx={{ mr: 1, color: '#e91e63' }} />
                  Donate Via UPI
                </Typography>
                
                <Box 
                  sx={{ 
                    position: 'relative',
                    border: '1px solid rgba(0,0,0,0.08)',
                    p: 2,
                    borderRadius: 1,
                    mb: 2,
                    bgcolor: '#f8f8f8',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={QRCode}
                    alt="Donation QR Code"
                    sx={{ 
                      width: '100%', 
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: 1,
                    }}
                  />
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ color: '#000', fontWeight: 'bold' }}>
                    Scan to Donate
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)', mt: 0.5 }}>
                    Thank you for your support!
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Thank You Note */}
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h6" component="p" gutterBottom>
            Thank You For Being Part Of Our Community!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We're constantly working to improve AnimeHindiHub and provide you with the best anime download experience.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutPage; 