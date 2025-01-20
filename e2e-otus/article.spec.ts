import { test, expect } from '@playwright/test'
import { EditorPageClass, loginUser } from '../framework'

test.beforeEach(async ({ page }) => {
  await loginUser(page)
})

test('Создание страницы', async ({ page }) => {
  const editorPage = new EditorPageClass(page)

  await editorPage.createPage('article title', 'about article', 'article content', ['e2e'])

  await expect(page.getByRole('heading')).toContainText('article title')
  await expect(page.getByRole('button', { name: 'Delete Article' }).nth(1)).toBeVisible()
})

test('Обновление страницы', async ({ page }) => {
  const editorPage = new EditorPageClass(page)

  await page.goto('/article/e2e-update-kak-testirovat')
  await page.getByRole('button', { name: 'Edit Article' }).first().click()

  await editorPage.updatePage('e2e-update-kak-testirovat', '[E2E] [Update] Как тестировать EDIT')

  await expect(page.getByText('[E2E] [Update] Как тестировать EDIT')).toBeVisible()

  await editorPage.updatePage('e2e-update-kak-testirovat', '[E2E] [Update] Как тестировать UPDATED')

  await expect(page.getByText('[E2E] [Update] Как тестировать UPDATED')).toBeVisible()
})

test('Удаление страницы', async ({ page }) => {
  const editorPage = new EditorPageClass(page)

  await editorPage.createPage('Article for delete', 'Эта статья должна быть удалена! Такая вот судьба', 'Эта статья должна быть удалена! Такая вот судьба', ['E2E'])

  await editorPage.deletePage()
})