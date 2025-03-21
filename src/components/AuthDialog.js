import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { styled } from '@mui/material/styles';

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  '&.Mui-selected': {
    color: '#ffb6c1',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#ffb6c1',
  },
}));

const AuthDialog = ({ open, onClose, onLogin }) => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Form data
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setSuccess('');
  };
  
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };
  
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    // Basic validation
    if (!loginForm.email || !loginForm.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    if (!validateEmail(loginForm.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, we're going to accept any login 
      // In a real app, you would validate credentials with a backend
      
      // Simulate successful login
      const userData = {
        username: loginForm.email.split('@')[0],
        email: loginForm.email,
        id: Math.random().toString(36).substr(2, 9),
      };
      
      onLogin(userData);
      setLoading(false);
      
      // Reset form
      setLoginForm({
        email: '',
        password: '',
      });
    }, 1500);
  };
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    // Basic validation
    if (!registerForm.username || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
    
    if (!validateEmail(registerForm.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, you'd make an API call to register the user
      setSuccess('Registration successful! You can now login.');
      setLoading(false);
      
      // Switch to login tab after successful registration
      setTimeout(() => {
        setTabValue(0);
        setSuccess('');
      }, 2000);
      
      // Reset form
      setRegisterForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }, 1500);
  };
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#1a1a1a',
          borderRadius: 2,
          boxShadow: 24,
        },
      }}
    >
      <DialogContent sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {tabValue === 0 ? 'Welcome Back' : 'Create Account'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <StyledTabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 3 }}
        >
          <StyledTab label="Login" />
          <StyledTab label="Register" />
        </StyledTabs>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        
        {tabValue === 0 ? (
          // Login Tab
          <Box component="form" onSubmit={handleLoginSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={loginForm.password}
              onChange={handleLoginChange}
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.2,
                bgcolor: '#ffb6c1',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#ff99a8',
                },
                mb: 2,
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Login'}
            </Button>
            
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Forgot password?
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR CONTINUE WITH
              </Typography>
            </Divider>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              <IconButton 
                sx={{ 
                  bgcolor: 'rgba(219, 68, 55, 0.1)', 
                  '&:hover': { bgcolor: 'rgba(219, 68, 55, 0.2)' },
                  p: 1,
                }}
              >
                <GoogleIcon sx={{ color: '#DB4437' }} />
              </IconButton>
              <IconButton 
                sx={{ 
                  bgcolor: 'rgba(59, 89, 152, 0.1)', 
                  '&:hover': { bgcolor: 'rgba(59, 89, 152, 0.2)' },
                  p: 1,
                }}
              >
                <FacebookIcon sx={{ color: '#3B5998' }} />
              </IconButton>
              <IconButton 
                sx={{ 
                  bgcolor: 'rgba(29, 161, 242, 0.1)', 
                  '&:hover': { bgcolor: 'rgba(29, 161, 242, 0.2)' },
                  p: 1,
                }}
              >
                <TwitterIcon sx={{ color: '#1DA1F2' }} />
              </IconButton>
            </Box>
          </Box>
        ) : (
          // Register Tab
          <Box component="form" onSubmit={handleRegisterSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={registerForm.username}
              onChange={handleRegisterChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={registerForm.confirmPassword}
              onChange={handleRegisterChange}
              variant="outlined"
              sx={{ mb: 3 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.2,
                bgcolor: '#ffb6c1',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#ff99a8',
                },
                mb: 2,
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Create Account'}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                By registering, you agree to our Terms of Service and Privacy Policy
              </Typography>
            </Box>
            
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR SIGN UP WITH
              </Typography>
            </Divider>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              <IconButton 
                sx={{ 
                  bgcolor: 'rgba(219, 68, 55, 0.1)', 
                  '&:hover': { bgcolor: 'rgba(219, 68, 55, 0.2)' },
                  p: 1,
                }}
              >
                <GoogleIcon sx={{ color: '#DB4437' }} />
              </IconButton>
              <IconButton 
                sx={{ 
                  bgcolor: 'rgba(59, 89, 152, 0.1)', 
                  '&:hover': { bgcolor: 'rgba(59, 89, 152, 0.2)' },
                  p: 1,
                }}
              >
                <FacebookIcon sx={{ color: '#3B5998' }} />
              </IconButton>
              <IconButton 
                sx={{ 
                  bgcolor: 'rgba(29, 161, 242, 0.1)', 
                  '&:hover': { bgcolor: 'rgba(29, 161, 242, 0.2)' },
                  p: 1,
                }}
              >
                <TwitterIcon sx={{ color: '#1DA1F2' }} />
              </IconButton>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog; 