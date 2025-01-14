import { expect, type Page, type Locator} from '@playwright/test'

export class ShoppingCartPage {
    readonly page: Page;
    readonly productName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('h4 a');
    }

    async verifyProductInCart(productName: string) {
        expect(await this.productName).toContainText(productName);
    }
}