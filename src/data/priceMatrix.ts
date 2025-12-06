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
