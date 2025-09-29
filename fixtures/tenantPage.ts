import { test as base, expect } from "@playwright/test"
import TenantPage from "../pages/TenantPage"

type TenantFixture = {
    tenantPage: TenantPage;
    isDesktop: boolean;
}

export const test = base.extend<TenantFixture>({
    tenantPage: ({ page }, use) => {
        const tenantPage = new TenantPage(page);
        use(tenantPage)
    },

    isDesktop: async ({ page }, use) => {
        const width = (await page.viewportSize())?.width ?? 1024;
        await use(width >= 1024);
    },
})

export { expect }