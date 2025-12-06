// src/data/calculatorOptions.ts

/**
 * Nice Classification Class definition
 */
export interface NiceClass {
  number: number;
  name: string;
  description: string;
}

/**
 * Filing type option definition
 */
export interface FilingType {
  id: string;
  name: string;
  description: string;
  processingDays: number;
  priceMultiplier: number;
}

/**
 * Optional service definition
 */
export interface OptionalService {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}

/**
 * NICE Classification Classes (1-45)
 * Complete database of trademark classes with descriptions
 */
export const NICE_CLASSES: NiceClass[] = [
  {
    number: 1,
    name: 'Chemical Substances',
    description: 'Chemicals for use in industry, science, photography'
  },
  {
    number: 2,
    name: 'Paints and Coatings',
    description: 'Paints, varnishes, lacquers, colorants, dyes'
  },
  {
    number: 3,
    name: 'Cosmetics and Cleaning',
    description: 'Non-medicated cosmetics, toiletries, cleaning preparations'
  },
  {
    number: 4,
    name: 'Industrial Oils and Fats',
    description: 'Industrial oils, fats, lubricants, fuels, illuminants'
  },
  {
    number: 5,
    name: 'Pharmaceuticals',
    description: 'Pharmaceuticals, medical and veterinary preparations'
  },
  {
    number: 6,
    name: 'Metals',
    description: 'Unwrought and semi-wrought common metals and alloys'
  },
  {
    number: 7,
    name: 'Machinery',
    description: 'Machines, machine tools, motors, engines'
  },
  {
    number: 8,
    name: 'Hand Tools',
    description: 'Hand tools, instruments, cutlery, side arms, razors'
  },
  {
    number: 9,
    name: 'Electrical and Scientific',
    description: 'Electrical, electronic, optical apparatus and instruments'
  },
  {
    number: 10,
    name: 'Medical Instruments',
    description: 'Surgical, medical, dental, veterinary apparatus'
  },
  {
    number: 11,
    name: 'Lighting and Heating',
    description: 'Apparatus for lighting, heating, cooking, refrigerating'
  },
  {
    number: 12,
    name: 'Vehicles',
    description: 'Vehicles, apparatus for locomotion by land, air, water'
  },
  {
    number: 13,
    name: 'Firearms',
    description: 'Firearms, ammunition, projectiles, explosives'
  },
  {
    number: 14,
    name: 'Jewelry',
    description: 'Precious metals, jewelry, precious stones, horological instruments'
  },
  {
    number: 15,
    name: 'Musical Instruments',
    description: 'Musical instruments, parts and accessories'
  },
  {
    number: 16,
    name: 'Paper and Printing',
    description: 'Paper, cardboard, printed matter, photographs'
  },
  {
    number: 17,
    name: 'Plastics and Rubber',
    description: 'Unprocessed and semi-processed rubber, gum, mica'
  },
  {
    number: 18,
    name: 'Leather Goods',
    description: 'Leather, imitations of leather, animal skins, trunks'
  },
  {
    number: 19,
    name: 'Construction Materials',
    description: 'Building materials (non-metallic), rigid pipes, asphalt'
  },
  {
    number: 20,
    name: 'Furniture',
    description: 'Furniture, mirrors, picture frames'
  },
  {
    number: 21,
    name: 'Kitchenware',
    description: 'Household or kitchen utensils and containers, combs'
  },
  {
    number: 22,
    name: 'Ropes and Fabrics',
    description: 'Ropes, string, nets, tents, sails, bags'
  },
  {
    number: 23,
    name: 'Yarns and Threads',
    description: 'Yarns and threads for textile use'
  },
  {
    number: 24,
    name: 'Textiles',
    description: 'Textiles and textile goods, curtains, carpets'
  },
  {
    number: 25,
    name: 'Clothing',
    description: 'Clothing, footwear, headwear'
  },
  {
    number: 26,
    name: 'Clothing Accessories',
    description: 'Lace, ribbons, braids, embroidery, buttons, zippers'
  },
  {
    number: 27,
    name: 'Carpets and Rugs',
    description: 'Carpets, rugs, mats, wall hangings'
  },
  {
    number: 28,
    name: 'Sporting Goods',
    description: 'Games, toys, sports and outdoor equipment'
  },
  {
    number: 29,
    name: 'Meats and Processed Foods',
    description: 'Meat, fish, poultry, game, processed and preserved foods'
  },
  {
    number: 30,
    name: 'Staple Foods',
    description: 'Coffee, tea, cocoa, sugar, rice, flour, bread, pastries'
  },
  {
    number: 31,
    name: 'Raw Agricultural Products',
    description: 'Grains, seeds, fresh fruits and vegetables, plants'
  },
  {
    number: 32,
    name: 'Beverages',
    description: 'Beers, non-alcoholic beverages, mineral and aerated waters'
  },
  {
    number: 33,
    name: 'Alcoholic Beverages',
    description: 'Alcoholic beverages, wines, spirits, liqueurs'
  },
  {
    number: 34,
    name: 'Tobacco and Smokers Articles',
    description: 'Tobacco and tobacco substitutes, smokers articles'
  },
  {
    number: 35,
    name: 'Advertising and Business Services',
    description: 'Advertising, business management, office functions'
  },
  {
    number: 36,
    name: 'Financial Services',
    description: 'Insurance, financial affairs, monetary affairs'
  },
  {
    number: 37,
    name: 'Construction and Repair Services',
    description: 'Building construction, repair, installation services'
  },
  {
    number: 38,
    name: 'Telecommunications',
    description: 'Telecommunications services'
  },
  {
    number: 39,
    name: 'Transportation and Storage',
    description: 'Transportation, packaging, storage, travel arrangement'
  },
  {
    number: 40,
    name: 'Processing and Transformation',
    description: 'Treatment of materials, custom manufacturing'
  },
  {
    number: 41,
    name: 'Education and Entertainment',
    description: 'Education, entertainment, sporting and cultural activities'
  },
  {
    number: 42,
    name: 'Software and IT Services',
    description: 'Scientific and technological services, software development'
  },
  {
    number: 43,
    name: 'Food and Beverage Services',
    description: 'Provision of food and beverages, accommodation services'
  },
  {
    number: 44,
    name: 'Medical and Veterinary Services',
    description: 'Medical, veterinary, hygienic, beauty care services'
  },
  {
    number: 45,
    name: 'Legal and Social Services',
    description: 'Legal services, security services, social services'
  }
];

