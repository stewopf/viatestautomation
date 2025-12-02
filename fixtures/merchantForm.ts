import {test as base, expect} from "@playwright/test";
import MerchantPage from "../pages/MerchantPage";
import TenantPage from "../pages/TenantPage";
type merchantForm={
    tenantPage:TenantPage,
    merchantPage:MerchantPage,
    isDesktop: boolean;
}

export const test=base.extend<merchantForm>({
    tenantPage: ({ page }, use) => {
            const tenantPage = new TenantPage(page);
            use(tenantPage)
        },
        
    merchantPage:({page},use)=>{
        const merchantPagePage = new MerchantPage(page)
        use(merchantPagePage)
    },

    isDesktop: async ({ page }, use) => {
        const width = (await page.viewportSize())?.width ?? 1024;
        await use(width >= 1024);
    }
})

export {expect}