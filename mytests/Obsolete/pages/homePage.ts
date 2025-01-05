import { test, expect, Browser, Page, Locator, webkit, chromium, firefox } from '@playwright/test'
import { LoginPage } from './loginPage';

export class HomePage {
    private page: Page;
    private homeIconButton: string = 'xweb-shellbar.sfEnsureSAPTheme ui5-shellbar-sf-header#shellbar span.ui5-shellbar-logo';
    private profileButton: string = 'web-shellbar.sfEnsureSAPTheme > ui5-avatar-sf-header.profile-btn';
    private searchBox: string = 'web-shellbar.sfEnsureSAPTheme xweb-shellbar-search-input#search input.ui5-input-inner';
    private busyIndicator: string = 'ui5-busy-indicator';
    private quickActionButtonDelegateMyWorkflows: string = 'button[title="Delegate My Workflows"]';
    private quickActionButtonRequestTimeOff: string = 'button[title="Request Time Off"]';
    private quickActionButtonViewMyProfile: string = 'button[title="View My Profile"]';
    private profilePopupProxyNow: string = 'ui5-static-area-item-sf-header ui5-li-sf-header[data-ui5-stable="profile-item-PROXY_NOW"]';
    private selectTargetUserPopup: string = 'ui5-static-area-item-sf-header ui5-dialog-sf-header[header-text="Select Target User"] xweb-shellbar-search-input.searchInput input.ui5-input-inner';
    private selectTargetUserInput: string = 'ui5-static-area-item-sf-header ui5-dialog-sf-header[header-text="Select Target User"]';
    private selectTargetUserOKButton: string = 'ui5-static-area-item-sf-header ui5-button-sf-header[data-ui5-stable="proxy-submit"]';
  
    constructor(page: Page) {
      this.page = page;
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    

    async verifyHomePage(): Promise<string> {
        await this.page.waitForSelector(this.homeIconButton);
        await this.page.waitForLoadState("load", { timeout: 60000 });
        const titleStr: any = await this.page.getAttribute(this.homeIconButton,'title')
        return titleStr;
   }

    async goToHomePage(username: string): Promise<void> {
        await this.page.click(this.homeIconButton);
    }
    
    async getProfileButtonText(password: string): Promise<any> {
        await this.page.click(this.profileButton);
        const btnTitle: any = await this.page.getAttribute(this.profileButton, 'title' )
        return this.page.getAttribute(this.profileButton, 'title' )
    }

    async clickProfileButton(): Promise<void> {
        await this.page.click(this.profileButton);
        await this.page.waitForSelector(this.profilePopupProxyNow);
    }

    async clickProxyNowButton(): Promise<void> {
        await this.page.click(this.profilePopupProxyNow);
        await this.page.waitForSelector(this.selectTargetUserPopup);
    }

    async enterUserDetailsToProxy(userToProxy: string): Promise<void> {
        await this.page.waitForSelector(this.selectTargetUserInput);
        await this.page.click(this.selectTargetUserInput);
        await this.page.fill(this.selectTargetUserInput, userToProxy);
        const proxySuggestion: Locator = this.page.locator('title = [' + userToProxy + ']');
        await proxySuggestion.click();
        await this.page.click(this.selectTargetUserOKButton);
    }

    async proxyAsOther(userToProxy: string): Promise<void> {
        await this.clickProfileButton();
        await this.clickProxyNowButton();
        await this.enterUserDetailsToProxy(userToProxy);
        await this.page.waitForLoadState('load');
        await expect(this.profileButton).toContain('on behalf of ' + userToProxy)
    }

    async clickRequestTimeOff(): Promise<void> {
        await this.page.click(this.quickActionButtonRequestTimeOff);
        await expect(this.busyIndicator).toHaveLength(0);
    }
}
