import { expect, type Page, type Locator } from '@playwright/test';

export class ClientProductDetailsPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productImage: Locator;
    readonly contShopBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = this.page.locator('div h2');
        this.productImage = this.page.locator('div img');
        this.contShopBtn = this.page.locator('div a.continue');
    }

    async checkProductName(productName: string) {
        await this.page.waitForLoadState('load');
        await expect(this.productName).toContainText(productName);
    }
    
    async checkProductImage(productName: string) {
        await this.page.waitForLoadState('load');
        await expect(this.productName).toContainText(productName);
        await expect(this.productImage).toHaveJSProperty('complete',true);
        await expect(this.productImage).toHaveScreenshot();
    }

    async clickContinueShopping() {
        await this.page.waitForLoadState('load');
        await this.contShopBtn.click();
    }
}