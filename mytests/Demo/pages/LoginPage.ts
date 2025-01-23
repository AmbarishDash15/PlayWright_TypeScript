import { expect, type Page, type Locator } from '@playwright/test'

export class LoginPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly userTypeAdmin: Locator;
    readonly userTypeUser: Locator;
    readonly courseType: Locator;
    readonly modalContent: Locator;
    readonly popupOkay: Locator;
    readonly cotermsChkBx: Locator;
    readonly signInBtn: Locator;
    readonly userNameHelp: Locator;
    readonly passwordHelp: Locator;
    readonly errorMessage: Locator;
    readonly materialLink: Locator;

    constructor( page: Page) {
        this.page = page;
        this.userName = page.locator('#username');
        this.passWord = page.locator('#password');
        this.userTypeAdmin = page.locator('[type="radio"][value="admin"]');
        this.userTypeUser = page.locator('[type="radio"][value="user"]');
        this.courseType = page.locator('select.form-control');
        this.modalContent = page.locator('.modal-content');
        this.popupOkay = page.getByText('Okay');
        this.cotermsChkBx = page.locator('#terms');
        this.signInBtn = page.locator('#signInBtn');
        this.userNameHelp = page.locator('b:nth-child(1) > i');
        this.passwordHelp = page.locator('b:nth-child(2) > i');
        this.errorMessage = page.locator('[style*="block"]');
        this.materialLink = page.locator('[href*="documents-request"]');
    }
    

    async navigate() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async fillLoginFormValidAdmin() {
        const userNameExtracted: string = await this.userNameHelp.innerText();
        const passwordExtracted: string = await this.passwordHelp.innerText();
        await this.enterUserName(userNameExtracted);
        await this.enterPassword(passwordExtracted);
        await this.userTypeAdmin.click();
        await this.courseType.selectOption('consult');
        await this.cotermsChkBx.check();
        // await this.page.pause();
    }

    async fillLoginFormValidUser() {
        const userNameExtracted: string = await this.userNameHelp.innerText();
        const passwordExtracted: string = await this.passwordHelp.innerText();
        await this.enterUserName(userNameExtracted);
        await this.enterPassword(passwordExtracted);
        await this.userTypeUser.click();
        expect(await this.popupOkay).toBeVisible();
        await this.popupOkay.click();
        expect(await this.popupOkay).toBeHidden();
        await this.courseType.selectOption('stud');
        await this.cotermsChkBx.check();
        // await this.page.pause();
    }

    async enterUserName(userName: string) {
        await this.userName.fill(userName);
    }

    async enterPassword(password: string) {
        await this.passWord.fill(password);
    }

    async fillLoginFormInvalid(wrongUserName: string, wrongPassword: string) {
        await this.enterUserName(wrongUserName);
        await this.enterPassword(wrongPassword);
        // await this.userTypeAdmin.click();
        // await this.cotermsChkBx.check();
    }

    async clickLoginButton() {
        await this.signInBtn.click();
        await this.page.waitForLoadState();
    }

    async verifyLoginError() {
        // console.log(await this.errorMessage.innerText());
        await expect(this.errorMessage).toContainText('Incorrect');
    }

    async clickMaterialLink() {
        await this.materialLink.click();
        await this.page.waitForLoadState();
    }
}