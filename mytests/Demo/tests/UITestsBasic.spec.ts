import { BrowserContext, Page, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { DocumentRequestPage } from '../pages/DocumentsRequestPage';

test ('Verify Successful User login', async({ page })=> {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.navigate();
    await loginPage.fillLoginFormValidUser();
    await loginPage.clickLoginButton();
    await homePage.verifyLoginSuccess();
});

test ('Verify Successful Admin login', async({ page })=> {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.navigate();
    await loginPage.fillLoginFormValidAdmin();
    await loginPage.clickLoginButton();
    await homePage.verifyLoginSuccess();
});

test ('Check material page', async({ browser })=>{
    const context: BrowserContext = await browser.newContext();
    const pageMain: Page = await context.newPage();
    const loginPage: LoginPage = new LoginPage(pageMain);
    await loginPage.navigate();
    
    const promises: Promise<any>[] = (
        [
            context.waitForEvent('page'),
            loginPage.clickMaterialLink(),
        ]
    )
    const [newPage]: any[any] = await Promise.all(promises);
    await newPage.waitForLoadState('load');
    const docReqPage: DocumentRequestPage = new DocumentRequestPage(newPage);
    await docReqPage.checkPageBanner();
})

test ('Get text from other tab', async({ browser })=> {
    const context: BrowserContext = await browser.newContext();
    const pageMain: Page = await context.newPage();
    const loginPage: LoginPage = new LoginPage(pageMain);
    await loginPage.navigate();
    
    const promises: Promise<any>[] = (
        [
            context.waitForEvent('page'),
            loginPage.clickMaterialLink(),
        ]
    )
    const [newPage]: any[any] = await Promise.all(promises);
    await newPage.waitForLoadState('load');
    const docReqPage: DocumentRequestPage = new DocumentRequestPage(newPage);
    const domainName: string = await docReqPage.getDomainName();
    console.log(domainName);
})

test.only ('Get text from other tab and paste on previous', async({ browser })=> {
    const context: BrowserContext = await browser.newContext();
    const pageMain: Page = await context.newPage();
    const loginPage: LoginPage = new LoginPage(pageMain);
    await loginPage.navigate();
    
    const promises: Promise<any>[] = (
        [
            context.waitForEvent('page'),
            loginPage.clickMaterialLink(),
        ]
    )
    const [newPage]: any[any] = await Promise.all(promises);
    await newPage.waitForLoadState('load');
    const docReqPage: DocumentRequestPage = new DocumentRequestPage(newPage);
    const domainName: string = await docReqPage.getDomainName();
    await loginPage.enterUserName(domainName);
})