import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Divider,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LinkIcon from '@mui/icons-material/Link';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HighQualityIcon from '@mui/icons-material/HighQuality';

function AdminAddEpisodePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    animeId: '',
    title: '',
    number: 1,
    description: '',
    thumbnail: '',
    videoUrl: '',
    downloadUrl: '',
    duration: '23 min',
    quality: '1080p',
    fileSize: '400MB',
  });
  
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    // In a real app, fetch the anime list from the API
    // const fetchAnimeList = async () => {
    //   try {
    //     const response = await axios.get('/api/anime');
    //     setAnimeList(response.data);
    //   } catch (error) {
    //     console.error('Error fetching anime list:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    
    // Simulated anime list for demo purposes
    setTimeout(() => {
      setAnimeList([
        { id: 1, title: 'Your Lie in April' },
        { id: 2, title: 'Demon Slayer' },
        { id: 3, title: 'Attack on Titan' },
        { id: 4, title: 'One Punch Man' },
        { id: 5, title: 'My Hero Academia' },
        { id: 7, title: 'Jujutsu Kaisen' },
        { id: 8, title: 'Fullmetal Alchemist: Brotherhood' },
      ]);
      setLoading(false);
    }, 800);
    
    // fetchAnimeList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.animeId) errors.animeId = 'Please select an anime';
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.number || formData.number < 1) errors.number = 'Valid episode number is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.thumbnail.trim()) errors.thumbnail = 'Thumbnail URL is required';
    if (!formData.videoUrl.trim()) errors.videoUrl = 'Video URL is required';
    if (!formData.downloadUrl.trim()) errors.downloadUrl = 'Download URL is required';
    if (!formData.duration.trim()) errors.duration = 'Duration is required';
    if (!formData.quality.trim()) errors.quality = 'Quality is required';
    if (!formData.fileSize.trim()) errors.fileSize = 'File size is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please fix the errors in the form',
        severity: 'error'
      });
      return;
    }
    
    try {
      // In a real app, you would send this to your API
      // const response = await axios.post('/api/admin/episodes', formData);
      
      // For demo purposes, we're just simulating a successful response
      console.log('Episode data to be submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Episode added successfully!',
        severity: 'success'
      });
      
      // Reset form or redirect
      setTimeout(() => {
        // Reset form for adding another episode for the same anime
        setFormData({
          ...formData,
          title: `Episode ${formData.number + 1}: `,
          number: formData.number + 1,
          description: '',
          thumbnail: '',
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error adding episode:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add episode. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const handleAnimeChange = (e) => {
    const animeId = e.target.value;
    setFormData({
      ...formData,
      animeId,
      title: `Episode ${formData.number}: `,
    });
    
    if (formErrors.animeId) {
      setFormErrors({
        ...formErrors,
        animeId: ''
      });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#ffb6c1' }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, bgcolor: '#1e1e1e' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/admin')}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <VideoLibraryIcon sx={{ mr: 1, color: '#ffb6c1' }} />
            Add New Episode
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {/* Select Anime */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ffb6c1' }}>
                Select Anime
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!formErrors.animeId}>
                <InputLabel id="anime-label">Anime</InputLabel>
                <Select
                  labelId="anime-label"
                  name="animeId"
                  value={formData.animeId}
                  onChange={handleAnimeChange}
                  label="Anime"
                >
                  {animeList.map((anime) => (
                    <MenuItem key={anime.id} value={anime.id}>
                      {anime.title}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.animeId && <FormHelperText>{formErrors.animeId}</FormHelperText>}
              </FormControl>
            </Grid>
            
            {/* Episode Information */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ffb6c1' }}>
                Episode Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={8}>
              <TextField
                required
                fullWidth
                label="Episode Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Episode 1: Pilot"
                error={!!formErrors.title}
                helperText={formErrors.title}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Episode Number"
                name="number"
                type="number"
                value={formData.number}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 1 } }}
                error={!!formErrors.number}
                helperText={formErrors.number}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={2}
                error={!!formErrors.description}
                helperText={formErrors.description}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Thumbnail URL"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/images/thumbnail.jpg"
                error={!!formErrors.thumbnail}
                helperText={formErrors.thumbnail}
              />
            </Grid>
            
            {/* Media Information */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ffb6c1' }}>
                Media & Download Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Video URL (Streaming)"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="https://example.com/videos/episode1"
                error={!!formErrors.videoUrl}
                helperText={formErrors.videoUrl}
                InputProps={{
                  startAdornment: <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Download URL"
                name="downloadUrl"
                value={formData.downloadUrl}
                onChange={handleChange}
                placeholder="https://example.com/download/episode1"
                error={!!formErrors.downloadUrl}
                helperText={formErrors.downloadUrl}
                InputProps={{
                  startAdornment: <CloudUploadIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="23 min"
                error={!!formErrors.duration}
                helperText={formErrors.duration}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required error={!!formErrors.quality}>
                <InputLabel id="quality-label">Quality</InputLabel>
                <Select
                  labelId="quality-label"
                  name="quality"
                  value={formData.quality}
                  onChange={handleChange}
                  label="Quality"
                  startAdornment={<HighQualityIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                >
                  <MenuItem value="480p">480p</MenuItem>
                  <MenuItem value="720p">720p</MenuItem>
                  <MenuItem value="1080p">1080p</MenuItem>
                  <MenuItem value="4K">4K</MenuItem>
                </Select>
                {formErrors.quality && <FormHelperText>{formErrors.quality}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="File Size"
                name="fileSize"
                value={formData.fileSize}
                onChange={handleChange}
                placeholder="400MB"
                error={!!formErrors.fileSize}
                helperText={formErrors.fileSize}
              />
            </Grid>
            
            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                sx={{ 
                  py: 1.5,
                  px: 4,
                  bgcolor: '#ffb6c1',
                  color: '#000',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: '#ff99a8',
                  }
                }}
              >
                Save Episode
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/admin/add-anime')}
          sx={{ mt: 2 }}
        >
          Add New Anime
        </Button>
        
        <Button
          variant="outlined"
          onClick={() => navigate('/admin')}
          sx={{ mt: 2 }}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Container>
  );
}

export default AdminAddEpisodePage; 