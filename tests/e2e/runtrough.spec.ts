import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })

  await page.goto('/forpeople')
  await page.getByRole('button', { name: "Jdu na to" }).click()

  await page.getByRole('button', { name: 'Pokračovat' }).click()

  await page.getByRole('button', { name: 'ano' }).click()
  await page.getByRole('button', { name: 'Přeskočit otázku' }).click()

  await expect(page.getByText('3 /')).toBeVisible()

  for (let i = 2; i < 18; i++) {
    await page.getByRole('button', { name: 'ano' }).click()
  }

  expect(page.getByRole('heading', { name: '1. Klima a energetika' })).toBeVisible()
  expect(
    page.getByRole('heading', { name: '19. Bydlení a sociální politika' }),
  ).toBeVisible()

  await expect(page.locator('form input[type="checkbox"]')).toHaveCount(17)

  await page.getByRole('button', { name: 'Pokračovat' }).first().click()

  await expect(page.getByLabel('Výsledek').getByRole('heading')).toContainText(
    'Shoda s Vašimi preferencemi',
  )

  await page.getByRole('tab', { name: 'Přehled odpovědí' }).click()
  await expect(
    page.getByLabel('Přehled odpovědí').getByRole('heading'),
  ).toContainText('Srovnání')

  await expect(
    page.locator('tr:nth-child(1) > td:nth-child(2) span'),
  ).toHaveText('ano')
  await expect(
    page.locator('tr:nth-child(2) > td:nth-child(2) span'),
    ).toHaveText('nezodpovězeno')

  await page.getByRole('tab', { name: 'Komentáře kandidujících' }).click()
  await expect(page.getByLabel('Komentáře kandidujících').locator('h2')).toContainText(
    'Komentáře k odpovědím',
  )
  await expect(page.getByLabel('Přejít na otázku')).toHaveValue('0')

  await page.getByRole('button', { name: 'Další' }).click()
  await expect(page.getByLabel('Přejít na otázku')).toHaveValue('1')

  await page.getByRole('link', { name: 'Vyber si Olomouc' }).click()
  await expect(page.getByRole('button', { name: "Jdu na to" })).toBeVisible()

  await page.getByRole('button', { name: "Jdu na to" }).click()
  await page.getByRole('button', { name: 'Pokračovat' }).click()
  await expect(page.getByRole('article')).toContainText('18 / 18')

  page.on('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'Začít znovu' }).click()
  await expect(page.getByRole('button', { name: "Jdu na to" })).toBeVisible()
})
