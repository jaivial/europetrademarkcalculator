import { atom } from 'jotai';

/**
 * Brand registration pricing for a country
 */
export interface BrandRegistration {
  basePrice: number;
  pricePerClass: number;
}

/**
 * Country interface for type safety
 */
export interface Country {
  code: string;           // ISO 3166-1 alpha-2 code (e.g., 'DE', 'FR')
  name: string;          // English name of the country
  nativeName?: string;   // Native name (optional, for multi-language support)
  continent: string;     // Continent (Europe, Asia, Africa, Americas, Oceania)
  region?: string;       // Region within continent
  flag?: string;         // Emoji flag representation
  registrationCost?: number; // Base registration cost in EUR (legacy)
  currency?: string;     // Currency code (e.g., 'EUR', 'USD')
  language?: string;     // Primary language
  brandRegistration?: BrandRegistration; // Brand registration pricing
}

/**
 * Sample European countries data with brand registration pricing
 * Complete list available for the application
 */
export const EUROPEAN_COUNTRIES: readonly Country[] = [
  {
    code: 'DE',
    name: 'Germany',
    nativeName: 'Deutschland',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇩🇪',
    currency: 'EUR',
    language: 'German',
    registrationCost: 270,
    brandRegistration: { basePrice: 70, pricePerClass: 130 },
  },
  {
    code: 'FR',
    name: 'France',
    nativeName: 'France',
    continent: 'Europe',
    region: 'Western Europe',
    flag: '🇫🇷',
    currency: 'EUR',
    language: 'French',
    registrationCost: 250,
    brandRegistration: { basePrice: 65, pricePerClass: 125 },
  },
  {
    code: 'ES',
    name: 'Spain',
    nativeName: 'España',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇪🇸',
    currency: 'EUR',
    language: 'Spanish',
    registrationCost: 240,
    brandRegistration: { basePrice: 60, pricePerClass: 115 },
  },
  {
    code: 'IT',
    name: 'Italy',
    nativeName: 'Italia',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇮🇹',
    currency: 'EUR',
    language: 'Italian',
    registrationCost: 260,
    brandRegistration: { basePrice: 60, pricePerClass: 115 },
  },
  {
    code: 'NL',
    name: 'Netherlands',
    nativeName: 'Nederland',
    continent: 'Europe',
    region: 'Western Europe',
    flag: '🇳🇱',
    currency: 'EUR',
    language: 'Dutch',
    registrationCost: 225,
    brandRegistration: { basePrice: 55, pricePerClass: 110 },
  },
  {
    code: 'BE',
    name: 'Belgium',
    nativeName: 'België',
    continent: 'Europe',
    region: 'Western Europe',
    flag: '🇧🇪',
    currency: 'EUR',
    language: 'Dutch',
    registrationCost: 235,
    brandRegistration: { basePrice: 60, pricePerClass: 115 },
  },
  {
    code: 'AT',
    name: 'Austria',
    nativeName: 'Österreich',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇦🇹',
    currency: 'EUR',
    language: 'German',
    registrationCost: 270,
    brandRegistration: { basePrice: 70, pricePerClass: 130 },
  },
  {
    code: 'CH',
    name: 'Switzerland',
    nativeName: 'Schweiz',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇨🇭',
    currency: 'CHF',
    language: 'German',
    registrationCost: 300,
    brandRegistration: { basePrice: 80, pricePerClass: 150 },
  },
  {
    code: 'SE',
    name: 'Sweden',
    nativeName: 'Sverige',
    continent: 'Europe',
    region: 'Northern Europe',
    flag: '🇸🇪',
    currency: 'SEK',
    language: 'Swedish',
    registrationCost: 245,
    brandRegistration: { basePrice: 65, pricePerClass: 120 },
  },
  {
    code: 'PL',
    name: 'Poland',
    nativeName: 'Polska',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇵🇱',
    currency: 'PLN',
    language: 'Polish',
    registrationCost: 200,
    brandRegistration: { basePrice: 50, pricePerClass: 95 },
  },
  {
    code: 'GR',
    name: 'Greece',
    nativeName: 'Ελλάδα',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇬🇷',
    currency: 'EUR',
    language: 'Greek',
    registrationCost: 250,
    brandRegistration: { basePrice: 60, pricePerClass: 115 },
  },
  {
    code: 'CZ',
    name: 'Czech Republic',
    nativeName: 'Česká Republika',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇨🇿',
    currency: 'CZK',
    language: 'Czech',
    registrationCost: 210,
    brandRegistration: { basePrice: 55, pricePerClass: 100 },
  },
  {
    code: 'IS',
    name: 'Iceland',
    nativeName: 'Ísland',
    continent: 'Europe',
    region: 'Northern Europe',
    flag: '🇮🇸',
    currency: 'ISK',
    language: 'Icelandic',
    registrationCost: 280,
    brandRegistration: { basePrice: 75, pricePerClass: 135 },
  },
  {
    code: 'TR',
    name: 'Turkey',
    nativeName: 'Türkiye',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇹🇷',
    currency: 'TRY',
    language: 'Turkish',
    registrationCost: 180,
    brandRegistration: { basePrice: 45, pricePerClass: 85 },
  },
  {
    code: 'UA',
    name: 'Ukraine',
    nativeName: 'Україна',
    continent: 'Europe',
    region: 'Eastern Europe',
    flag: '🇺🇦',
    currency: 'UAH',
    language: 'Ukrainian',
    registrationCost: 160,
    brandRegistration: { basePrice: 40, pricePerClass: 80 },
  },
  {
    code: 'RS',
    name: 'Serbia',
    nativeName: 'Србија',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇷🇸',
    currency: 'RSD',
    language: 'Serbian',
    registrationCost: 150,
    brandRegistration: { basePrice: 38, pricePerClass: 75 },
  },
  {
    code: 'BA',
    name: 'Bosnia and Herzegovina',
    nativeName: 'Bosna i Hercegovina',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇧🇦',
    currency: 'BAM',
    language: 'Bosnian',
    registrationCost: 145,
    brandRegistration: { basePrice: 35, pricePerClass: 70 },
  },
  {
    code: 'ME',
    name: 'Montenegro',
    nativeName: 'Crna Gora',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇲🇪',
    currency: 'EUR',
    language: 'Montenegrin',
    registrationCost: 140,
    brandRegistration: { basePrice: 35, pricePerClass: 68 },
  },
  {
    code: 'MK',
    name: 'North Macedonia',
    nativeName: 'Северна Македонија',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇲🇰',
    currency: 'MKD',
    language: 'Macedonian',
    registrationCost: 138,
    brandRegistration: { basePrice: 33, pricePerClass: 65 },
  },
  {
    code: 'AL',
    name: 'Albania',
    nativeName: 'Shqipëri',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇦🇱',
    currency: 'ALL',
    language: 'Albanian',
    registrationCost: 135,
    brandRegistration: { basePrice: 32, pricePerClass: 63 },
  },
  {
    code: 'MD',
    name: 'Moldova',
    nativeName: 'Moldova',
    continent: 'Europe',
    region: 'Eastern Europe',
    flag: '🇲🇩',
    currency: 'MDL',
    language: 'Romanian',
    registrationCost: 130,
    brandRegistration: { basePrice: 30, pricePerClass: 60 },
  },
  {
    code: 'BY',
    name: 'Belarus',
    nativeName: 'Беларусь',
    continent: 'Europe',
    region: 'Eastern Europe',
    flag: '🇧🇾',
    currency: 'BYN',
    language: 'Belarusian',
    registrationCost: 155,
    brandRegistration: { basePrice: 38, pricePerClass: 77 },
  },
  {
    code: 'CY',
    name: 'Cyprus',
    nativeName: 'Κύπρος',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇨🇾',
    currency: 'EUR',
    language: 'Greek',
    registrationCost: 220,
    brandRegistration: { basePrice: 55, pricePerClass: 105 },
  },
  {
    code: 'MT',
    name: 'Malta',
    nativeName: 'Malta',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇲🇹',
    currency: 'EUR',
    language: 'Maltese',
    registrationCost: 215,
    brandRegistration: { basePrice: 53, pricePerClass: 103 },
  },
  {
    code: 'PT',
    name: 'Portugal',
    nativeName: 'Portugal',
    continent: 'Europe',
    region: 'Western Europe',
    flag: '🇵🇹',
    currency: 'EUR',
    language: 'Portuguese',
    registrationCost: 230,
    brandRegistration: { basePrice: 58, pricePerClass: 112 },
  },
  {
    code: 'SI',
    name: 'Slovenia',
    nativeName: 'Slovenija',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇸🇮',
    currency: 'EUR',
    language: 'Slovenian',
    registrationCost: 195,
    brandRegistration: { basePrice: 48, pricePerClass: 95 },
  },
  {
    code: 'HR',
    name: 'Croatia',
    nativeName: 'Hrvatska',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇭🇷',
    currency: 'EUR',
    language: 'Croatian',
    registrationCost: 185,
    brandRegistration: { basePrice: 45, pricePerClass: 90 },
  },
  {
    code: 'DK',
    name: 'Denmark',
    nativeName: 'Danmark',
    continent: 'Europe',
    region: 'Northern Europe',
    flag: '🇩🇰',
    currency: 'DKK',
    language: 'Danish',
    registrationCost: 280,
    brandRegistration: { basePrice: 72, pricePerClass: 140 },
  },
  {
    code: 'LU',
    name: 'Luxembourg',
    nativeName: 'Lëtzebuerg',
    continent: 'Europe',
    region: 'Western Europe',
    flag: '🇱🇺',
    currency: 'EUR',
    language: 'Luxembourgish',
    registrationCost: 265,
    brandRegistration: { basePrice: 68, pricePerClass: 132 },
  },
  {
    code: 'HU',
    name: 'Hungary',
    nativeName: 'Magyarország',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇭🇺',
    currency: 'HUF',
    language: 'Hungarian',
    registrationCost: 175,
    brandRegistration: { basePrice: 42, pricePerClass: 85 },
  },
  {
    code: 'SK',
    name: 'Slovakia',
    nativeName: 'Slovensko',
    continent: 'Europe',
    region: 'Central Europe',
    flag: '🇸🇰',
    currency: 'EUR',
    language: 'Slovak',
    registrationCost: 180,
    brandRegistration: { basePrice: 44, pricePerClass: 88 },
  },
  {
    code: 'RO',
    name: 'Romania',
    nativeName: 'România',
    continent: 'Europe',
    region: 'Eastern Europe',
    flag: '🇷🇴',
    currency: 'RON',
    language: 'Romanian',
    registrationCost: 165,
    brandRegistration: { basePrice: 40, pricePerClass: 82 },
  },
  {
    code: 'BG',
    name: 'Bulgaria',
    nativeName: 'България',
    continent: 'Europe',
    region: 'Eastern Europe',
    flag: '🇧🇬',
    currency: 'BGN',
    language: 'Bulgarian',
    registrationCost: 155,
    brandRegistration: { basePrice: 38, pricePerClass: 78 },
  },
  {
    code: 'XK',
    name: 'Kosovo',
    nativeName: 'Kosova',
    continent: 'Europe',
    region: 'Southern Europe',
    flag: '🇽🇰',
    currency: 'EUR',
    language: 'Albanian',
    registrationCost: 125,
    brandRegistration: { basePrice: 30, pricePerClass: 62 },
  },
  {
    code: 'LT',
    name: 'Lithuania',
    nativeName: 'Lietuva',
    continent: 'Europe',
    region: 'Northern Europe',
    flag: '🇱🇹',
    currency: 'EUR',
    language: 'Lithuanian',
    registrationCost: 170,
    brandRegistration: { basePrice: 42, pricePerClass: 84 },
  },
  {
    code: 'LV',
    name: 'Latvia',
    nativeName: 'Latvija',
    continent: 'Europe',
    region: 'Northern Europe',
    flag: '🇱🇻',
    currency: 'EUR',
    language: 'Latvian',
    registrationCost: 168,
    brandRegistration: { basePrice: 41, pricePerClass: 83 },
  },
  {
    code: 'EE',
    name: 'Estonia',
    nativeName: 'Eesti',
    continent: 'Europe',
    region: 'Northern Europe',
    flag: '🇪🇪',
    currency: 'EUR',
    language: 'Estonian',
    registrationCost: 175,
    brandRegistration: { basePrice: 43, pricePerClass: 86 },
  },
  {
    code: 'NO',
    name: 'Norway',
    nativeName: 'Norge',
    continent: 'Europe',
    region: 'Northern Europe',
    flag: '🇳🇴',
    currency: 'NOK',
    language: 'Norwegian',
    registrationCost: 295,
    brandRegistration: { basePrice: 76, pricePerClass: 145 },
  },
  {
    code: 'FI',
    name: 'Finland',
    nativeName: 'Suomi',
    continent: 'Europe',
    region: 'Northern Europe',
    flag: '🇫🇮',
    currency: 'EUR',
    language: 'Finnish',
    registrationCost: 255,
    brandRegistration: { basePrice: 65, pricePerClass: 125 },
  },
  {
    code: 'IE',
    name: 'Ireland',
    nativeName: 'Éire',
    continent: 'Europe',
    region: 'Western Europe',
    flag: '🇮🇪',
    currency: 'EUR',
    language: 'English',
    registrationCost: 275,
    brandRegistration: { basePrice: 70, pricePerClass: 138 },
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    nativeName: 'United Kingdom',
    continent: 'Europe',
    region: 'Western Europe',
    flag: '🇬🇧',
    currency: 'GBP',
    language: 'English',
    registrationCost: 290,
    brandRegistration: { basePrice: 75, pricePerClass: 145 },
  },
];

