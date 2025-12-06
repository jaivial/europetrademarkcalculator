import React from 'react';

export interface CountryFlagProps {
  /**
   * ISO 3166-1 alpha-2 country code
   */
  countryCode: string;
  /**
   * Accessible label for the flag emoji
   */
  countryName: string;
  /**
   * Optional CSS class for styling
   */
  className?: string;
}

/**
 * Converts ISO country code to flag emoji
 * Maps country codes to Unicode regional indicator symbols
 * @param code - ISO 3166-1 alpha-2 country code
 * @returns Flag emoji string
 */
function countryCodeToFlag(code: string): string {
  const codePoints = code
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * CountryFlag Component
 * Renders country flag emoji with accessibility support
 */
export const CountryFlag: React.FC<CountryFlagProps> = ({
  countryCode,
  countryName,
  className,
}) => {
  const flagEmoji = countryCodeToFlag(countryCode);

  return (
    <span
      className={className}
      role="img"
      aria-label={`${countryName} flag`}
      title={countryName}
    >
      {flagEmoji}
    </span>
  );
};

export default CountryFlag;
