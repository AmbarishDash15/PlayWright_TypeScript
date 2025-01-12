const { webkit, firefox, chromium } = require('@playwright/test');
import { test, expect, Page, Browser } from '@playwright/test';

test ('Browser Context Playwright test', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test ('Page Playwright test', async ({page})=>{
    await page.goto("https://www.google.com");
});

test.only ('Different Browser Page Playwright test', async ()=>{
    const browser: Browser = await chromium.launch();
    const page:Page = await browser.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(await page.title()).toContain('LoginPage');
})