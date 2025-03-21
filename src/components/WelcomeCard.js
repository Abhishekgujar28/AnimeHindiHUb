import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Link,
  useMediaQuery,
  Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useTheme } from '@mui/material/styles';

const WelcomeCard = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Check if the user has seen the card before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
      // Show the card after a short delay
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Set flag in localStorage to remember the user has seen the card
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  if (!open) return null;

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          p: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: '100%',
            mx: 'auto',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <CardContent sx={{ position: 'relative', p: 3 }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'text.secondary',
              }}
            >
              <CloseIcon />
            </IconButton>
            
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', pr: 4 }}>
              Welcome to AnimeHindiHub!
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3 }}>
              Your #1 source for Hindi dubbed anime. Get the latest updates and exclusive content by following our Telegram channel!
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <Button
                variant="contained"
                startIcon={<TelegramIcon />}
                component={Link}
                href="https://t.me/animehindihub"
                target="_blank"
                rel="noopener"
                sx={{
                  bgcolor: '#0088cc',
                  '&:hover': {
                    bgcolor: '#006699',
                  },
                  px: 3,
                }}
              >
                Follow on Telegram
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Slide>
  );
};

export default WelcomeCard; 