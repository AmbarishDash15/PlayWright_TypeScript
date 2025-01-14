import { expect, type Page, type Locator } from '@playwright/test'

export class LoginPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly userTypeAdmin: Locator;
    readonly userTypeUser: Locator;
    readonly courseType: Locator;
    readonly cotermsChkBx: Locator;
    readonly signInBtn: Locator;
    readonly userNameHelp: Locator;
    readonly passwordHelp: Locator;
    readonly errorMessage: Locator;

    constructor( page: Page) {
        this.page = page;
        this.userName = page.locator('#username');
        this.passWord = page.locator('#password');
        this.userTypeAdmin = page.locator('[type="radio"][value="admin"]');
        this.userTypeUser = page.locator('[type="radio"][value="user"]');
        this.courseType = page.locator('.form-control');
        this.cotermsChkBx = page.locator('#terms');
        this.signInBtn = page.locator('#signInBtn');
        this.userNameHelp = page.locator('b:nth-child(1) > i');
        this.passwordHelp = page.locator('b:nth-child(2) > i');
        this.errorMessage = page.locator('[style*="block"]')
    }
    

    async navigate() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async fillLoginFormValid() {
        const userNameExtracted: string = await this.userNameHelp.innerText();
        const passwordExtracted: string = await this.passwordHelp.innerText();
        await this.userName.fill(userNameExtracted);
        await this.passWord.fill(passwordExtracted);
        await this.userTypeAdmin.click();
        await this.cotermsChkBx.check();
    }

    async fillLoginFormInvalid(wrongUserName: string, wrongPassword: string) {
        await this.userName.fill(wrongUserName);
        await this.passWord.fill(wrongPassword);
        // await this.userTypeAdmin.click();
        // await this.cotermsChkBx.check();
    }

    async clickLoginButton() {
        await this.signInBtn.click();
    }

    async verifyLoginError() {
        console.log(await this.errorMessage.innerText());
        await expect(this.errorMessage).toContainText('Incorrect');
    }
}