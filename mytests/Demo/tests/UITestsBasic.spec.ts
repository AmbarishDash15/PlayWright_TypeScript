import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test ('Verify Successful login', async({ page })=> {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.navigate();
    await loginPage.fillLoginFormValid();
    await loginPage.clickLoginButton();
    await homePage.verifyLoginSuccess();
});