import { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { useNavigate } from 'react-router-dom';
import destinations, { ADVISORY_LEVELS, REGIONS } from '../data/destinations';
import { getCityCardStyle, getRegionEmoji } from '../utils/cityImages';

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function AdvisoryBadge({ level }) {
  const info = ADVISORY_LEVELS[level];
  return (
    <Chip
      label={info.short}
      size="small"
      sx={{
        fontWeight: 600,
        color: info.color,
        backgroundColor: info.bg,
        borderColor: info.color,
        border: '1px solid',
      }}
    />
  );
}

export default function Destinations() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [advisoryFilter, setAdvisoryFilter] = useState('all');
  const [view, setView] = useState('cards');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const goToDetail = (d) => navigate(`/destinations/${slugify(d.city)}/${slugify(d.country)}`);

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        d.city.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q);
      const matchesRegion = region === 'All' || d.region === region;
      const matchesAdvisory =
        advisoryFilter === 'all' || d.advisory === Number(advisoryFilter);
      return matchesSearch && matchesRegion && matchesAdvisory;
    });
  }, [search, region, advisoryFilter]);

  const grouped = useMemo(() => {
    const map = {};
    for (const d of filtered) {
      if (!map[d.region]) map[d.region] = [];
      map[d.region].push(d);
    }
    // Sort regions alphabetically, cities within each region by advisory then name
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([r, items]) => [
        r,
        items.sort((a, b) => a.advisory - b.advisory || a.city.localeCompare(b.city)),
      ]);
  }, [filtered]);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Destinations
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Safety advisory levels for {destinations.length} cities worldwide,
        modelled on{' '}
        <Box
          component="a"
          href="https://www.smartraveller.gov.au/destinations"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'primary.main' }}
        >
          smarttraveller.gov.au
        </Box>
      </Typography>

      {/* Advisory legend */}
      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}
      >
        {Object.entries(ADVISORY_LEVELS).map(([level, info]) => (
          <Chip
            key={level}
            label={info.label}
            size="small"
            sx={{
              fontWeight: 500,
              color: info.color,
              backgroundColor: info.bg,
              border: '1px solid',
              borderColor: info.color,
            }}
          />
        ))}
      </Stack>

      {/* Filters */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <TextField
          fullWidth
          placeholder="Search city or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Region</InputLabel>
          <Select
            value={region}
            label="Region"
            onChange={(e) => setRegion(e.target.value)}
          >
            {REGIONS.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Advisory Level</InputLabel>
          <Select
            value={advisoryFilter}
            label="Advisory Level"
            onChange={(e) => setAdvisoryFilter(e.target.value)}
          >
            <MenuItem value="all">All Levels</MenuItem>
            {Object.entries(ADVISORY_LEVELS).map(([level, info]) => (
              <MenuItem key={level} value={level}>
                {info.short}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {!isMobile && (
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, v) => v && setView(v)}
            size="small"
          >
            <ToggleButton value="cards">
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value="table">
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        )}
      </Stack>

      <Typography variant="body2" color="text.secondary" mb={2}>
        Showing {filtered.length} of {destinations.length} destinations
      </Typography>

      {filtered.length === 0 && (
        <Typography textAlign="center" color="text.secondary" py={6}>
          No destinations match your filters.
        </Typography>
      )}

      {/* Table view */}
      {view === 'table' && !isMobile ? (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>City</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Country</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Region</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Advisory</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered
                .sort(
                  (a, b) =>
                    a.region.localeCompare(b.region) ||
                    a.advisory - b.advisory ||
                    a.city.localeCompare(b.city)
                )
                .map((d) => (
                  <TableRow key={`${d.city}-${d.country}`} hover sx={{ cursor: 'pointer' }} onClick={() => goToDetail(d)}>
                    <TableCell>{d.city}</TableCell>
                    <TableCell>{d.country}</TableCell>
                    <TableCell>{d.region}</TableCell>
                    <TableCell>
                      <AdvisoryBadge level={d.advisory} />
                    </TableCell>
                    <TableCell>{d.updated}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        /* Card view grouped by region */
        grouped.map(([regionName, items]) => (
          <Box key={regionName} sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight={700} mb={2}>
              {regionName}
            </Typography>
            <Grid container spacing={2}>
              {items.map((d) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                  key={`${d.city}-${d.country}`}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                      overflow: 'hidden',
                    }}
                    onClick={() => goToDetail(d)}
                  >
                    <Box sx={getCityCardStyle(d.city, d.country)}>
                      <Typography
                        variant="h4"
                        sx={{
                          position: 'relative',
                          zIndex: 1,
                          opacity: 0.9,
                          userSelect: 'none',
                        }}
                      >
                        {getRegionEmoji(d.country)}
                      </Typography>
                    </Box>
                    <CardContent sx={{ pb: '12px !important' }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {d.city}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        {d.country}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <AdvisoryBadge level={d.advisory} />
                        <Typography variant="caption" color="text.secondary">
                          {d.updated}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
    </Box>
  );
}
