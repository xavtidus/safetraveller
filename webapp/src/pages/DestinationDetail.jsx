import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  AlertTitle,
  Paper,
  Stack,
  LinearProgress,
  Rating,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GavelIcon from '@mui/icons-material/Gavel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import PhoneIcon from '@mui/icons-material/Phone';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ShieldIcon from '@mui/icons-material/Shield';
import FlightIcon from '@mui/icons-material/Flight';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PublicIcon from '@mui/icons-material/Public';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import destinations, { ADVISORY_LEVELS } from '../data/destinations';
import { getCityCardStyle, getRegionEmoji } from '../utils/cityImages';

/* ── Advisory-specific mock content ──────────────────────── */

const ADVISORY_CONTENT = {
  1: {
    severity: 'success',
    summary:
      'This destination is generally considered safe for travellers. Standard precautions apply — be aware of your surroundings, keep valuables secure, and follow local laws.',
    safetyTips: [
      'Keep a copy of your passport and travel documents in a separate location.',
      'Register with your country\'s embassy or consulate upon arrival.',
      'Use reputable transport services, especially at night.',
      'Stay informed about local weather and natural hazard risks.',
      'Maintain normal vigilance in crowded tourist areas.',
      'Ensure your travel insurance covers your planned activities.',
    ],
    healthInfo: [
      'Ensure routine vaccinations are up to date before travel.',
      'Tap water is generally safe in most urban areas — check locally.',
      'Healthcare facilities are widely available and of good standard.',
      'Pharmacies are common and stock standard over-the-counter medicines.',
      'Consider travel health insurance for peace of mind.',
    ],
    transport: [
      'Public transport systems are reliable and well-maintained.',
      'Ride-sharing services operate legally and are widely available.',
      'Road conditions are generally good; follow local traffic rules.',
      'International driving permits may be required — check before you go.',
    ],
    legalNotes: [
      'Familiarise yourself with local laws and customs before arrival.',
      'Drug offences carry heavy penalties in many jurisdictions.',
      'Respect local photography restrictions, especially at government sites.',
      'Alcohol regulations may differ from your home country.',
    ],
    safetyRatings: { crime: 1.5, health: 1, transport: 1.5, naturalDisaster: 2 },
  },
  2: {
    severity: 'warning',
    summary:
      'Travellers should exercise a high degree of caution. While tourism operates normally, there are elevated risks that require heightened awareness and preparation.',
    safetyTips: [
      'Avoid displaying expensive jewellery, electronics, or large amounts of cash.',
      'Be cautious in unfamiliar neighbourhoods, particularly after dark.',
      'Keep copies of all important documents — both digital and physical.',
      'Monitor local media for emerging safety concerns.',
      'Use hotel safes for valuables and travel documents.',
      'Stay on main roads and avoid isolated areas, especially at night.',
      'Share your itinerary with someone at home.',
      'Be wary of common scams targeting tourists.',
    ],
    healthInfo: [
      'Some vaccinations may be recommended — consult a travel health clinic.',
      'Bottled or treated water is advisable in some areas.',
      'Healthcare quality varies; private hospitals tend to offer higher standards.',
      'Carry a basic first-aid kit and any personal medications with clear labels.',
      'Ensure travel insurance includes medical evacuation coverage.',
    ],
    transport: [
      'Use licensed taxis or pre-booked transport where possible.',
      'Road conditions may vary significantly outside urban centres.',
      'Driving standards may differ significantly from your home country.',
      'Avoid travel on rural roads after dark where possible.',
      'Public transport can be overcrowded; remain alert for pickpockets.',
    ],
    legalNotes: [
      'Penalties for drug offences are severe and may include long prison terms.',
      'Some local customs may have legal backing — dress modestly where expected.',
      'Dual nationals may be subject to local military service or legal obligations.',
      'LGBTQI+ travellers should research local laws before travelling.',
      'Drone use may be restricted or require permits.',
    ],
    safetyRatings: { crime: 3, health: 2.5, transport: 3, naturalDisaster: 2.5 },
  },
  3: {
    severity: 'error',
    summary:
      'Reconsider your need to travel to this destination. The security situation is volatile and could deteriorate with little warning. Only essential travel is recommended.',
    safetyTips: [
      'Reconsider travel unless you have a compelling reason to visit.',
      'If you do travel, maintain a very low profile and avoid crowds.',
      'Do not travel to border areas or regions with active conflict.',
      'Have a personal security plan and know your nearest embassy location.',
      'Keep your phone charged and accessible at all times.',
      'Avoid all demonstrations, protests, and large public gatherings.',
      'Vary your routines and routes if staying for an extended period.',
      'Consider hiring a reputable local security advisor for business trips.',
      'Carry minimal cash and keep emergency funds separate.',
      'Programme local emergency numbers into your phone.',
    ],
    healthInfo: [
      'Medical facilities may be limited or unreliable, particularly outside the capital.',
      'Ensure all recommended and required vaccinations are completed well in advance.',
      'Carry a comprehensive personal medical kit.',
      'Waterborne diseases are a risk — consume only bottled or purified water.',
      'Medical evacuation insurance is essential.',
      'Some medications may not be available locally — bring sufficient supply.',
    ],
    transport: [
      'Domestic travel can be disrupted at short notice by security incidents.',
      'Road conditions are often poor, especially in rural areas.',
      'Carjacking and roadside robberies have been reported in some areas.',
      'Only use pre-arranged transport from trusted providers.',
      'Avoid road travel after dark — use air travel between cities where possible.',
    ],
    legalNotes: [
      'The legal system may not meet international standards.',
      'Consular access may be limited or delayed during security incidents.',
      'Photography of military, government, or infrastructure may lead to arrest.',
      'Media and journalism activities may face restrictions.',
      'Foreign nationals have been detained on vague or politically-motivated charges.',
    ],
    safetyRatings: { crime: 4, health: 3.5, transport: 4, naturalDisaster: 3 },
  },
  4: {
    severity: 'error',
    summary:
      'Do not travel to this destination. The security situation is extremely dangerous. Armed conflict, terrorism, civil unrest, or severe natural disasters pose a very high risk to personal safety.',
    safetyTips: [
      'Do not travel under any circumstances. The risk to life is extreme.',
      'If you are currently in-country, leave immediately if it is safe to do so.',
      'Contact your embassy or consulate for evacuation assistance.',
      'If unable to leave, shelter in a secure location and await instructions.',
      'Government capacity to assist citizens may be severely limited.',
      'Communication networks may be unreliable or monitored.',
      'Supply chains for food, water, and medicine may be disrupted.',
      'Airports and borders may close without warning.',
      'Kidnapping and arbitrary detention are significant risks.',
      'Unexploded ordnance may be present in conflict zones.',
    ],
    healthInfo: [
      'Healthcare systems may have collapsed or be severely degraded.',
      'Disease outbreaks are common due to disrupted sanitation and services.',
      'Medical evacuation may not be possible due to the security situation.',
      'Clean water and food safety cannot be guaranteed.',
      'No reliable access to pharmaceuticals or emergency medical care.',
    ],
    transport: [
      'All transport is extremely dangerous and unreliable.',
      'Roads may be blocked, mined, or subject to armed checkpoints.',
      'Airports may be closed or non-functional.',
      'No reliable public transport infrastructure.',
      'Fuel shortages are common.',
    ],
    legalNotes: [
      'Rule of law may have effectively broken down.',
      'Multiple armed groups may control different areas with different rules.',
      'Foreign nationals are at high risk of arbitrary detention.',
      'Consular services are unavailable or extremely limited.',
      'Telecommunications and internet may be censored or cut off.',
    ],
    safetyRatings: { crime: 5, health: 5, transport: 5, naturalDisaster: 4.5 },
  },
};

