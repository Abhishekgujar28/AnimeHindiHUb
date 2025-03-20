import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function SeriesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Anime Series
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary">
        This page is under construction. Coming soon!
      </Typography>
    </Container>
  );
}

export default SeriesPage; 