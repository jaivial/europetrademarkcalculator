import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLanguageNavigation } from '@/hooks/useLanguageNavigation';
import styles from './LegalPage.module.css';

/**
 * Privacy Policy Page
 * Educational/non-profit project by Jaime Villanueva Acon / Jaime Digital Studio
 * Now with language-aware navigation and full i18n support
 */
export function PrivacyPolicy(): JSX.Element {
  const { t } = useTranslation('legal');
  const { getPath } = useLanguageNavigation();

  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <Link to={getPath('')} className={styles.backLink}>
          ← {t('backToHome')}
        </Link>

        <h1 className={styles.title}>{t('privacy.title')}</h1>
        <p className={styles.lastUpdated}>{t('lastUpdated')}</p>

        <section className={styles.section}>
          <h2>{t('privacy.introduction')}</h2>
          <p>{t('privacy.introText1')}</p>
          <p><strong>{t('privacy.importantNotice')}</strong> {t('privacy.introText2')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('privacy.noCollect')}</h2>
          <p>{t('privacy.noCollectText')}</p>
          <ul className={styles.list}>
            <li>{t('privacy.noCollectList.0')}</li>
            <li>{t('privacy.noCollectList.1')}</li>
            <li>{t('privacy.noCollectList.2')}</li>
            <li>{t('privacy.noCollectList.3')}</li>
            <li>{t('privacy.noCollectList.4')}</li>
            <li>{t('privacy.noCollectList.5')}</li>
            <li>{t('privacy.noCollectList.6')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t('privacy.localStorage')}</h2>
          <p>{t('privacy.localStorageText')}</p>
          <ul className={styles.list}>
            <li>{t('privacy.localStorageList.0')}</li>
            <li>{t('privacy.localStorageList.1')}</li>
          </ul>
          <p>{t('privacy.localStorageNote')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('privacy.thirdParty')}</h2>
          <p>{t('privacy.thirdPartyText')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('privacy.educational')}</h2>
          <p>{t('privacy.educationalText')}</p>
          <ul className={styles.list}>
            <li>{t('privacy.educationalList.0')}</li>
            <li>{t('privacy.educationalList.1')}</li>
            <li>{t('privacy.educationalList.2')}</li>
            <li>{t('privacy.educationalList.3')}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t('privacy.children')}</h2>
          <p>{t('privacy.childrenText')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('privacy.changes')}</h2>
          <p>{t('privacy.changesText')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('privacy.contact')}</h2>
          <p>{t('privacy.contactText')}</p>
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

export default PrivacyPolicy;
