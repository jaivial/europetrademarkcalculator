import { atom } from 'jotai';

/**
 * Nice Classification class definition
 */
export interface NiceClass {
  number: number;
  name: string;
  description: string;
}

/**
 * NICE Classification classes (1-45)
 * Complete database of trademark classes
 */
export const NICE_CLASSES: Record<number, NiceClass> = {
  1: {
    number: 1,
    name: 'Chemical substances',
    description: 'Chemicals for use in industry, science and photography; adhesives for use in industry; putties and other paste fillers',
  },
  2: {
    number: 2,
    name: 'Paints and coatings',
    description: 'Paints, varnishes, lacquers; preservatives against rust and deterioration of wood; colorants, dyes',
  },
  3: {
    number: 3,
    name: 'Cosmetics and cleaning',
    description: 'Non-medicated cosmetics and toiletries; abrasive products; cleaning preparations',
  },
  4: {
    number: 4,
    name: 'Industrial oils and fats',
    description: 'Industrial oils and fats; lubricants; fuels and illuminants',
  },
  5: {
    number: 5,
    name: 'Pharmaceuticals',
    description: 'Pharmaceuticals, medical and veterinary preparations; sanitary preparations',
  },
  6: {
    number: 6,
    name: 'Metals',
    description: 'Unwrought and semi-wrought common metals and their alloys',
  },
  7: {
    number: 7,
    name: 'Machinery',
    description: 'Machines, machine tools, motors and engines',
  },
  8: {
    number: 8,
    name: 'Hand tools',
    description: 'Hand tools and instruments; cutlery; side arms; razors',
  },
  9: {
    number: 9,
    name: 'Electrical and scientific',
    description: 'Electrical, electronic and optical apparatus and instruments',
  },
  10: {
    number: 10,
    name: 'Medical instruments',
    description: 'Surgical, medical, dental and veterinary apparatus and instruments',
  },
  11: {
    number: 11,
    name: 'Lighting and heating',
    description: 'Apparatus for lighting, heating, steam generating, cooking, refrigerating, drying',
  },
  12: {
    number: 12,
    name: 'Vehicles',
    description: 'Vehicles; apparatus for locomotion by land, air or water',
  },
  13: {
    number: 13,
    name: 'Firearms',
    description: 'Firearms; ammunition and projectiles; explosives; pyrotechnic articles',
  },
  14: {
    number: 14,
    name: 'Jewelry',
    description: 'Precious metals and their alloys; jewelry; precious stones; horological instruments',
  },
  15: {
    number: 15,
    name: 'Musical instruments',
    description: 'Musical instruments; parts and accessories for musical instruments',
  },
  16: {
    number: 16,
    name: 'Paper and printing',
    description: 'Paper and cardboard; printed matter; bookbinding material; photographs',
  },
  17: {
    number: 17,
    name: 'Plastics and rubber',
    description: 'Unprocessed and semi-processed rubber, gutta-percha, gum, asbestos, mica',
  },
  18: {
    number: 18,
    name: 'Leather goods',
    description: 'Leather and imitations of leather; animal skins; trunks and cases',
  },
  19: {
    number: 19,
    name: 'Construction materials',
    description: 'Building materials (non-metallic); nonmetallic rigid pipes; asphalt, pitch',
  },
  20: {
    number: 20,
    name: 'Furniture',
    description: 'Furniture, mirrors, picture frames; goods of wood, cork, reed',
  },
  21: {
    number: 21,
    name: 'Housewares',
    description: 'Household or kitchen utensils and containers; glassware; porcelain; earthenware',
  },
  22: {
    number: 22,
    name: 'Textiles and cordage',
    description: 'Ropes and string; nets; tents and tarpaulins; awnings; sacks',
  },
  23: {
    number: 23,
    name: 'Yarns and threads',
    description: 'Yarns and threads for textile use',
  },
  24: {
    number: 24,
    name: 'Textiles',
    description: 'Textiles and substitutes for textiles; bed and table covers',
  },
  25: {
    number: 25,
    name: 'Clothing and footwear',
    description: 'Clothing, footwear, headwear',
  },
  26: {
    number: 26,
    name: 'Lace and embroidery',
    description: 'Lace, braid and embroidery, and tape; buttons, hooks and eyes',
  },
  27: {
    number: 27,
    name: 'Carpets and rugs',
    description: 'Carpets, rugs, mats and matting; linoleum and other materials',
  },
  28: {
    number: 28,
    name: 'Toys and games',
    description: 'Games, toys and playthings; video game apparatus',
  },
  29: {
    number: 29,
    name: 'Meat and produce',
    description: 'Meat, fish, poultry and game; meat extracts; preserved foods',
  },
  30: {
    number: 30,
    name: 'Staple foods',
    description: 'Coffee, tea, cocoa, sugar, rice, tapioca, sago; flour and preparations',
  },
  31: {
    number: 31,
    name: 'Farming produce',
    description: 'Grains and agricultural, horticultural and forestry products',
  },
  32: {
    number: 32,
    name: 'Beverages',
    description: 'Beers; non-alcoholic beverages; mineral and aerated waters',
  },
  33: {
    number: 33,
    name: 'Alcoholic beverages',
    description: 'Alcoholic beverages (except beers)',
  },
  34: {
    number: 34,
    name: 'Tobacco and smoking',
    description: 'Tobacco and tobacco substitutes; cigarettes; smokers\' articles',
  },
  35: {
    number: 35,
    name: 'Advertising and business',
    description: 'Advertising; business management; business administration; office functions',
  },
  36: {
    number: 36,
    name: 'Insurance and finance',
    description: 'Insurance; financial affairs; monetary affairs; real estate affairs',
  },
  37: {
    number: 37,
    name: 'Construction services',
    description: 'Building construction; repair; installation services',
  },
  38: {
    number: 38,
    name: 'Telecommunications',
    description: 'Telecommunications',
  },
  39: {
    number: 39,
    name: 'Transportation services',
    description: 'Transport; packaging and storage of goods; travel arrangement',
  },
  40: {
    number: 40,
    name: 'Material treatment',
    description: 'Treatment of materials; recycling of waste and rubbish; purification',
  },
  41: {
    number: 41,
    name: 'Education and entertainment',
    description: 'Education; providing of training; entertainment; sporting and cultural activities',
  },
  42: {
    number: 42,
    name: 'Scientific and technical',
    description: 'Scientific and technological services; research and design; analysis and evaluation',
  },
  43: {
    number: 43,
    name: 'Food and drink services',
    description: 'Services for providing food and drink; temporary accommodation',
  },
  44: {
    number: 44,
    name: 'Medical and beauty',
    description: 'Medical services; veterinary services; beauty, health and personal care',
  },
  45: {
    number: 45,
    name: 'Legal and security',
    description: 'Legal services; security services; personal and social services',
  },
};

