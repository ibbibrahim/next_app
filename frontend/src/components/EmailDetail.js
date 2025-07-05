import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  IconButton
} from '@mui/material';
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Reply as ReplyIcon,
  ReplyAll as ReplyAllIcon,
  Forward as ForwardIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

export default function EmailDetail({ email, onDelete }) {
  if (!email) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#666',
          background: 'linear-gradient(to bottom, #f9f9f9, #e5e5ea)',
        }}
      >
        <EmailIcon sx={{ fontSize: 64, mb: 2, color: '#bbb' }} />
        <Typography
          variant="h6"
          sx={{
            color: '#888',
            fontFamily: `'SF Pro Display','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto',sans-serif`,
          }}
        >
          Select an email to view
        </Typography>
      </Box>
    );
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString();

  return (
    <Box
      sx={{
        p: 3,
        height: '100%',
        overflow: 'auto',
        background: 'linear-gradient(to bottom, #f9f9f9, #e5e5ea)',
      }}
    >
      <Paper
        sx={{
          p: 3,
          height: '100%',
          borderRadius: '12px',
          background: '#fff',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          border: '1px solid #d0d0d0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header: Subject + Icon Toolbar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: '#333',
              fontFamily: `'SF Pro Display','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto',sans-serif`,
            }}
          >
            {email.subject}
          </Typography>
          <Box>
            <IconButton size="small">
              <ReplyIcon />
            </IconButton>
            <IconButton size="small">
              <ReplyAllIcon />
            </IconButton>
            <IconButton size="small">
              <ForwardIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(email.id)}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        </Box>

        {/* Metadata */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <PersonIcon sx={{ color: '#888' }} />
              <Typography
                variant="body2"
                sx={{
                  color: '#555',
                  fontFamily: `'SF Pro Text','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto',sans-serif`,
                }}
              >
                To: {email.to}
              </Typography>
            </Box>
            {email.cc && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#555' }}
                >
                  CC: {email.cc}
                </Typography>
              </Box>
            )}
            {email.bcc && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#555' }}
                >
                  BCC: {email.bcc}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ScheduleIcon sx={{ color: '#888' }} />
              <Typography
                variant="body2"
                sx={{
                  color: '#555',
                  fontFamily: `'SF Pro Text','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto',sans-serif`,
                }}
              >
                {formatDate(email.created_at)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#e0e0e0', mb: 2 }} />

        {/* Body */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: '#333',
              fontFamily: `'SF Pro Text','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto',sans-serif`,
            }}
          >
            {email.body}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
