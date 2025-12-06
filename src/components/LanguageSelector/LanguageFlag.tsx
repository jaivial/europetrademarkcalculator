import React, { useMemo } from 'react';
import { LanguageCode, FLAG_EMOJI_MAP } from './types';

export interface LanguageFlagProps {
  languageCode: LanguageCode;
  size?: 'sm' | 'md' | 'lg';
  showCode?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: '16px',
  md: '20px',
  lg: '24px',
};

export const LanguageFlag: React.FC<LanguageFlagProps> = ({
  languageCode,
  size = 'md',
  showCode = false,
  className = '',
}) => {
  const flagEmoji = useMemo(() => {
    return FLAG_EMOJI_MAP[languageCode] || '🌐';
  }, [languageCode]);

  const fontSize = SIZE_MAP[size];

  return (
    <span
      className={`language-flag ${className}`}
      style={{
        fontSize,
        display: 'inline-flex',
        alignItems: 'center',
        gap: showCode ? '8px' : '0',
        whiteSpace: 'nowrap',
      }}
    >
      <span role="img" aria-label={`${languageCode} flag`}>
        {flagEmoji}
      </span>
      {showCode && <span style={{ fontSize: '12px' }}>{languageCode.toUpperCase()}</span>}
    </span>
  );
};

LanguageFlag.displayName = 'LanguageFlag';
