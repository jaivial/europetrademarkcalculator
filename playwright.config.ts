import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Layer 7 Visual & Responsive UX Tests
 *
 * Tests responsive design across 5 breakpoint ranges:
 * - XS: 200px-479px (mobile phones)
 * - SM: 480px-767px (large phones, small tablets)
 * - MD: 768px-1023px (tablets, small laptops)
 * - LG: 1024px-1919px (laptops, desktops)
 * - XL: 1920px-3000px (large monitors, 4K displays)
 */
export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'sprints/layer7-visual-ux/playwright-report' }],
    ['json', { outputFile: 'sprints/layer7-visual-ux/results.json' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:3001',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // XS Breakpoint: 200px - 479px
    {
      name: 'xs-200',
      use: { ...devices['iPhone SE'], viewport: { width: 200, height: 800 } },
    },
    {
      name: 'xs-320',
      use: { ...devices['iPhone SE'], viewport: { width: 320, height: 568 } },
    },
    {
      name: 'xs-400',
      use: { ...devices['iPhone SE'], viewport: { width: 400, height: 700 } },
    },

    // SM Breakpoint: 480px - 767px
    {
      name: 'sm-480',
      use: { ...devices['Pixel 5'], viewport: { width: 480, height: 800 } },
    },
    {
      name: 'sm-600',
      use: { ...devices['Pixel 5'], viewport: { width: 600, height: 900 } },
    },
    {
      name: 'sm-700',
      use: { ...devices['Pixel 5'], viewport: { width: 700, height: 1000 } },
    },

    // MD Breakpoint: 768px - 1023px
    {
      name: 'md-768',
      use: { ...devices['iPad Mini'], viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'md-900',
      use: { ...devices['iPad Mini'], viewport: { width: 900, height: 1100 } },
    },
    {
      name: 'md-1000',
      use: { ...devices['iPad Mini'], viewport: { width: 1000, height: 1200 } },
    },

    // LG Breakpoint: 1024px - 1919px
    {
      name: 'lg-1024',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 768 } },
    },
    {
      name: 'lg-1280',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'lg-1600',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1600, height: 900 } },
    },

    // XL Breakpoint: 1920px - 3000px
    {
      name: 'xl-1920',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'xl-2560',
      use: { ...devices['Desktop Chrome'], viewport: { width: 2560, height: 1440 } },
    },
    {
      name: 'xl-3000',
      use: { ...devices['Desktop Chrome'], viewport: { width: 3000, height: 1600 } },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3001',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
