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

  test('Edit an existing merchant Site', async({page}) => {
    await page.getByText('Work with an existing Merchant').click();
    await page.getByText('AD Construction').click();
    await page.getByText(' Edit Home Page ').click();
    await page.getByText('As easy as 1, 2, 3 (4?)').click();
    await expect(page.locator("[name='imageSourceKey']")).toHaveValue('freepik');
  })
  //href="/page/68376431ccab1ae859f61a7b/edit"
})