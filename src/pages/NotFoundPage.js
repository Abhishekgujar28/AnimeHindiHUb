import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        sx={{
          p: 5,
          textAlign: 'center',
          bgcolor: '#1e1e1e',
          borderRadius: 2,
          border: '1px solid rgba(255, 182, 193, 0.2)',
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: '#ffb6c1', mb: 2 }} />
        
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          404
        </Typography>
        
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Page Not Found
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL or navigate back to the homepage.
        </Typography>
        
        <Box
          sx={{
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, rgba(255,182,193,0) 0%, rgba(255,182,193,1) 50%, rgba(255,182,193,0) 100%)',
            my: 4,
          }}
        />
        
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              bgcolor: '#ffb6c1',
              color: '#000',
              fontWeight: 'bold',
              px: 4,
              py: 1,
              '&:hover': {
                bgcolor: '#ff99a8',
              },
            }}
          >
            Back to Home
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            startIcon={<SearchIcon />}
            onClick={() => navigate('/')}
            sx={{
              borderColor: 'rgba(255, 182, 193, 0.5)',
              color: '#fff',
              px: 4,
              py: 1,
              '&:hover': {
                borderColor: '#ffb6c1',
                bgcolor: 'rgba(255, 182, 193, 0.1)',
              },
            }}
          >
            Search Anime
          </Button>
        </Stack>
        
        <Typography variant="body2" sx={{ mt: 5, color: 'text.secondary' }}>
          Looking for something to watch? Check out our trending or top-rated anime!
        </Typography>
      </Paper>
    </Container>
  );
}

export default NotFoundPage; 