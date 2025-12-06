import { atom } from 'jotai';

export interface Country {
  code: string;
  name: string;
  region?: string;
}

export const selectedCountryAtom = atom<Country | null>(null);
