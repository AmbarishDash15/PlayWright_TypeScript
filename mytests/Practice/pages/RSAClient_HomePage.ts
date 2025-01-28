import { expect, type Page, type Locator } from '@playwright/test';

export class ClientHomePage {
    readonly page: Page;
    readonly pageLabel: Locator;
    readonly itemNames: Locator;
    readonly viewButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.pageLabel = this.page.locator('div h3')
        this.itemNames = this.page.locator('.card-body b')
        this.viewButton = this.page.locator('.card-body button')
    }

    async verifyHomePageLabel(labelText: string) {
        await this.page.waitForLoadState('load');
        await expect(this.pageLabel).toContainText(labelText);
    }

    async getAvailableProducts() {
        await this.page.waitForLoadState('load');
        const items: string[] = await this.itemNames.allInnerTexts();
        return items;
    }

    async clickViewButton(productName: string) {
        const loc: string = `//b[contains(text(),'${productName}')]/ancestor::div[@class='card-body']//button[contains(text(),'View')]`
        await this.page.waitForLoadState('load');
        await this.page.locator(loc).click();
    }
}