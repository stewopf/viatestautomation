import { expect, Page } from "@playwright/test";
import { Navbar } from "./Navbar";

export default class TenantPage extends Navbar {
    constructor(page: Page) {
        super(page)
    }

    get backButton() {
        const backButton = this.page.locator("//div[@class='back']/img")
        if (backButton !== null) {
            return backButton
        } else throw new Error("Cannot find the Back button")
    }

    get searchMerchant() {
        const merchatnEmail = this.page.locator("//input[@id='search']")
        if (merchatnEmail !== null) {
            return merchatnEmail
        } else throw new Error("Cannot find the Merchant Email")
    }

    get searchHighLevelMerchant() {
        const searchHighLevelMerchant = this.page.locator("//input[@Placeholder='Email or Phone']")
        if (searchHighLevelMerchant !== null) {
            return searchHighLevelMerchant
        } else throw new Error("Cannot find the High Level Merchant Input field")
    }

    get searchHighLevelMerchantButton() {
        const searchHighLevelMerchantButton = this.page.locator("(//span[@style='cursor:pointer;font-size:1.5rem;color:green'])[1]/i")
        if (searchHighLevelMerchantButton !== null) {
            return searchHighLevelMerchantButton
        } else throw new Error("Cannot find the High Level Merchant button")
    }

    get highLevelMerchantMessage() {
        const merchatnEmail = this.page.locator("(//div[@class='inner'])[1]/h2")
        if (merchatnEmail !== null) {
            return merchatnEmail
        } else throw new Error("Cannot find the Message of not found High Level Merchant")
    }

    get pageDropdown() {
        const pageDropdown = this.page.locator(".pagerSize")
        if (pageDropdown !== null) {
            return pageDropdown
        } else throw new Error("Cannot find the Page Dropdown")
    }

    get firstPage() {
        const firstPageElement = this.page.locator("//div[@class='pager']/div[2]/button[1]")
        if (firstPageElement !== null) {
            return firstPageElement
        } else throw new Error("Cannot find the first Page Button")
    }

    get previousPage() {
        const previousPageElement = this.page.locator("//div[@class='pager']/div[2]/button[2]")
        if (previousPageElement !== null) {
            return previousPageElement
        } else throw new Error("Cannot find the previous Page Button")
    }

    get nextPage() {
        const nextPageElement = this.page.locator("//div[@class='pager']/div[2]/button[3]")
        if (nextPageElement !== null) {
            return nextPageElement
        } else throw new Error("Cannot find the next Page Button")
    }

    get lastPage() {
        const lastPageElement = this.page.locator("//div[@class='pager']/div[2]/button[4]")
        if (lastPageElement !== null) {
            return lastPageElement
        } else throw new Error("Cannot find the last Page Button")
    }

    get notesAddsButton() {
        const notesAddsButton = this.page.locator("//i[@class='fa-solid fa-plus']").click()
        if (notesAddsButton !== null) {
            return notesAddsButton
        } else throw new Error("Cannot find the Add Button for notes")
    }

    get notesTextarea() {
        const count = this.notesCount
        const notesTextarea = this.page.locator(`//textarea[@name="notes_text[]"]`)
        if (notesTextarea !== null) {
            return notesTextarea
        } else throw new Error("Cannot find the textarea for notes")
    }

    get addMerchantButton() {
        const addMerchantButton = this.page.locator("//div[@style='text-align:right;']//i")
        if (addMerchantButton !== null) {
            return addMerchantButton
        } else throw new Error("Cannot find the Add Merchant Button")
    }

    get tooltipMessageOfAddMerchantButton() {
        const tooltipMessageOfAddMerchantButton = this.addMerchantButton.hover()
        if (!tooltipMessageOfAddMerchantButton !== null) {
            return tooltipMessageOfAddMerchantButton
        } else throw new Error("Cannot find the Tooltip message on Add Merchant Button")
    }

    get pageNumber() {
        const pageDropdown = this.page.locator("#window")
        if (pageDropdown !== null) {
            return pageDropdown
        } else throw new Error("Cannot find the Page number and values")
    }

