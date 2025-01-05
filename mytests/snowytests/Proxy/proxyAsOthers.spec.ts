import { test, expect, Browser, Page, Locator, webkit, chromium, firefox } from '@playwright/test'
import { HomePage } from '../../pages/homePage';

test('Proxy As Others', async ({page}) => {
    const homePage: HomePage = new HomePage(page);
    await homePage.proxyAsOther('Nikki Scholes');
})

