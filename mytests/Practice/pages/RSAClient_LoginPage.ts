import { expect, type Page, type Locator } from '@playwright/test';

export class ClientLoginPage {
    readonly page: Page;
    readonly loginBanner: Locator;
    readonly eMailTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly loginButton: Locator;
    readonly forgotPasswordLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginBanner = page.locator('h1.login-title');
        this.eMailTextbox = page.locator('#userEmail');
        this.passwordTextbox = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
        this.forgotPasswordLink = page.getByText('Forgot password?');
    }

    async navigate() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }

    async verifyPageTitle(pageTitle: string) {
        expect(await this.page.title()).toBe(pageTitle);
    }

    async verufyLoginBanner() {
        await expect(this.loginBanner).toContainText('Log in');
    }
    
    async enterEmail(validEmail: string) {
        await this.eMailTextbox.fill(validEmail);
    }

    async enterPassword(password: string) {
        await this.passwordTextbox.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async clickForgotPassword() {
        await this.forgotPasswordLink.click();
    }
}