/**
 * Selected trademark classes atom
 * Array of class numbers 1-45
 */
export const selectedTrademarkClassesAtom = atom<number[]>([]);

/**
 * Derived atom: Total number of selected classes
 */
export const totalSelectedClassesAtom = atom(
  (get) => get(selectedTrademarkClassesAtom).length
);

/**
 * Derived atom: Selected classes data (full objects)
 */
export const selectedClassesDataAtom = atom((get) => {
  const selectedNumbers = get(selectedTrademarkClassesAtom);
  return selectedNumbers
    .sort((a, b) => a - b)
    .map((num) => NICE_CLASSES[num])
    .filter((cls) => cls !== undefined);
});

/**
 * Write-only atom: Toggle class selection
 */
export const toggleClassAtom = atom(
  null,
  (get, set, classNumber: number) => {
    const selected = get(selectedTrademarkClassesAtom);
    const isSelected = selected.includes(classNumber);

    if (isSelected) {
      set(
        selectedTrademarkClassesAtom,
        selected.filter((c) => c !== classNumber)
      );
    } else {
      set(selectedTrademarkClassesAtom, [...selected, classNumber]);
    }
  }
);

/**
 * Write-only atom: Select multiple classes
 */
export const selectClassesAtom = atom(
  null,
  (_get, set, classNumbers: number[]) => {
    const validated = classNumbers.filter((n) => n >= 1 && n <= 45);
    set(selectedTrademarkClassesAtom, validated);
  }
);

/**
 * Write-only atom: Clear all selected classes
 */
export const clearAllClassesAtom = atom(
  null,
  (_get, set) => {
    set(selectedTrademarkClassesAtom, []);
  }
);

/**
 * Write-only atom: Select all classes (1-45)
 */
export const selectAllClassesAtom = atom(
  null,
  (_get, set) => {
    set(selectedTrademarkClassesAtom, Array.from({ length: 45 }, (_, i) => i + 1));
  }
);
