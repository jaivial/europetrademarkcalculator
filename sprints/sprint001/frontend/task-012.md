# Frontend Task 012: Country Data & Pricing Matrix

## Metadata
- **Task**: 12 of 15
- **Area**: Frontend
- **Feature**: Static Data Files - Countries, Calculator Options, Pricing
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 4
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create comprehensive static data files containing country information with flags and coordinates, trademark classification options, filing types, and pricing matrices. These data files form the foundation for the calculator's dropdown options and pricing calculations. All four subtasks are completely independent and can be executed in parallel.

---

## Subtasks

### Subtask 012.1: Countries Data File

#### Status
status: pending

#### Objective
Create countries.ts with all European countries plus additional territories, including ISO 3166-1 codes, names, flag emojis, and geographic coordinates for globe visualization.

#### Context
The calculator needs accurate country data for dropdown selection and globe positioning. Geographic coordinates (latitude/longitude) enable 3D globe visualization. Flags provide visual identification. ISO codes are used for API calls and data serialization.

#### Files to Create/Modify (Exclusive Ownership)
- `src/data/countries.ts` - Country master data

#### Implementation

```typescript
// src/data/countries.ts
export interface Country {
  id: string; // ISO 3166-1 alpha-2
  code: string; // ISO 3166-1 alpha-3
  name: string;
  flag: string; // Emoji flag
  lat: number; // Latitude
  lng: number; // Longitude
}

export const COUNTRIES: Country[] = [
  // EU Member States
  {
    id: 'AT',
    code: 'AUT',
    name: 'Austria',
    flag: '🇦🇹',
    lat: 47.5162,
    lng: 14.5501,
  },
  {
    id: 'BE',
    code: 'BEL',
    name: 'Belgium',
    flag: '🇧🇪',
    lat: 50.5039,
    lng: 4.4699,
  },
  {
    id: 'BG',
    code: 'BGR',
    name: 'Bulgaria',
    flag: '🇧🇬',
    lat: 42.7339,
    lng: 25.4858,
  },
  {
    id: 'HR',
    code: 'HRV',
    name: 'Croatia',
    flag: '🇭🇷',
    lat: 45.1,
    lng: 15.2,
  },
  {
    id: 'CY',
    code: 'CYP',
    name: 'Cyprus',
    flag: '🇨🇾',
    lat: 35.1264,
    lng: 33.4299,
  },
  {
    id: 'CZ',
    code: 'CZE',
    name: 'Czechia',
    flag: '🇨🇿',
    lat: 49.8175,
    lng: 15.4730,
  },
  {
    id: 'DK',
    code: 'DNK',
    name: 'Denmark',
    flag: '🇩🇰',
    lat: 56.2639,
    lng: 9.5018,
  },
  {
    id: 'EE',
    code: 'EST',
    name: 'Estonia',
    flag: '🇪🇪',
    lat: 58.5953,
    lng: 25.0136,
  },
  {
    id: 'FI',
    code: 'FIN',
    name: 'Finland',
    flag: '🇫🇮',
    lat: 61.9241,
    lng: 25.7482,
  },
  {
    id: 'FR',
    code: 'FRA',
    name: 'France',
    flag: '🇫🇷',
    lat: 46.2276,
    lng: 2.2137,
  },
  {
    id: 'DE',
    code: 'DEU',
    name: 'Germany',
    flag: '🇩🇪',
    lat: 51.1657,
    lng: 10.4515,
  },
  {
    id: 'GR',
    code: 'GRC',
    name: 'Greece',
    flag: '🇬🇷',
    lat: 39.0742,
    lng: 21.8243,
  },
  {
    id: 'HU',
    code: 'HUN',
    name: 'Hungary',
    flag: '🇭🇺',
    lat: 47.1625,
    lng: 19.5033,
  },
  {
    id: 'IE',
    code: 'IRL',
    name: 'Ireland',
    flag: '🇮🇪',
    lat: 53.4129,
    lng: -8.2439,
  },
  {
    id: 'IT',
    code: 'ITA',
    name: 'Italy',
    flag: '🇮🇹',
    lat: 41.8719,
    lng: 12.5674,
  },
  {
    id: 'LV',
    code: 'LVA',
    name: 'Latvia',
    flag: '🇱🇻',
    lat: 56.8796,
    lng: 24.6032,
  },
  {
    id: 'LT',
    code: 'LTU',
    name: 'Lithuania',
    flag: '🇱🇹',
    lat: 55.1694,
    lng: 23.8813,
  },
  {
    id: 'LU',
    code: 'LUX',
    name: 'Luxembourg',
    flag: '🇱🇺',
    lat: 49.8153,
    lng: 6.1296,
  },
  {
    id: 'MT',
    code: 'MLT',
    name: 'Malta',
    flag: '🇲🇹',
    lat: 35.8989,
    lng: 14.3754,
  },
  {
    id: 'NL',
    code: 'NLD',
    name: 'Netherlands',
    flag: '🇳🇱',
    lat: 52.1326,
    lng: 5.2913,
  },
  {
    id: 'PL',
    code: 'POL',
    name: 'Poland',
    flag: '🇵🇱',
    lat: 51.9194,
    lng: 19.1451,
  },
  {
    id: 'PT',
    code: 'PRT',
    name: 'Portugal',
    flag: '🇵🇹',
    lat: 39.3999,
    lng: -8.2245,
  },
  {
    id: 'RO',
    code: 'ROU',
    name: 'Romania',
    flag: '🇷🇴',
    lat: 45.9432,
    lng: 24.9668,
  },
  {
    id: 'SK',
    code: 'SVK',
    name: 'Slovakia',
    flag: '🇸🇰',
    lat: 48.6690,
    lng: 19.6990,
  },
  {
    id: 'SI',
    code: 'SVN',
    name: 'Slovenia',
    flag: '🇸🇮',
    lat: 46.1512,
    lng: 14.9955,
  },
  {
    id: 'ES',
    code: 'ESP',
    name: 'Spain',
    flag: '🇪🇸',
    lat: 40.4637,
    lng: -3.7492,
  },
  {
    id: 'SE',
    code: 'SWE',
    name: 'Sweden',
    flag: '🇸🇪',
    lat: 60.1282,
    lng: 18.6435,
  },
  // Non-EU European States
  {
    id: 'CH',
    code: 'CHE',
    name: 'Switzerland',
    flag: '🇨🇭',
    lat: 46.8182,
    lng: 8.2275,
  },
  {
    id: 'NO',
    code: 'NOR',
    name: 'Norway',
    flag: '🇳🇴',
    lat: 60.4720,
    lng: 8.4689,
  },
  {
    id: 'GB',
    code: 'GBR',
    name: 'United Kingdom',
    flag: '🇬🇧',
    lat: 55.3781,
    lng: -3.4360,
  },
  {
    id: 'IS',
    code: 'ISL',
    name: 'Iceland',
    flag: '🇮🇸',
    lat: 64.9631,
    lng: -19.0208,
  },
  {
    id: 'TR',
    code: 'TUR',
    name: 'Turkey',
    flag: '🇹🇷',
    lat: 38.9637,
    lng: 35.2433,
  },
  {
    id: 'RS',
    code: 'SRB',
    name: 'Serbia',
    flag: '🇷🇸',
    lat: 44.0165,
    lng: 21.0059,
  },
  {
    id: 'XK',
    code: 'XKX',
    name: 'Kosovo',
    flag: '🇽🇰',
    lat: 42.6026,
    lng: 21.1618,
  },
  {
    id: 'ME',
    code: 'MNE',
    name: 'Montenegro',
    flag: '🇲🇪',
    lat: 42.7087,
    lng: 19.3744,
  },
  {
    id: 'BA',
    code: 'BIH',
    name: 'Bosnia and Herzegovina',
    flag: '🇧🇦',
    lat: 43.9159,
    lng: 17.6791,
  },
  {
    id: 'MD',
    code: 'MDA',
    name: 'Moldova',
    flag: '🇲🇩',
    lat: 47.4116,
    lng: 28.3699,
  },
  {
    id: 'UA',
    code: 'UKR',
    name: 'Ukraine',
    flag: '🇺🇦',
    lat: 48.3794,
    lng: 31.1656,
  },
  {
    id: 'BY',
    code: 'BLR',
    name: 'Belarus',
    flag: '🇧🇾',
    lat: 53.7098,
    lng: 27.9534,
  },
  {
    id: 'RU',
    code: 'RUS',
    name: 'Russia',
    flag: '🇷🇺',
    lat: 61.5240,
    lng: 105.3188,
  },
];

export const getCountryById = (id: string): Country | undefined =>
  COUNTRIES.find((c) => c.id === id);

export const getCountryByCode = (code: string): Country | undefined =>
  COUNTRIES.find((c) => c.code === code);

export const getCountryByName = (name: string): Country | undefined =>
  COUNTRIES.find((c) => c.name.toLowerCase() === name.toLowerCase());

export default COUNTRIES;
```

