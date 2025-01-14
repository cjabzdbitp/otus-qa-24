import { Page } from 'playwright-core'

export class EditorPageClass {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async visit(slug: string | undefined) {
    await this.page.goto(`/editor/${slug}`)
  }

  async isOpen(slug: string | undefined) {
    await this.page.waitForURL(`/editor/${slug}`)
  }

  async fillTitle(title: string) {
    await this.page.getByPlaceholder('Article Title').fill(title)
  }

  async fillAbout(about: string) {
    await this.page.getByPlaceholder("What's this article about?").fill(about)
  }

  async fillContent(content: string) {
    await this.page.getByPlaceholder('Write your article (in').fill(content)
  }

  async addTags(tags: string[]) {
    await this.page.getByPlaceholder('Enter tags').fill(tags.join(' '))
  }

  async publish() {
    await this.page.getByRole('button', { name: 'Publish Article' }).click()
  }

  async createPage(title: string, about: string, content: string, tags: string[]) {
    await this.page.getByRole('link', { name: 'New Post' }).click()

    await this.fillTitle(title)
    await this.fillAbout(about)
    await this.fillContent(content)
    await this.addTags(tags)
    await this.publish()
  }

  async updatePage(slug: string, content: string) {
    await this.visit(slug)
    await this.fillContent(content)
    await this.publish()
  }

  async deletePage() {
    const responseCreatePromise = this.page.waitForResponse(request => {
      return request.url().includes('/api/articles') && request.request().method() === 'POST'
    })
    await this.publish()
    await responseCreatePromise

    const responsePromise = this.page.waitForResponse(request => {
      return request.url().includes('/api/articles') && request.request().method() === 'DELETE'
    })

    this.page.once('dialog', dialog => dialog.accept())
    await Promise.all([
      responsePromise,
      this.page.getByRole('button', { name: 'Delete Article' }).nth(1).click(),
      this.page.waitForURL('/?feed=feed')
    ])
  }
}