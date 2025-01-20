import { expect, type Page, type Locator } from '@playwright/test';

export class ClientForgotPasswordPage {
    readonly page: Page;
    readonly pageLabel: Locator;
    readonly eMailInputBox: Locator;
    readonly passwordInputBox: Locator;

    constructor (page: Page) {
        this.page = page;
        this.pageLabel = this.page.locator('.card-title.text-center');
        this.eMailInputBox = this.page.locator('input[type="email"]');
        this.passwordInputBox = this.page.locator('#userPassword');
    }

    async verifyPageLabel(labelString: string){
        expect(await this.pageLabel).toContainText(labelString);
    }
}