#### Acceptance Criteria
- [ ] 38+ countries included (all EU + major European states)
- [ ] All ISO codes correct (both alpha-2 and alpha-3)
- [ ] Flag emojis present for all countries
- [ ] Geographic coordinates accurate (lat/lng within 0.1 degree)
- [ ] TypeScript interfaces properly defined
- [ ] Helper functions for lookup by ID, code, and name
- [ ] No duplicate entries
- [ ] File compiles without type errors

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/data/countries.ts
npm run lint -- src/data/countries.ts
```

---

### Subtask 012.2: Calculator Options Data File

#### Status
status: pending

#### Objective
Create calculatorOptions.ts with Nice Classification trademark classes (1-45) and filing type options.

#### Context
The Nice Classification defines 45 classes for trademark registration. Filing types include individual and collective marks. These options populate the calculator form dropdowns, allowing users to select which classes they want to register.

#### Files to Create/Modify (Exclusive Ownership)
- `src/data/calculatorOptions.ts` - Options for calculator dropdowns

#### Implementation

```typescript
// src/data/calculatorOptions.ts
export interface NiceClass {
  id: number; // 1-45
  name: string;
  description: string;
  examples: string[];
}

export interface FilingType {
  id: string;
  name: string;
  description: string;
}

export const NICE_CLASSES: NiceClass[] = [
  {
    id: 1,
    name: 'Chemicals',
    description: 'Chemical substances for industrial purposes',
    examples: ['Industrial chemicals', 'Adhesives', 'Fertilizers'],
  },
  {
    id: 2,
    name: 'Paints',
    description: 'Paints, varnishes, lacquers',
    examples: ['Paints', 'Varnishes', 'Wood stains'],
  },
  {
    id: 3,
    name: 'Cosmetics',
    description: 'Cosmetics and cleaning preparations',
    examples: ['Perfumes', 'Deodorants', 'Soaps'],
  },
  {
    id: 4,
    name: 'Lubricants',
    description: 'Industrial oils and lubricants',
    examples: ['Oils', 'Greases', 'Fuel'],
  },
  {
    id: 5,
    name: 'Pharmaceuticals',
    description: 'Pharmaceuticals and medical preparations',
    examples: ['Medications', 'Vitamins', 'Medical supplies'],
  },
  {
    id: 6,
    name: 'Metals',
    description: 'Unwrought and semi-wrought metals',
    examples: ['Iron', 'Steel', 'Aluminum'],
  },
  {
    id: 7,
    name: 'Machinery',
    description: 'Machines and machine tools',
    examples: ['Motors', 'Pumps', 'Generators'],
  },
  {
    id: 8,
    name: 'Tools',
    description: 'Hand tools and implements',
    examples: ['Knives', 'Hammers', 'Wrenches'],
  },
  {
    id: 9,
    name: 'Electronics',
    description: 'Electrical and scientific apparatus',
    examples: ['Computers', 'Semiconductors', 'Cables'],
  },
  {
    id: 10,
    name: 'Medical Instruments',
    description: 'Medical instruments and apparatus',
    examples: ['Thermometers', 'Stethoscopes', 'X-ray equipment'],
  },
  {
    id: 11,
    name: 'Lighting',
    description: 'Lighting and heating apparatus',
    examples: ['Lamps', 'Heaters', 'Boilers'],
  },
  {
    id: 12,
    name: 'Vehicles',
    description: 'Vehicles and parts',
    examples: ['Cars', 'Motorcycles', 'Aircraft'],
  },
  {
    id: 13,
    name: 'Firearms',
    description: 'Firearms and ammunition',
    examples: ['Guns', 'Bullets', 'Explosives'],
  },
  {
    id: 14,
    name: 'Jewelry',
    description: 'Jewelry and precious metals',
    examples: ['Rings', 'Watches', 'Brooches'],
  },
  {
    id: 15,
    name: 'Musical Instruments',
    description: 'Musical instruments',
    examples: ['Guitars', 'Pianos', 'Drums'],
  },
  {
    id: 16,
    name: 'Paper Products',
    description: 'Paper and cardboard products',
    examples: ['Books', 'Newspapers', 'Packaging'],
  },
  {
    id: 17,
    name: 'Rubber Products',
    description: 'Rubber and plastic materials',
    examples: ['Rubber sheets', 'Plastic tubing', 'Seals'],
  },
  {
    id: 18,
    name: 'Leather Goods',
    description: 'Leather and imitation leather goods',
    examples: ['Bags', 'Belts', 'Wallets'],
  },
  {
    id: 19,
    name: 'Building Materials',
    description: 'Building and construction materials',
    examples: ['Bricks', 'Cement', 'Glass'],
  },
  {
    id: 20,
    name: 'Furniture',
    description: 'Furniture and furnishings',
    examples: ['Chairs', 'Tables', 'Cabinets'],
  },
  {
    id: 21,
    name: 'Housewares',
    description: 'Household articles and tableware',
    examples: ['Dishes', 'Glassware', 'Utensils'],
  },
  {
    id: 22,
    name: 'Textiles',
    description: 'Textiles and textile articles',
    examples: ['Fabrics', 'Cloth', 'Yarns'],
  },
  {
    id: 23,
    name: 'Yarns',
    description: 'Yarns and thread',
    examples: ['Wool', 'Cotton thread', 'Synthetic yarn'],
  },
  {
    id: 24,
    name: 'Fabrics',
    description: 'Fabrics and textile piece goods',
    examples: ['Linen', 'Silk', 'Felt'],
  },
  {
    id: 25,
    name: 'Clothing',
    description: 'Clothing, footwear, headgear',
    examples: ['Shirts', 'Pants', 'Shoes'],
  },
  {
    id: 26,
    name: 'Accessories',
    description: 'Lace and embroidery, ribbons',
    examples: ['Lace', 'Buttons', 'Zippers'],
  },
  {
    id: 27,
    name: 'Floor Coverings',
    description: 'Floor coverings',
    examples: ['Carpets', 'Rugs', 'Linoleum'],
  },
  {
    id: 28,
    name: 'Games',
    description: 'Games and sporting articles',
    examples: ['Toys', 'Sports equipment', 'Board games'],
  },
  {
    id: 29,
    name: 'Meat Products',
    description: 'Meat, fish, poultry, preserved foods',
    examples: ['Meat', 'Seafood', 'Canned goods'],
  },
  {
    id: 30,
    name: 'Flour Products',
    description: 'Flour, grain, bread, pastry',
    examples: ['Flour', 'Bread', 'Pasta'],
  },
  {
    id: 31,
    name: 'Agricultural Products',
    description: 'Agricultural and horticultural products',
    examples: ['Vegetables', 'Fruits', 'Grains'],
  },
  {
    id: 32,
    name: 'Beverages',
    description: 'Beverages',
    examples: ['Beer', 'Wine', 'Juice'],
  },
  {
    id: 33,
    name: 'Alcoholic Beverages',
    description: 'Spirits and liqueurs',
    examples: ['Whiskey', 'Vodka', 'Brandy'],
  },
  {
    id: 34,
    name: 'Tobacco',
    description: 'Tobacco and tobacco products',
    examples: ['Cigarettes', 'Cigars', 'Tobacco'],
  },
  {
    id: 35,
    name: 'Advertising',
    description: 'Advertising and business services',
    examples: ['Advertising', 'Marketing', 'Business consulting'],
  },
  {
    id: 36,
    name: 'Financial Services',
    description: 'Financial and insurance services',
    examples: ['Banking', 'Insurance', 'Investment'],
  },
  {
    id: 37,
    name: 'Construction',
    description: 'Construction and repair services',
    examples: ['Building', 'Repairs', 'Installation'],
  },
  {
    id: 38,
    name: 'Telecommunications',
    description: 'Telecommunications services',
    examples: ['Phone services', 'Internet', 'Data transmission'],
  },
  {
    id: 39,
    name: 'Transportation',
    description: 'Transportation and logistics services',
    examples: ['Shipping', 'Freight', 'Delivery'],
  },
  {
    id: 40,
    name: 'Processing Services',
    description: 'Material treatment and processing services',
    examples: ['Dyeing', 'Printing', 'Manufacturing'],
  },
  {
    id: 41,
    name: 'Education',
    description: 'Education and training services',
    examples: ['Teaching', 'Training', 'Courses'],
  },
  {
    id: 42,
    name: 'Technology Services',
    description: 'Scientific and technology services',
    examples: ['Software development', 'IT consulting', 'Research'],
  },
  {
    id: 43,
    name: 'Hospitality',
    description: 'Hospitality and food services',
    examples: ['Restaurants', 'Hotels', 'Catering'],
  },
  {
    id: 44,
    name: 'Medical Services',
    description: 'Medical and veterinary services',
    examples: ['Hospitals', 'Clinics', 'Veterinary care'],
  },
  {
    id: 45,
    name: 'Legal Services',
    description: 'Legal and security services',
    examples: ['Legal services', 'Security', 'Investigation'],
  },
];

