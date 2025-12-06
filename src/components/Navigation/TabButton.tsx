import React from 'react';
import styles from './TabNavigation.module.css';

export interface TabButtonProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const TabButton: React.FC<TabButtonProps> = ({
  id,
  label,
  isActive,
  onClick,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      id={`tab-${id}`}
      className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${id}`}
      type="button"
    >
      <span className={styles.tabButtonLabel}>{label}</span>
      {isActive && <span className={styles.tabButtonUnderline} />}
    </button>
  );
};

export default TabButton;