    get messageForNoRecordsFoundInTable() {
        const messageForNoRecordsFoundInTable = this.page.locator("td.noLabel h2").textContent()
        if (messageForNoRecordsFoundInTable !== null) {
            return messageForNoRecordsFoundInTable
        } else throw new Error("Cannot find the Message for no records found in table")
    }

    get merchantTableCount() {
        const merchantTableCount = this.page.locator("//table[@id='rows']/tbody/tr").count()
        if (merchantTableCount !== null) {
            return merchantTableCount;
        } else throw new Error("No value found in the Merchant table")
    }

    get addMerchantField() {
        const editButton = this.page.locator("(//div[@class='table-wrapper'])/div[@title='Create a new Merchange']")
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Add merchant field in Merchant page");
    }

    get addCompanyName() {
        const editButton = this.page.locator("//input[@name='companyName']")
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Add Comapny Name field in Merchant page");
    }

    get customDomain() {
        const editButton = this.page.locator('//input[@name="slug"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Custom domain field in Merchant page");
    }

    get firstName() {
        const editButton = this.page.locator('//input[@name="firstName"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the First name field in Merchant page");
    }

    get lastName() {
        const editButton = this.page.locator('//input[@name="lastName"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Last name field in Merchant page");
    }

    get email() {
        const editButton = this.page.locator('//input[@name="email"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Email field in Merchant page");
    }

    get phone() {
        const editButton = this.page.locator('//input[@name="phone"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Phone field in Merchant page");
    }

    get address() {
        const editButton = this.page.locator('//input[@name="address1"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Address field in Merchant page");
    }

    get city() {
        const editButton = this.page.locator('//input[@name="city"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the City field in Merchant page");
    }

    get state() {
        const editButton = this.page.locator('//input[@name="state"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the State field in Merchant page");
    }

    get postalCode() {
        const editButton = this.page.locator('//input[@name="postalCode"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Postal code field in Merchant page");
    }

    get industry() {
        const editButton = this.page.locator('//input[@name="industry"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Industry field in Merchant page");
    }

    get servicesOffered() {
        const editButton = this.page.locator('//input[@name="servicesOffered"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Service offered field in Merchant page");
    }

    get regionsServed() {
        const editButton = this.page.locator('//input[@name="regionsServed"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Regions served field in Merchant page");
    }

    get hoursOfOperation() {
        const editButton = this.page.locator('//input[@name="hoursOfOperation"]')
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Hours of operation field in Merchant page");
    }

    get editButtonInMerchant() {
        const editButton = this.page.locator("//a[@alt='Edit Page']").click()
        if (editButton !== null) {
            return editButton
        } else throw new Error("Cannot find the Edit Button in Merchant page");
    }

    get mailto() {
        const mailtoFromTable = this.page.locator("//td[@data-label='Email']").click()
        if (mailtoFromTable !== null) {
            return mailtoFromTable
        } else throw new Error("Cannot find the mail fields in the table.")
    }

    get merchantTitle() {
        const merchantTitle = this.page.locator("//div[@class='inner']/h1").textContent()
        if (merchantTitle !== null) {
            return merchantTitle
        } else throw new Error("Cannot find the merchant title in the page.")
    }

    get toastMessage() {
        const merchantTitle = this.page.locator("//div[@class='jq-toast-single']").textContent()
        if (merchantTitle !== null) {
            return merchantTitle
        } else throw new Error("Cannot find the Toast Message in the page.")
    }

    get notesCount() {
        const notesCount = this.page.locator("//div[@id='notes']/div").count()
        if (notesCount !== null) {
            return notesCount
        } else throw new Error("Cannot find the Notes in the page.")
    }

    get editPageElement() {
        const notesCount = this.page.locator('a[alt="Edit Page"] .fa-pen-to-square')
        if (notesCount !== null) {
            return notesCount
        } else throw new Error("Cannot find the Edit button in the page.")
    }

    get viewPublishPageButton() {
        const notesCount = this.page.locator('//div[@title="View Published Page"]/a').click()
        if (notesCount !== null) {
            return notesCount
        } else throw new Error("Cannot find the view publish page button in the page.")
    }

    get openMerchantDashboardButton() {
        const notesCount = this.page.locator(`//div[@title="Open the merchant's dashboard"]/a`).click()
        if (notesCount !== null) {
            return notesCount
        } else throw new Error("Cannot find the Open Merchant Dashboard button in the page.")
    }

    get expungeMerchantButon() {
        const expungeMerchantButon = this.page.locator(`//button[@style='color:red !important']`).click()
        if (expungeMerchantButon !== null) {
            return expungeMerchantButon
        } else throw new Error("Cannot find the expunge Merchant button in the page.")
    }

    get merchantASC() {
        const merchantASC = this.page.locator(`//*[@id="companyName_asc"]`).click()
        if (merchantASC !== null) {
            return merchantASC
        } else throw new Error("Cannot find Merchant ascending button in the page.")
    }

    get merchantDESC() {
        const merchantDESC = this.page.locator(`//i[@id='companyName_desc']`).click()
        if (merchantDESC !== null) {
            return merchantDESC
        } else throw new Error("Cannot find Merchant descending button in the page.")
    }

    get emailASC() {
        const emailASC = this.page.locator(`//i[@id='email_asc']`).click()
        if (emailASC !== null) {
            return emailASC
        } else throw new Error("Cannot find Merchant ascending button in the page.")
    }

    get emailDESC() {
        const emailDESC = this.page.locator(`//i[@id='email_desc']`).click()
        if (emailDESC !== null) {
            return emailDESC
        } else throw new Error("Cannot find Merchant descending button in the page.")
    }

    get statusASC() {
        const statusASC = this.page.locator(`//i[@id='status_asc']`).click()
        if (statusASC !== null) {
            return statusASC
        } else throw new Error("Cannot find Merchant ascending button in the page.")
    }

    get statusDESC() {
        const statusDESC = this.page.locator(`//i[@id='status_desc']`).click()
        if (statusDESC !== null) {
            return statusDESC
        } else throw new Error("Cannot find Merchant descending button in the page.")
    }

    get firstMerchantInTable() {
        const element = this.page.locator("(//tbody/tr/td[@data-label='Merchant']/a)[1]").click()
        if (element !== null) {
            return element
        } else throw new Error("Cannot find first Merchant in the table.")
    }

    async currentPage() {
        return await this.page
    }

    async navigatingBackToPreviousPage() {
        return await this.backButton.click()
    }

    async notFoundMessageOfHighLevel() {
        return await this.highLevelMerchantMessage
    }

    async paginationDropdown() {
        return await this.pageDropdown
    }

    async paginationValues() {
        return await this.pageNumber
    }

    async paginationFirstPageButton() {
        return await this.firstPage.click()
    }

    async messageForNoRecordsInTable() {
        return await this.messageForNoRecordsFoundInTable
    }

    async paginationPreviousPageButton() {
        return await this.previousPage.click()
    }

    async paginationNextPageButton() {
        return await this.nextPage.click()
    }

    async paginationLastPageButton() {
        return await this.lastPage.click()
    }


    async paginationDropdownValuesWithClicks() {
        const dropdown = await this.pageDropdown;
        const tableValueCount = await this.getMerchantTableCount();

        const options = await dropdown.locator('option').allTextContents();
        const cleanOptions = options.map(text => text?.replace(/\s+/g, '').trim() || '');
        const randomIndex = Math.floor(Math.random() * cleanOptions.length);
        const dropdownValue = cleanOptions[randomIndex];

        await dropdown.selectOption({ label: dropdownValue });

        const perPage = Number(dropdownValue);
        const totalPages = Math.ceil(tableValueCount / perPage);
        //   const pageIndicator = this.pageNumber;
        const initialPagination = `Page 1 of ${totalPages} (${tableValueCount})`;
        //   const getPaginationValue = async () => {
        //     const text = await pageIndicator.textContent();
        //     return text?.trim() || '';
        //   };

        const paginationStates: { action: string; paginationValue: string }[] = [];

        paginationStates.push({ action: 'Initial Load', paginationValue: initialPagination });

        if (totalPages > 1) {
            paginationStates.push({ action: 'Last Page', paginationValue: `Page ${totalPages} of ${totalPages} (${tableValueCount})` });

            if (totalPages > 2) {
                paginationStates.push({ action: 'Previous Page', paginationValue: `Page ${totalPages - 1} of ${totalPages} (${tableValueCount})` });
            }

            paginationStates.push({ action: 'First Page', paginationValue: `Page 1 of ${totalPages} (${tableValueCount})` });

            if (totalPages > 1) {
                paginationStates.push({ action: 'Next Page', paginationValue: `Page 2 of ${totalPages} (${tableValueCount})` });
            }
        }

        return {
            dropdownValue,
            paginationStates
        };
    }

    async searchMerchantAndPressEnter(Value: string) {
        if (Value !== null && Value !== undefined) {
            await this.searchMerchant.fill(Value);
            await this.searchMerchant.press("Enter")
        }
    }

    async searchHighLevelMerchantWithPressEnter(Value: string) {
        await this.searchHighLevelMerchant.fill(Value);
        await this.searchHighLevelMerchant.press("Enter")
    }

    async searchHighLevelMerchantWithClickButton(Value: string) {
        await this.searchHighLevelMerchant.fill(Value);
        await this.searchHighLevelMerchantButton.click()
    }

    async getMerchantTableCount() {
        const count = await this.pageNumber.textContent()
        const match = count?.match(/\((\d+)\)/)
        const extractedNumber = match ? parseInt(match[1], 10) : null;
        const number = Number(extractedNumber)
        return await number
    }

    async getRowCount() {
        return await this.merchantTableCount
    }

    async getMerchantDataFromTable(randomNumber: Number) {
        const count = await this.merchantTableCount
        if (count > 0) {
            const clickMerchantFromTable = this.page.locator(`//table[@id='rows']/tbody/tr[${randomNumber}]/td[@data-label='Merchant']/a`).click();
            return clickMerchantFromTable;
        } else {
            throw new Error("Cannot click any Merchant as there is no value in the table");
        }
    }

    async getEditButtonInMerchant() {
        return await this.editButtonInMerchant
    }

    async clickAddMerchantButton() {
        return await this.addMerchantButton.click()
    }

    async merchantTitleinTenantPage() {
        return await this.merchantTitle
    }

    async fillNewMerchantDetails(
        merchantName: string,
        domain: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        address1: string,
        city: string,
        state: string,
        postalCode: string,
        industry: string,
        serviceOffered: string,
        regionsServed: string,
        hoursOfOperation: string,
        notesTextareaonTenantPage: string
    ) {

        await this.addCompanyName.fill(merchantName),
            await this.customDomain.fill(domain),
            await this.firstName.fill(firstName),
            await this.lastName.fill(lastName),
            await this.email.fill(email),
            await this.phone.fill(phone),
            await this.address.fill(address1),
            await this.city.fill(city),
            await this.state.fill(state),
            await this.postalCode.fill(postalCode),
            await this.industry.fill(industry),
            await this.servicesOffered.fill(serviceOffered),
            await this.regionsServed.fill(regionsServed),
            await this.hoursOfOperation.fill(hoursOfOperation)

        await this.notesAddsButtononTenatPage()
        await this.notesTextarea.fill(notesTextareaonTenantPage);
        await this.page.locator('//button[@class="primary"]').click();
    }

    async exitFromNewMerchantDetails(
        merchantName: string,
        domain: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        address1: string,
        city: string,
        state: string,
        postalCode: string,
        industry: string,
        serviceOffered: string,
        regionsServed: string,
        hoursOfOperation: string
    ) {

        await this.addCompanyName.fill(merchantName),
            await this.customDomain.fill(domain),
            await this.firstName.fill(firstName),
            await this.lastName.fill(lastName),
            await this.email.fill(email),
            await this.phone.fill(phone),
            await this.address.fill(address1),
            await this.city.fill(city),
            await this.state.fill(state),
            await this.postalCode.fill(postalCode),
            await this.industry.fill(industry),
            await this.servicesOffered.fill(serviceOffered),
            await this.regionsServed.fill(regionsServed),
            await this.hoursOfOperation.fill(hoursOfOperation)

        await this.page.locator('(//div[@style="text-align:center;padding-bottom:1rem"])[1]/button[2]').click();
    }

    async editMerchantDetails() {
        await this.addCompanyName.waitFor({ state: 'visible' });

        const companyName = await this.addCompanyName.inputValue();
        const customDomain = await this.customDomain.inputValue();
        const firstName = await this.firstName.inputValue();
        const lastName = await this.lastName.inputValue();
        const email = await this.email.inputValue();
        const phone = await this.phone.inputValue();
        const address = await this.address.inputValue();
        const city = await this.city.inputValue();
        const state = await this.state.inputValue();
        const postalCode = await this.postalCode.inputValue();
        const industry = await this.industry.inputValue();
        const serviceOffered = await this.servicesOffered.inputValue();
        const regionsServed = await this.regionsServed.inputValue();
        const hoursOfOperation = await this.hoursOfOperation.inputValue();

        const button = await this.page.locator('//button[@class="primary"]').click();

        return {
            companyName, customDomain, firstName, lastName, email, phone,
            address, city, state, postalCode, industry, serviceOffered,
            regionsServed, hoursOfOperation, button
        };
    }

    async openEditMerchantPageFromTable(value: number) {
        const element = this.page.locator(`//td[@data-label='Merchant']/a`).nth(value);
        const onclickAttr = await element.getAttribute('onclick');
        const tenantIdMatch = onclickAttr?.match(/'([a-f0-9]{24})'/);
        const tenantId = tenantIdMatch?.[1];
        const actionElement = element.click()
        if (!tenantId) {
            throw new Error('Tenant ID not found in onclick attribute');
        }
        return await { actionElement, tenantId }
    }

    async openViewPublishPage(value: number) {
        const element = this.page.locator(`//a[@href="//daaaedeff.localhost:9000"]`).nth(value);
        const actionElement = element.click()
        if (!element) {
            throw new Error('Tenant ID not found in onclick attribute');
        }
        return await actionElement
    }

    async notesAddsButtononTenatPage() {
        return await this.notesAddsButton
    }

    async notesTextareaonTenantPage(Value: string) {
        return await this.notesTextarea.fill(Value)
    }

    async toastMessageTenantPage() {
        return await this.toastMessage
    }

    async notes() {
        return await this.notesCount
    }

    async mailToFromTable() {
        const element = this.page.locator(`(//td[@data-label='Email'])/a`)
        const target = element.nth(0);
        await target.waitFor({ state: 'visible' });
        await target.click();
    }

    async clickEditPageButton() {
        await this.page.waitForLoadState('networkidle');
        const href = await this.page.getAttribute('a[alt="Edit Page"]', 'href');
        const editPageElement = this.page.locator('a[alt="Edit Page"]');
        await editPageElement.click();
        return href;
    }

    async clickFirstElement() {
        return await this.firstMerchantInTable;
    }

    async refreshDataFromHighleve(tenantId: string) {
        const element = this.page.locator(`//a[@href="/tenant/${tenantId}?action=refresh"]`).click()
        return await element;
    }

    async openTheMerchantDashboard() {
        const element = this.page.locator('//a[@href="http://localhost:8080/dashboard?v=business&tenantId=68d5a4a2eb8bd5c7233a8cf2"]').click()
        return await element;
    }

    async clickExpungeMerchantButton() {
        return await this.expungeMerchantButon;
    }

    async clickMerchantASC() {
        return await this.merchantASC;
    }

    async clickMerchantDESC() {
        return await this.merchantDESC;
    }

    async clickEmailASC() {
        return await this.emailASC;
    }

    async clickEmailDESC() {
        return await this.emailDESC;
    }

    async clickStatusASC() {
        return await this.statusASC;
    }

    async clickStatusDESC() {
        return await this.statusDESC;
    }
}