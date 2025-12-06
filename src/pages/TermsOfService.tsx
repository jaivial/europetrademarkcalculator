import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';
import styles from './LegalPage.module.css';

/**
 * Terms of Service Page
 * Educational/non-profit project by Jaime Villanueva Acon / Jaime Digital Studio
 * Now with language-aware navigation and full i18n support
 */
export function TermsOfService(): JSX.Element {
  const { t } = useTranslation('legal');
  const { getPath } = useLanguageNavigation();

  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <Link to={getPath('')} className={styles.backLink}>
          ← {t('backToHome')}
        </Link>

        <h1 className={styles.title}>{t('terms.title')}</h1>
        <p className={styles.lastUpdated}>{t('lastUpdated')}</p>

        <section className={styles.section}>
          <h2>{t('terms.agreement')}</h2>
          <p>{t('terms.agreementText')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('terms.disclaimer')}</h2>
          <p><strong>{t('terms.disclaimerNote')}</strong> {t('terms.disclaimerText')}</p>
          <ul className={styles.list}>
            <li>{t('terms.disclaimerList.0')}</li>
            <li>{t('terms.disclaimerList.1')}</li>
            <li>{t('terms.disclaimerList.2')}</li>
            <li>{t('terms.disclaimerList.3')}</li>
          </ul>
          <p>{t('terms.disclaimerNonProfit')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('terms.noServices')}</h2>
          <p><strong>{t('terms.important')}</strong> {t('terms.noServicesText')}</p>
          <ul className={styles.list}>
            <li>{t('terms.noServicesList.0')}</li>
            <li>{t('terms.noServicesList.1')}</li>
            <li>{t('terms.noServicesList.2')}</li>
            <li>{t('terms.noServicesList.3')}</li>
            <li>{t('terms.noServicesList.4')}</li>
          </ul>
          <p>{t('terms.noServicesNote')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('terms.use')}</h2>
          <p>{t('terms.useText')}</p>
          <ul className={styles.list}>
            <li>{t('terms.useList.0')}</li>
            <li>{t('terms.useList.1')}</li>
            <li>{t('terms.useList.2')}</li>
          </ul>
          <p>{t('terms.notUse')}</p>
          <ul className={styles.list}>
            <li>{t('terms.notUseList.0')}</li>
            <li>{t('terms.notUseList.1')}</li>
            <li>{t('terms.notUseList.2')}</li>
            <li>{t('terms.notUseList.3')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t('terms.ip')}</h2>
          <p>{t('terms.ipText')}</p>
          <ul className={styles.list}>
            <li>{t('terms.ipList.0')}</li>
            <li>{t('terms.ipList.1')}</li>
            <li>{t('terms.ipList.2')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t('terms.warranty')}</h2>
          <p>{t('terms.warrantyText')}</p>
          <ul className={styles.list}>
            <li>{t('terms.warrantyList.0')}</li>
            <li>{t('terms.warrantyList.1')}</li>
            <li>{t('terms.warrantyList.2')}</li>
            <li>{t('terms.warrantyList.3')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t('terms.liability')}</h2>
          <p>{t('terms.liabilityText')}</p>
          <ul className={styles.list}>
            <li>{t('terms.liabilityList.0')}</li>
            <li>{t('terms.liabilityList.1')}</li>
            <li>{t('terms.liabilityList.2')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t('terms.external')}</h2>
          <p>{t('terms.externalText')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('terms.changesTerms')}</h2>
          <p>{t('terms.changesTermsText')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('terms.contact')}</h2>
          <p>{t('terms.contactText')}</p>
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

export default TermsOfService;
