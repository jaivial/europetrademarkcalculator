import { atom } from 'jotai';

export type ServiceType = 'monitoring' | 'legalSupport' | 'fastTrack';

export const selectedServicesAtom = atom<ServiceType[]>([]);
