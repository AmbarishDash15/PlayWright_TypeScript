import { expect, type Page, type Locator} from '@playwright/test'
import { LoginPage } from './LoginPage'

export class HomePage {
    readonly page: Page;
    readonly homePageBanner: Locator;
    readonly productList: Locator;
    readonly checkOutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.homePageBanner = page.locator('.navbar-brand').first();
        this.productList = page.locator('.card-title a');
        this.checkOutButton = page.locator('.nav-link.btn.btn-primary');
    }
    async verifyLoginSuccess() {
        await expect(this.homePageBanner).toBeVisible();
    }
    async verifyProductAvailability(productName: string) {
        const productListArr: string[] = await this.productList.allTextContents();
        expect(await productListArr).toContain(productName);
    }
    async getAllProductsAvailable() {
        const productListArr: string[] = await this.productList.allTextContents();
        for (var index in productListArr) {
            console.log(await productListArr[index])
        }
    }
    async checkPriceOfProduct(productName: string, productPrice: string) {
        const loc = `//a[contains(text(),"${productName}")]/ancestor::div[@class='card-body']//h5`;
        await expect (this.page.locator(loc)).toContainText(productPrice);
    }
    async addProductToCart(productName: string) {
        const loc = `//a[contains(text(),"${productName}")]/ancestor::div[@class='card h-100']//button`;
        await this.page.locator(loc).click();
    }
    async verifyProductCount(productsAdded: string) {
        // console.log(await this.checkOutButton.innerText());
        await expect(this.checkOutButton).toContainText(productsAdded);
    }

}