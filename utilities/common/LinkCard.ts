import { Locator, Page, expect } from '@playwright/test';

interface BuilderCardData {
    page: Page;
    image: Locator;
    mainText: string;
    subText: Locator;
    subTextValidation: string;
    link: Locator;
    clickAction: () => Promise<void>;
    expectedURL: string;
    expectedMainText: string;
    expectedSubText: string;
}

export async function linkCard(card: BuilderCardData) {
    const {
        image,
        mainText,
        subText,
        subTextValidation,
        link,
        page,
        clickAction,
        expectedMainText,
        expectedSubText,
        expectedURL,
    } = card;

    await image.waitFor({ state: 'visible' });
    expect(image).toBeVisible();
    expect(mainText).toContain(expectedMainText);

    await expect(link).toHaveCSS('transition', "background-color 0.5s, transform 0.5s");

    expect(subTextValidation).toContain(expectedSubText);
    await subText.waitFor({ state: 'attached' });
    expect(subText).toBeVisible();

    await clickAction();
    await expect(page).toHaveURL(expectedURL);
}