export const FILING_TYPES: FilingType[] = [
  {
    id: 'individual',
    name: 'Individual Mark',
    description: 'Single proprietor or business entity',
  },
  {
    id: 'collective',
    name: 'Collective Mark',
    description: 'Mark owned by an association or collective',
  },
  {
    id: 'certification',
    name: 'Certification Mark',
    description: 'Mark certifying material, quality, origin',
  },
];

export const getNiceClassById = (id: number): NiceClass | undefined =>
  NICE_CLASSES.find((c) => c.id === id);

export const getFilingTypeById = (id: string): FilingType | undefined =>
  FILING_TYPES.find((f) => f.id === id);

export default {
  NICE_CLASSES,
  FILING_TYPES,
};
```

#### Acceptance Criteria
- [ ] All 45 Nice Classification classes included
- [ ] Each class has id, name, description, and examples
- [ ] All 3 filing types defined with descriptions
- [ ] Examples are realistic and relevant
- [ ] TypeScript interfaces properly defined
- [ ] Lookup functions for classes and types
- [ ] File compiles without type errors
- [ ] Classes ordered 1-45 sequentially

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/data/calculatorOptions.ts
npm run lint -- src/data/calculatorOptions.ts
```

---

### Subtask 012.3: Pricing Matrix Data File

