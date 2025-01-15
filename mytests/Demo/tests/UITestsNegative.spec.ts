import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test ('Check Login Error', async ({page})=> {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.fillLoginFormInvalid('invalid','invalid');
    await loginPage.clickLoginButton();
    await loginPage.verifyLoginError();
});

test ('Check Login Error Message without POM', async ({ page })=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // console.log(await page.title());
    // await expect(page.title()).toContain('LoginPage');
    const userName: Locator = await page.locator('#username');
    const passWord: Locator = await page.locator('#password');
    const signInBtn: Locator = await page.locator('#signInBtn');
    const errorMessage: Locator = await page.locator('[style*="block"]')
    await userName.fill('invalid');
    await passWord.fill('invalid');
    await signInBtn.click();
    // console.log(await errorMessage.textContent());
    await expect(errorMessage).toContainText('Incorrecto');
    // await page.screenshot({ path: 'screenshotFailure.png', fullPage: true });
});