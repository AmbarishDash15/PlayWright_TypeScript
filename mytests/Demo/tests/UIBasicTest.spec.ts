const { webkit, firefox, chromium } = require('@playwright/test');
import { test, expect, Page, Browser, Locator } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test.skip ('Browser Context Playwright test', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test.skip ('Page Playwright test', async ({page})=>{
    await page.goto("https://www.google.com");
});

test.skip ('Check Error Message Playwright test', async ()=>{
    const browser: Browser = await chromium.launch();
    const page:Page = await browser.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(await page.title()).toContain('LoginPage');
    const userName: Locator = await page.locator('#username');
    const passWord: Locator = await page.locator('#password');
    const signInBtn: Locator = await page.locator('#signInBtn');
    const errorMessage: Locator = await page.locator('[style*="block"]')
    await userName.fill('userNameExtracted');
    await passWord.fill('passwordExtracted');
    await signInBtn.click();
    console.log(await errorMessage.textContent());
    await expect(errorMessage).toContainText('Incorrect');

})

test.skip ('Successful Login Playwright test', async ()=>{
    // const browser: Browser = await firefox.launch();
    const browser:Browser = await chromium.launch();
    const page:Page = await browser.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(await page.title()).toContain('LoginPage');
    const userName: Locator = await page.locator('#username');
    const passWord: Locator = await page.locator('#password');
    const userTypeAdmin: Locator = await page.locator('[type="radio"][value="admin"]');
    const userTypeUser: Locator = await page.locator('[type="radio"][value="user"]');
    const courseType: Locator = await page.locator('.form-control');
    const cotermsChkBx: Locator = await page.locator('#terms');
    const signInBtn: Locator = await page.locator('#signInBtn');
    const userNameHelp: Locator = await page.locator('b:nth-child(1) > i');
    const passwordHelp: Locator = await page.locator('b:nth-child(2) > i');
    const userNameExtracted: string = await userNameHelp.innerText();
    const passwordExtracted: string = await passwordHelp.innerText();
    await userName.fill(userNameExtracted);
    await passWord.fill(passwordExtracted);
    await userTypeAdmin.click();
    // await courseType.selectOption('Student');
    await cotermsChkBx.check();
    await signInBtn.click();
    const homePageBanner: Locator = await page.locator('.navbar-brand').first();
    console.log(await homePageBanner.innerText());
    await expect(homePageBanner).toContainText('ProtoCommerce');
})

test.skip ('Verify products on Home Page', async ()=>{
    const browser:Browser = await chromium.launch();
    const page:Page = await browser.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(await page.title()).toContain('LoginPage');
    const userName: Locator = await page.locator('#username');
    const passWord: Locator = await page.locator('#password');
    const userTypeAdmin: Locator = await page.locator('[type="radio"][value="admin"]');
    const userTypeUser: Locator = await page.locator('[type="radio"][value="user"]');
    const courseType: Locator = await page.locator('.form-control');
    const cotermsChkBx: Locator = await page.locator('#terms');
    const signInBtn: Locator = await page.locator('#signInBtn');
    const userNameHelp: Locator = await page.locator('b:nth-child(1) > i');
    const passwordHelp: Locator = await page.locator('b:nth-child(2) > i');
    const userNameExtracted: string = await userNameHelp.innerText();
    const passwordExtracted: string = await passwordHelp.innerText();
    await userName.fill(userNameExtracted);
    await passWord.fill(passwordExtracted);
    await userTypeAdmin.click();
    // await courseType.selectOption('Student');
    await cotermsChkBx.check();
    await signInBtn.click();
    const homePageBanner: Locator = await page.locator('.navbar-brand').first();
    const productList: Locator = await page.locator('.card-title a')
    console.log(await homePageBanner.innerText());
    await expect(homePageBanner).toContainText('ProtoCommerce');
    const allTitles: string[] = await productList.allTextContents();
    console.log(await allTitles);
    console.log(await productList.first().textContent());
    await expect(allTitles[0]).toContain('iphone X');
    await expect(allTitles).toContain('Nokia Edge');
    
})

test ('Check Login Error with POM', async ({page})=> {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.fillLoginFormInvalid('invalid','invalid');
    await loginPage.clickLoginButton();
    await loginPage.verifyLoginError();
})

test ('Verify Successful login with POM', async({ page })=> {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.navigate();
    await loginPage.fillLoginFormValid();
    await loginPage.clickLoginButton();
    await homePage.verifyLoginSuccess();
})

