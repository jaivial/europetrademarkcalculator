# Frontend Task 034: Footer Component with Responsive Layout

## Metadata
- **Task**: 34 of 40
- **Area**: Frontend
- **Feature**: App Layout - Footer Component
- **Type**: create
- **Parallelizable**: true
- **Total Subtasks**: 2
- **Max Lines Per Subtask**: 400

---

## Task Overview
Create a responsive Footer component that displays links, copyright text, and social information with full i18n support for internationalization. The footer must be responsive from 200px to 3000px viewport widths, using CSS Modules for styling. All text content must use translation keys from i18next, supporting multiple languages without hardcoded strings. The footer is split into two independent subtasks: the main Footer component and its CSS Module styles.

---

## Subtasks

### Subtask 034.1: Footer Component Implementation

#### Status
status: pending

#### Objective
Create the Footer component with responsive layout, link navigation, copyright text, and full i18n integration using translation keys.

#### Context
The Footer component is a key layout element that appears on every page. It must support responsive design across all viewport widths (200px-3000px) using flexible CSS grid/flexbox layout. All text content must be internationalized using i18next translation keys, allowing the footer to display in multiple languages. The component should be self-contained, using Jotai atoms for any state if needed (no useState), and export through an index file for clean imports.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Layout/Footer.tsx` - Main Footer component
- `src/components/Layout/index.ts` - Export Footer component

#### Implementation

```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

/**
 * Footer Component
 * Displays footer with links, copyright, and responsive layout
 * Uses i18n for all text content
 *
 * Responsive breakpoints:
 * - 200px-480px: Single column layout
 * - 481px-768px: Two column layout
 * - 769px+: Three column layout with centered content
 */
export function Footer(): JSX.Element {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      {/* Main footer content container */}
      <div className={styles.footerContainer}>

        {/* Links section - responsive columns */}
        <div className={styles.linksSection}>

          {/* Product Links Column */}
          <nav className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>
              {t('footer.product.title')}
            </h3>
            <ul className={styles.linkList}>
              <li>
                <a href="/" className={styles.link}>
                  {t('footer.product.home')}
                </a>
              </li>
              <li>
                <a href="/calculator" className={styles.link}>
                  {t('footer.product.calculator')}
                </a>
              </li>
              <li>
                <a href="/features" className={styles.link}>
                  {t('footer.product.features')}
                </a>
              </li>
              <li>
                <a href="/pricing" className={styles.link}>
                  {t('footer.product.pricing')}
                </a>
              </li>
            </ul>
          </nav>

          {/* Company Links Column */}
          <nav className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>
              {t('footer.company.title')}
            </h3>
            <ul className={styles.linkList}>
              <li>
                <a href="/about" className={styles.link}>
                  {t('footer.company.about')}
                </a>
              </li>
              <li>
                <a href="/blog" className={styles.link}>
                  {t('footer.company.blog')}
                </a>
              </li>
              <li>
                <a href="/contact" className={styles.link}>
                  {t('footer.company.contact')}
                </a>
              </li>
              <li>
                <a href="/careers" className={styles.link}>
                  {t('footer.company.careers')}
                </a>
              </li>
            </ul>
          </nav>

          {/* Legal Links Column */}
          <nav className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>
              {t('footer.legal.title')}
            </h3>
            <ul className={styles.linkList}>
              <li>
                <a href="/privacy" className={styles.link}>
                  {t('footer.legal.privacy')}
                </a>
              </li>
              <li>
                <a href="/terms" className={styles.link}>
                  {t('footer.legal.terms')}
                </a>
              </li>
              <li>
                <a href="/cookies" className={styles.link}>
                  {t('footer.legal.cookies')}
                </a>
              </li>
              <li>
                <a href="/compliance" className={styles.link}>
                  {t('footer.legal.compliance')}
                </a>
              </li>
            </ul>
          </nav>

        </div>

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Bottom section - copyright and info */}
        <div className={styles.bottomSection}>

          {/* Copyright text - responsive */}
          <div className={styles.copyrightContainer}>
            <p className={styles.copyright}>
              {t('footer.copyright.text', { year: new Date().getFullYear() })}
            </p>
            <p className={styles.branding}>
              {t('footer.branding.description')}
            </p>
          </div>

          {/* Social links - responsive icons */}
          <div className={styles.socialLinks}>
            <a
              href="#twitter"
              className={styles.socialLink}
              aria-label={t('footer.social.twitter')}
              title={t('footer.social.twitter')}
            >
              <span className={styles.socialIcon}>𝕏</span>
            </a>
            <a
              href="#linkedin"
              className={styles.socialLink}
              aria-label={t('footer.social.linkedin')}
              title={t('footer.social.linkedin')}
            >
              <span className={styles.socialIcon}>in</span>
            </a>
            <a
              href="#github"
              className={styles.socialLink}
              aria-label={t('footer.social.github')}
              title={t('footer.social.github')}
            >
              <span className={styles.socialIcon}>⚙</span>
            </a>
            <a
              href="#email"
              className={styles.socialLink}
              aria-label={t('footer.social.email')}
              title={t('footer.social.email')}
            >
              <span className={styles.socialIcon}>@</span>
            </a>
          </div>

        </div>

      </div>

      {/* Version info - hidden on very small screens */}
      <div className={styles.versionInfo}>
        <small>
          {t('footer.version.label')}: <span>{t('footer.version.number')}</span>
        </small>
      </div>
    </footer>
  );
}

