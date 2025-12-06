import { atom } from 'jotai';

/**
 * Optional service type
 */
export type ServiceType = 'monitoring' | 'legalSupport' | 'fastTrack';

/**
 * Service configuration
 */
export interface ServiceConfig {
  id: ServiceType;
  label: string;
  description: string;
  basePrice: number;
  isPerClass: boolean;
  icon: string;
}

/**
 * Service configurations
 */
export const SERVICES: Record<ServiceType, ServiceConfig> = {
  monitoring: {
    id: 'monitoring',
    label: 'Trademark Monitoring',
    description: 'Monitor for potential trademark infringements (12 months)',
    basePrice: 50,
    isPerClass: false,
    icon: '👁️',
  },
  legalSupport: {
    id: 'legalSupport',
    label: 'Legal Support',
    description: 'Legal consultation and support during registration process',
    basePrice: 200,
    isPerClass: false,
    icon: '⚖️',
  },
  fastTrack: {
    id: 'fastTrack',
    label: 'Fast Track',
    description: 'Expedited examination and priority handling',
    basePrice: 150,
    isPerClass: false,
    icon: '⚡',
  },
};

/**
 * Optional services state
 */
export interface OptionalServicesState {
  monitoring: boolean;
  legalSupport: boolean;
  fastTrack: boolean;
}

/**
 * Default services state
 */
const DEFAULT_SERVICES_STATE: OptionalServicesState = {
  monitoring: false,
  legalSupport: false,
  fastTrack: false,
};

/**
 * Optional services state atom
 */
export const optionalServicesAtom = atom<OptionalServicesState>(
  DEFAULT_SERVICES_STATE
);

/**
 * Derived atom: Count of selected services
 */
export const selectedServicesCountAtom = atom((get) => {
  const services = get(optionalServicesAtom);
  return Object.values(services).filter(Boolean).length;
});

/**
 * Derived atom: List of selected service IDs
 */
export const selectedServiceIdsAtom = atom((get) => {
  const services = get(optionalServicesAtom);
  return (Object.entries(services) as Array<[ServiceType, boolean]>)
    .filter(([, selected]) => selected)
    .map(([id]) => id);
});

/**
 * Derived atom: Get selected services data
 */
export const selectedServicesDataAtom = atom((get) => {
  const serviceIds = get(selectedServiceIdsAtom);
  return serviceIds.map((id) => SERVICES[id]);
});

/**
 * Derived atom: Total price of selected services
 */
export const servicesBasePriceAtom = atom((get) => {
  const services = get(optionalServicesAtom);
  let total = 0;

  if (services.monitoring) total += SERVICES.monitoring.basePrice;
  if (services.legalSupport) total += SERVICES.legalSupport.basePrice;
  if (services.fastTrack) total += SERVICES.fastTrack.basePrice;

  return total;
});

/**
 * Write-only atom: Toggle service
 */
export const toggleServiceAtom = atom(
  null,
  (get, set, serviceType: ServiceType) => {
    const services = get(optionalServicesAtom);

    if (!Object.keys(SERVICES).includes(serviceType)) {
      console.warn(`Invalid service type: ${serviceType}`);
      return;
    }

    set(optionalServicesAtom, {
      ...services,
      [serviceType]: !services[serviceType],
    });
  }
);

/**
 * Write-only atom: Set multiple services
 */
export const setServicesAtom = atom(
  null,
  (get, set, updates: Partial<OptionalServicesState>) => {
    const services = get(optionalServicesAtom);
    set(optionalServicesAtom, {
      ...services,
      ...updates,
    });
  }
);

/**
 * Write-only atom: Clear all services
 */
export const clearAllServicesAtom = atom(
  null,
  (_get, set) => {
    set(optionalServicesAtom, DEFAULT_SERVICES_STATE);
  }
);

/**
 * Write-only atom: Select all services
 */
export const selectAllServicesAtom = atom(
  null,
  (_get, set) => {
    set(optionalServicesAtom, {
      monitoring: true,
      legalSupport: true,
      fastTrack: true,
    });
  }
);
