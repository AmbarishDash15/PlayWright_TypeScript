import { test } from '@playwright/test';
import { ClientLoginPage } from '../pages/RSAClient_LoginPage';
import { ClientHomePage } from '../pages/RSAClient_HomePage';
import { ClientProductDetailsPage } from '../pages/RSAClient_ProductDetailsPage';

test.beforeEach(async({ page })=>{
    const loginPage = new ClientLoginPage(page);
    const homePage = new ClientHomePage(page);
    await loginPage.navigate();
    await loginPage.verifyPageTitle('Let\'s Shop');
    await loginPage.verufyLoginBanner();
    await loginPage.enterEmail('dash.ambarish15@gmail.com');
    await loginPage.enterPassword('Tcsl@0083');
    await loginPage.clickLoginButton();
    await homePage.verifyHomePageLabel('Automation');
})

test.only('Check available products', async({ page })=>{
    const homePage = new ClientHomePage(page);
    const itemList: string[] = await homePage.getAvailableProducts();
    itemList.forEach(value => {
        console.log(value);
    })
})

test('View product details', async({ page })=>{
    const homePage = new ClientHomePage(page);
    const prodDetailsPage = new ClientProductDetailsPage(page);
    const itemList: string[] = await homePage.getAvailableProducts();
    itemList.forEach(value => {
        console.log(value);
    })
    
    itemList.forEach(value => {
        console.log(value);
        homePage.clickViewButton(value);
        prodDetailsPage.checkProductName(value);
        prodDetailsPage.clickContinueShopping();
    })
    
})