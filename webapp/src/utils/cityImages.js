/**
 * Generates a unique, visually appealing gradient for each city card
 * based on its region and a hash of city+country.
 *
 * Each region has a curated colour palette. The hash picks a unique
 * angle and colour pair within that palette so no two neighbouring
 * cards look identical.
 */

const REGION_PALETTES = {
  Asia: [
    ['#e91e63', '#ff6f00'],  // cherry-amber
    ['#d81b60', '#f50057'],  // deep pink
    ['#ff5722', '#ff9100'],  // sunset
    ['#e65100', '#ffc107'],  // orange-gold
    ['#c62828', '#ef5350'],  // crimson
    ['#ad1457', '#f48fb1'],  // rose
    ['#bf360c', '#ffab40'],  // burnt-amber
    ['#d50000', '#ff6d00'],  // red-orange
  ],
  Europe: [
    ['#1565c0', '#42a5f5'],  // royal blue
    ['#0d47a1', '#2196f3'],  // deep blue
    ['#1a237e', '#5c6bc0'],  // indigo
    ['#283593', '#7986cb'],  // navy-lavender
    ['#0277bd', '#4fc3f7'],  // ocean
    ['#01579b', '#29b6f6'],  // deep ocean
    ['#1b5e20', '#66bb6a'],  // forest
    ['#004d40', '#26a69a'],  // teal
  ],
  Americas: [
    ['#2e7d32', '#66bb6a'],  // green
    ['#1b5e20', '#4caf50'],  // deep green
    ['#00695c', '#26a69a'],  // teal
    ['#00838f', '#4dd0e1'],  // cyan
    ['#006064', '#00bcd4'],  // dark cyan
    ['#004d40', '#009688'],  // emerald
    ['#0d7377', '#14cdc8'],  // caribbean
    ['#087f5b', '#20c997'],  // jade
  ],
  Africa: [
    ['#e65100', '#ff9800'],  // amber
    ['#bf360c', '#ff6e40'],  // terracotta
    ['#f57f17', '#ffee58'],  // gold
    ['#ff6f00', '#ffc107'],  // marigold
    ['#e55b00', '#ffab40'],  // saffron
    ['#dd2c00', '#ff9e80'],  // rust
    ['#d84315', '#ff8a65'],  // copper
    ['#f9a825', '#fff176'],  // sunflower
  ],
  'Middle East': [
    ['#4a148c', '#ce93d8'],  // purple
    ['#6a1b9a', '#ab47bc'],  // royal purple  
    ['#311b92', '#9575cd'],  // deep violet
    ['#4527a0', '#7e57c2'],  // indigo-violet
    ['#880e4f', '#f06292'],  // magenta
    ['#7b1fa2', '#ba68c8'],  // orchid
    ['#5e35b1', '#b39ddb'],  // lavender
    ['#8e24aa', '#ea80fc'],  // fuchsia
  ],
  Pacific: [
    ['#0097a7', '#4dd0e1'],  // turquoise
    ['#00838f', '#26c6da'],  // deep turquoise
    ['#006064', '#00bcd4'],  // dark teal
    ['#00796b', '#4db6ac'],  // sea green
    ['#00695c', '#80cbc4'],  // reef
    ['#0277bd', '#4fc3f7'],  // sky blue
    ['#039be5', '#81d4fa'],  // daylight blue
    ['#0288d1', '#4fc3f7'],  // pacific blue
  ],
};

