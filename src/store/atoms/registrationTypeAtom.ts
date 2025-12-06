import { atom } from 'jotai';

export type RegistrationType = 'standard' | 'express' | 'premium';

export const registrationTypeAtom = atom<RegistrationType>('standard');
