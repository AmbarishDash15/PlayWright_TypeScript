import { test, expect, Browser, Page, Locator, webkit, chromium, firefox } from '@playwright/test'
import { LoginPage } from '../../pages/loginPage';
import { HomePage } from '../../pages/homePage';

test ('Login to HCM', async ({ page}) => {
    //  const browser:Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    // const page:Page = await browser.newPage();
    const loginPage: LoginPage = new LoginPage(page);
    const url:String = 'https://and0ewpth.accounts.cloud.sap/saml2/idp/sso?sp=https://www.successfactors.com/snowyhydroT1&idp=https://and0ewpth.accounts.ondemand.com';
    await loginPage.goto('https://and0ewpth.accounts.cloud.sap/saml2/idp/sso?sp=https://www.successfactors.com/snowyhydroT1&idp=https://and0ewpth.accounts.ondemand.com');
    const envString:String = 'SuccessFactors - snowyhydroT1';
    const pageString:String = await loginPage.getEnvironmentName();
    expect(envString).toEqual(pageString);
    await loginPage.login('adash','Tcsl@008311111');
    const homePage: HomePage = new HomePage(page);
    const landingEnvironmentText: String = await homePage.verifyHomePage();
    expect(landingEnvironmentText).toContain('Logo')
})