const EMERGENCY_CONTACTS = {
  1: [
    { label: 'Local Emergency Services', number: '000 / 112 / 911' },
    { label: 'Tourist Police Hotline', number: '1155' },
    { label: 'Embassy After-Hours', number: '+61 2 6261 3305' },
  ],
  2: [
    { label: 'Local Emergency Services', number: '112' },
    { label: 'Ambulance / Medical', number: '108 / 999' },
    { label: 'Embassy Emergency Line', number: '+61 2 6261 3305' },
    { label: 'Travel Insurance 24hr', number: 'See your policy' },
  ],
  3: [
    { label: 'Local Emergency Services', number: '112 (may be unreliable)' },
    { label: 'Embassy Emergency Line', number: '+61 2 6261 3305' },
    { label: 'UN Security Coordination', number: 'Contact embassy for details' },
    { label: 'Medical Evacuation Provider', number: 'See your insurance policy' },
  ],
  4: [
    { label: 'Embassy Crisis Line', number: '+61 2 6261 3305' },
    { label: 'International SOS', number: '+61 2 9372 2468' },
    { label: 'Crisis Support Hotline', number: '1300 555 135' },
  ],
};

const PACKING_ESSENTIALS = {
  1: [
    'Valid passport with 6+ months validity',
    'Travel insurance documentation',
    'Copies of accommodation bookings',
    'Universal power adapter',
    'Basic first-aid kit',
    'Sunscreen and insect repellent',
  ],
  2: [
    'Valid passport with 6+ months validity',
    'Comprehensive travel insurance papers',
    'Copies of all documents (digital + hard copy)',
    'Personal medications with prescriptions',
    'Money belt or hidden pouch',
    'Portable door lock or alarm',
    'Water purification tablets',
    'Local SIM card or eSIM plan',
  ],
  3: [
    'Valid passport with 6+ months validity',
    'Comprehensive insurance with medical evacuation',
    'Multiple passport-sized photos',
    'Comprehensive medical kit',
    'Water purification system',
    'Satellite phone or emergency beacon (consider)',
    'Cash in USD as emergency reserve',
    'High-visibility and subdued clothing options',
    'Emergency food rations',
    'Embassy contact card (waterproof)',
  ],
  4: [
    'You should not travel to this destination.',
    'If evacuation is required, ensure passport is accessible.',
    'Emergency beacon / PLB if available.',
    'Satphone with pre-loaded emergency numbers.',
    'Cash in small denominations (USD / EUR).',
    'Comprehensive medical kit with trauma supplies.',
  ],
};

