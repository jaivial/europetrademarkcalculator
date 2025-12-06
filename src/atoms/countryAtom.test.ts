import { describe, it, expect } from 'vitest';
import { createStore } from 'jotai';
import {
  selectedCountryAtom,
  searchQueryAtom,
  filteredCountriesAtom,
  COUNTRIES,
} from './countryAtom';

describe('Country Atoms', () => {
  describe('selectedCountryAtom', () => {
    it('should initialize with null', () => {
      const store = createStore();
      const value = store.get(selectedCountryAtom);
      expect(value).toBeNull();
    });

    it('should store a country object', () => {
      const store = createStore();
      const testCountry = COUNTRIES[0];
      store.set(selectedCountryAtom, testCountry);
      const value = store.get(selectedCountryAtom);
      expect(value).toEqual(testCountry);
      expect(value?.code).toBe('US');
    });

    it('should allow clearing selection', () => {
      const store = createStore();
      store.set(selectedCountryAtom, COUNTRIES[0]);
      store.set(selectedCountryAtom, null);
      const value = store.get(selectedCountryAtom);
      expect(value).toBeNull();
    });
  });

  describe('searchQueryAtom', () => {
    it('should initialize with empty string', () => {
      const store = createStore();
      const value = store.get(searchQueryAtom);
      expect(value).toBe('');
    });

    it('should update with new search query', () => {
      const store = createStore();
      store.set(searchQueryAtom, 'United');
      const value = store.get(searchQueryAtom);
      expect(value).toBe('United');
    });

    it('should accept various string inputs', () => {
      const store = createStore();
      const testCases = ['US', 'japan', 'FRANCE', 'bra', '123'];
      testCases.forEach((query) => {
        store.set(searchQueryAtom, query);
        expect(store.get(searchQueryAtom)).toBe(query);
      });
    });
  });

  describe('filteredCountriesAtom', () => {
    it('should return all countries when search is empty', () => {
      const store = createStore();
      store.set(searchQueryAtom, '');
      const filtered = store.get(filteredCountriesAtom);
      expect(filtered).toEqual(COUNTRIES);
      expect(filtered.length).toBe(COUNTRIES.length);
    });

    it('should filter by country name', () => {
      const store = createStore();
      store.set(searchQueryAtom, 'United');
      const filtered = store.get(filteredCountriesAtom);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every((c) => c.name.toLowerCase().includes('united'))).toBe(true);
    });

    it('should filter by country code', () => {
      const store = createStore();
      store.set(searchQueryAtom, 'US');
      const filtered = store.get(filteredCountriesAtom);
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.some((c) => c.code === 'US')).toBe(true);
    });

    it('should be case-insensitive', () => {
      const store = createStore();
      store.set(searchQueryAtom, 'japan');
      const filtered1 = store.get(filteredCountriesAtom);
      store.set(searchQueryAtom, 'JAPAN');
      const filtered2 = store.get(filteredCountriesAtom);
      expect(filtered1).toEqual(filtered2);
    });

    it('should trim whitespace from query', () => {
      const store = createStore();
      store.set(searchQueryAtom, '  US  ');
      const filtered = store.get(filteredCountriesAtom);
      expect(filtered.some((c) => c.code === 'US')).toBe(true);
    });

    it('should return empty array for no matches', () => {
      const store = createStore();
      store.set(searchQueryAtom, 'XYZ123');
      const filtered = store.get(filteredCountriesAtom);
      expect(filtered.length).toBe(0);
      expect(Array.isArray(filtered)).toBe(true);
    });

    it('should update when search query changes', () => {
      const store = createStore();

      store.set(searchQueryAtom, 'United');
      const filtered1 = store.get(filteredCountriesAtom);

      store.set(searchQueryAtom, 'Japan');
      const filtered2 = store.get(filteredCountriesAtom);

      expect(filtered1).not.toEqual(filtered2);
      expect(filtered1.some((c) => c.code === 'US')).toBe(true);
      expect(filtered2.some((c) => c.code === 'JP')).toBe(true);
    });
  });

  describe('COUNTRIES data', () => {
    it('should have minimum countries', () => {
      expect(COUNTRIES.length).toBeGreaterThanOrEqual(10);
    });

    it('should have valid country objects', () => {
      COUNTRIES.forEach((country) => {
        expect(country).toHaveProperty('code');
        expect(country).toHaveProperty('name');
        expect(country).toHaveProperty('flag');
        expect(country).toHaveProperty('currency');
        expect(country).toHaveProperty('language');
        expect(typeof country.code).toBe('string');
        expect(typeof country.name).toBe('string');
        expect(typeof country.flag).toBe('string');
        expect(typeof country.currency).toBe('string');
        expect(typeof country.language).toBe('string');
      });
    });

    it('should have unique country codes', () => {
      const codes = COUNTRIES.map((c) => c.code);
      const uniqueCodes = new Set(codes);
      expect(codes.length).toBe(uniqueCodes.size);
    });
  });
});
