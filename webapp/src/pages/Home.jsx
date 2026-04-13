import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';
import destinations, { ADVISORY_LEVELS } from '../data/destinations';
import { getCityCardStyle, getRegionEmoji } from '../utils/cityImages';

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const features = [
  {
    icon: <SecurityIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Safety Alerts',
    description:
      'Get real-time safety alerts and advisories for destinations worldwide.',
  },
  {
    icon: <ExploreIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
    title: 'Destination Guides',
    description:
      'Comprehensive guides with safety ratings, tips, and local insights.',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Community Reports',
    description:
      'Read and share first-hand safety experiences from fellow travellers.',
  },
];

const featuredCities = ['Tokyo', 'Singapore', 'Reykjavik', 'Lisbon', 'Sydney', 'Toronto'];
const featured = destinations.filter((d) => featuredCities.includes(d.city));

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 4, md: 8 },
          px: 2,
          background: 'linear-gradient(135deg, #1565c0 0%, #5e92f3 100%)',
          borderRadius: 4,
          color: 'white',
          mb: 4,
        }}
      >
        <Typography
          variant={isMobile ? 'h4' : 'h2'}
          gutterBottom
          fontWeight={700}
        >
          Travel the World Safely ✈️
        </Typography>
        <Typography
          variant={isMobile ? 'body1' : 'h6'}
          sx={{ maxWidth: 600, mx: 'auto', mb: 3, opacity: 0.9 }}
        >
          Your trusted companion for safe travel planning. Get real-time safety
          information, destination guides, and community-powered insights.
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => navigate('/destinations')}
          >
            Explore Destinations
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: 'white', borderColor: 'white' }}
            onClick={() => navigate('/safety')}
          >
            Safety Tips
          </Button>
        </Stack>
      </Box>

      {/* Features Section */}
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>
        Why Safe Traveller?
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {features.map((feature) => (
          <Grid size={{ xs: 12, md: 4 }} key={feature.title}>
            <Card
              elevation={0}
              sx={{
                textAlign: 'center',
                p: 3,
                height: '100%',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 4 },
              }}
            >
              <CardContent>
                {feature.icon}
                <Typography variant="h6" fontWeight={600} mt={2} mb={1}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Featured Destinations */}
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>
        Featured Destinations
      </Typography>
      <Grid container spacing={3}>
        {featured.map((dest) => {
          const info = ADVISORY_LEVELS[dest.advisory];
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${dest.city}-${dest.country}`}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                }}
                onClick={() => navigate(`/destinations/${slugify(dest.city)}/${slugify(dest.country)}`)}
              >
                <Box
                  sx={{
                    height: 180,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...getCityCardStyle(dest.city, dest.country),
                  }}
                >
                  <Typography variant="h2" sx={{ opacity: 0.6, userSelect: 'none' }}>
                    {getRegionEmoji(dest.country)}
                  </Typography>
                </Box>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {dest.city}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {dest.country} &middot; {dest.region}
                  </Typography>
                  <Chip
                    label={info.label}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      color: info.color,
                      backgroundColor: info.bg,
                      border: '1px solid',
                      borderColor: info.color,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
