import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.navigate();
    await loginPage.fillLoginFormValid();
    await loginPage.clickLoginButton();
    await homePage.verifyLoginSuccess();
})

test ('Check Product Availability', async({ page })=>{
    const homePage = new HomePage(page);
    await homePage.verifyProductAvailability('Blackberry');
});

test.only ('Get All Products', async({ page })=>{
    const homePage = new HomePage(page);
    await homePage.getAllProductsAvailable();
});

test ('Verify Product Price', async({ page })=>{
    const homePage = new HomePage(page);
    await homePage.checkPriceOfProduct('Nokia Edge','$24.99');
});

[
    { product: 'iphone X', count: '1' },
    { product: 'Samsung Note 8,Nokia Edge', count: '2' },
].forEach(({ product, count }) => {
    test(`Add ${count} product(s) to cart`, async({ page })=>{
        const homePage = new HomePage(page);
        const itemList: string[] = product.split(',');
        for(var item in itemList) {
            await homePage.addProductToCart(itemList[item]);
        }
        await homePage.verifyProductCount(count);
    })
});

test ('Verify added product in Shopping Cart', async({ page })=> {
    const homePage = new HomePage(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    const productToAdd: string = 'iphone X'
    await homePage.addProductToCart(productToAdd);
    await homePage.goToShoppingCart();
    await shoppingCartPage.verifyProductInCart(productToAdd);
})