export default Footer;
```

#### Acceptance Criteria
- [ ] Footer component renders without errors
- [ ] All text content uses i18n translation keys
- [ ] No hardcoded text in the component
- [ ] Links section displays 3 columns of links
- [ ] Copyright section displays dynamic year
- [ ] Social links section has proper accessibility (aria-label, title)
- [ ] Component uses CSS Module for styling
- [ ] useTranslation hook properly imported and used
- [ ] Footer is exported through index.ts
- [ ] No TypeScript errors or warnings
- [ ] Component is pure functional component with proper return type JSX.Element

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run lint
# Verify no console errors when component is rendered
```

---

### Subtask 034.2: Footer CSS Module with Responsive Styles

#### Status
status: pending

#### Objective
Create responsive CSS Module for Footer component supporting 200px-3000px viewport widths with flexible layout.

#### Context
The Footer.module.css file provides all styling for the Footer component using CSS Module scoped classes. The styles must be responsive across extreme viewport widths (200px minimum to 3000px maximum) using CSS Grid and Flexbox. Three main responsive breakpoints are implemented: mobile (200-480px), tablet (481-768px), and desktop (769px+). The CSS uses CSS custom properties (variables) for consistent spacing and colors that align with the design system. All layout is fluid and flexible to support the wide range of viewport sizes.

#### Files to Create/Modify (Exclusive Ownership)
- `src/components/Layout/Footer.module.css` - Responsive styles for Footer

#### Implementation

