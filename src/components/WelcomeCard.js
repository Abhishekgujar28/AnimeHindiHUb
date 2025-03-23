import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  IconButton,
  CardMedia,
  Link
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TelegramIcon from '@mui/icons-material/Telegram';

function WelcomeCard({ onClose }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999,
        backdropFilter: 'blur(5px)',
        p: 2
      }}
    >
      <Card 
        sx={{ 
          maxWidth: 500, 
          width: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          animation: 'fadeInUp 0.6s ease-out',
          '@keyframes fadeInUp': {
            '0%': {
              opacity: 0,
              transform: 'translateY(30px) scale(0.95)'
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0) scale(1)'
            }
          }
        }}
      >
        <IconButton 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8, 
            bgcolor: 'rgba(0,0,0,0.5)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.2)',
            }
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        
        <CardMedia
          component="img"
          height="180"
          image="/welcome-banner.jpg"
          alt="Welcome to AnimeHindiHub"
          sx={{ 
            objectFit: 'cover',
            objectPosition: 'center',
            backgroundColor: '#ffb6c1',
            // dislplay:'none'
            display: { xs: 'none', sm: 'block' }
          }}
        />
        
        <CardContent sx={{ p: 3 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: '#ffb6c1',
              textAlign: 'center',
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Welcome to AnimeHindiHub
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph 
            sx={{ 
              textAlign: 'center',
              mb: 3
            }}
          >
            Your ultimate destination for Hindi dubbed anime movies and series. 
            Find your favorite anime content in high quality with Hindi audio!
          </Typography>
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="https://t.me/Animehindi_Hub4all"
              target="_blank"
              rel="noopener"
              startIcon={<TelegramIcon />}
              sx={{ 
                bgcolor: '#0088cc',
                color: '#fff',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                '&:hover': {
                  bgcolor: '#0077b5',
                },
                borderRadius: 2
              }}
            >
              Follow on Telegram
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default WelcomeCard; 