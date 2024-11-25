import { test, expect, Browser, Page, Locator, webkit, chromium, firefox } from '@playwright/test'
import { HomePage } from './homePage';

export class LoginPage {
    private page: Page;
    private environmentName = '.ids-login-sp__sp-name > h1'
    private usernameInput = '#j_username';
    private passwordInput = '#j_password';
    private loginButton = 'text=Continue';
  
    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async getEnvironmentName(): Promise<string> {
        const innerText:string = await this.page.innerText(this.environmentName);
        return innerText;
    }

    async enterUsername(username: string): Promise<void> {
        await this.page.fill(this.usernameInput, username);
    }
    
    // Method to fill password
    async enterPassword(password: string): Promise<void> {
        await this.page.fill(this.passwordInput, password);
    }

    // Method to click on the login button
    async clickLoginButton(): Promise<void> {
        await this.page.click(this.loginButton);
        
    }

    async getHomePageElement(): Promise<void> {
    await this.page.click(this.loginButton);
    }

    // Method to log in
    async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    }
}