#### Status
status: pending

#### Objective
Create priceMatrix.ts with realistic pricing for each country, filing type, and number of classes.

#### Context
The pricing matrix is the core data for the calculator. It defines costs for trademark registration based on country selection, filing type, and number of classes selected. Pricing varies significantly by jurisdiction and application complexity.

#### Files to Create/Modify (Exclusive Ownership)
- `src/data/priceMatrix.ts` - Pricing lookup and calculations

#### Implementation

```typescript
// src/data/priceMatrix.ts
export interface PriceEntry {
  countryId: string;
  filingTypeId: string;
  basePrice: number; // Base fee for first class
  perClassPrice: number; // Additional cost per additional class
  currency: string;
  processingDays: number;
  registrationYears: number;
}

export const PRICE_MATRIX: PriceEntry[] = [
  // European Patent Office (EUTM) - multinational coverage
  {
    countryId: 'EU',
    filingTypeId: 'individual',
    basePrice: 850,
    perClassPrice: 50,
    currency: 'EUR',
    processingDays: 180,
    registrationYears: 10,
  },
  {
    countryId: 'EU',
    filingTypeId: 'collective',
    basePrice: 1050,
    perClassPrice: 75,
    currency: 'EUR',
    processingDays: 180,
    registrationYears: 10,
  },
  // Austria
  {
    countryId: 'AT',
    filingTypeId: 'individual',
    basePrice: 350,
    perClassPrice: 35,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'AT',
    filingTypeId: 'collective',
    basePrice: 450,
    perClassPrice: 50,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Belgium
  {
    countryId: 'BE',
    filingTypeId: 'individual',
    basePrice: 300,
    perClassPrice: 32,
    currency: 'EUR',
    processingDays: 90,
    registrationYears: 10,
  },
  {
    countryId: 'BE',
    filingTypeId: 'collective',
    basePrice: 400,
    perClassPrice: 48,
    currency: 'EUR',
    processingDays: 90,
    registrationYears: 10,
  },
  // Bulgaria
  {
    countryId: 'BG',
    filingTypeId: 'individual',
    basePrice: 200,
    perClassPrice: 25,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'BG',
    filingTypeId: 'collective',
    basePrice: 280,
    perClassPrice: 38,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Croatia
  {
    countryId: 'HR',
    filingTypeId: 'individual',
    basePrice: 250,
    perClassPrice: 28,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'HR',
    filingTypeId: 'collective',
    basePrice: 350,
    perClassPrice: 42,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Cyprus
  {
    countryId: 'CY',
    filingTypeId: 'individual',
    basePrice: 280,
    perClassPrice: 30,
    currency: 'EUR',
    processingDays: 150,
    registrationYears: 10,
  },
  {
    countryId: 'CY',
    filingTypeId: 'collective',
    basePrice: 380,
    perClassPrice: 45,
    currency: 'EUR',
    processingDays: 150,
    registrationYears: 10,
  },
  // Czechia
  {
    countryId: 'CZ',
    filingTypeId: 'individual',
    basePrice: 240,
    perClassPrice: 27,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'CZ',
    filingTypeId: 'collective',
    basePrice: 330,
    perClassPrice: 40,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Denmark
  {
    countryId: 'DK',
    filingTypeId: 'individual',
    basePrice: 320,
    perClassPrice: 33,
    currency: 'EUR',
    processingDays: 90,
    registrationYears: 10,
  },
  {
    countryId: 'DK',
    filingTypeId: 'collective',
    basePrice: 420,
    perClassPrice: 50,
    currency: 'EUR',
    processingDays: 90,
    registrationYears: 10,
  },
  // Estonia
  {
    countryId: 'EE',
    filingTypeId: 'individual',
    basePrice: 200,
    perClassPrice: 25,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'EE',
    filingTypeId: 'collective',
    basePrice: 280,
    perClassPrice: 38,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Finland
  {
    countryId: 'FI',
    filingTypeId: 'individual',
    basePrice: 280,
    perClassPrice: 30,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'FI',
    filingTypeId: 'collective',
    basePrice: 380,
    perClassPrice: 45,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // France
  {
    countryId: 'FR',
    filingTypeId: 'individual',
    basePrice: 300,
    perClassPrice: 32,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'FR',
    filingTypeId: 'collective',
    basePrice: 400,
    perClassPrice: 48,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Germany
  {
    countryId: 'DE',
    filingTypeId: 'individual',
    basePrice: 290,
    perClassPrice: 32,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'DE',
    filingTypeId: 'collective',
    basePrice: 390,
    perClassPrice: 48,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Greece
  {
    countryId: 'GR',
    filingTypeId: 'individual',
    basePrice: 250,
    perClassPrice: 28,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'GR',
    filingTypeId: 'collective',
    basePrice: 350,
    perClassPrice: 42,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Hungary
  {
    countryId: 'HU',
    filingTypeId: 'individual',
    basePrice: 220,
    perClassPrice: 26,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'HU',
    filingTypeId: 'collective',
    basePrice: 310,
    perClassPrice: 39,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Ireland
  {
    countryId: 'IE',
    filingTypeId: 'individual',
    basePrice: 300,
    perClassPrice: 32,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'IE',
    filingTypeId: 'collective',
    basePrice: 400,
    perClassPrice: 48,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Italy
  {
    countryId: 'IT',
    filingTypeId: 'individual',
    basePrice: 300,
    perClassPrice: 32,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'IT',
    filingTypeId: 'collective',
    basePrice: 400,
    perClassPrice: 48,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Latvia
  {
    countryId: 'LV',
    filingTypeId: 'individual',
    basePrice: 200,
    perClassPrice: 25,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'LV',
    filingTypeId: 'collective',
    basePrice: 280,
    perClassPrice: 38,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Lithuania
  {
    countryId: 'LT',
    filingTypeId: 'individual',
    basePrice: 200,
    perClassPrice: 25,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'LT',
    filingTypeId: 'collective',
    basePrice: 280,
    perClassPrice: 38,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Luxembourg
  {
    countryId: 'LU',
    filingTypeId: 'individual',
    basePrice: 300,
    perClassPrice: 32,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'LU',
    filingTypeId: 'collective',
    basePrice: 400,
    perClassPrice: 48,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Malta
  {
    countryId: 'MT',
    filingTypeId: 'individual',
    basePrice: 250,
    perClassPrice: 28,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'MT',
    filingTypeId: 'collective',
    basePrice: 350,
    perClassPrice: 42,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Netherlands
  {
    countryId: 'NL',
    filingTypeId: 'individual',
    basePrice: 300,
    perClassPrice: 32,
    currency: 'EUR',
    processingDays: 90,
    registrationYears: 10,
  },
  {
    countryId: 'NL',
    filingTypeId: 'collective',
    basePrice: 400,
    perClassPrice: 48,
    currency: 'EUR',
    processingDays: 90,
    registrationYears: 10,
  },
  // Poland
  {
    countryId: 'PL',
    filingTypeId: 'individual',
    basePrice: 240,
    perClassPrice: 27,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'PL',
    filingTypeId: 'collective',
    basePrice: 330,
    perClassPrice: 40,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Portugal
  {
    countryId: 'PT',
    filingTypeId: 'individual',
    basePrice: 280,
    perClassPrice: 30,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'PT',
    filingTypeId: 'collective',
    basePrice: 380,
    perClassPrice: 45,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Romania
  {
    countryId: 'RO',
    filingTypeId: 'individual',
    basePrice: 200,
    perClassPrice: 25,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'RO',
    filingTypeId: 'collective',
    basePrice: 280,
    perClassPrice: 38,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Slovakia
  {
    countryId: 'SK',
    filingTypeId: 'individual',
    basePrice: 220,
    perClassPrice: 26,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'SK',
    filingTypeId: 'collective',
    basePrice: 310,
    perClassPrice: 39,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Slovenia
  {
    countryId: 'SI',
    filingTypeId: 'individual',
    basePrice: 260,
    perClassPrice: 29,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'SI',
    filingTypeId: 'collective',
    basePrice: 360,
    perClassPrice: 43,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Spain
  {
    countryId: 'ES',
    filingTypeId: 'individual',
    basePrice: 300,
    perClassPrice: 32,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'ES',
    filingTypeId: 'collective',
    basePrice: 400,
    perClassPrice: 48,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Sweden
  {
    countryId: 'SE',
    filingTypeId: 'individual',
    basePrice: 320,
    perClassPrice: 33,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'SE',
    filingTypeId: 'collective',
    basePrice: 420,
    perClassPrice: 50,
    currency: 'EUR',
    processingDays: 120,
    registrationYears: 10,
  },
  // Switzerland
  {
    countryId: 'CH',
    filingTypeId: 'individual',
    basePrice: 550,
    perClassPrice: 55,
    currency: 'CHF',
    processingDays: 180,
    registrationYears: 10,
  },
  {
    countryId: 'CH',
    filingTypeId: 'collective',
    basePrice: 700,
    perClassPrice: 75,
    currency: 'CHF',
    processingDays: 180,
    registrationYears: 10,
  },
  // Norway
  {
    countryId: 'NO',
    filingTypeId: 'individual',
    basePrice: 450,
    perClassPrice: 45,
    currency: 'NOK',
    processingDays: 180,
    registrationYears: 10,
  },
  {
    countryId: 'NO',
    filingTypeId: 'collective',
    basePrice: 600,
    perClassPrice: 65,
    currency: 'NOK',
    processingDays: 180,
    registrationYears: 10,
  },
  // United Kingdom
  {
    countryId: 'GB',
    filingTypeId: 'individual',
    basePrice: 300,
    perClassPrice: 32,
    currency: 'GBP',
    processingDays: 120,
    registrationYears: 10,
  },
  {
    countryId: 'GB',
    filingTypeId: 'collective',
    basePrice: 400,
    perClassPrice: 48,
    currency: 'GBP',
    processingDays: 120,
    registrationYears: 10,
  },
];

export const getPriceEntry = (
  countryId: string,
  filingTypeId: string
): PriceEntry | undefined =>
  PRICE_MATRIX.find(
    (p) => p.countryId === countryId && p.filingTypeId === filingTypeId
  );

export const calculatePrice = (
  countryId: string,
  filingTypeId: string,
  numClasses: number
): { total: number; currency: string; basePrice: number; additionalPrice: number } | null => {
  const entry = getPriceEntry(countryId, filingTypeId);
  if (!entry || numClasses < 1) return null;

  const basePrice = entry.basePrice;
  const additionalPrice = Math.max(0, numClasses - 1) * entry.perClassPrice;
  const total = basePrice + additionalPrice;

  return {
    total,
    currency: entry.currency,
    basePrice,
    additionalPrice,
  };
};

export default PRICE_MATRIX;
```

