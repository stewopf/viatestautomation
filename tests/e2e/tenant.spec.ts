import { expect, test } from "../../fixtures/tenantPage";
import { closeConnection, queryDatabase } from "../../utilities/db";
import { envVariable } from "../../utilities/env";

test.describe("Tenant Suit", async () => {
  let users: any[];

  test.beforeAll(async () => {
    users = await queryDatabase('tenants');
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(`${envVariable.local}/tenant`, {
      waitUntil: 'load'
    })
  })

  test("Verify the Logo is visible", async ({ tenantPage }) => {
    await tenantPage.isLogoVisible()
  })

  test("Verfiy the Logo is clickable", async ({ tenantPage }) => {
    await tenantPage.isLogoVisible();
    await tenantPage.clickLogo();
  })

  test("Verfiy the Link after clicking logo", async ({ tenantPage }) => {
    await tenantPage.clickLogo()
    const expectedURL = await tenantPage.currentPage()
    await expect(expectedURL).toHaveURL(`${envVariable.local}/builder`)
  })

  test("Verify the Hamburger Button is clickable", async ({ tenantPage }) => {
    await tenantPage.clickHamburgerButton()
  })

  test("Verify the Cross Button is clickable", async ({ tenantPage }) => {
    await tenantPage.clickHamburgerButton()
    await tenantPage.clickCrossButton()
  })

  test("Verify the Menu title is visible", async ({ tenantPage }) => {
    const isMenuTitle = await tenantPage.isMenuTitle();
    expect(isMenuTitle).toBe("Menu")
  })

  test("Verify the Link in Sidebar", async ({ tenantPage }) => {
    const count = await tenantPage.getSidebarLinksCount();

    for (let i = 0; i < count; i++) {
      const href = await tenantPage.getSidebarLinkHref(i);
      await tenantPage.clickHamburgerButton()
      await tenantPage.clickSideBarLink(i, `${envVariable.local}${href}`)
      if (`${href}` === "/logout") {
        break;
      }
    }
  }
  )

  test("Verify the back button", async ({ tenantPage }) => {
    await tenantPage.navigatingBackToPreviousPage()
    const expectedURL = await tenantPage.currentPage()
    await expect(expectedURL).toHaveURL(`${envVariable.local}/builder`)
  })

  test("Verify search filter with Enter press for High level merchant", async ({ tenantPage }) => {
    await tenantPage.searchMerchantAndPressEnter("snickolas@oneparkfinancial.com")
  })

  test("Verify search High level with Button Click", async ({ tenantPage }) => {
    await tenantPage.searchHighLevelMerchantWithClickButton("snickolas@oneparkfinancial.com")
  })

  test("Verify search High level with Button Click without entering anything", async ({ tenantPage }) => {
    await tenantPage.searchHighLevelMerchantWithClickButton("")
  })

  test("Verify the page value dropdown", async ({ tenantPage }) => {
    const dropdown = await tenantPage.paginationDropdown()
    const { dropdownValue } = await tenantPage.paginationDropdownValuesWithClicks()
    await expect(dropdown).toHaveValue(dropdownValue);
  })

  test("Verify message when no high level merchant is found", async ({ tenantPage }) => {
    const currentPage = await tenantPage.currentPage()
    await tenantPage.searchHighLevelMerchantWithPressEnter("snickolas@oneparkfinancial.coms")
    await expect(currentPage).toHaveURL(`${envVariable.local}/tenantSearch`)
    const notFoundHighLevelMerchantMessage = await (await tenantPage.notFoundMessageOfHighLevel()).textContent()
    await expect(notFoundHighLevelMerchantMessage).toContain('No Highlevel Merchant(s) found')
  })

  test("Verify the Existing Merchants Count in the pagination with total Numbers of Page", async ({ tenantPage }) => {
    const dropdown = await tenantPage.paginationDropdown();
    const result = await tenantPage.paginationDropdownValuesWithClicks();

    if (!result) {
      throw new Error("paginationDropdownValuesWithClicks() returned undefined");
    }

    const { dropdownValue, paginationStates } = result;

    const perPage = Number(dropdownValue);

    for (const state of paginationStates) {
      const { action, paginationValue } = state;

      switch (action) {
        case 'Last Page':
          await tenantPage.lastPage.click();
          break;
        case 'Previous Page':
          await tenantPage.previousPage.click();
          break;
        case 'First Page':
          await tenantPage.firstPage.click();
          break;
        case 'Next Page':
          await tenantPage.nextPage.click();
          break;
        case 'Initial Load':
        default:
          break;
      }

      const paginationHandle = await tenantPage.paginationValues();
      await expect(paginationHandle).toHaveText(paginationValue);

      const currentPage = parseInt(paginationValue.match(/Page (\d+)/)?.[1] || '1');
      const totalItems = parseInt(paginationValue.match(/\((\d+)\)/)?.[1] || '0');

      const expectedMaxRows = currentPage === Math.ceil(totalItems / perPage)
        ? totalItems % perPage || perPage
        : perPage;

      const rowCount = await tenantPage.getRowCount();
      expect(rowCount).toBe(expectedMaxRows);
    }
  });

  test("Verify the Existing Merchants Count", async ({ tenantPage }) => {
    const value = await tenantPage.getMerchantTableCount()
    expect(value).toBe(users.length)
  })

  test("Verify the test by Search the Exisitng Merchant", async ({ tenantPage }) => {
    const count = await tenantPage.getMerchantTableCount()
    const randomNumber = Math.floor(Math.random() * (count));
    const email = users[randomNumber]?.email
    await tenantPage.searchMerchantAndPressEnter(email)
    const phone = users[randomNumber]?.phone
    await tenantPage.searchMerchantAndPressEnter(phone)
    const companyName = users[randomNumber]?.companyName
    await tenantPage.searchMerchantAndPressEnter(companyName)
    const status = users[randomNumber]?.status
    await tenantPage.searchMerchantAndPressEnter(status)
  })

  test("Verify the test by Search the Exisitng Merchant without entering anything", async ({ tenantPage }) => {
    await tenantPage.searchMerchantAndPressEnter("@#$@#$!@#$@#$!@#$!@#$!@#")
    const messge = await tenantPage.messageForNoRecordsInTable()
    await expect(messge).toContain("No rows found")
  })

  test("Verify the hover in the Existing Merchant List", async ({ tenantPage }) => {
    await tenantPage.clickAddMerchantButton()
    const currentPage = await tenantPage.currentPage()
    await expect(currentPage).toHaveURL(`${envVariable.local}/tenant?create=true`)
  })

  test("Verify the Add button in the Existing Merchant List", async ({ tenantPage }) => {
    await tenantPage.clickAddMerchantButton()
    const currentPage = await tenantPage.currentPage()
    await expect(currentPage).toHaveURL(`${envVariable.local}/tenant?create=true`)
  })

  test("Verify and add the new Merchant in the add merchant page", async ({ tenantPage }) => {
    await tenantPage.clickAddMerchantButton()
    const currentPage = await tenantPage.currentPage()
    await expect(currentPage).toHaveURL(`${envVariable.local}/tenant?create=true`)
    await tenantPage.fillNewMerchantDetails(
      'testing',
      'testing123',
      'test',
      'check',
      'testing@gmail.com',
      '9876543210',
      'abc',
      'abc',
      'abc',
      '987654',
      'abc',
      'abc,abc,abc',
      'abc',
      'abc',
      `What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`
    );
  })

  test("Verify and test the exit button from the new Merchant page", async ({ tenantPage }) => {
    await tenantPage.clickAddMerchantButton()
    const currentPage = await tenantPage.currentPage()
    await expect(currentPage).toHaveURL(`${envVariable.local}/tenant?create=true`)
    await tenantPage.exitFromNewMerchantDetails(
      'testing',
      'testing123',
      'test',
      'check',
      'testing@gmail.com',
      '9876543210',
      'abc',
      'abc',
      'abc',
      '987654',
      'abc',
      'abc,abc,abc',
      'abc',
      'abc'
    );
  })

  test("Verify the edit page on clicking any merchant from the list", async ({ tenantPage }) => {
    let testingMerchant;
    for (let i = 0; i < users.length; i++) {
      if (users[i].companyName === "testing") {
        testingMerchant = users[i];
      }
    }

    (await tenantPage.paginationDropdown()).selectOption({ value: "100" })

    const element = (await tenantPage.currentPage()).locator(`//a[@onclick="editRow(event, '68c9c9ccb76102e72c9db6c8')"]`)
    const onclickAttr = await element.getAttribute('onclick');
    const tenantIdMatch = onclickAttr?.match(/'([a-f0-9]{24})'/);
    const tenantId = tenantIdMatch?.[1];

    const rowLocator = element.locator('xpath=ancestor::tr');
    const tableRows = (await tenantPage.currentPage()).locator('xpath=//table//tr');


    const rowHandle = await rowLocator.elementHandle();
    if (!rowHandle) {
      console.error('Row not found');
      return;
    }
    const rowIndex = await tableRows.evaluateAll((rows, row) => rows.indexOf(row), rowHandle);

    if (rowIndex === -1) {
      console.error('Row not found');
      return;
    }
    await element.click();
    const currentUrl = await tenantPage.currentPage()
    await expect(currentUrl).toHaveURL(`${envVariable.local}/tenant/${tenantId}`)
    const merchantName = await tenantPage.merchantTitleinTenantPage();
    expect(merchantName).toContain(`Merchant: ${testingMerchant.companyName}`)

    const editPageHref = await tenantPage.clickEditPageButton()
    expect(currentUrl).toHaveURL(`${envVariable.local}${editPageHref}`)
    await tenantPage.navigatingBackToPreviousPage()

    const {
      companyName, customDomain, firstName, lastName, email, phone,
      address, city, state, postalCode, industry, serviceOffered,
      regionsServed, hoursOfOperation, button
    } = await tenantPage.editMerchantDetails();

    await button
    const serviceOfferedString = testingMerchant?.servicesOffered.toString()
    const regionsServedString = testingMerchant?.regionsServed.toString()

    expect(companyName).toContain(testingMerchant?.companyName)
    expect(firstName).toContain(testingMerchant?.firstName)
    expect(lastName).toContain(testingMerchant?.lastName)
    expect(email).toContain(testingMerchant?.email)
    expect(phone).toContain(testingMerchant?.phone)
    expect(address).toContain(testingMerchant?.address1)
    expect(city).toContain(testingMerchant?.city)
    expect(state).toContain(testingMerchant?.state)
    expect(postalCode).toContain(testingMerchant?.postalCode)
    expect(industry).toContain(testingMerchant?.industry)
    expect(serviceOffered).toContain(serviceOfferedString)
    expect(regionsServed).toContain(regionsServedString)
    expect(hoursOfOperation).toContain(testingMerchant.hoursOfOperation[0]?.text?.en)

    await button

  })

  test("Verify the refresh data on highlevel on clicking any merchant from the list", async ({ tenantPage }) => {
    let testingMerchant;
    for (let i = 0; i < users.length; i++) {
      testingMerchant = users[i];
    }
    await tenantPage.clickFirstElement()
    const currentUrl = await tenantPage.currentPage()
    await expect(currentUrl).toHaveURL(`${envVariable.local}/tenant/${testingMerchant?._id}`)
    await tenantPage.refreshDataFromHighleve(testingMerchant?._id)
    await expect(currentUrl).toHaveURL(`${envVariable.local}/tenant/${testingMerchant?._id}?action=refresh`)
  })

  test("Verify the expunge merchant", async ({ tenantPage }) => {
    await tenantPage.clickAddMerchantButton()
    const currentPage = await tenantPage.currentPage()
    await expect(currentPage).toHaveURL(`${envVariable.local}/tenant?create=true`)
    await tenantPage.fillNewMerchantDetails(
      'testing1',
      'testing123',
      'test',
      'check',
      'testing@gmail.com',
      '9876543210',
      'abc',
      'abc',
      'abc',
      '987654',
      'abc',
      'abc,abc,abc',
      'abc',
      'abc',
      `What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`
    );

    await tenantPage.clickExpungeMerchantButton();

    (await tenantPage.currentPage()).on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe(`Are you sure you want to expunge testing1?\nAll data will be expunged!`);
      await dialog.accept();
    });

    (await tenantPage.currentPage()).on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe(`Are you really, really, sure you want to expunge testing1?\nAll data will be expunged!`);
      await dialog.accept();
    });

  })

  test("Verify rejecting expunge merchant", async ({ tenantPage }) => {
    await tenantPage.clickAddMerchantButton()
    const currentPage = await tenantPage.currentPage()
    await expect(currentPage).toHaveURL(`${envVariable.local}/tenant?create=true`)
    await tenantPage.fillNewMerchantDetails(
      'testing1',
      'testing123',
      'test',
      'check',
      'testing@gmail.com',
      '9876543210',
      'abc',
      'abc',
      'abc',
      '987654',
      'abc',
      'abc,abc,abc',
      'abc',
      'abc',
      `What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`
    );

    await tenantPage.clickExpungeMerchantButton();

    (await tenantPage.currentPage()).on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe(`Are you sure you want to expunge testing1?\nAll data will be expunged!`);
      await dialog.dismiss();
    });

    (await tenantPage.currentPage()).on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe(`Are you really, really, sure you want to expunge testing1?\nAll data will be expunged!`);
      await dialog.dismiss();
    });

  })

  test("Verify the outlook page is clickable from the list", async ({ tenantPage }) => {
    await tenantPage.mailToFromTable()
  })

  test("Verify the ascending order for merchant name", async ({ tenantPage, isDesktop }) => {
    if (isDesktop) {
      await tenantPage.clickMerchantASC()
      const ascendingData = users
      const expectedAscending = users.sort()
      expect(ascendingData).toEqual(expectedAscending)
      await tenantPage.clickMerchantASC()
      expect(expectedAscending).toEqual(ascendingData)
    }
  })

  test("Verify the descending order for merchant name", async ({ tenantPage, isDesktop }) => {
    if (isDesktop) {
      await tenantPage.clickMerchantDESC()
      const descendingData = users
      const expectedDscending = users.sort().reverse()
      expect(descendingData).toEqual(expectedDscending)
      await tenantPage.clickMerchantDESC()
      expect(expectedDscending).toEqual(descendingData)
    }
  })

  test("Verify the ascending order for email", async ({ tenantPage, isDesktop }) => {
    if (isDesktop) {
      await tenantPage.clickEmailASC()
      const ascendingData = users
      const expectedAscending = users.sort()
      expect(ascendingData).toEqual(expectedAscending)
      await tenantPage.clickEmailASC()
      expect(expectedAscending).toEqual(ascendingData)
    }
  })

  test("Verify the descending order for email", async ({ tenantPage, isDesktop }) => {
    if (isDesktop) {
      await tenantPage.clickEmailDESC()
      const descendingData = users
      const expectedDscending = users.sort().reverse()
      expect(descendingData).toEqual(expectedDscending)
      await tenantPage.clickEmailDESC()
      expect(expectedDscending).toEqual(descendingData)
    }
  })

  test("Verify the ascending order for status", async ({ tenantPage, isDesktop }) => {
    if (isDesktop) {
      await tenantPage.clickStatusASC()
      const ascendingData = users
      const expectedAscending = users.sort()
      expect(ascendingData).toEqual(expectedAscending)
      await tenantPage.clickStatusASC()
      expect(expectedAscending).toEqual(ascendingData)
    }
  })

  test("Verify the descending order for status", async ({ tenantPage, isDesktop }) => {
    if (isDesktop) {
      await tenantPage.clickStatusDESC()
      const descendingData = users
      const expectedDscending = users.sort().reverse()
      expect(descendingData).toEqual(expectedDscending)
      await tenantPage.clickStatusDESC()
      expect(expectedDscending).toEqual(descendingData)
    }
  })

  test.afterAll(async () => {
    await closeConnection();
  });
})