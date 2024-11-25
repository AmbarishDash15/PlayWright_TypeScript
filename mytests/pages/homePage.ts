import { test, expect, Browser, Page, Locator, webkit, chromium, firefox } from '@playwright/test'

export class HomePage {
    private page: Page;
    private homeIconButton = 'xweb-shellbar.sfEnsureSAPTheme ui5-shellbar-sf-header#shellbar span.ui5-shellbar-logo'
    private usernameInput = '#j_username';
    private passwordInput = '#j_password';
    private loginButton = 'text=Continue';
  
    constructor(page: Page) {
      this.page = page;
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    

    async verifyHomePageIcon(): Promise<string> {
        await this.page.waitForSelector(this.homeIconButton);
        await this.page.waitForLoadState("load", { timeout: 60000 });
        const titleStr: any = await this.page.getAttribute(this.homeIconButton,'title')
        return titleStr;
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

    // Method to log in
    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
        await HomePage
    }
}
