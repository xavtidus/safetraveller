import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LuggageIcon from '@mui/icons-material/Luggage';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FlightIcon from '@mui/icons-material/Flight';

const categories = [
  {
    title: 'Before You Go',
    icon: <FlightIcon color="primary" />,
    tips: [
      "Research your destination's safety ratings and travel advisories",
      "Register with your country's embassy or consular services",
      'Purchase comprehensive travel insurance',
      'Share your itinerary with trusted contacts',
      'Make copies of important documents (passport, ID, insurance)',
    ],
  },
  {
    title: 'Health & Medical',
    icon: <LocalHospitalIcon color="error" />,
    tips: [
      'Check required vaccinations well in advance',
      'Pack a personal first-aid kit with essential medications',
      'Know the location of nearest hospitals at your destination',
      'Carry a medical information card with allergies and conditions',
      'Drink bottled water in regions with uncertain water quality',
    ],
  },
  {
    title: 'Packing Smart',
    icon: <LuggageIcon color="secondary" />,
    tips: [
      'Use TSA-approved locks on all luggage',
      'Pack valuables in carry-on bags, not checked luggage',
      'Bring a portable door lock for extra hotel security',
      'Use RFID-blocking wallets to prevent digital theft',
      'Wear a money belt for carrying cash in crowded areas',
    ],
  },
  {
    title: 'Digital Safety',
    icon: <PhoneAndroidIcon color="primary" />,
    tips: [
      'Use a VPN when connecting to public Wi-Fi',
      'Enable two-factor authentication on all accounts',
      'Avoid accessing banking apps on public networks',
      'Keep devices updated with the latest security patches',
      'Back up your phone data before travelling',
    ],
  },
  {
    title: 'Money & Finances',
    icon: <AccountBalanceWalletIcon color="secondary" />,
    tips: [
      'Notify your bank of travel plans to avoid card blocks',
      'Carry multiple payment methods (cards, cash, digital wallet)',
      'Use ATMs inside banks rather than street-facing ones',
      'Keep daily spending money separate from your main funds',
      'Know the local currency and approximate exchange rates',
    ],
  },
];

const quickTips = [
  'Always trust your instincts — if something feels wrong, leave',
  'Keep emergency numbers saved offline on your phone',
  'Stay aware of your surroundings, especially in crowded areas',
  'Avoid displaying expensive jewellery or electronics',
  'Learn basic phrases in the local language',
  'Use reputable transportation services',
];

export default function Safety() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Safety Tips
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Essential safety advice to help you travel confidently
      </Typography>

      {/* Quick Tips Card */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          p: 3,
          background: 'linear-gradient(135deg, #e3f2fd 0%, #fff3e0 100%)',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          ⚡ Quick Tips
        </Typography>
        <Grid container spacing={1}>
          {quickTips.map((tip) => (
            <Grid size={{ xs: 12, sm: 6 }} key={tip}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <CheckCircleIcon
                  sx={{ fontSize: 20, color: 'primary.main', mt: 0.3 }}
                />
                <Typography variant="body2">{tip}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* Detailed Categories */}
      {categories.map((category) => (
        <Accordion key={category.title} defaultExpanded={false} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {category.icon}
              <Typography variant="h6" fontWeight={600}>
                {category.title}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {category.tips.map((tip) => (
                <ListItem key={tip}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckCircleIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText primary={tip} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
