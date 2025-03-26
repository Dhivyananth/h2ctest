// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});



test('Log in to the system using user standard_user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  const username = page.getByPlaceholder('Username');
  const password = page.getByPlaceholder('Password');
  const loginbutton = page.getByRole('button', {name:'Login'});


  await username.fill('standard_user');
  await password.fill('secret_sauce');
  await loginbutton.click();


  test.setTimeout(120_000);
  //await expect(page.getByText('Products')).toBeVisible();

  //await expect(page.locator('[data-test="title"]')).toBeVisible();

  

  const locator = page.locator('[data-test="item-4-title-link"]');
  await expect(locator).toBeVisible();

});



  
test('Add two items to the cart. Track the names of the items that you have added to the cart', async ({page})=> {
  await page.goto('https://www.saucedemo.com');
  const username = page.getByPlaceholder('Username');
  const password = page.getByPlaceholder('Password');
  const loginbutton = page.getByRole('button', {name:'Login'});


  await username.fill('standard_user');
  await password.fill('secret_sauce');
  await loginbutton.click();

  await page.waitForTimeout(5000);
  const itemone = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  itemone.click();

  const itemtwo = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  itemtwo.click();

  //const checkoutbutton = page.locator('[data-test="shopping-cart-link"]');
  //checkoutbutton.click();
  await page.waitForTimeout(5000);


  await page.locator('[data-test="shopping-cart-link"]').click();

  
  await page.waitForTimeout(5000);


  const checkoutitemone = page.locator('[data-test="item-4-title-link"]');
  const checkoutitemtwo = page.locator('[data-test="item-0-title-link"]');
  //await expect(checkoutitemone).toHaveValue('Sauce Labs Backpack');
  //await expect(checkoutitemtwo).toHaveValue('Sauce Labs Bike Light');
  await expect(checkoutitemone).toBeVisible();
  await expect(checkoutitemtwo).toBeVisible();


  
});



test('Go to the shopping cart and validate the added items by names', async ({page})=> {
  await page.goto('https://www.saucedemo.com');
  const username = page.getByPlaceholder('Username');
  const password = page.getByPlaceholder('Password');
  const loginbutton = page.getByRole('button', {name:'Login'});


  await username.fill('standard_user');
  await password.fill('secret_sauce');
  await loginbutton.click();

  await page.waitForTimeout(7000);
  const itemone = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  itemone.click();

  const itemtwo = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  itemtwo.click();

  const checkoutbutton = page.locator('[data-test="shopping-cart-link"]');
  checkoutbutton.click();
   
  await page.waitForTimeout(7000);

  const checkoutitemone = page.locator('[data-test="item-4-title-link"]').filter({hasText:"sauce labs backpack"});
  const checkoutitemtwo = page.locator('[data-test="item-0-title-link"]').filter({hasText: "sauce labs bike light"});
  
  await expect(checkoutitemone).toBeVisible();
  await expect(checkoutitemtwo).toBeVisible();

});





test('Enter First Name, Last Name and Zip/Postal code and proceed', async ({page})=> {

  await page.goto('https://www.saucedemo.com');
  const username = page.getByPlaceholder('Username');
  const password = page.getByPlaceholder('Password');
  const loginbutton = page.getByRole('button', {name:'Login'});


  await username.fill('standard_user');
  await password.fill('secret_sauce');
  await loginbutton.click();

  await page.waitForTimeout(7000);
  const itemone = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  itemone.click();

  const itemtwo = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  itemtwo.click();

  const checkoutbutton = page.locator('[data-test="shopping-cart-link"]');
  checkoutbutton.click();
  
  
  await page.waitForTimeout(7000);

  
  //const firstname = page.locator('[data-test="firstName"]');
  const firstname = page.getByLabel('First Name');
  firstname.click();

  firstname.fill('userone');


  const lastname = page.locator('[data-test="lastName"]');
  lastname.click();
  lastname.fill('useronelastname');

  await page.waitForTimeout(7000);

  const zip = page.locator('[data-test="postalCode"]');
  zip.click();
  zip.fill('25000');
  

  const proceed = page.getByRole('button', {name:'Continue'});
  proceed.click();

  await page.waitForTimeout(7000);

  await expect(page).toHaveTitle(/Checkout: Overview/);

});



test('Validate the ‘Item total:’ of the two items added to the cart (without tax)', async ({page})=> {

  await page.goto('https://www.saucedemo.com');
  const username = page.getByPlaceholder('Username');
  const password = page.getByPlaceholder('Password');
  const loginbutton = page.getByRole('button', {name:'Login'});


  await username.fill('standard_user');
  await password.fill('secret_sauce');
  await loginbutton.click();

  test.setTimeout(120_000);
  const itemone = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  itemone.click();

  const itemtwo = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  itemtwo.click();

  const checkoutbutton = page.locator('[data-test="shopping-cart-link"]');
  checkoutbutton.click();
  
  
  
  const firstname = page.locator('[data-test="firstName"]');
  firstname.fill('Test');

  const lastname = page.locator('[data-test="lastName"]');
  lastname.fill('testuserlastname');

  const zip = page.locator('[data-test="postalCode"]');
  zip.fill('25000');
  

  const proceed = page.getByRole('button', {name:'Continue'});
  proceed.click();
   


 await expect(page.locator('[data-test="subtotal-label"]'), 'Item total: $39.98').toBeVisible();

});