```css
/* Footer Component Styles - Responsive 200px-3000px */

:root {
  --footer-bg-light: #ffffff;
  --footer-bg-dark: #1a1a1a;
  --footer-text-light: #333333;
  --footer-text-dark: #e0e0e0;
  --footer-border-light: #e0e0e0;
  --footer-border-dark: #333333;
  --footer-link-color-light: #0066cc;
  --footer-link-color-dark: #66b3ff;
  --footer-link-hover-light: #0052a3;
  --footer-link-hover-dark: #99d1ff;
}

.footer {
  width: 100%;
  background-color: var(--footer-bg-light);
  color: var(--footer-text-light);
  border-top: 1px solid var(--footer-border-light);
  margin-top: auto;
  padding: 2rem 1rem;
  font-size: clamp(0.75rem, 2vw, 1rem);
  transition: background-color 0.3s ease, color 0.3s ease;
}

@media (prefers-color-scheme: dark) {
  .footer {
    background-color: var(--footer-bg-dark);
    color: var(--footer-text-dark);
    border-top-color: var(--footer-border-dark);
  }
}

.footerContainer {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 2rem);
}

/* Links Section - Main Content Area */
.linksSection {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(120px, 30vw, 250px), 1fr));
  gap: clamp(1rem, 4vw, 2.5rem);
  padding: 0 clamp(0.5rem, 2vw, 1.5rem);
}

/* Individual Link Column */
.linkColumn {
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1.5vw, 1rem);
}

.columnTitle {
  font-size: clamp(0.9rem, 2.5vw, 1.1rem);
  font-weight: 600;
  margin: 0;
  padding: 0;
  letter-spacing: 0.5px;
}

.linkList {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.4rem, 1vw, 0.8rem);
}

.link {
  color: var(--footer-link-color-light);
  text-decoration: none;
  font-size: clamp(0.75rem, 2vw, 0.95rem);
  transition: color 0.2s ease;
  display: inline-block;
  word-break: break-word;
}

.link:hover,
.link:focus {
  color: var(--footer-link-hover-light);
  text-decoration: underline;
  outline: 2px solid transparent;
}

.link:focus-visible {
  outline: 2px solid var(--footer-link-color-light);
  outline-offset: 2px;
}

@media (prefers-color-scheme: dark) {
  .link {
    color: var(--footer-link-color-dark);
  }

  .link:hover,
  .link:focus {
    color: var(--footer-link-hover-dark);
  }

  .link:focus-visible {
    outline-color: var(--footer-link-color-dark);
  }
}

/* Divider */
.divider {
  width: 100%;
  border: none;
  border-top: 1px solid var(--footer-border-light);
  margin: clamp(0.5rem, 2vw, 1rem) 0;
  opacity: 0.5;
}

@media (prefers-color-scheme: dark) {
  .divider {
    border-top-color: var(--footer-border-dark);
  }
}

/* Bottom Section - Copyright and Social */
.bottomSection {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 2rem);
  padding: 0 clamp(0.5rem, 2vw, 1.5rem);
}

/* Copyright Container */
.copyrightContainer {
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.8rem);
  text-align: center;
}

.copyright {
  margin: 0;
  padding: 0;
  font-size: clamp(0.7rem, 1.8vw, 0.9rem);
  opacity: 0.8;
}

.branding {
  margin: 0;
  padding: 0;
  font-size: clamp(0.65rem, 1.5vw, 0.85rem);
  opacity: 0.6;
  font-style: italic;
}

/* Social Links */
.socialLinks {
  display: flex;
  justify-content: center;
  gap: clamp(1rem, 3vw, 2rem);
  flex-wrap: wrap;
}

.socialLink {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(2.5rem, 6vw, 3rem);
  height: clamp(2.5rem, 6vw, 3rem);
  border-radius: 50%;
  background-color: rgba(0, 102, 204, 0.1);
  color: var(--footer-link-color-light);
  text-decoration: none;
  transition: all 0.2s ease;
  font-weight: 600;
  font-size: clamp(0.9rem, 2.5vw, 1.2rem);
}

.socialLink:hover,
.socialLink:focus {
  background-color: rgba(0, 102, 204, 0.2);
  transform: scale(1.1);
}

.socialLink:focus-visible {
  outline: 2px solid var(--footer-link-color-light);
  outline-offset: 2px;
}

@media (prefers-color-scheme: dark) {
  .socialLink {
    background-color: rgba(102, 179, 255, 0.1);
    color: var(--footer-link-color-dark);
  }

  .socialLink:hover,
  .socialLink:focus {
    background-color: rgba(102, 179, 255, 0.2);
  }

  .socialLink:focus-visible {
    outline-color: var(--footer-link-color-dark);
  }
}

.socialIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: 600;
}

/* Version Info */
.versionInfo {
  width: 100%;
  text-align: center;
  padding: 0 clamp(0.5rem, 2vw, 1.5rem);
  font-size: clamp(0.6rem, 1.3vw, 0.8rem);
  opacity: 0.5;
  margin-top: clamp(0.5rem, 1.5vw, 1rem);
}

.versionInfo span {
  font-weight: 600;
  opacity: 0.7;
}

/* Ultra-small screens optimization (200px-320px) */
@media (max-width: 320px) {
  .footer {
    padding: 1.5rem 0.75rem;
  }

  .footerContainer {
    gap: 1rem;
  }

  .linksSection {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .linkList {
    gap: 0.4rem;
  }

  .socialLinks {
    gap: 0.8rem;
  }

  .copyrightContainer {
    gap: 0.4rem;
  }
}

/* Small screens (321px-480px) */
@media (min-width: 321px) and (max-width: 480px) {
  .linksSection {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Medium screens (481px-768px) */
@media (min-width: 481px) and (max-width: 768px) {
  .linksSection {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Large screens (769px+) */
@media (min-width: 769px) {
  .linksSection {
    grid-template-columns: repeat(3, 1fr);
  }

  .bottomSection {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .copyrightContainer {
    text-align: left;
    flex: 1;
  }

  .socialLinks {
    justify-content: flex-end;
  }
}

/* Extra large screens (1400px+) */
@media (min-width: 1400px) {
  .footerContainer {
    padding: 0 2rem;
  }

  .linksSection {
    grid-template-columns: repeat(3, 1fr);
    padding: 0;
  }

  .bottomSection {
    padding: 0;
  }
}

/* Print styles */
@media print {
  .footer {
    page-break-inside: avoid;
    border-top: 2px solid #000;
  }

  .socialLinks {
    display: none;
  }

  .link {
    color: #000;
  }
}

/* Reduced motion accessibility */
@media (prefers-reduced-motion: reduce) {
  .link,
  .footer,
  .socialLink {
    transition: none;
  }

  .socialLink:hover {
    transform: none;
  }
}
```

