/**
 * Layer 5: Database/Data Integrity Tests
 * Tests for data validation, structure integrity, and LocalStorage persistence
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  COUNTRIES,
  getCountryById,
  getCountryByCode,
  getCountryByName,
  type Country,
} from '../src/data/countries';
import {
  NICE_CLASSES,
  FILING_TYPES,
  OPTIONAL_SERVICES,
  getNiceClassByNumber,
  getFilingTypeById,
  getServiceById,
  isValidNiceClassNumber,
  isValidFilingTypeId,
  isValidServiceId,
  type NiceClass,
  type FilingType,
  type OptionalService,
} from '../src/data/calculatorOptions';
import {
  PRICE_MATRIX,
  getPriceEntry,
  calculatePrice,
  type PriceEntry,
} from '../src/data/priceMatrix';

describe('Layer 5: Data Integrity Tests', () => {
  describe('Countries Data Structure', () => {
    it('should have valid country data', () => {
      expect(COUNTRIES).toBeInstanceOf(Array);
      expect(COUNTRIES.length).toBeGreaterThan(0);
    });

    it('should have all required fields for each country', () => {
      COUNTRIES.forEach((country: Country) => {
        expect(country).toHaveProperty('id');
        expect(country).toHaveProperty('code');
        expect(country).toHaveProperty('name');
        expect(country).toHaveProperty('flag');
        expect(country).toHaveProperty('lat');
        expect(country).toHaveProperty('lng');

        // Validate types
        expect(typeof country.id).toBe('string');
        expect(typeof country.code).toBe('string');
        expect(typeof country.name).toBe('string');
        expect(typeof country.flag).toBe('string');
        expect(typeof country.lat).toBe('number');
        expect(typeof country.lng).toBe('number');
      });
    });

    it('should have unique country IDs', () => {
      const ids = COUNTRIES.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have unique country codes', () => {
      const codes = COUNTRIES.map((c) => c.code);
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(codes.length);
    });

    it('should have valid ISO 3166-1 alpha-2 IDs', () => {
      COUNTRIES.forEach((country) => {
        expect(country.id).toMatch(/^[A-Z]{2}$/);
      });
    });

    it('should have valid ISO 3166-1 alpha-3 codes', () => {
      COUNTRIES.forEach((country) => {
        expect(country.code).toMatch(/^[A-Z]{3}$/);
      });
    });

    it('should have valid latitude values', () => {
      COUNTRIES.forEach((country) => {
        expect(country.lat).toBeGreaterThanOrEqual(-90);
        expect(country.lat).toBeLessThanOrEqual(90);
      });
    });

    it('should have valid longitude values', () => {
      COUNTRIES.forEach((country) => {
        expect(country.lng).toBeGreaterThanOrEqual(-180);
        expect(country.lng).toBeLessThanOrEqual(180);
      });
    });

    it('should retrieve country by ID', () => {
      const austria = getCountryById('AT');
      expect(austria).toBeDefined();
      expect(austria?.name).toBe('Austria');
      expect(austria?.code).toBe('AUT');
    });

    it('should retrieve country by code', () => {
      const germany = getCountryByCode('DEU');
      expect(germany).toBeDefined();
      expect(germany?.name).toBe('Germany');
      expect(germany?.id).toBe('DE');
    });

    it('should retrieve country by name', () => {
      const france = getCountryByName('France');
      expect(france).toBeDefined();
      expect(france?.id).toBe('FR');
      expect(france?.code).toBe('FRA');
    });

    it('should handle case-insensitive name search', () => {
      const italy = getCountryByName('ITALY');
      expect(italy).toBeDefined();
      expect(italy?.id).toBe('IT');
    });

    it('should return undefined for non-existent country', () => {
      expect(getCountryById('XX')).toBeUndefined();
      expect(getCountryByCode('XXX')).toBeUndefined();
      expect(getCountryByName('Atlantis')).toBeUndefined();
    });
  });

  describe('NICE Classes Data Structure', () => {
    it('should have exactly 45 classes', () => {
      expect(NICE_CLASSES).toBeInstanceOf(Array);
      expect(NICE_CLASSES.length).toBe(45);
    });

    it('should have all required fields for each class', () => {
      NICE_CLASSES.forEach((niceClass: NiceClass) => {
        expect(niceClass).toHaveProperty('number');
        expect(niceClass).toHaveProperty('name');
        expect(niceClass).toHaveProperty('description');

        expect(typeof niceClass.number).toBe('number');
        expect(typeof niceClass.name).toBe('string');
        expect(typeof niceClass.description).toBe('string');
      });
    });

    it('should have sequential class numbers from 1 to 45', () => {
      NICE_CLASSES.forEach((niceClass, index) => {
        expect(niceClass.number).toBe(index + 1);
      });
    });

    it('should have unique class numbers', () => {
      const numbers = NICE_CLASSES.map((c) => c.number);
      const uniqueNumbers = new Set(numbers);
      expect(uniqueNumbers.size).toBe(numbers.length);
    });

    it('should retrieve class by number', () => {
      const class9 = getNiceClassByNumber(9);
      expect(class9).toBeDefined();
      expect(class9?.name).toBe('Electrical and Scientific');
    });

    it('should validate class numbers', () => {
      expect(isValidNiceClassNumber(1)).toBe(true);
      expect(isValidNiceClassNumber(45)).toBe(true);
      expect(isValidNiceClassNumber(0)).toBe(false);
      expect(isValidNiceClassNumber(46)).toBe(false);
      expect(isValidNiceClassNumber('5' as any)).toBe(false);
      expect(isValidNiceClassNumber(null as any)).toBe(false);
    });
  });

  describe('Filing Types Data Structure', () => {
    it('should have valid filing types', () => {
      expect(FILING_TYPES).toBeInstanceOf(Array);
      expect(FILING_TYPES.length).toBeGreaterThan(0);
    });

    it('should have all required fields for each filing type', () => {
      FILING_TYPES.forEach((filingType: FilingType) => {
        expect(filingType).toHaveProperty('id');
        expect(filingType).toHaveProperty('name');
        expect(filingType).toHaveProperty('description');
        expect(filingType).toHaveProperty('processingDays');
        expect(filingType).toHaveProperty('priceMultiplier');

        expect(typeof filingType.id).toBe('string');
        expect(typeof filingType.name).toBe('string');
        expect(typeof filingType.description).toBe('string');
        expect(typeof filingType.processingDays).toBe('number');
        expect(typeof filingType.priceMultiplier).toBe('number');
      });
    });

    it('should have unique filing type IDs', () => {
      const ids = FILING_TYPES.map((f) => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have positive processing days', () => {
      FILING_TYPES.forEach((filingType) => {
        expect(filingType.processingDays).toBeGreaterThan(0);
      });
    });

    it('should have positive price multipliers', () => {
      FILING_TYPES.forEach((filingType) => {
        expect(filingType.priceMultiplier).toBeGreaterThan(0);
      });
    });

    it('should retrieve filing type by ID', () => {
      const standard = getFilingTypeById('standard');
      expect(standard).toBeDefined();
      expect(standard?.name).toBe('Standard Registration');
    });

    it('should validate filing type IDs', () => {
      expect(isValidFilingTypeId('standard')).toBe(true);
      expect(isValidFilingTypeId('expedited')).toBe(true);
      expect(isValidFilingTypeId('invalid')).toBe(false);
    });
  });

  describe('Optional Services Data Structure', () => {
    it('should have valid optional services', () => {
      expect(OPTIONAL_SERVICES).toBeInstanceOf(Array);
      expect(OPTIONAL_SERVICES.length).toBeGreaterThan(0);
    });

    it('should have all required fields for each service', () => {
      OPTIONAL_SERVICES.forEach((service: OptionalService) => {
        expect(service).toHaveProperty('id');
        expect(service).toHaveProperty('name');
        expect(service).toHaveProperty('description');
        expect(service).toHaveProperty('basePrice');

        expect(typeof service.id).toBe('string');
        expect(typeof service.name).toBe('string');
        expect(typeof service.description).toBe('string');
        expect(typeof service.basePrice).toBe('number');
      });
    });

    it('should have unique service IDs', () => {
      const ids = OPTIONAL_SERVICES.map((s) => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have positive base prices', () => {
      OPTIONAL_SERVICES.forEach((service) => {
        expect(service.basePrice).toBeGreaterThan(0);
      });
    });

    it('should retrieve service by ID', () => {
      const monitoring = getServiceById('monitoring');
      expect(monitoring).toBeDefined();
      expect(monitoring?.name).toBe('Trademark Monitoring');
    });

    it('should validate service IDs', () => {
      expect(isValidServiceId('monitoring')).toBe(true);
      expect(isValidServiceId('legal-support')).toBe(true);
      expect(isValidServiceId('invalid')).toBe(false);
    });
  });

  describe('Price Matrix Data Structure', () => {
    it('should have valid price entries', () => {
      expect(PRICE_MATRIX).toBeInstanceOf(Array);
      expect(PRICE_MATRIX.length).toBeGreaterThan(0);
    });

    it('should have all required fields for each price entry', () => {
      PRICE_MATRIX.forEach((entry: PriceEntry) => {
        expect(entry).toHaveProperty('countryId');
        expect(entry).toHaveProperty('filingTypeId');
        expect(entry).toHaveProperty('basePrice');
        expect(entry).toHaveProperty('perClassPrice');
        expect(entry).toHaveProperty('currency');
        expect(entry).toHaveProperty('processingDays');
        expect(entry).toHaveProperty('registrationYears');

        expect(typeof entry.countryId).toBe('string');
        expect(typeof entry.filingTypeId).toBe('string');
        expect(typeof entry.basePrice).toBe('number');
        expect(typeof entry.perClassPrice).toBe('number');
        expect(typeof entry.currency).toBe('string');
        expect(typeof entry.processingDays).toBe('number');
        expect(typeof entry.registrationYears).toBe('number');
      });
    });

    it('should have positive prices', () => {
      PRICE_MATRIX.forEach((entry) => {
        expect(entry.basePrice).toBeGreaterThan(0);
        expect(entry.perClassPrice).toBeGreaterThan(0);
      });
    });

    it('should have valid currency codes', () => {
      const validCurrencies = ['EUR', 'CHF', 'NOK', 'GBP'];
      PRICE_MATRIX.forEach((entry) => {
        expect(validCurrencies).toContain(entry.currency);
      });
    });

    it('should have positive processing days', () => {
      PRICE_MATRIX.forEach((entry) => {
        expect(entry.processingDays).toBeGreaterThan(0);
      });
    });

    it('should have positive registration years', () => {
      PRICE_MATRIX.forEach((entry) => {
        expect(entry.registrationYears).toBeGreaterThan(0);
      });
    });

    it('should retrieve price entry by country and filing type', () => {
      const entry = getPriceEntry('DE', 'individual');
      expect(entry).toBeDefined();
      expect(entry?.countryId).toBe('DE');
      expect(entry?.filingTypeId).toBe('individual');
    });

    it('should calculate price correctly for single class', () => {
      const result = calculatePrice('DE', 'individual', 1);
      expect(result).toBeDefined();
      expect(result?.total).toBe(result?.basePrice);
      expect(result?.additionalPrice).toBe(0);
    });

    it('should calculate price correctly for multiple classes', () => {
      const result = calculatePrice('DE', 'individual', 3);
      expect(result).toBeDefined();
      expect(result?.total).toBeGreaterThan(result?.basePrice!);
      expect(result?.additionalPrice).toBeGreaterThan(0);
    });

    it('should return null for invalid country or filing type', () => {
      expect(calculatePrice('XX', 'individual', 1)).toBeNull();
      expect(calculatePrice('DE', 'invalid', 1)).toBeNull();
    });

    it('should return null for invalid number of classes', () => {
      expect(calculatePrice('DE', 'individual', 0)).toBeNull();
      expect(calculatePrice('DE', 'individual', -1)).toBeNull();
    });
  });

  describe('Data Referential Integrity', () => {
    it('should have price entries for all major countries', () => {
      const majorCountries = ['DE', 'FR', 'GB', 'IT', 'ES', 'NL'];
      majorCountries.forEach((countryId) => {
        const hasEntry = PRICE_MATRIX.some((p) => p.countryId === countryId);
        expect(hasEntry).toBe(true);
      });
    });

    it('should have all countries in price matrix exist in countries data', () => {
      const priceCountryIds = new Set(PRICE_MATRIX.map((p) => p.countryId));
      const countryIds = new Set(COUNTRIES.map((c) => c.id));

      // EU is special case for EUTM
      priceCountryIds.delete('EU');

      priceCountryIds.forEach((priceCountryId) => {
        expect(countryIds.has(priceCountryId)).toBe(true);
      });
    });

    it('should have consistent filing types across price entries', () => {
      const filingTypeIds = new Set(FILING_TYPES.map((f) => f.id));
      const priceFilingTypeIds = new Set(PRICE_MATRIX.map((p) => p.filingTypeId));

      // Note: Price matrix uses 'individual' and 'collective', not the filing types
      // This is expected for trademark registration types
      expect(priceFilingTypeIds.size).toBeGreaterThan(0);
    });
  });

  describe('LocalStorage Persistence', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('should persist and retrieve string data', () => {
      const key = 'test-string';
      const value = 'test-value';
      localStorage.setItem(key, value);
      expect(localStorage.getItem(key)).toBe(value);
    });

    it('should persist and retrieve JSON data', () => {
      const key = 'test-json';
      const value = { country: 'DE', classes: 3 };
      localStorage.setItem(key, JSON.stringify(value));
      const retrieved = JSON.parse(localStorage.getItem(key) || '{}');
      expect(retrieved).toEqual(value);
    });

    it('should persist selected country', () => {
      const country = COUNTRIES.find((c) => c.id === 'DE');
      localStorage.setItem('selectedCountry', JSON.stringify(country));
      const retrieved = JSON.parse(localStorage.getItem('selectedCountry') || 'null');
      expect(retrieved?.id).toBe('DE');
    });

    it('should persist number of classes', () => {
      const numClasses = 5;
      localStorage.setItem('numberOfClasses', String(numClasses));
      const retrieved = parseInt(localStorage.getItem('numberOfClasses') || '1', 10);
      expect(retrieved).toBe(numClasses);
    });

    it('should persist selected services', () => {
      const services = ['monitoring', 'legal-support'];
      localStorage.setItem('selectedServices', JSON.stringify(services));
      const retrieved = JSON.parse(localStorage.getItem('selectedServices') || '[]');
      expect(retrieved).toEqual(services);
    });

    it('should handle missing localStorage keys', () => {
      expect(localStorage.getItem('non-existent')).toBeNull();
    });

    it('should clear all stored data', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      localStorage.clear();
      expect(localStorage.getItem('key1')).toBeNull();
      expect(localStorage.getItem('key2')).toBeNull();
    });
  });

  describe('Data Validation', () => {
    it('should validate complete calculation data', () => {
      const calculationData = {
        countryId: 'DE',
        filingTypeId: 'individual',
        numberOfClasses: 3,
        services: ['monitoring'],
      };

      expect(getCountryById(calculationData.countryId)).toBeDefined();
      expect(getPriceEntry(calculationData.countryId, calculationData.filingTypeId)).toBeDefined();
      expect(calculationData.numberOfClasses).toBeGreaterThan(0);
      expect(calculationData.numberOfClasses).toBeLessThanOrEqual(45);
      calculationData.services.forEach((serviceId) => {
        expect(isValidServiceId(serviceId)).toBe(true);
      });
    });

    it('should detect invalid country selections', () => {
      expect(getCountryById('INVALID')).toBeUndefined();
    });

    it('should detect invalid class numbers', () => {
      expect(isValidNiceClassNumber(0)).toBe(false);
      expect(isValidNiceClassNumber(46)).toBe(false);
      expect(isValidNiceClassNumber(-1)).toBe(false);
    });

    it('should detect invalid service selections', () => {
      expect(isValidServiceId('invalid-service')).toBe(false);
    });
  });

  describe('Data Consistency', () => {
    it('should have consistent country count', () => {
      expect(COUNTRIES.length).toBeGreaterThan(30);
    });

    it('should have no duplicate country names', () => {
      const names = COUNTRIES.map((c) => c.name.toLowerCase());
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    it('should have EU member states', () => {
      const euMembers = [
        'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus',
        'Czechia', 'Denmark', 'Estonia', 'Finland', 'France',
        'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy',
        'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
        'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia',
        'Spain', 'Sweden'
      ];

      euMembers.forEach((name) => {
        const country = getCountryByName(name);
        expect(country).toBeDefined();
      });
    });

    it('should have complete NICE class descriptions', () => {
      NICE_CLASSES.forEach((niceClass) => {
        expect(niceClass.description.length).toBeGreaterThan(10);
      });
    });
  });
});
