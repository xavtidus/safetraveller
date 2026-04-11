import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const contactInfo = [
  {
    icon: <EmailIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
    title: 'Email',
    detail: 'support@safetraveller.com',
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
    title: 'Phone',
    detail: '+1 (555) 234-5678',
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 32, color: 'primary.main' }} />,
    title: 'Address',
    detail: '123 Safety Lane, Travel City, TC 10001',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [snackbar, setSnackbar] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbar(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Contact Us
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Have questions or feedback? We&apos;d love to hear from you.
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Send us a message
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Info */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Stack spacing={3}>
            {contactInfo.map((info) => (
              <Card
                key={info.title}
                elevation={0}
                sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {info.icon}
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {info.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {info.detail}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnackbar(false)}>
          Message sent successfully! We&apos;ll get back to you soon.
        </Alert>
      </Snackbar>
    </Box>
  );
}
