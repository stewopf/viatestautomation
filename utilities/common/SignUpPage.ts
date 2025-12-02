import { expect } from "../../fixtures/merchantForm"
import { envVariable } from "../env"

export async function SignUp(merchantPagePage: any) {
    const createAnAccount = await merchantPagePage.createAnAccountLink()
    const page = await merchantPagePage.currentPage()
    await createAnAccount.click()
    expect(page.url()).toBe(`${envVariable.merchantDashboard}/user/register`)
}

