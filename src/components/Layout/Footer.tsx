import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';
import styles from './Footer.module.css';

/**
 * Footer Component
 * Simplified footer with essential links and Jaime Digital Studio branding
 * Now uses language-aware navigation for SEO-friendly URLs
 */
export function Footer(): JSX.Element {
  const { t } = useTranslation('footer');
  const { getPath } = useLanguageNavigation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        {/* Navigation Links - Centered with language-aware paths */}
        <nav className={styles.navLinks} aria-label="Footer navigation">
          <Link to={getPath('')} className={styles.navLink}>
            {t('home')}
          </Link>
          <span className={styles.separator}>•</span>
          <Link to={getPath('privacy')} className={styles.navLink}>
            {t('privacy')}
          </Link>
          <span className={styles.separator}>•</span>
          <Link to={getPath('terms')} className={styles.navLink}>
            {t('terms')}
          </Link>
          <span className={styles.separator}>•</span>
          <Link to={getPath('cookies')} className={styles.navLink}>
            {t('cookies')}
          </Link>
        </nav>

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Branding Section */}
        <div className={styles.brandingSection}>
          <p className={styles.copyright}>
            © {currentYear} {t('allRightsReserved')}
          </p>
          <p className={styles.madeBy}>
            {t('madeBy')}{' '}
            <a
              href="https://jaimedigitalstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.studioLink}
            >
              Jaime Digital Studio
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div className={styles.socialLinks}>
          <a
            href="https://jaimedigitalstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t('portfolio')}
            title={t('portfolio')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/jaime-villanueva-aa7618270/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/jaimedigitalstudio/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram"
            title="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
              <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
            </svg>
          </a>
          <a
            href="https://github.com/jaivial"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
          </a>
        </div>

        {/* Educational Purpose Notice */}
        <p className={styles.notice}>
          {t('educationalNotice')}
        </p>

      </div>
    </footer>
  );
}

export default Footer;
