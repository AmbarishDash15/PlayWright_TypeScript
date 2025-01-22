import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

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