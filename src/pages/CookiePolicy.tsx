import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';
import styles from './LegalPage.module.css';

/**
 * Cookie Policy Page
 * Educational/non-profit project by Jaime Villanueva Acon / Jaime Digital Studio
 * Now with language-aware navigation and full i18n support
 */
export function CookiePolicy(): JSX.Element {
  const { t } = useTranslation('legal');
  const { getPath } = useLanguageNavigation();

  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <Link to={getPath('')} className={styles.backLink}>
          ← {t('backToHome')}
        </Link>

        <h1 className={styles.title}>{t('cookies.title')}</h1>
        <p className={styles.lastUpdated}>{t('lastUpdated')}</p>

        <section className={styles.section}>
          <h2>{t('cookies.about')}</h2>
          <p>{t('cookies.aboutText')}</p>
          <p><strong>{t('cookies.shortVersion')}</strong> {t('cookies.aboutShort')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('cookies.whatAre')}</h2>
          <p>{t('cookies.whatAreText')}</p>
          <ul className={styles.list}>
            <li>{t('cookies.whatAreList.0')}</li>
            <li>{t('cookies.whatAreList.1')}</li>
            <li>{t('cookies.whatAreList.2')}</li>
            <li>{t('cookies.whatAreList.3')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t('cookies.privacyFirst')}</h2>
          <p>{t('cookies.privacyFirstText')}</p>
          <ul className={styles.list}>
            <li><strong>{t('cookies.trackingCookies')}</strong> - {t('cookies.trackingCookiesDesc')}</li>
            <li><strong>{t('cookies.analyticsCookies')}</strong> - {t('cookies.analyticsCookiesDesc')}</li>
            <li><strong>{t('cookies.advertisingCookies')}</strong> - {t('cookies.advertisingCookiesDesc')}</li>
            <li><strong>{t('cookies.thirdPartyCookies')}</strong> - {t('cookies.thirdPartyCookiesDesc')}</li>
            <li><strong>{t('cookies.socialMediaCookies')}</strong> - {t('cookies.socialMediaCookiesDesc')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t('cookies.whatWeUse')}</h2>
          <p>{t('cookies.whatWeUseText')}</p>

          <h3>{t('cookies.languagePref')}</h3>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td><strong>{t('cookies.key')}:</strong></td>
                <td>i18nextLng</td>
              </tr>
              <tr>
                <td><strong>{t('cookies.purpose')}:</strong></td>
                <td>{t('cookies.languagePurpose')}</td>
              </tr>
              <tr>
                <td><strong>{t('cookies.duration')}:</strong></td>
                <td>{t('cookies.untilCleared')}</td>
              </tr>
              <tr>
                <td><strong>{t('cookies.dataStored')}:</strong></td>
                <td>{t('cookies.languageCode')}</td>
              </tr>
            </tbody>
          </table>

          <h3>{t('cookies.themePref')}</h3>
          <table className={styles.table}>
            <tbody>
              <tr>
                <td><strong>{t('cookies.key')}:</strong></td>
                <td>theme</td>
              </tr>
              <tr>
                <td><strong>{t('cookies.purpose')}:</strong></td>
                <td>{t('cookies.themePurpose')}</td>
              </tr>
              <tr>
                <td><strong>{t('cookies.duration')}:</strong></td>
                <td>{t('cookies.untilCleared')}</td>
              </tr>
              <tr>
                <td><strong>{t('cookies.dataStored')}:</strong></td>
                <td>{t('cookies.themeValue')}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className={styles.section}>
          <h2>{t('cookies.differences')}</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t('cookies.feature')}</th>
                <th>{t('cookies.cookiesColumn')}</th>
                <th>{t('cookies.localStorageColumn')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t('cookies.sentToServer')}</td>
                <td>{t('cookies.yesEveryRequest')}</td>
                <td>{t('cookies.noStaysOnDevice')}</td>
              </tr>
              <tr>
                <td>{t('cookies.accessedByOthers')}</td>
                <td>{t('cookies.sometimesThirdParty')}</td>
                <td>{t('cookies.no')}</td>
              </tr>
              <tr>
                <td>{t('cookies.usedForTracking')}</td>
                <td>{t('cookies.often')}</td>
                <td>{t('cookies.rarely')}</td>
              </tr>
            </tbody>
          </table>
          <p>{t('cookies.whyLocalStorage')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('cookies.managing')}</h2>
          <p>{t('cookies.managingText')}</p>
          <ul className={styles.list}>
            <li><strong>Chrome:</strong> {t('cookies.chromeInstructions')}</li>
            <li><strong>Firefox:</strong> {t('cookies.firefoxInstructions')}</li>
            <li><strong>Safari:</strong> {t('cookies.safariInstructions')}</li>
            <li><strong>Edge:</strong> {t('cookies.edgeInstructions')}</li>
          </ul>
          <p>{t('cookies.clearingNote')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('cookies.externalLinks')}</h2>
          <p>{t('cookies.externalLinksText')}</p>
          <ul className={styles.list}>
            <li>jaimedigitalstudio.com ({t('cookies.portfolio')})</li>
            <li>LinkedIn</li>
            <li>Instagram</li>
            <li>GitHub</li>
          </ul>
          <p>{t('cookies.externalLinksNote')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('cookies.updates')}</h2>
          <p>{t('cookies.updatesText')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('cookies.contact')}</h2>
          <p>{t('cookies.contactText')}</p>
          <ul className={styles.list}>
            <li>
              Website: <a href="https://jaimedigitalstudio.com" target="_blank" rel="noopener noreferrer">jaimedigitalstudio.com</a>
            </li>
            <li>
              GitHub: <a href="https://github.com/jaivial" target="_blank" rel="noopener noreferrer">github.com/jaivial</a>
            </li>
          </ul>
        </section>

        <div className={styles.footer}>
          <p>
            {t('createdBy')} <a href="https://jaimedigitalstudio.com" target="_blank" rel="noopener noreferrer">Jaime Digital Studio</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CookiePolicy;
