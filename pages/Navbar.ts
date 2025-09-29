import { Page } from "@playwright/test";
import { envVariable } from "../utilities/env";

export class Navbar {
    protected page: Page

    constructor(page: Page) {
        this.page = page
    }

    get verifyLogo() {
        return this.page.locator("(//a[@href='/builder'])[1]")
    }

    get hamburgerButton() {
        const hamburgerButton = this.page.locator("//nav/ul/li/a[@href='#menu']")
        if (hamburgerButton) {
            return hamburgerButton
        } else throw new Error("Cannot find Hamburger button")
    }

    get crossButton() {
        const hamburgerButton = this.page.locator("//nav[@id='menu']/a[@class='close']")
        if (hamburgerButton) {
            return hamburgerButton
        } else throw new Error("Cannot find Cross button")
    }

    get menuTitle() {
        const menuTitle = this.page.locator("//h2[text()='Menu']")
        if (menuTitle) {
            return menuTitle
        } else throw new Error("Cannot find Menu Title")
    }

    get sideBarLinksCount() {
        const sideBarLinksCount = this.page.locator("(//div[@class='inner'])[3]/ul/li/a")
        if (sideBarLinksCount) {
            return sideBarLinksCount
        } else throw new Error("Cannot find Sidebar Links")
    }

    get sideBarLink() {
        const singleSideBarLink = this.page.locator("((//div[@class='inner'])[3]/ul/li/a)")
        return singleSideBarLink
    }

    async isLogoVisible() {
        await this.verifyLogo.isVisible();
    }

    async clickLogo() {
        return await this.verifyLogo.click();
    }

    async navigateToBuilderPage() {
        return await this.page.url();
    }

    async clickHamburgerButton() {
        await this.hamburgerButton.click()
    }

    async clickCrossButton() {
        return await this.crossButton.click()
    }

    async isMenuTitle() {
        return await this.menuTitle.textContent()
    }

    async getSidebarLinksCount() {
        return await this.sideBarLinksCount.count();
    }

    async getSidebarLinkHref(index: number) {
        return await this.sideBarLinksCount.nth(index).getAttribute('href');
    }

    async clickSideBarLink(index: number, expectedUrl: string) {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'load' }),
            this.sideBarLink.nth(index).click()
        ]);
        const currentUrl = this.page.url();
        const isLogout = expectedUrl === `${envVariable.local}/logout` && currentUrl.includes(`${envVariable.local}/splash`);
        if (!currentUrl.includes(expectedUrl) && !isLogout) {
            throw new Error(`Expected to navigate to "${expectedUrl}", but got "${currentUrl}"`);
        }
        await this.page.goto(`${envVariable.local}/builder`)
    }

}