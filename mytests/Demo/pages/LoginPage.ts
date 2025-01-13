import {Page, Locator} from '@playwright/test'

export class LoginPage {
    constructor(private page: Page) {}
    private userName: Locator = this.page.locator('#username');
    private passWord: Locator = this.page.locator('#password');
    private userTypeAdmin: Locator = this.page.locator('[type="radio"][value="admin"]');
    private userTypeUser: Locator = this.page.locator('[type="radio"][value="user"]');
    private courseType: Locator = this.page.locator('.form-control');
    private cotermsChkBx: Locator = this.page.locator('#terms');
    private signInBtn: Locator = this.page.locator('#signInBtn');
    private userNameHelp: Locator = this.page.locator('b:nth-child(1) > i');
    private passwordHelp: Locator = this.page.locator('b:nth-child(2) > i');
}