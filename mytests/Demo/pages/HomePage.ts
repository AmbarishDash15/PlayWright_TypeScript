import { expect, type Page, type Locator} from '@playwright/test'
import { LoginPage } from './LoginPage'

export class HomePage {
    readonly page: Page;
    readonly homePageBanner: Locator;
    readonly productList: Locator;
    constructor(page: Page) {
        this.page = page;
        this.homePageBanner = page.locator('.navbar-brand').first();
        this.productList = page.locator('.card-body a');
    }
    async verifyLoginSuccess() {
        await expect(this.homePageBanner).toBeVisible();
    }
    async verifyProductAvailability(productName: string) {
        // const productListArr: string[] = await this.productList.allTextContents();
        // await expect(productListArr).toContain(productName);
        expect(await this.productList.allTextContents()).toContain(productName);
    }
    async getAllProductAvailable() {
        const productListArr: string[] = await this.productList.allTextContents();
        for (var index in productListArr) {
            console.log(await productListArr[index])
        }
    }
    async checkPriceOfProduct(productName: string, productPrice: string) {
        const loc = `//a[contains(text(),"${productName}")]/ancestor::div[@class='card-body']//h5`;
        expect (await this.page.locator(loc)).toContainText(productPrice);
    }
}