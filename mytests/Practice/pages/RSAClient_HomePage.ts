import { expect, type Page, type Locator } from '@playwright/test';

export class ClientHomePage {
    readonly page: Page;
    readonly pageLabel: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.pageLabel = this.page.locator('div h3')
    }

    async verifyHomePageLabel(labelText: string) {
        await expect(this.pageLabel).toContainText(labelText);
    }
}