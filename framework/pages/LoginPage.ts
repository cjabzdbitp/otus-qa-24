import type { Page } from 'playwright-core'
import { expect } from '@playwright/test'

export function LoginPage({ page }: { page: Page }) {
  const visit = async () => {
    await page.goto('/login')
  }

  const fillEmail = async (email: string) => {
    await page.getByTestId('input-email').fill(email)
  }

  const fillPassword = async (password: string) => {
    await page.getByTestId('input-password').fill(password)
  }

  const submit = async () => {
    await page.getByTestId('btn-submit').click()
  }

  const login = async ({ email, password }: { email: string; password: string }) => {
    await visit()
    await fillEmail(email)
    await fillPassword(password)
    await submit()
    await expect(page).toHaveURL('/?feed=feed')
  }

  return {
    visit,
    fillEmail,
    fillPassword,
    submit,
    login
  }
}