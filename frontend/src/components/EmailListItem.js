import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import { Schedule as ScheduleIcon } from '@mui/icons-material';

export default function EmailListItem({ email, isSelected, onClick }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ListItem
      button
      selected={isSelected}
      onClick={() => onClick(email)}
      sx={{
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: isSelected ? '#f0f8ff' : 'transparent',
        '&:hover': {
          backgroundColor: '#f5faff',
        },
        '&.Mui-selected': {
          backgroundColor: '#eaf4ff',
          boxShadow: 'inset 0 0 0 1px #cce4ff',
          '&:hover': {
            backgroundColor: '#eaf4ff',
          },
        },
        transition: 'background-color 0.2s ease',
        paddingY: 1.5,
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: '#007aff',
            fontSize: 14,
            fontWeight: 500,
            width: 36,
            height: 36,
            fontFamily: `'SF Pro Text','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto',sans-serif`,
          }}
        >
          {getInitials(email.to)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: isSelected ? 600 : 400,
              color: '#333',
              fontFamily: `'SF Pro Text','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto',sans-serif`,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {email.to}
          </Typography>
        }
        secondary={
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: '#555',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontWeight: isSelected ? 500 : 400,
                fontFamily: `'SF Pro Text','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto',sans-serif`,
              }}
            >
              {email.subject}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#999',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontFamily: `'SF Pro Text','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto',sans-serif`,
              }}
            >
              <ScheduleIcon sx={{ fontSize: 12 }} />
              {formatDate(email.created_at)}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );
}