/* ── Helper ──────────────────────────────────────────────── */

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function RatingRow({ label, value }) {
  const getColor = (v) => {
    if (v <= 2) return 'success.main';
    if (v <= 3.5) return 'warning.main';
    return 'error.main';
  };
  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" justifyContent="space-between" mb={0.5}>
        <Typography variant="body2" fontWeight={600}>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {value} / 5
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={value * 20}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'grey.200',
          '& .MuiLinearProgress-bar': { backgroundColor: getColor(value), borderRadius: 4 },
        }}
      />
    </Box>
  );
}

/* ── Main Component ──────────────────────────────────────── */

export default function DestinationDetail() {
  const { citySlug, countrySlug } = useParams();
  const navigate = useNavigate();

  // Find the destination by matching slugs
  const dest = destinations.find(
    (d) => slugify(d.city) === citySlug && slugify(d.country) === countrySlug,
  );

  if (!dest) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Destination Not Found
        </Typography>
        <Typography color="text.secondary" mb={3}>
          We couldn't find the destination you're looking for.
        </Typography>
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={() => navigate('/destinations')}>
          Back to Destinations
        </Button>
      </Box>
    );
  }

  const info = ADVISORY_LEVELS[dest.advisory];
  const content = ADVISORY_CONTENT[dest.advisory];
  const contacts = EMERGENCY_CONTACTS[dest.advisory];
  const packing = PACKING_ESSENTIALS[dest.advisory];
  const ratings = content.safetyRatings;

  return (
    <Box>
      {/* Back button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/destinations')}
        sx={{ mb: 2 }}
      >
        Back to Destinations
      </Button>

      {/* Hero banner */}
      <Box
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          mb: 4,
          position: 'relative',
          ...getCityCardStyle(dest.city, dest.country),
          height: { xs: 200, md: 280 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            position: 'absolute',
            fontSize: { xs: 80, md: 120 },
            opacity: 0.25,
            userSelect: 'none',
          }}
        >
          {getRegionEmoji(dest.country)}
        </Typography>
        <Box sx={{ position: 'relative', textAlign: 'center', color: 'white', px: 2 }}>
          <Typography variant="h3" fontWeight={800} sx={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)', fontSize: { xs: '1.8rem', md: '3rem' } }}>
            {dest.city}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, textShadow: '0 1px 6px rgba(0,0,0,0.3)' }}>
            {dest.country} &middot; {dest.region}
          </Typography>
        </Box>
      </Box>

      {/* Advisory alert */}
      <Alert
        severity={content.severity}
        variant="outlined"
        sx={{ mb: 4, borderRadius: 2 }}
        icon={dest.advisory >= 3 ? <WarningAmberIcon fontSize="inherit" /> : undefined}
      >
        <AlertTitle sx={{ fontWeight: 700 }}>
          Advisory Level {dest.advisory}: {info.label}
        </AlertTitle>
        {content.summary}
        <Typography variant="caption" display="block" mt={1} color="text.secondary">
          Last updated: {dest.updated}
        </Typography>
      </Alert>

      {/* Risk ratings card */}
      <Typography variant="h5" fontWeight={700} mb={2}>
        <ShieldIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Risk Assessment
      </Typography>
      <Card variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <RatingRow label="Crime & Personal Safety" value={ratings.crime} />
              <RatingRow label="Health Risks" value={ratings.health} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RatingRow label="Transport Safety" value={ratings.transport} />
              <RatingRow label="Natural Disaster Risk" value={ratings.naturalDisaster} />
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              label={info.short}
              sx={{ fontWeight: 600, color: info.color, backgroundColor: info.bg, border: '1px solid', borderColor: info.color }}
            />
            <Chip
              icon={<PublicIcon />}
              label={dest.region}
              variant="outlined"
            />
            <Chip
              icon={<FlightIcon />}
              label={`Updated ${dest.updated}`}
              variant="outlined"
            />
          </Stack>
        </CardContent>
      </Card>

      {/* Safety tips */}
      <Typography variant="h5" fontWeight={700} mb={2}>
        <HealthAndSafetyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Safety Tips &amp; Precautions
      </Typography>
      <Card variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent>
          <List disablePadding>
            {content.safetyTips.map((tip, i) => (
              <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  {dest.advisory <= 2 ? (
                    <CheckCircleIcon color="success" fontSize="small" />
                  ) : (
                    <WarningAmberIcon color="error" fontSize="small" />
                  )}
                </ListItemIcon>
                <ListItemText primary={tip} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Health information */}
      <Typography variant="h5" fontWeight={700} mb={2}>
        <LocalHospitalIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Health Information
      </Typography>
      <Card variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent>
          <List disablePadding>
            {content.healthInfo.map((item, i) => (
              <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <WaterDropIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Transport */}
      <Typography variant="h5" fontWeight={700} mb={2}>
        <DirectionsCarIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Transport &amp; Getting Around
      </Typography>
      <Card variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent>
          <List disablePadding>
            {content.transport.map((item, i) => (
              <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <DirectionsCarIcon color="action" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Legal notes */}
      <Typography variant="h5" fontWeight={700} mb={2}>
        <GavelIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Local Laws &amp; Regulations
      </Typography>
      <Card variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent>
          <List disablePadding>
            {content.legalNotes.map((item, i) => (
              <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <InfoIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Two-column bottom section: Emergency contacts + Packing */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Emergency contacts */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            <PhoneIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Emergency Contacts
          </Typography>
          <Card variant="outlined" sx={{ borderRadius: 2, height: 'calc(100% - 48px)' }}>
            <CardContent>
              {contacts.map((c, i) => (
                <Paper
                  key={i}
                  variant="outlined"
                  sx={{ p: 2, mb: i < contacts.length - 1 ? 2 : 0, borderRadius: 2 }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {c.label}
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {c.number}
                  </Typography>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Packing checklist */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            <MonetizationOnIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Packing Essentials
          </Typography>
          <Card variant="outlined" sx={{ borderRadius: 2, height: 'calc(100% - 48px)' }}>
            <CardContent>
              <List disablePadding>
                {packing.map((item, i) => (
                  <ListItem key={i} disableGutters>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {dest.advisory === 4 ? (
                        <CancelIcon color="error" fontSize="small" />
                      ) : (
                        <CheckCircleIcon color="success" fontSize="small" />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Disclaimer */}
      <Alert severity="info" variant="outlined" sx={{ borderRadius: 2 }}>
        <AlertTitle>Disclaimer</AlertTitle>
        This information is provided as a general guide only. Conditions can change rapidly.
        Always check your government&apos;s official travel advice and register your travel plans
        before departure. Safe Traveller is not liable for any decisions made based on this
        information.
      </Alert>
    </Box>
  );
}