/**
 * Filing type options
 * Different registration processing speeds
 */
export const FILING_TYPES: FilingType[] = [
  {
    id: 'standard',
    name: 'Standard Registration',
    description: 'Normal processing time (8-12 weeks)',
    processingDays: 56,
    priceMultiplier: 1.0
  },
  {
    id: 'expedited',
    name: 'Expedited Registration',
    description: 'Faster processing (4-6 weeks)',
    processingDays: 35,
    priceMultiplier: 1.5
  },
  {
    id: 'priority',
    name: 'Priority Registration',
    description: 'Fastest processing (2-3 weeks)',
    processingDays: 18,
    priceMultiplier: 2.0
  }
];

/**
 * Optional services
 * Additional services to enhance registration
 */
export const OPTIONAL_SERVICES: OptionalService[] = [
  {
    id: 'monitoring',
    name: 'Trademark Monitoring',
    description: 'Monitor for similar trademark applications',
    basePrice: 150
  },
  {
    id: 'legal-support',
    name: 'Legal Support Package',
    description: 'Professional legal advice and documentation',
    basePrice: 300
  },
  {
    id: 'fast-track',
    name: 'Fast-Track Processing',
    description: 'Priority queue for expedited review',
    basePrice: 200
  }
];

/**
 * Helper function to get nice class by number
 */
export function getNiceClassByNumber(number: number): NiceClass | undefined {
  return NICE_CLASSES.find(c => c.number === number);
}

/**
 * Helper function to get filing type by id
 */
export function getFilingTypeById(id: string): FilingType | undefined {
  return FILING_TYPES.find(f => f.id === id);
}

/**
 * Helper function to get service by id
 */
export function getServiceById(id: string): OptionalService | undefined {
  return OPTIONAL_SERVICES.find(s => s.id === id);
}

/**
 * Validate nice class number (1-45)
 */
export function isValidNiceClassNumber(number: any): number is number {
  return typeof number === 'number' && number >= 1 && number <= 45;
}

/**
 * Validate filing type id
 */
export function isValidFilingTypeId(id: any): id is string {
  return FILING_TYPES.some(f => f.id === id);
}

/**
 * Validate service id
 */
export function isValidServiceId(id: any): id is string {
  return OPTIONAL_SERVICES.some(s => s.id === id);
}
