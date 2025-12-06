import React from 'react';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { activeTabAtom } from '@/atoms/navigationAtom';
import { TabButton } from './TabButton';
import styles from './TabNavigation.module.css';

export interface TabNavigationProps {
  className?: string;
  onTabChange?: (tabId: string) => void;
}

const TAB_OPTIONS = [
  { id: 'world-map', labelKey: 'worldMap' },
  { id: 'country-list', labelKey: 'countryList' }
];

export const TabNavigation: React.FC<TabNavigationProps> = ({
  className = '',
  onTabChange
}) => {
  const { t } = useTranslation('navigation');
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId as 'world-map' | 'country-list');
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <nav
      className={`${styles.tabNavigation} ${className}`}
      role="navigation"
      aria-label="Main navigation tabs"
    >
      <div className={styles.tabContainer}>
        <div
          className={styles.tabButtonGroup}
          role="tablist"
          aria-label="View options"
        >
          {TAB_OPTIONS.map((tab) => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={t(tab.labelKey)}
              isActive={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
            />
          ))}
        </div>

        <div className={styles.tabIndicator} />
      </div>
    </nav>
  );
};

export default TabNavigation;
