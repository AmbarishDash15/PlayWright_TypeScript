import { test, expect, Browser, Page, Locator } from '@playwright/test'
import { webkit, chromium, firefox } from '@playwright/test'

/* test ('my login test', async () => {
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
*/
test ('register user', async () => {
    const browser:Browser = await chromium.launch();
    const page:Page = await browser.newPage();
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    const pageTitle = await page.title();
    console.log(pageTitle)
    expect(pageTitle).toEqual('Register Account');
    let confirmationText:String = '';

    const firstName:Locator = await page.locator('#input-firstname');
    const lastName:Locator = await page.locator('#input-lastname');
    const eMail:Locator = await page.locator('#input-email');
    const telephone:Locator = await page.locator('#input-telephone');
    const password:Locator = await page.locator('#input-password');
    const passwordConfirm:Locator = await page.locator('#input-confirm');
    const newsLetterYes:Locator = await page.locator('[name="newsletter"][value="1"]');
    const privacyPolicy:Locator = await page.locator('[name="agree"]');
    const continueButton:Locator = await page.locator('[value="Continue"]');
    const confirmationHeader:Locator = await page.locator('#content > h1');

    await firstName.fill('Test1');
    await lastName.fill('User');
    await eMail.fill('Test.User134134@yopmail.com');
    await telephone.fill('987654321');
    await password.fill('Test@123');
    await passwordConfirm.fill('Test@123');
    await newsLetterYes.click();
    await privacyPolicy.check();
    await continueButton.click();
    await page.waitForURL('**/success');
    confirmationText = await confirmationHeader.innerText()
    
    expect(confirmationText).toEqual('Your Account Has Been Created!');

})