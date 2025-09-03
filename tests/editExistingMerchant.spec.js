// @ts-check
import { test, expect } from '@playwright/test';

test.describe ('Tests editing an existing Merchant', () => {
  test.beforeEach( async ({page}) => {
    await page.goto('https://dev.opf-skunkworks.com/builder');
  })

  test('Edit an existing merchant', async({page}) => {
    await page.getByText('Work with an existing Merchant').click();
    await page.getByText('AD Construction').click();
    await expect(page.locator("[name='companyName']")).toHaveValue('AD Construction');
    await expect(page.locator("[name='slug']")).toHaveValue('adconstruction');
    await expect(page.locator("[name='status']")).toHaveValue('ACTIVE');
    await expect(page.locator("[name='firstName']")).toHaveValue('angel');
    await expect(page.locator("[name='lastName']")).toHaveValue('merlos');
    await expect(page.locator("[name='email']")).toHaveValue('stew@bar.com');
    await expect(page.locator("[name='phone']")).toHaveValue('+15125894110');
    await expect(page.locator("[name='address1']")).toHaveValue('6839 Squirrels Foot Ct');
    await expect(page.locator("[name='city']")).toHaveValue('Charlotte');
    await expect(page.locator("[name='state']")).toHaveValue('North Carolina');
    await expect(page.locator("[name='postalCode']")).toHaveValue('07111');
    await expect(page.locator("[name='industry']")).toHaveValue('Construction & Remodeling');
    await expect(page.locator("[name='preferredWebsiteLanguage']")).toHaveValue('es');
    await expect(page.locator("[name='servicesOffered']")).toHaveValue('sheetrock,Ventana,Pisos,Todo de construction');
    await expect(page.locator("[name='regionsServed']")).toHaveValue('Todo North Carolina');
    await expect(page.locator("[name='hoursOfOperation']")).toHaveValue(' Monday - 7:00am - 6:00pm, Tuesday 10am-Noon');
    await page.locator("[onclick='cancel(event)']").click();
  })

  /************** START: Site testing **************/
  //TODO: look into how this interacts with socket connections
  test('Generate a existing merchant site', async({page}) => {
    await page.getByText('Work with an existing Merchant').click();
    await page.getByText('AD Construction').click();
    await page.getByText(' Edit Home Page ').click();
    await page.getByText('As easy as 1, 2, 3 (4?)').click();
    await expect(page.locator("[name='imageSourceKey']")).toHaveValue('freepik');
  })

  test.skip('Select a Template Selection', async({page}) => {
    //Change selected template
    //check for update to template
    //expect template is correctly updated
  })

  test.skip('Apply template colours', async({page}) => {
    //Select a color or variety of colors
    //Apply changes
    //
  })
  /************** END: Site testing **************/

  test.skip('Can Navigate to Growth Center', async({page}) => {
    //Navigate to Business Overview
    //Click Growth Center
    //Verify merchant app loads
  })

  //TODO: Add an e2e test where lead is generated and verify it appears
  test.skip('Verify loads loaded', async({page}) => {

  })
})