import { expect, Page } from "@playwright/test";
import TenantPage from "../../pages/TenantPage";
import { envVariable } from "../env";

interface MerchantPagData {
  users: any;
  tenantPage: TenantPage;
}

export async function MerchantToPublishPage(merchantPageData: MerchantPagData) {
  const { users, tenantPage } = merchantPageData;

  const testingMerchant = users.find(
    (user: { companyName: string }) => user.companyName === "testing"
  );

  if (!testingMerchant) {
    console.error("Testing merchant not found in users array");
    return;
  }

  const dropdown = tenantPage.paginationDropdown();
  const optionsText = await (await dropdown).allTextContents();

  const str = optionsText[0].trim();
  const lines = str.split("\n").filter((line) => line.trim() !== "");
  const pageSizes = lines.map((line) => parseInt(line.trim(), 10));

  const randomNumber = Math.floor(Math.random() * 4);

  let tenantId;

  if (pageSizes.length === 0) {
    console.error("No page sizes available");
    return;
  }

  await (await dropdown).selectOption({ value: String(pageSizes[randomNumber]) });

  let found = false;

  while (true) {
    const page = await tenantPage.currentPage();
    await page.waitForLoadState("networkidle");

    const merchantLocator = page.locator(
      `text="${testingMerchant.companyName}"`
    );

    if (await merchantLocator.count()===1) {
      const element = merchantLocator.first();

      await element.waitFor({ state: "visible" });
      await element.waitFor({ state: "attached" });
      await element.scrollIntoViewIfNeeded();
      await element.click();

      found = true;

      try {
        const url = page.url();
        const pathSegments = url.split("/").filter(Boolean);
        tenantId = pathSegments[pathSegments.length - 1];
      } catch (error) {
        console.error("Invalid URL:", error);
        return null;
      }

      await expect(page).toHaveURL(
        `${envVariable.local}/tenant/${tenantId}`
      );

      const editPageHref = await tenantPage.clickEditPageButton();

      await expect(page).toHaveURL(
        `${envVariable.local}${editPageHref}`
      );

      const editHomePage = await tenantPage.editHomePageTitleElem();
      await expect(editHomePage).toContain(
        `Editing Home Page: ${testingMerchant.companyName}`
      );

      break;
    }

    await page.waitForLoadState("networkidle");

    await Promise.all([
      tenantPage.paginationNextPageButton()
    ]);
  }

  if (!found) {
    console.error("Testing merchant not found on any page");
  }
}
