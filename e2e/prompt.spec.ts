import { test, expect } from '@playwright/test'

test('generates chart with citations', async ({ page }) => {
  await page.addInitScript(() => {
    (window as Window & { __TEST_ID__: string }).__TEST_ID__ = 'test'
  })
  await page.goto('/')
  await page.fill('[data-testid="prompt-input"]', 'hello')
  await page.click('[data-testid="submit-button"]')
  await page.waitForURL('**/site/test')
  await page.waitForSelector('figure')
  await expect(page.locator('ol li')).toHaveCount(2)
})
