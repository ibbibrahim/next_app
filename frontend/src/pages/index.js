import { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  Fab,
  Alert,
} from '@mui/material';
import { Search as SearchIcon, Send as SendIcon } from '@mui/icons-material';

import useDebounce from '../hooks/useDebounce';
import ComposeEmailDialog from '../components/ComposeEmailDialog';
import EmailListItem from '../components/EmailListItem';
import EmailDetail from '../components/EmailDetail';

export default function Home() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchEmails = async (searchText = '') => {
    try {
      setLoading(true);
      setError(null);
      let url = 'http://localhost:3001/api/emails';
      if (searchText.trim()) {
        url = `http://localhost:3001/api/emails/search/${encodeURIComponent(searchText.trim())}`;
      }
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        setEmails(result.data);
      } else {
        setError('Failed to fetch emails');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const searchEmails = async (searchText) => {
    try {
      setSearchLoading(true);
      setError(null);
      const url = `http://localhost:3001/api/emails/search/${encodeURIComponent(searchText.trim())}`;
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        setEmails(result.data);
      } else {
        setError('Failed to search emails');
      }
    } catch (err) {
      setError('Failed to search emails');
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      searchEmails(debouncedSearchQuery);
    } else if (debouncedSearchQuery === '') {
      fetchEmails();
    }
  }, [debouncedSearchQuery]);

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleComposeOpen = () => {
    setComposeOpen(true);
  };

  const handleComposeClose = () => {
    setComposeOpen(false);
  };

  const handleEmailSent = (newEmail) => {
    setEmails((prev) => [newEmail, ...prev]);
    setSelectedEmail(newEmail);
  };

  const drawerWidth = 320;

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        position: 'relative',
        background: 'linear-gradient(to bottom, #e7ebf0 0%, #ffffff 100%)',
      }}
    >
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid #d0d0d0',
            background: 'linear-gradient(to bottom, #fdfdfd, #f0f0f3)',
            boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          },
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #d0d0d0',
            background: 'linear-gradient(to bottom, #f9f9f9, #eaeaea)',
            boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#333',
              mb: 2,
              fontFamily: `'SF Pro Display','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto',sans-serif`,
            }}
          >
            Inbox
          </Typography>

          {/* Search Bar */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search emails..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#666' }} />
                </InputAdornment>
              ),
              endAdornment: searchLoading && (
                <InputAdornment position="end">
                  <CircularProgress size={20} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                borderRadius: '6px',
                border: '1px solid #d0d0d0',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                '&:hover fieldset': {
                  borderColor: '#3b82f6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b82f6',
                  boxShadow: '0 0 0 2px rgba(59,130,246,0.2)',
                },
              },
            }}
          />

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 1, color: '#666' }}
          >
            {emails.length} emails
          </Typography>
        </Box>

        {/* Email List */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: '#ffffff',
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ m: 2 }}>
              {error}
            </Alert>
          ) : emails.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                {searchQuery
                  ? 'No emails found matching your search'
                  : 'No emails found'}
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {emails.map((email) => (
                <EmailListItem
                  key={email.id}
                  email={email}
                  isSelected={selectedEmail?.id === email.id}
                  onClick={handleEmailSelect}
                />
              ))}
            </List>
          )}
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#fdfdfd',
          borderLeft: '1px solid #d0d0d0',
        }}
      >
        <EmailDetail email={selectedEmail} />
      </Box>

      {/* Compose Button */}
      <Fab
        color="primary"
        aria-label="compose email"
        onClick={handleComposeOpen}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1000,
          background: 'linear-gradient(to bottom, #4a90e2, #357ab8)',
          boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
          '&:hover': {
            background: 'linear-gradient(to bottom, #5aa0f4, #3b82f6)',
          },
        }}
      >
        <SendIcon />
      </Fab>

      {/* Compose Dialog */}
      <ComposeEmailDialog
        open={composeOpen}
        onClose={handleComposeClose}
        onSend={handleEmailSent}
      />
    </Box>
  );
}
