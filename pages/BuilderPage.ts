import { type Page } from '@playwright/test';
import { Navbar } from './Navbar';

export default class BuilderPage extends Navbar {
    constructor(page: Page) {
        super(page)
    }

    get mainHeading() {
        const heading = this.page.locator("//h2[text()='Notices']");
        if (heading !== null) {
            return heading
        } else throw new Error("Cannot find the Main Heading")
    }

    get subHeading() {
        const subHeading = this.page.locator("(//p)[1]")
        if (subHeading) {
            return subHeading
        } else throw new Error("Cannot find Sub Heading")
    }

    get linkGroup() {
        const link = this.page.locator("//section[@class='tiles']/article")
        if (link !== null) {
            return link
        } else throw new Error("Cannot find Link Group");
    }

    get existingMerchants() {
        const existingMerchants = this.page.locator("//section[@class='tiles']/article[@class='style2'][1]");
        if (existingMerchants) {
            return existingMerchants
        } else throw new Error("Cannot find Existing Merchants")
    }

    get createAMerchant(){
        const createAMerchant=this.page.locator("//section[@class='tiles']/article[@class='style2'][2]")
        if(createAMerchant){
            return createAMerchant
        }else throw new Error("Cannot find Create a Merchant")
    }

    get viewReports(){
        const viewReports=this.page.locator("//section[@class='tiles']/article[@class='style2'][3]")
        if(viewReports){
            return viewReports
        }else throw new Error("Cannot find View Reports")
    }

    async headingValidation() {
        return await this.mainHeading.textContent()
    }

    async subHeadingValidation() {
        return await this.subHeading.textContent();
    }

    async linkGroupValidation() {
        return await this.linkGroup.count()
    }

    async hoverOnExistingMerchant() {
        return await this.page.locator("//section[@class='tiles']/article[@class='style2'][1]");
    }

    async clickExistingMerchantLink() {
        return await this.page.locator("//article/a[@href='/tenant']").click();
    }

    async existingMerchantsLink() {
        return {
            page: await this.page,
            image: await this.page.locator("//img[@src='images/weareopen.jpg']"),
            mainText:(await this.page.locator("//h2[text()='Existing Merchants']").textContent()) ?? '',
            subText:await this.page.locator("//p[text()='Work with an existing Merchant']"),
            subTextValidation: (await this.page.locator("//p[text()='Work with an existing Merchant']").textContent()) ?? '',
            link: await this.page.locator("//article/a[@href='/tenant']"),
        }
    }

    async hoverCreateAMerchantLink() {
        await this.page.hover("//section[@class='tiles']/article[@class='style2'][2]");
    }

    async clickCreateAMerchantLink() {
        await this.page.locator("//article[@class='style2']/a[@href='/tenant?create=true']").click();
    }

    async createAMerchantLink(){
        return {
            page:await this.page,
            image:await this.page.locator("//img[@src='images/newmerchant.jpg']"),
            link:await this.page.locator("//article[@class='style2']/a[@href='/tenant?create=true']"),
            mainText:(await this.page.locator("//h2[text()='Create a Merchant']").textContent()) ?? '',
            subText:await this.page.locator("//p[text()='Create a new Merchant']"),
            subTextValidation:(await this.page.locator("//p[text()='Create a new Merchant']").textContent()) ?? ''
        }
    }

    async hoverViewReports() {
        await this.page.hover("//section[@class='tiles']/article[@class='style2'][3]");
    }

    async clickViewReports() {
        await this.page.locator("//article[@class='style2']/a[@href='/reports']").click();
    }

    async createViewReports(){
        return {
            page:await this.page,
            image:await this.page.locator("//img[@src='images/reports.jpg']"),
            link:await this.page.locator("//article[@class='style2']/a[@href='/reports']"),
            mainText:(await this.page.locator("//h2[text()='View Reports']").textContent()) ?? '',
            subText:await this.page.locator("//p[text()='Create and view reports']"),
            subTextValidation:(await this.page.locator("//p[text()='Create and view reports']").textContent()) ?? ''
        }
    }

    async builderPage(){
        return this.page
    }
}