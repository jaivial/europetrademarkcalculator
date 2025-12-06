import React from 'react';
import { useAtomValue } from 'jotai';
import { activeTabAtom } from '@/atoms/navigationAtom';
import styles from './TabNavigation.module.css';

export interface TabContentProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const TabContent: React.FC<TabContentProps> = ({
  id,
  children,
  className = '',
  ariaLabel
}) => {
  const activeTab = useAtomValue(activeTabAtom);
  const isActive = activeTab === id;

  return (
    <div
      id={`tabpanel-${id}`}
      className={`${styles.tabContent} ${isActive ? styles.tabContentActive : ''} ${className}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      aria-hidden={!isActive}
      aria-label={ariaLabel}
    >
      {isActive && <div className={styles.tabContentInner}>{children}</div>}
    </div>
  );
};

export default TabContent;
