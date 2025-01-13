import { expect, type Page, type Locator} from '@playwright/test'
import { LoginPage } from './LoginPage'

export class HomePage {
    readonly page: Page;
    readonly homePageBanner: Locator;
    readonly productList: Locator;
    constructor(page: Page) {
        this.page = page;
        this.homePageBanner = page.locator('.navbar-brand').first();
        this.productList = page.locator('.card-title a');
    }
}