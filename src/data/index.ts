// src/data/index.ts
export {
  type Country,
  COUNTRIES,
  getCountryById,
  getCountryByCode,
  getCountryByName,
  default as DEFAULT_COUNTRIES,
} from './countries';

export {
  type NiceClass,
  type FilingType,
  type OptionalService,
  NICE_CLASSES,
  FILING_TYPES,
  OPTIONAL_SERVICES,
  getNiceClassByNumber,
  getFilingTypeById,
  getServiceById,
  isValidNiceClassNumber,
  isValidFilingTypeId,
  isValidServiceId,
} from './calculatorOptions';

export {
  type PriceEntry,
  PRICE_MATRIX,
  getPriceEntry,
  calculatePrice,
  default as DEFAULT_PRICES,
} from './priceMatrix';
