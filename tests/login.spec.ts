const { webkit, firefox, chromium } = require('@playwright/test');
import { test, expect, Page, Browser } from '@playwright/test'

test('login test', async () => {
    // const browser:Browser = await firefox.launch({ headless: false });
    const browser: Browser = await chromium.launch();
    const page:Page = await browser.newPage();
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    const emailId = await page.locator('[name="email"]');
    const password = await page.locator('[name="password"]');
    const loginButton = await page.locator('input[value="Login"]');

    await emailId.fill("naveen@gmail.com");
    await password.fill("naveen@123");
    await loginButton.click();

    const title = await page.title();
    console.log(title);
    await page.screenshot({ path: `example.png` })
}) 