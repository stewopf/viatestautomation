import { describe } from "node:test";
import { test, expect } from "../../fixtures/builderPage";
import { envVariable } from "../../utilities/env";
import { linkCard } from "../../utilities/common/LinkCard";

describe("Builder Test suit", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${envVariable.local}/builder`)
    })

    test("Verify the Logo is visible", async ({ builderPage }) => {
        await builderPage.isLogoVisible()
    })

    test("Verfiy the Logo is clickable", async ({ builderPage }) => {
        await builderPage.isLogoVisible();
        await builderPage.clickLogo();
    })

    test("Verfiy the Link after clicking logo", async ({ builderPage }) => {
        await builderPage.clickLogo()
        const isExpectedUrl = await builderPage.navigateToBuilderPage();
        expect(isExpectedUrl).toBe(`${envVariable.local}/builder`)
    })

    test("Verify the Hamburger Button is clickable", async ({ builderPage }) => {
        await builderPage.clickHamburgerButton()
    })

    test("Verify the Cross Button is clickable", async ({ builderPage }) => {
        await builderPage.clickHamburgerButton()
        await builderPage.clickCrossButton()
    })

    test("Verify the Menu title is visible", async ({ builderPage }) => {
        const isMenuTitle = await builderPage.isMenuTitle();
        expect(isMenuTitle).toBe("Menu")
    })

    test("Verify the Link in Sidebar", async ({ builderPage }) => {
        const count = await builderPage.getSidebarLinksCount();

        for (let i = 0; i < count; i++) {
            const href = await builderPage.getSidebarLinkHref(i);
            await builderPage.clickHamburgerButton()
            await builderPage.clickSideBarLink(i, `${envVariable.local}${href}`)
            if (`${href}` === "/logout") {
                break;
            }
        }
    }
    )

    test("Verify the Heading", async ({ builderPage }) => {
        const heading = await builderPage.headingValidation();
        expect(heading).toContain("Notices")
    })

    test("Verify the Sub Heading", async ({ builderPage }) => {
        const subHeading = await builderPage.subHeadingValidation();
        expect(subHeading).toContain("Any important messages such as system updates, bug fixes, or new features go here.")
    })

    test("Verify the Link Group Count", async ({ builderPage }) => {
        const links = await builderPage.linkGroupValidation();
        expect(links).toBe(3)
    })

    test("Verify the Existing Merchant", async ({ builderPage }) => {
        await builderPage.hoverOnExistingMerchant();
        const existingMerchants = await builderPage.existingMerchantsLink();
        await linkCard({
            ...existingMerchants,
            clickAction: () => builderPage.clickExistingMerchantLink(),
            expectedMainText: 'Existing Merchants',
            expectedSubText: 'Work with an existing Merchant',
            expectedURL: `${envVariable.local}/tenant`,
        });
    })

    test("Verify the Create a Merchant", async ({ builderPage }) => {
        await builderPage.hoverCreateAMerchantLink()
        const createAMerchant = await builderPage.createAMerchantLink()
        await linkCard({
            ...createAMerchant,
            clickAction: () => builderPage.clickCreateAMerchantLink(),
            expectedMainText: 'Create a Merchant',
            expectedSubText: 'Create a new Merchant',
            expectedURL: `${envVariable.local}/tenant?create=true`,
        });

    })

    test("Verify the View Reports", async ({ builderPage }) => {
        await builderPage.hoverViewReports()
        const viewReports = await builderPage.createViewReports()
        await linkCard({
            ...viewReports,
            clickAction: () => builderPage.clickViewReports(),
            expectedMainText: 'View Reports',
            expectedSubText: 'Create and view reports',
            expectedURL: `${envVariable.local}/reports`,
        });

    })

})