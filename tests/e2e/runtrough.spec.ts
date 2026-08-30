import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })

  await page.goto('/')
  await page.getByRole('button', { name: "Los geht's!" }).click()

  await page.getByRole('button', { name: 'Weiter' }).click()

  await page.getByRole('button', { name: 'ja, finde ich auch' }).click()
  await page.getByRole('button', { name: 'Přeskočit otázku' }).click()

  await expect(page.getByText('3 /')).toBeVisible()

  for (let i = 0; i < 18; i++) {
    await page.getByRole('button', { name: 'ja, finde ich auch' }).click()
  }

  expect(page.getByRole('heading', { name: '1. Arbeit' })).toBeVisible()
  expect(
    page.getByRole('heading', { name: '20. Landwirtschaft' }),
  ).toBeVisible()

  await expect(page.locator('form input[type="checkbox"]')).toHaveCount(19)

  await page.getByRole('button', { name: 'Weiter' }).first().click()

  await expect(page.getByLabel('Výsledek').getByRole('heading')).toContainText(
    'Ihr Vyber si Olomouc Výsledek',
  )

  await page.getByRole('tab', { name: 'Přehled odpovědí' }).click()
  await expect(
    page.getByLabel('Přehled odpovědí').getByRole('heading'),
  ).toContainText('Vergleich')

  await expect(
    page.locator('tr:nth-child(1) > td:nth-child(2) span'),
  ).toHaveText('ja, finde ich auch')
  await expect(
    page.locator('tr:nth-child(2) > td:nth-child(2) span'),
  ).toHaveText('Position nicht wertbar')

  await page.getByRole('tab', { name: 'Komentáře kandidujících' }).click()
  await expect(page.getByLabel('Komentáře kandidujících').locator('h2')).toContainText(
    'Begründung der Thesen',
  )
  await expect(page.getByLabel('Springe zur These')).toHaveValue('0')

  await page.getByRole('button', { name: 'Weiter' }).click()
  await expect(page.getByLabel('Springe zur These')).toHaveValue('1')

  await page.getByRole('link', { name: 'Vyber si Olomouc' }).click()
  await expect(page.getByRole('button', { name: "Los geht's!" })).toBeVisible()

  await page.getByRole('button', { name: "Los geht's!" }).click()
  await page.getByRole('button', { name: 'Weiter' }).click()
  await expect(page.getByRole('article')).toContainText('20 / 20')

  page.on('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'Neustarten' }).click()
  await expect(page.getByRole('button', { name: "Los geht's!" })).toBeVisible()
})
