import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';

function AboutPage() {
  // Character data
  const characters = [
    {
      name: 'Kousei Arima',
      role: 'Protagonist',
      description: 'A former piano prodigy who lost his ability to hear the piano after his mother\'s death.',
      image: 'https://m.media-amazon.com/images/M/MV5BYzM0ZjlkZTctY2VkYy00ZTY5LWI5ZjgtMDlmZDZiYzQzODYwXkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_.jpg',
    },
    {
      name: 'Kaori Miyazono',
      role: 'Deuteragonist',
      description: 'A free-spirited violinist who helps Kousei rediscover his love for music.',
      image: 'https://m.media-amazon.com/images/M/MV5BYzM0ZjlkZTctY2VkYy00ZTY5LWI5ZjgtMDlmZDZiYzQzODYwXkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_.jpg',
    },
    {
      name: 'Tsubaki Sawabe',
      role: 'Supporting Character',
      description: 'Kousei\'s childhood friend who has feelings for him.',
      image: 'https://m.media-amazon.com/images/M/MV5BYzM0ZjlkZTctY2VkYy00ZTY5LWI5ZjgtMDlmZDZiYzQzODYwXkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_.jpg',
    },
    {
      name: 'Ryota Watari',
      role: 'Supporting Character',
      description: 'Kousei\'s friend and a soccer player who Kaori initially pretends to like.',
      image: 'https://m.media-amazon.com/images/M/MV5BYzM0ZjlkZTctY2VkYy00ZTY5LWI5ZjgtMDlmZDZiYzQzODYwXkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_.jpg',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        About Your Lie in April
      </Typography>

      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 6,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(https://m.media-amazon.com/images/M/MV5BYThlNWY5ZDgtYTIxNC00ZjdiLWJmNGUtMDFjMDlmZTAzOWFiXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg)`,
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.6)',
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            Your Lie in April
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            四月は君の嘘 (Shigatsu wa Kimi no Uso)
          </Typography>
        </Container>
      </Paper>

      {/* Synopsis Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Synopsis
        </Typography>
        <Typography paragraph>
          Your Lie in April follows the story of Kousei Arima, a former child prodigy who dominated the world of piano competitions until his mother's sudden death led to a mental breakdown during a recital. As a result, Kousei is no longer able to hear the sound of his piano, even though his hearing is otherwise perfect, and he abandons playing the piano.
        </Typography>
        <Typography paragraph>
          Two years later, Kousei still avoids the piano and lives a colorless life alongside his childhood friends Tsubaki and Watari. However, everything changes when Kousei meets the beautiful violinist Kaori Miyazono, who stirs up his world and sets him on a journey to face music again. Through a series of events, Kaori helps Kousei return to the music world and shows him that music should be played with emotion and feeling, rather than focusing on technical perfection.
        </Typography>
        <Typography paragraph>
          As the story progresses, Kousei learns more about Kaori and discovers her secret, which changes his life forever. The series explores themes of love, loss, music, and the courage to move forward.
        </Typography>
      </Box>

      {/* Characters Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
          Main Characters
        </Typography>
        <Grid container spacing={3}>
          {characters.map((character) => (
            <Grid item key={character.name} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={character.image}
                  alt={character.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {character.name}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {character.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {character.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Production Info Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Production Information
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem divider>
                <ListItemText
                  primary="Original Work"
                  secondary="Manga by Naoshi Arakawa"
                />
              </ListItem>
              <ListItem divider>
                <ListItemText
                  primary="Studio"
                  secondary="A-1 Pictures"
                />
              </ListItem>
              <ListItem divider>
                <ListItemText
                  primary="Director"
                  secondary="Kyohei Ishiguro"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Music"
                  secondary="Masaru Yokoyama"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              <ListItem divider>
                <ListItemText
                  primary="Episodes"
                  secondary="22 + 1 OVA"
                />
              </ListItem>
              <ListItem divider>
                <ListItemText
                  primary="Aired"
                  secondary="October 2014 - March 2015"
                />
              </ListItem>
              <ListItem divider>
                <ListItemText
                  primary="Genres"
                  secondary="Drama, Music, Romance, School, Shounen"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Rating"
                  secondary="8.87/10 (MyAnimeList)"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>

      {/* Disclaimer Section */}
      <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Disclaimer
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This website is created for educational purposes only. All content, images, and information related to "Your Lie in April" are the property of their respective owners. We do not claim ownership of any copyrighted material.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          "Your Lie in April" (四月は君の嘘, Shigatsu wa Kimi no Uso) is a manga series written and illustrated by Naoshi Arakawa, and the anime adaptation was produced by A-1 Pictures.
        </Typography>
      </Box>
    </Container>
  );
}

export default AboutPage; 