/**
 * Alias for backward compatibility
 */
export const COUNTRIES = EUROPEAN_COUNTRIES;

/**
 * Atom to store the currently selected country
 * Null when no country is selected
 */
export const selectedCountryAtom = atom<Country | null>(null);

/**
 * Atom to store multiple selected countries
 * Used for multi-country selection in CountryList component
 */
export const selectedCountriesAtom = atom<Country[]>([]);

/**
 * Derived atom: Selected country code
 */
export const selectedCountryCodeAtom = atom((get) => {
  const country = get(selectedCountryAtom);
  return country?.code ?? null;
});

/**
 * Atom to store the search query for filtering countries
 * Stores the user's text input for searching/filtering
 */
export const countrySearchQueryAtom = atom<string>('');

/**
 * Alias for backward compatibility with other tasks
 */
export const searchQueryAtom = countrySearchQueryAtom;

/**
 * Derived atom that filters countries based on search query
 * Computes filtered list by matching country name (case-insensitive)
 * and native name against the search query
 * Always includes all countries when search query is empty
 */
export const filteredCountriesAtom = atom((get) => {
  const searchQuery = get(countrySearchQueryAtom);

  // If search query is empty, return all countries
  if (searchQuery.trim() === '') {
    return EUROPEAN_COUNTRIES as Country[];
  }

  const query = searchQuery.toLowerCase().trim();

  // Filter countries by name match (case-insensitive)
  return EUROPEAN_COUNTRIES.filter((country) => {
    const nameMatch = country.name.toLowerCase().includes(query);
    const nativeNameMatch = country.nativeName?.toLowerCase().includes(query);
    const codeMatch = country.code.toLowerCase().includes(query);

    return nameMatch || nativeNameMatch || codeMatch;
  }) as Country[];
});

/**
 * Derived atom that checks if a country is currently selected
 * Write-only atom to check selection state based on country code
 */
export const isCountrySelectedAtom = atom(
  null,
  (get, _set, countryCode: string): boolean => {
    const selected = get(selectedCountryAtom);
    return selected?.code === countryCode;
  }
);

/**
 * Derived atom that returns the count of filtered countries
 * Useful for displaying "X countries found" messages
 */
export const filteredCountriesCountAtom = atom((get) => {
  return get(filteredCountriesAtom).length;
});

/**
 * Alias for backward compatibility - points to selectedCountryAtom
 */
export const countryAtom = selectedCountryAtom;
