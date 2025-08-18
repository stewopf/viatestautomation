// @ts-check
import { test, expect } from '@playwright/test';

test.describe ('Tests add a new Merchant', () => {
  test.beforeEach( async ({page}) => {
    await page.goto('https://dev.opf-skunkworks.com/builder');
  })

  test('Creates a merchant', async({page}) => {
    await page.getByText('Create a new Merchant').click();
    await page.locator("[name='companyName']").fill('AD Construction');
    await page.locator("[name='slug']").fill('adconstruction');
    await page.locator("[name='firstName']").fill('angel');
    await page.locator("[name='lastName']").fill('merlos');
    await page.locator("[name='email']").fill('stew@bar.com');
    await page.locator("[name='phone']").fill('+15125894110');
    await page.locator("[name='address1']").fill('6839 Squirrels Foot Ct');
    await page.locator("[name='city']").fill('Charlotte');
    await page.locator("[name='state']").fill('North Carolina');
    await page.locator("[name='postalCode']").fill('07111');
    await page.locator("[name='industry']").fill('Construction & Remodeling');
    await page.locator("[name='preferredWebsiteLanguage']").selectOption('es');
    await page.locator("[name='servicesOffered']").fill('sheetrock,Ventana,Pisos,Todo de construction');
    await page.locator("[name='regionsServed']").fill('Todo North Carolina');
    await page.locator("[name='hoursOfOperation']").fill(' Monday - 7:00am - 6:00pm, Tuesday 10am-Noon');
    await page.locator("[onclick='cancel(event)']").click();
  })
})