#### Acceptance Criteria
- [ ] Pricing matrix for 40+ countries
- [ ] Both individual and collective filing types covered
- [ ] Realistic pricing ranges (100-1000+ EUR)
- [ ] Processing times range 90-180 days
- [ ] All registrations 10-year terms
- [ ] Correct currencies (EUR, CHF, GBP, NOK)
- [ ] calculatePrice function works correctly
- [ ] File compiles without type errors

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/data/priceMatrix.ts
npm run lint -- src/data/priceMatrix.ts
```

---

### Subtask 012.4: Data Index & Exports File

#### Status
status: pending

#### Objective
Create index.ts to re-export all data modules, providing a single import point for all calculator data.

#### Context
The index file provides a convenient centralized export point for all data modules. This simplifies imports throughout the application and makes it easy to manage data dependencies.

#### Files to Create/Modify (Exclusive Ownership)
- `src/data/index.ts` - Central data exports

#### Implementation

```typescript
// src/data/index.ts
export {
  type Country,
  COUNTRIES,
  getCountryById,
  getCountryByCode,
  getCountryByName,
  default as DEFAULT_COUNTRIES,
} from './countries';

export {
  type NiceClass,
  type FilingType,
  NICE_CLASSES,
  FILING_TYPES,
  getNiceClassById,
  getFilingTypeById,
  default as DEFAULT_OPTIONS,
} from './calculatorOptions';

