import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  InputAdornment,
  Rating,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const destinations = [
  {
    name: 'Tokyo, Japan',
    region: 'Asia',
    safety: 5,
    tags: ['Low Crime', 'Clean', 'Efficient Transit'],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop',
    description: 'One of the safest major cities in the world with extremely low crime rates.',
  },
  {
    name: 'Reykjavik, Iceland',
    region: 'Europe',
    safety: 5,
    tags: ['Low Crime', 'Friendly', 'Nature'],
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=400&h=250&fit=crop',
    description: 'Consistently ranked among the safest countries globally.',
  },
  {
    name: 'Lisbon, Portugal',
    region: 'Europe',
    safety: 4,
    tags: ['Moderate Crime', 'Walkable', 'Cultural'],
    image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400&h=250&fit=crop',
    description: 'Generally safe with vibrant culture. Watch for pickpockets in tourist areas.',
  },
  {
    name: 'Singapore',
    region: 'Asia',
    safety: 5,
    tags: ['Very Low Crime', 'Clean', 'Modern'],
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=250&fit=crop',
    description: 'Extremely safe city-state with strict laws and excellent infrastructure.',
  },
  {
    name: 'Copenhagen, Denmark',
    region: 'Europe',
    safety: 5,
    tags: ['Low Crime', 'Bike Friendly', 'Relaxed'],
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400&h=250&fit=crop',
    description: 'Very safe Scandinavian capital known for its relaxed atmosphere.',
  },
  {
    name: 'Melbourne, Australia',
    region: 'Oceania',
    safety: 4,
    tags: ['Low Crime', 'Multicultural', 'Liveable'],
    image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400&h=250&fit=crop',
    description: 'Safe and multicultural with a thriving food and arts scene.',
  },
];

export default function Destinations() {
  const [search, setSearch] = useState('');

  const filtered = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Destinations
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Explore safety-rated destinations around the world
      </Typography>

      <TextField
        fullWidth
        placeholder="Search destinations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={3}>
        {filtered.map((dest) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dest.name}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={dest.image}
                alt={dest.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  {dest.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {dest.region}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                  <Typography variant="body2" mr={1}>
                    Safety:
                  </Typography>
                  <Rating value={dest.safety} readOnly size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" mb={1.5}>
                  {dest.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {dest.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {filtered.length === 0 && (
          <Grid size={12}>
            <Typography textAlign="center" color="text.secondary" py={4}>
              No destinations found matching &quot;{search}&quot;
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
