import { atom } from 'jotai';

/**
 * Filing type options
 */
export type FilingType = 'standard' | 'express' | 'priority';

/**
 * Filing type configuration
 */
export interface FilingTypeConfig {
  id: FilingType;
  label: string;
  description: string;
  processingDays: number;
  costMultiplier: number;
  icon: string;
}

/**
 * Filing type configurations
 */
export const FILING_TYPES: Record<FilingType, FilingTypeConfig> = {
  standard: {
    id: 'standard',
    label: 'Standard',
    description: 'Normal processing time (60-90 days)',
    processingDays: 75,
    costMultiplier: 1.0,
    icon: '📋',
  },
  express: {
    id: 'express',
    label: 'Express',
    description: 'Faster processing (30-45 days)',
    processingDays: 37,
    costMultiplier: 1.5,
    icon: '⚡',
  },
  priority: {
    id: 'priority',
    label: 'Priority',
    description: 'Fastest processing (15-20 days)',
    processingDays: 17,
    costMultiplier: 2.0,
    icon: '🚀',
  },
};

/**
 * Selected filing type atom
 * Default: standard
 */
export const selectedFilingTypeAtom = atom<FilingType>('standard');

/**
 * Derived atom: Current filing type configuration
 */
export const currentFilingTypeConfigAtom = atom((get) => {
  const fileType = get(selectedFilingTypeAtom);
  return FILING_TYPES[fileType];
});

/**
 * Derived atom: Estimated processing days
 */
export const estimatedProcessingDaysAtom = atom((get) => {
  const config = get(currentFilingTypeConfigAtom);
  return config.processingDays;
});

/**
 * Derived atom: Cost multiplier for current type
 */
export const filingCostMultiplierAtom = atom((get) => {
  const config = get(currentFilingTypeConfigAtom);
  return config.costMultiplier;
});

/**
 * Derived atom: Processing time range as string
 */
export const processingTimeRangeAtom = atom((get) => {
  const fileType = get(selectedFilingTypeAtom);
  const ranges: Record<FilingType, string> = {
    standard: '60-90 days',
    express: '30-45 days',
    priority: '15-20 days',
  };
  return ranges[fileType];
});

/**
 * Write-only atom: Change filing type
 */
export const setFilingTypeAtom = atom(
  null,
  (_get, set, filingType: FilingType) => {
    if (!Object.keys(FILING_TYPES).includes(filingType)) {
      console.warn(`Invalid filing type: ${filingType}. Defaulting to 'standard'.`);
      set(selectedFilingTypeAtom, 'standard');
      return;
    }
    set(selectedFilingTypeAtom, filingType);
  }
);

/**
 * Write-only atom: Reset to standard filing type
 */
export const resetFilingTypeAtom = atom(
  null,
  (_get, set) => {
    set(selectedFilingTypeAtom, 'standard');
  }
);