// Country → region lookup
const COUNTRY_REGION = {
  Japan: 'Asia', China: 'Asia', 'South Korea': 'Asia', Taiwan: 'Asia',
  Vietnam: 'Asia', Malaysia: 'Asia', Singapore: 'Asia', Thailand: 'Asia',
  Indonesia: 'Asia', Philippines: 'Asia', India: 'Asia', 'Sri Lanka': 'Asia',
  Nepal: 'Asia', Cambodia: 'Asia', Mongolia: 'Asia', Brunei: 'Asia',
  Laos: 'Asia', Bhutan: 'Asia', Kazakhstan: 'Asia', Bangladesh: 'Asia',
  Pakistan: 'Asia', Myanmar: 'Asia', 'North Korea': 'Asia', Afghanistan: 'Asia',
  'Hong Kong SAR': 'Asia', 'Macau SAR': 'Asia', 'Timor-Leste': 'Asia',
  'Kyrgyz Republic': 'Asia', Uzbekistan: 'Asia', Tajikistan: 'Asia',
  Turkmenistan: 'Asia', Maldives: 'Asia',
  'United Kingdom': 'Europe', France: 'Europe', Germany: 'Europe',
  Italy: 'Europe', Spain: 'Europe', Portugal: 'Europe', Netherlands: 'Europe',
  Belgium: 'Europe', Switzerland: 'Europe', Austria: 'Europe', Denmark: 'Europe',
  Sweden: 'Europe', Norway: 'Europe', Finland: 'Europe', Iceland: 'Europe',
  Ireland: 'Europe', Greece: 'Europe', 'Czech Republic': 'Europe',
  Poland: 'Europe', Hungary: 'Europe', Romania: 'Europe', Bulgaria: 'Europe',
  Estonia: 'Europe', Latvia: 'Europe', Lithuania: 'Europe', Slovenia: 'Europe',
  Croatia: 'Europe', Serbia: 'Europe', Montenegro: 'Europe',
  'North Macedonia': 'Europe', Slovakia: 'Europe', Malta: 'Europe',
  Georgia: 'Europe', 'Türkiye': 'Europe', Cyprus: 'Europe', Albania: 'Europe',
  'Bosnia and Herzegovina': 'Europe', Kosovo: 'Europe', Moldova: 'Europe',
  Armenia: 'Europe', Azerbaijan: 'Europe', Ukraine: 'Europe', Russia: 'Europe',
  Belarus: 'Europe',
  'United States': 'Americas', Canada: 'Americas', Mexico: 'Americas',
  Brazil: 'Americas', Argentina: 'Americas', Chile: 'Americas',
  Colombia: 'Americas', Peru: 'Americas', Ecuador: 'Americas',
  Bolivia: 'Americas', Paraguay: 'Americas', Uruguay: 'Americas',
  Venezuela: 'Americas', Cuba: 'Americas', 'Costa Rica': 'Americas',
  Panama: 'Americas', Guatemala: 'Americas', 'El Salvador': 'Americas',
  Honduras: 'Americas', Nicaragua: 'Americas', Belize: 'Americas',
  Jamaica: 'Americas', 'Dominican Republic': 'Americas',
  'The Bahamas': 'Americas', 'Trinidad and Tobago': 'Americas',
  Guyana: 'Americas', Haiti: 'Americas',
  'South Africa': 'Africa', Egypt: 'Africa', Morocco: 'Africa',
  Kenya: 'Africa', Tanzania: 'Africa', Uganda: 'Africa', Ghana: 'Africa',
  Senegal: 'Africa', Tunisia: 'Africa', Algeria: 'Africa',
  Madagascar: 'Africa', Mozambique: 'Africa', Zimbabwe: 'Africa',
  Malawi: 'Africa', Lesotho: 'Africa', Eswatini: 'Africa',
  Cameroon: 'Africa', Gabon: 'Africa', Angola: 'Africa', Liberia: 'Africa',
  'Sierra Leone': 'Africa', Guinea: 'Africa', "Côte d'Ivoire": 'Africa',
  Benin: 'Africa', 'The Gambia': 'Africa', Djibouti: 'Africa',
  Nigeria: 'Africa', Ethiopia: 'Africa', Burundi: 'Africa',
  Eritrea: 'Africa', Mauritania: 'Africa', Libya: 'Africa',
  Somalia: 'Africa', 'South Sudan': 'Africa', Sudan: 'Africa',
  'Democratic Republic of the Congo': 'Africa',
  'Central African Republic': 'Africa', Mali: 'Africa',
  'Burkina Faso': 'Africa', Niger: 'Africa', Chad: 'Africa',
  Namibia: 'Africa', Botswana: 'Africa', Mauritius: 'Africa',
  Seychelles: 'Africa', Rwanda: 'Africa', Zambia: 'Africa',
  'United Arab Emirates': 'Middle East', Qatar: 'Middle East',
  'Saudi Arabia': 'Middle East', Oman: 'Middle East', Jordan: 'Middle East',
  Iran: 'Middle East', Iraq: 'Middle East', Bahrain: 'Middle East',
  Israel: 'Middle East', Kuwait: 'Middle East', Lebanon: 'Middle East',
  Yemen: 'Middle East', Syria: 'Middle East', Palestine: 'Middle East',
  Australia: 'Pacific', 'New Zealand': 'Pacific', Fiji: 'Pacific',
  'Solomon Islands': 'Pacific', Samoa: 'Pacific', Tonga: 'Pacific',
  Vanuatu: 'Pacific', 'French Polynesia': 'Pacific', Palau: 'Pacific',
  Guam: 'Pacific', 'Cook Islands': 'Pacific', 'Marshall Islands': 'Pacific',
  'Federated States of Micronesia': 'Pacific', Niue: 'Pacific',
  'Papua New Guinea': 'Pacific', 'New Caledonia': 'Pacific',
};

// Region emoji for visual flair
const REGION_EMOJI = {
  Asia: '🏯',
  Europe: '🏰',
  Americas: '🗽',
  Africa: '🌍',
  'Middle East': '🕌',
  Pacific: '🏝️',
};

function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * Returns the styling props for a city's card header.
 * Use as: <Box sx={getCityCardStyle(city, country)} />
 */
export function getCityCardStyle(city, country) {
  const region = COUNTRY_REGION[country] || 'Europe';
  const palette = REGION_PALETTES[region];
  const h = hash(`${city}|${country}`);
  const colors = palette[h % palette.length];
  const angle = 120 + (h % 60); // vary between 120-180deg

  return {
    background: `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    position: 'relative',
    overflow: 'hidden',
    // subtle pattern overlay
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.07,
      backgroundImage:
        'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), ' +
        'radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    },
  };
}

/**
 * Returns the region emoji for a country.
 */
export function getRegionEmoji(country) {
  const region = COUNTRY_REGION[country] || 'Europe';
  return REGION_EMOJI[region] || '🌐';
}
