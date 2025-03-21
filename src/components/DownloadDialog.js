import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  CircularProgress,
  Chip,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ServerIcon from '@mui/icons-material/Dns';
import SpeedIcon from '@mui/icons-material/Speed';
import HdIcon from '@mui/icons-material/Hd';

const qualities = [
  { label: '1080p', value: '1080', icon: <HdIcon sx={{ color: '#4CAF50' }} /> },
  { label: '720p', value: '720', icon: <HdIcon sx={{ color: '#2196F3' }} /> },
  { label: '480p', value: '480', icon: <HdIcon sx={{ color: '#FFC107' }} /> },
];

const servers = [
  {
    name: 'Server 1',
    url: 'https://server1.example.com',
    speed: 'Fast',
    status: 'active',
  },
  {
    name: 'Server 2',
    url: 'https://server2.example.com',
    speed: 'Medium',
    status: 'active',
  },
  {
    name: 'Server 3',
    url: 'https://server3.example.com',
    speed: 'Slow',
    status: 'active',
  },
  {
    name: 'Server 4',
    url: 'https://server4.example.com',
    speed: 'Fast',
    status: 'maintenance',
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`download-tabpanel-${index}`}
      aria-labelledby={`download-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function DownloadDialog({ open, onClose, animeTitle, episodeNumber, quality, downloadUrl }) {
  const [tabValue, setTabValue] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState(quality ? quality.replace('p', '') : '1080');
  const [selectedServer, setSelectedServer] = useState(servers[0]); // Default to first server
  const [downloading, setDownloading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleQualitySelect = (quality) => {
    setSelectedQuality(quality);
  };

  const handleServerSelect = (server) => {
    setSelectedServer(server);
  };

  const handleDirectDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  const handleDownload = async () => {
    if (!selectedServer) return;
    
    setDownloading(true);
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would trigger the actual download
      console.log(`Downloading ${animeTitle} Episode ${episodeNumber} in ${selectedQuality}p from ${selectedServer.name}`);
      
      // If we have a direct download URL from the props, use it
      if (downloadUrl) {
        window.open(downloadUrl, '_blank');
      }
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#1e1e1e',
          color: 'white',
        }
      }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h6" component="div">
          Download {animeTitle}
          {episodeNumber && ` - Episode ${episodeNumber}`}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.7)',
                '&.Mui-selected': {
                  color: '#ffb6c1',
                },
              },
            }}
          >
            <Tab label="Quality" />
            <Tab label="Servers" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <List>
            {qualities.map((quality) => (
              <ListItem key={quality.value} disablePadding>
                <ListItemButton
                  selected={selectedQuality === quality.value}
                  onClick={() => handleQualitySelect(quality.value)}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'rgba(255, 182, 193, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 182, 193, 0.15)',
                      },
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                    {quality.icon}
                  </Box>
                  <ListItemText 
                    primary={quality.label}
                    secondary={`Best for ${quality.value === '1080' ? 'high-end' : quality.value === '720' ? 'mid-range' : 'low-end'} devices`}
                  />
                  {selectedQuality === quality.value && (
                    <Chip 
                      label="Selected" 
                      size="small" 
                      sx={{ 
                        bgcolor: '#ffb6c1',
                        color: '#000',
                        fontWeight: 'bold',
                      }} 
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <List>
            {servers.map((server) => (
              <ListItem key={server.name} disablePadding>
                <ListItemButton
                  selected={selectedServer?.name === server.name}
                  onClick={() => handleServerSelect(server)}
                  disabled={server.status === 'maintenance'}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'rgba(255, 182, 193, 0.1)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 182, 193, 0.15)',
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ServerIcon fontSize="small" />
                        {server.name}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <SpeedIcon fontSize="small" />
                        {server.speed}
                        {server.status === 'maintenance' && (
                          <Chip 
                            label="Maintenance" 
                            size="small" 
                            color="error"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: 'rgba(255,255,255,0.7)',
            '&:hover': {
              color: '#ffb6c1',
            },
          }}
        >
          Cancel
        </Button>
        
        {downloadUrl && (
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDirectDownload}
            sx={{
              bgcolor: '#4CAF50',
              color: '#fff',
              '&:hover': {
                bgcolor: '#45a049',
              },
            }}
          >
            Direct Download
          </Button>
        )}
        
        <Button
          variant="contained"
          startIcon={downloading ? <CircularProgress size={20} /> : <DownloadIcon />}
          onClick={handleDownload}
          disabled={!selectedServer || downloading || selectedServer.status === 'maintenance'}
          sx={{
            bgcolor: '#ffb6c1',
            color: '#000',
            '&:hover': {
              bgcolor: '#ff99a8',
            },
          }}
        >
          {downloading ? 'Downloading...' : 'Download'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DownloadDialog; 