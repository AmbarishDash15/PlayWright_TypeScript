import { test, expect, Browser, Page, Locator } from '@playwright/test'
import { webkit, chromium, firefox } from '@playwright/test'

test ('my login test', async () => {
    const browser:Browser = await firefox.launch({ headless: false });
    const page:Page = await browser.newPage();
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

    const emailID:Locator = await page.locator('#input-email');
    const password:Locator = await page.locator('#input-password');
    const loginButton:Locator = await page.locator('[value="Login"]');

    await emailID.fill('pwtest@opencart.com');
    await password.fill('playwright@123');
    await loginButton.click();

    const pageTitle = await page.title();
    console.log('home page title is : ', pageTitle);

    await page.screenshot({ path: 'homepage.png'});

    expect(pageTitle).toEqual('Account Login');

    await browser.close();
})