#### Acceptance Criteria
- [ ] CSS Module file created at correct path
- [ ] Footer displays correctly at 200px viewport width
- [ ] Footer displays correctly at 480px viewport width
- [ ] Footer displays correctly at 768px viewport width
- [ ] Footer displays correctly at 1920px viewport width
- [ ] Footer displays correctly at 3000px viewport width
- [ ] Responsive layout changes at appropriate breakpoints
- [ ] Dark mode support implemented
- [ ] All spacing uses clamp() for fluid scaling
- [ ] No horizontal scroll on any viewport width
- [ ] Accessibility features present (focus states, outline)
- [ ] Print styles included
- [ ] Reduced motion support included
- [ ] All CSS custom properties (variables) defined

#### Verification Commands
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run lint
# Test at multiple viewport widths:
# 200px, 320px, 480px, 768px, 1024px, 1920px, 3000px
```

---

## Task Dependencies

### This Task Owns (Do Not Touch in Other Tasks)
- `src/components/Layout/Footer.tsx`
- `src/components/Layout/Footer.module.css`
- `src/components/Layout/index.ts` (Footer export section)

### Imports From Existing Code
- `useTranslation` from `react-i18next` (existing dependency)
- i18n translation keys: `footer.*` namespace (must be created in i18n task)

### Exports For Other Code
- `Footer` component exported through `@/components/Layout`
- Can be imported as: `import { Footer } from '@/components/Layout'`

---

## Task-Level Verification
```bash
cd /home/jaime/Documents/projects/saas/saas/brand-calculator
npm run type-check
npm run lint
# Verify Footer component:
# - Renders without errors
# - All i18n keys resolve correctly
# - Layout is responsive at multiple viewport widths
# - Dark mode toggle works
# - All links are clickable
# - Social icons are accessible
# - No console warnings
```

---

## Parallelization Notes
- Subtask 034.1 (Component) and Subtask 034.2 (Styles) are fully independent
- Component can be implemented while styles are being created
- Styles can be refined independently without affecting component logic
- Both subtasks can run in parallel without blocking each other
- Each subtask owns exclusive files with no overlap
- No subtask depends on the other subtask's output
- Files can be created in any order
- i18n translation keys must exist before component is rendered (separate task dependency)
