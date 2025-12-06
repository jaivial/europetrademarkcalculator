import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './AppLayout.module.css';

export interface AppLayoutProps {
  children: ReactNode;
  className?: string;
  headerVariant?: 'default' | 'minimal' | 'expanded';
  footerVariant?: 'default' | 'minimal';
}

/**
 * AppLayout Component
 *
 * Root layout container providing semantic structure with flexbox layout.
 * Assembles Header, main content area, and Footer.
 *
 * Features:
 * - Full viewport height flexbox layout
 * - Responsive width constraints (200px-3000px)
 * - Semantic HTML structure
 * - Container queries for content area
 * - Smooth transitions for layout shifts
 *
 * @component
 * @example
 * <AppLayout headerVariant="default" footerVariant="default">
 *   <MainContent />
 * </AppLayout>
 */
const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  className = '',
  headerVariant = 'default',
  footerVariant = 'default',
}) => {
  // Note: headerVariant and footerVariant are accepted but not currently used
  // as Header and Footer components don't support variant props yet
  // These props are kept for future compatibility

  return (
    <div className={`${styles.appLayout} ${className}`}>
      {/* Header Section */}
      <header className={styles.header}>
        <Header />
      </header>

      {/* Main Content Section with Container Queries */}
      <main className={styles.main}>
        <div className={styles.contentContainer}>
          {children}
        </div>
      </main>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
};

AppLayout.displayName = 'AppLayout';

export default AppLayout;
