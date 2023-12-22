/* eslint no-process-env: 0 */
import { chromium, expect, test as setup } from '@playwright/test';
import dotenv from 'dotenv';

import Logger from '@/utils/Logger';

import { fetchLoginCode } from './utils';

dotenv.config();

const authFile = 'playwright-auth/admin.json';

setup.use({
  locale: 'en-GB',
  timezoneId: 'Europe/Berlin',
});
setup('authenticate', async () => {
  const userName = process.env.TEST_E2E_EMAIL_ADMIN!;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/');
  await page.waitForLoadState('load');
  await page.locator('[data-test-id="login-button"]').click();
  await page.locator('[id="username"]').fill(userName);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();

  const loginCode = await fetchLoginCode(userName);
  await page.locator('[id="code"]').fill(loginCode!);
  await page.getByRole('button', { name: 'Continue', exact: true }).click();

  await page.waitForURL('/');

  await page.goto('/user');
  await page.waitForLoadState('networkidle');
  await expect(page.getByText(userName).first()).toBeVisible();
  await context.storageState({ path: authFile });
  Logger.info({ namespace: 'testing.auth' }, 'Auth Complete');
});
