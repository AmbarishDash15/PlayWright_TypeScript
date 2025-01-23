import { expect, type Page, type Locator } from '@playwright/test'

export class DocumentRequestPage {
    readonly page: Page;
    readonly pageBanner: Locator;
    readonly emailText: Locator;

    constructor (page: Page) {
        this.page = page;
        this.pageBanner = page.locator('h1');
        this.emailText = page.locator('.im-para.red');
    }

    async checkPageBanner () {
        await expect(this.pageBanner).toContainText('Documents request');
    }

    async getDomainName () {
        const fullString: string = (await this.emailText.innerText()).split('@')[1].split(' ')[0]
        // const stringArr: string[] = fullString.split('@');
        // const domainArr: string[] = stringArr[1].split(' ');
        return fullString;
    }
}