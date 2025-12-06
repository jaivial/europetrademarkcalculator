/**
 * Country and Geographic Data Types
 * Used for: trademark filing regions, pricing, localization
 */

/**
 * ISO 3166-1 alpha-2 country code
 * @example "US", "UK", "DE", "JP"
 */
export type CountryCode = string & { readonly __brand: "CountryCode" };

/**
 * ISO 3166-1 alpha-3 country code
 * @example "USA", "GBR", "DEU", "JPN"
 */
export type CountryCodeAlpha3 = string & { readonly __brand: "CountryCodeAlpha3" };

/**
 * Country information with geographic and administrative data
 */
export interface Country {
  code: CountryCode;
  codeAlpha3: CountryCodeAlpha3;
  name: string;
  commonName?: string;
  flagEmoji: string;
  region: Region;
  subregion?: string;
  timezone: string;
  coordinates: Coordinates;
  currency: CurrencyInfo;
  languages: string[];
  isEU: boolean;
  isWIPOMember: boolean;
  trademarkOffice?: string;
}

/**
 * Geographic region for classification
 */
export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania"
}

/**
 * Geographic coordinates (latitude, longitude)
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Currency information for a country
 */
export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  exchangeRateToUSD: number;
}

/**
 * Grouped countries by region
 */
export interface CountryGroup {
  region: Region;
  countries: Country[];
  count: number;
}

/**
 * Country search/filter parameters
 */
export interface CountryFilterParams {
  query?: string;
  region?: Region;
  isEU?: boolean;
  isWIPOMember?: boolean;
  sortBy?: "name" | "code" | "region";
  sortOrder?: "asc" | "desc";
}

/**
 * Country response from API
 */
export interface CountryResponse extends Country {
  createdAt: string;
  updatedAt: string;
}

/**
 * Create branded type for CountryCode
 */
export function createCountryCode(code: string): CountryCode {
  return code as CountryCode;
}

/**
 * Create branded type for CountryCodeAlpha3
 */
export function createCountryCodeAlpha3(code: string): CountryCodeAlpha3 {
  return code as CountryCodeAlpha3;
}