export {
  type PriceEntry,
  PRICE_MATRIX,
  getPriceEntry,
  calculatePrice,
  default as DEFAULT_PRICES,
} from './priceMatrix';
```

#### Acceptance Criteria
- [ ] All exports from countries.ts included
- [ ] All exports from calculatorOptions.ts included
- [ ] All exports from priceMatrix.ts included
- [ ] Type exports preserved
- [ ] Default exports available
- [ ] Helper functions exported
- [ ] File compiles without type errors
- [ ] Circular dependencies avoided

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check -- src/data/index.ts
npm run lint -- src/data/index.ts
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/data/countries.ts`
- `src/data/calculatorOptions.ts`
- `src/data/priceMatrix.ts`
- `src/data/index.ts`

### Imports From Existing Code
- None (foundational data only)

### Exports For Other Code
- `COUNTRIES` - Country data with coordinates and flags
- `NICE_CLASSES` - All 45 trademark classes
- `FILING_TYPES` - Filing type options
- `PRICE_MATRIX` - Country/filing/class pricing lookup
- Helper functions: `getCountryById`, `calculatePrice`, etc.

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
# Type check all data files
npm run type-check -- src/data/

# Lint all data files
npm run lint -- src/data/

# Verify data integrity
npm run build
```

---

## Parallelization Notes
- All 4 subtasks in this task can run in parallel
- Each subtask owns exclusive files (no file overlap)
- No subtask depends on another subtask's output
- Subtasks can be implemented in any order
- Subtask 012.4 (index.ts) can be created last or first without dependency issues
- Data files are read-only after creation (static lookup tables)
- No external API calls or state dependencies
