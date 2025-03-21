import React, { useState } from 'react';
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
  Chip,
  OutlinedInput,
  FormHelperText,
  Alert,
  Snackbar,
  Divider,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import MovieIcon from '@mui/icons-material/Movie';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Available genres for selection
const genres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 
  'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 
  'Supernatural', 'Thriller', 'School', 'Music', 'Historical',
  'Military', 'Shounen', 'Shoujo', 'Seinen', 'Josei', 'Award Winning'
];

// Available studios for selection
const studios = [
  'A-1 Pictures', 'Bones', 'MAPPA', 'Madhouse', 'Kyoto Animation', 
  'Wit Studio', 'ufotable', 'Studio Ghibli', 'Sunrise', 'Production I.G',
  'J.C.Staff', 'Toei Animation', 'Trigger', 'Shaft', 'Pierrot'
];

function AdminAddAnimePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'TV',
    episodes: 1,
    status: 'Completed',
    aired: '',
    cover: '',
    banner: '',
    genres: [],
    studios: [],
    year: new Date().getFullYear(),
    season: 'Spring',
    duration: '',
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

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

  const handleMultiSelectChange = (event, fieldName) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      [fieldName]: typeof value === 'string' ? value.split(',') : value,
    });
    
    // Clear error for this field
    if (formErrors[fieldName]) {
      setFormErrors({
        ...formErrors,
        [fieldName]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.cover.trim()) errors.cover = 'Cover image URL is required';
    if (formData.genres.length === 0) errors.genres = 'At least one genre is required';
    if (formData.studios.length === 0) errors.studios = 'At least one studio is required';
    if (!formData.duration.trim()) errors.duration = 'Duration is required';
    
    // Episode validation for TV type
    if (formData.type === 'TV' && (!formData.episodes || formData.episodes < 1)) {
      errors.episodes = 'Valid number of episodes is required';
    }
    
    // Year validation
    const currentYear = new Date().getFullYear();
    if (!formData.year || formData.year < 1900 || formData.year > currentYear + 2) {
      errors.year = `Year must be between 1900 and ${currentYear + 2}`;
    }
    
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
      // const response = await axios.post('/api/admin/anime', formData);
      
      // For demo purposes, we're just simulating a successful response
      console.log('Anime data to be submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Anime added successfully!',
        severity: 'success'
      });
      
      // Reset form or redirect
      setTimeout(() => {
        // Navigate to admin dashboard or anime list
        navigate('/admin');
      }, 2000);
      
    } catch (error) {
      console.error('Error adding anime:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add anime. Please try again.',
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
            <MovieIcon sx={{ mr: 1, color: '#ffb6c1' }} />
            Add New Anime
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ffb6c1' }}>
                Basic Information
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!formErrors.title}
                helperText={formErrors.title}
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
                rows={4}
                error={!!formErrors.description}
                helperText={formErrors.description}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                  labelId="type-label"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  label="Type"
                >
                  <MenuItem value="TV">TV</MenuItem>
                  <MenuItem value="Movie">Movie</MenuItem>
                  <MenuItem value="OVA">OVA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Episodes"
                name="episodes"
                type="number"
                value={formData.episodes}
                onChange={handleChange}
                disabled={formData.type === 'Movie'}
                InputProps={{ inputProps: { min: 1 } }}
                error={!!formErrors.episodes}
                helperText={formErrors.episodes}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Upcoming">Upcoming</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Aired Date"
                name="aired"
                placeholder="e.g., Apr 2019 to Sep 2019"
                value={formData.aired}
                onChange={handleChange}
              />
            </Grid>
            
            {/* Images Section */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ffb6c1' }}>
                Images
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Cover Image URL"
                name="cover"
                value={formData.cover}
                onChange={handleChange}
                error={!!formErrors.cover}
                helperText={formErrors.cover}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Banner Image URL"
                name="banner"
                value={formData.banner}
                onChange={handleChange}
              />
            </Grid>
            
            {/* Metadata Section */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ffb6c1' }}>
                Metadata
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!formErrors.genres}>
                <InputLabel id="genres-label">Genres</InputLabel>
                <Select
                  labelId="genres-label"
                  multiple
                  value={formData.genres}
                  onChange={(e) => handleMultiSelectChange(e, 'genres')}
                  input={<OutlinedInput label="Genres" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.genres && <FormHelperText>{formErrors.genres}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!formErrors.studios}>
                <InputLabel id="studios-label">Studios</InputLabel>
                <Select
                  labelId="studios-label"
                  multiple
                  value={formData.studios}
                  onChange={(e) => handleMultiSelectChange(e, 'studios')}
                  input={<OutlinedInput label="Studios" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {studios.map((studio) => (
                    <MenuItem key={studio} value={studio}>
                      {studio}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.studios && <FormHelperText>{formErrors.studios}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                InputProps={{ inputProps: { min: 1900, max: new Date().getFullYear() + 2 } }}
                error={!!formErrors.year}
                helperText={formErrors.year}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="season-label">Season</InputLabel>
                <Select
                  labelId="season-label"
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  label="Season"
                >
                  <MenuItem value="Winter">Winter</MenuItem>
                  <MenuItem value="Spring">Spring</MenuItem>
                  <MenuItem value="Summer">Summer</MenuItem>
                  <MenuItem value="Fall">Fall</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Duration"
                name="duration"
                placeholder="e.g., 23 min per episode"
                value={formData.duration}
                onChange={handleChange}
                error={!!formErrors.duration}
                helperText={formErrors.duration}
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
                Save Anime
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
      
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          component="a"
          href="/admin/add-episode"
          startIcon={<AddIcon />}
          sx={{ mt: 2 }}
        >
          Add Episodes
        </Button>
      </Box>
      
      {/* Help section for adding anime after deployment */}
      <Box mt={8} p={3} sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#ffb6c1', fontWeight: 'bold' }}>
          How to Add Anime After Deployment
        </Typography>
        
        <Typography variant="body2" paragraph>
          To add anime content after the site is deployed, you have two options:
        </Typography>
        
        <Typography component="div" variant="body2" sx={{ ml: 2, mb: 2 }}>
          <ol>
            <li>
              <strong>Using this Admin Panel:</strong> Fill out the form above and submit. The new anime will be added to the database.
            </li>
            <li>
              <strong>Edit JSON directly:</strong> If you have direct access to the server files, you can:
              <ul style={{ marginTop: '8px' }}>
                <li>Navigate to <code>src/data/animeData.json</code></li>
                <li>Add a new entry to the <code>animeList</code> array following the existing format</li>
                <li>Make sure to include all required fields: id, title, description, type, episodes, etc.</li>
                <li>After saving, rebuild/redeploy the application for changes to take effect</li>
              </ul>
            </li>
          </ol>
        </Typography>
        
        <Typography variant="body2" paragraph>
          <strong>Important:</strong> Always maintain the JSON structure when adding new anime. Make sure each anime has a unique ID and all required fields.
        </Typography>
      </Box>
    </Container>
  );
}

export default AdminAddAnimePage; 