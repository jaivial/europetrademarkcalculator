import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as JotaiProvider } from 'jotai';
import { useTranslation } from 'react-i18next';
import { I18nProvider } from '@/providers/I18nProvider';
import AppLayout from '@/components/Layout/AppLayout';
import { TabNavigation } from '@/components/Navigation/TabNavigation';
import { EuropeMap } from '@/components/EuropeMap/EuropeMap';
import { CountryList } from '@/components/CountryList/CountryList';
import { CountryPanel } from '@/components/CountryPanel/CountryPanel';
import { TabContent } from '@/components/Navigation/TabContent';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { TermsOfService } from '@/pages/TermsOfService';
import { CookiePolicy } from '@/pages/CookiePolicy';
import { LanguageRedirect } from '@/components/routing/LanguageRedirect';
import { LanguageWrapper } from '@/components/routing/LanguageWrapper';
import { useAtomValue } from 'jotai';
import { selectedCountryAtom } from '@/atoms/countryAtom';
import './App.css';

/**
 * Root Application Component
 *
 * Provider Hierarchy:
 * BrowserRouter (routing)
 *   └─ JotaiProvider (state management)
 *       └─ I18nProvider (internationalization)
 *           └─ Routes (page routing)
 *
 * Uses Jotai atoms exclusively for state management:
 * - activeTabAtom: tracks active tab (world-map, country-list)
 * - selectedCountryAtom: tracks selected country for calculator
 *
 * Routes (Internationalized with SEO-friendly slugs):
 * - / : Redirects to detected language (e.g., /en/, /es/, /fr/)
 * - /:lang/ : Main calculator page (e.g., /en/, /es/privacy)
 * - /:lang/privacy : Privacy Policy in selected language
 * - /:lang/terms : Terms of Service in selected language
 * - /:lang/cookies : Cookie Policy in selected language
 *
 * SEO Benefits:
 * - Each language has unique URLs (Google can index separately)
 * - hreflang tags can reference specific language versions
 * - Better regional search rankings
 * - Clear content targeting for different markets
 *
 * Supported Languages:
 * en, es, fr, de, it, pt, nl, pl, sv, el
 */
export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <JotaiProvider>
        <I18nProvider>
          <Routes>
            {/* Root redirect - detects language and redirects to /:lang/ */}
            <Route path="/" element={<LanguageRedirect />} />

            {/* Language-prefixed routes */}
            <Route path="/:lang" element={<LanguageWrapper />}>
              {/* Home page */}
              <Route index element={
                <AppLayout>
                  <MainContent />
                </AppLayout>
              } />

              {/* Legal pages */}
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsOfService />} />
              <Route path="cookies" element={<CookiePolicy />} />
            </Route>
          </Routes>
        </I18nProvider>
      </JotaiProvider>
    </BrowserRouter>
  );
};

/**
 * Main Content Component
 *
 * Renders the active tab content and conditionally shows the Calculator
 * when a country is selected. Uses Jotai atoms for all state.
 *
 * Tab Content Rendering Notes:
 *
 * Active Tab Management:
 * - activeTabAtom tracks current tab (world-map or country-list)
 * - useAtomValue reads the atom (read-only, no re-renders on other changes)
 * - TabContent controls visibility based on id prop
 *
 * TabContent Behavior:
 * - Only renders children when id matches active tab
 * - Applies active state CSS for animations
 * - Updates aria-hidden for screen readers
 *
 * Component Display:
 * - world-map tab: Shows WorldMap3D with interactive globe
 * - country-list tab: Shows CountryList with searchable list
 *
 * Calculator Display Logic:
 *
 * Country Selection Flow:
 * 1. User selects country in WorldMap3D or CountryList
 * 2. countrySelection component updates selectedCountryAtom
 * 3. selectedCountryAtom contains:
 *    - code: ISO country code (e.g., 'DE', 'FR', 'IT')
 *    - name: Display name (e.g., 'Germany', 'France')
 *    - continent: Geographic region
 *    - pricing: Base pricing data for that country
 *
 * Calculator Visibility:
 * - Conditional rendering: {selectedCountry && <Calculator ... />}
 * - When null/undefined: Calculator hidden
 * - When set: Calculator renders and becomes interactive
 *
 * User Flow:
 * 1. Click tab in TabNavigation
 * 2. activeTabAtom updates via setActiveTab
 * 3. MainContent re-reads activeTabAtom
 * 4. TabContent shows/hides based on active tab
 * 5. Content transitions smoothly via CSS animations
 */
const MainContent: React.FC = () => {
  const { t } = useTranslation('common');
  const selectedCountry = useAtomValue(selectedCountryAtom);

  return (
    <div className="app-main-content">
      {/* App Title - Centered above tabs */}
      <h1 className="app-title">
        {t('appTitle', { defaultValue: 'EU Brand Calculator' })}
      </h1>

      {/* Tab Navigation - Always visible, allows tab switching */}
      <TabNavigation />

      {/* Main Content Area - Split layout when country selected */}
      <div className={`app-content-wrapper ${selectedCountry ? 'has-panel' : ''}`}>
        {/* Left Side - Map or List */}
        <div className="app-map-section">
          {/* World Map Tab Content */}
          <TabContent
            id="world-map"
            ariaLabel="World Map View - Interactive 3D globe showing countries"
          >
            <EuropeMap />
          </TabContent>

          {/* Country List Tab Content */}
          <TabContent
            id="country-list"
            ariaLabel="Country List View - Searchable list of countries"
          >
            <CountryList />
          </TabContent>
        </div>

        {/* Right Side - Country Panel with options (shows when country selected) */}
        {selectedCountry && (
          <div className="app-panel-section">
            <CountryPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
