import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const stats = [
  { label: 'Countries Covered', value: '195+', icon: <PublicIcon /> },
  { label: 'Safety Reports', value: '50K+', icon: <SecurityIcon /> },
  { label: 'Active Travellers', value: '1M+', icon: <PeopleIcon /> },
  { label: 'Verified Tips', value: '25K+', icon: <VerifiedUserIcon /> },
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    bio: 'Former diplomat with 15 years of international security experience.',
  },
  {
    name: 'Marcus Rivera',
    role: 'Head of Safety Research',
    bio: 'Travel security analyst who has visited over 100 countries.',
  },
  {
    name: 'Aisha Patel',
    role: 'Community Lead',
    bio: 'Passionate about connecting travellers and sharing safety knowledge.',
  },
];

export default function About() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        About Safe Traveller
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Empowering travellers with the knowledge to explore the world safely
      </Typography>

      {/* Mission */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          p: { xs: 3, md: 4 },
          background: 'linear-gradient(135deg, #1565c0 0%, #5e92f3 100%)',
          color: 'white',
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={2}>
          Our Mission
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 700 }}>
          Safe Traveller was founded with a simple but powerful mission: to make
          world travel safer for everyone. We combine official safety data,
          community-sourced reports, and expert analysis to give travellers the
          most comprehensive and up-to-date safety information available.
        </Typography>
      </Card>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat) => (
          <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
            <Card
              elevation={0}
              sx={{
                textAlign: 'center',
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent>
                <Box sx={{ color: 'primary.main', mb: 1 }}>{stat.icon}</Box>
                <Typography variant="h4" fontWeight={700} color="primary">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Team */}
      <Typography variant="h5" fontWeight={700} mb={3}>
        Our Team
      </Typography>
      <Grid container spacing={3}>
        {team.map((member) => (
          <Grid size={{ xs: 12, sm: 4 }} key={member.name}>
            <Card
              elevation={0}
              sx={{
                textAlign: 'center',
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
              }}
            >
              <CardContent>
                <Stack alignItems="center" spacing={2}>
                  <Avatar
                    sx={{
                      width: 72,
                      height: 72,
                      bgcolor: 'primary.light',
                      fontSize: 28,
                    }}
                  >
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="primary" fontWeight={500}>
                      {member.role}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={1}
                    >
                      {member.bio}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
