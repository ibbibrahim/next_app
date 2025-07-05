import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  Alert,
  CircularProgress
} from '@mui/material';
import { Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';

export default function ComposeEmailDialog({ open, onClose, onSend }) {
  const [formData, setFormData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
      });
      setErrors({});
    }
  }, [open]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.to.trim()) {
      newErrors.to = 'Recipient is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.to.trim())) {
      newErrors.to = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.body.trim()) {
      newErrors.body = 'Message body is required';
    }
    if (formData.cc && !/\S+@\S+\.\S+/.test(formData.cc.trim())) {
      newErrors.cc = 'Please enter a valid email address';
    }
    if (formData.bcc && !/\S+@\S+\.\S+/.test(formData.bcc.trim())) {
      newErrors.bcc = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSend = async () => {
    if (!validateForm()) return;
    setSending(true);
    try {
      const response = await fetch('http://localhost:3001/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.to.trim(),
          cc: formData.cc.trim() || null,
          bcc: formData.bcc.trim() || null,
          subject: formData.subject.trim(),
          body: formData.body.trim(),
        }),
      });
      const result = await response.json();
      if (result.success) {
        onSend(result.data);
        onClose();
      } else {
        setErrors({ general: result.error || 'Failed to send email' });
      }
    } catch (e) {
      setErrors({ general: 'Failed to connect to server' });
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: '80vh',
          maxHeight: '80vh',
          borderRadius: '10px',
          background: 'linear-gradient(to bottom, #ffffff 0%, #f2f2f5 100%)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #f9f9f9, #e5e5ea)',
          borderBottom: '1px solid #d0d0d0',
          pb: 2,
          fontFamily: `'SF Pro Display','-apple-system','BlinkMacSystemFont','Segoe UI','Roboto',sans-serif`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#333',
          }}
        >
          Compose Email
        </Typography>
        <Button
          onClick={onClose}
          startIcon={<CloseIcon />}
          sx={{
            color: '#666',
            '&:hover': { color: '#3b82f6' }
          }}
        >
          Close
        </Button>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.to}>
              <TextField
                label="To"
                value={formData.to}
                onChange={handleFieldChange('to')}
                placeholder="recipient@example.com"
                error={!!errors.to}
                helperText={errors.to}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                    borderRadius: '6px',
                    border: '1px solid #d0d0d0',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.cc}>
              <TextField
                label="CC"
                value={formData.cc}
                onChange={handleFieldChange('cc')}
                placeholder="cc@example.com"
                error={!!errors.cc}
                helperText={errors.cc}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.bcc}>
              <TextField
                label="BCC"
                value={formData.bcc}
                onChange={handleFieldChange('bcc')}
                placeholder="bcc@example.com"
                error={!!errors.bcc}
                helperText={errors.bcc}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.subject}>
              <TextField
                label="Subject"
                value={formData.subject}
                onChange={handleFieldChange('subject')}
                placeholder="Enter subject..."
                error={!!errors.subject}
                helperText={errors.subject}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.body}>
              <TextField
                label="Message"
                value={formData.body}
                onChange={handleFieldChange('body')}
                placeholder="Type your message here..."
                multiline
                rows={12}
                error={!!errors.body}
                helperText={errors.body}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                    alignItems: 'flex-start',
                  },
                }}
              />
            </FormControl>
          </Grid>
          {errors.general && (
            <Grid item xs={12}>
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.general}
              </Alert>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          borderTop: '1px solid #d0d0d0',
          justifyContent: 'space-between',
          background: 'linear-gradient(to top, #f2f2f5, #ffffff)',
        }}
      >
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSend}
          variant="contained"
          startIcon={sending ? <CircularProgress size={16} /> : <SendIcon />}
          disabled={sending}
          sx={{
            minWidth: 100,
            background: 'linear-gradient(to bottom, #4a90e2, #357ab8)',
            boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
            '&:hover': {
              background: 'linear-gradient(to bottom, #5aa0f4, #3b82f6)',
            },
          }}
        >
          {sending ? 'Sending...' : 'Send'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
