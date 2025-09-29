import { test as base } from "@playwright/test"
import BuilderPage from "../pages/BuilderPage"

type BuilderFixture = {
    builderPage: BuilderPage
}

export const test = base.extend<BuilderFixture>({
    builderPage: async ({ page }, use) => {
        const builderPage = new BuilderPage(page);
        await use(builderPage)
    }
})

export { expect } from "@playwright/test"



