import { test } from '@playwright/test';
import { ClientLoginPage } from '../pages/RSAClient_LoginPage';
import { ClientHomePage } from '../pages/RSAClient_HomePage';
import { ClientForgotPasswordPage } from '../pages/RSAClient_ForgotPasswordPage';

test('Check Valid Login', async({ page }) => {
    const loginPage = new ClientLoginPage(page);
    const homePage = new ClientHomePage(page);
    await loginPage.navigate();
    await loginPage.verifyPageTitle('Let\'s Shop');
    await loginPage.verufyLoginBanner();
    await loginPage.enterEmail('dash.ambarish15@gmail.com');
    await loginPage.enterPassword(' Tcsl@0083');
    await loginPage.clickLoginButton();
    await homePage.verifyHomePageLabel('Automation');
})

test('Forgot Password Link', async({ page }) => {
    const loginPage = new ClientLoginPage(page);
    const forgotPasswordPage = new ClientForgotPasswordPage(page);
    await loginPage.navigate();
    await loginPage.clickForgotPassword();
    await forgotPasswordPage.verifyPageLabel('Enter New Password');
})