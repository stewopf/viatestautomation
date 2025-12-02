import { expect, test } from "../../fixtures/merchantForm";
import { SignUp } from "../../utilities/common/SignUpPage";
import { envVariable, user } from "../../utilities/env";
import { tryAcquireLockOrReadWinner } from '../../utilities/common/signUpGaurd';
import { Collection } from "mongodb";
import { deleteFromDatabase, queryDatabase } from "../../utilities/db";

test.describe("Merchant Login Form Suit", () => {
    let users: Collection;

    test.beforeAll(async () => {
        users = await queryDatabase('users');
    });

    test.beforeEach(async ({ page }) => {
        await page.goto(`${envVariable.merchantDashboard}/user/login`)
    })

    test("Verify the page is split for Desktop screen size", async ({ merchantPage, isDesktop }) => {
        const leftPannel = await merchantPage.leftPannel()
        const rightPannel = await merchantPage.rightPannel()
        if (isDesktop) {

            expect(leftPannel).toBeVisible()
            expect(rightPannel).toBeVisible()

            const viewport = await (await merchantPage.currentPage()).viewportSize();
            if (!viewport) throw new Error('No viewport size');

            const leftBox = await leftPannel.boundingBox();
            const rightBox = await rightPannel.boundingBox();

            if (!leftBox || !rightBox) throw new Error('Bounding box is null');

            const halfWidth = viewport.width / 2;
            const tolerance = viewport.width * 0.1;

            expect(Math.abs(leftBox.width - halfWidth)).toBeLessThanOrEqual(tolerance);
            expect(Math.abs(rightBox.width - halfWidth)).toBeLessThanOrEqual(tolerance);

            expect(Math.abs(leftBox.width - rightBox.width)).toBeLessThanOrEqual(10);
        } else {
            expect(leftPannel).toBeHidden()
            expect(rightPannel).toBeVisible()
            const rightBox = await rightPannel.boundingBox();
            expect(rightBox?.width).toBeLessThanOrEqual(990);
        }
    })

    test("Verify the user can login by adding proper creds", async ({ merchantPage }) => {
        const email = await merchantPage.emailField();
        const password = await merchantPage.passwordField();
        const signIn = await merchantPage.signInButton();

        await email.fill('nirajp@oneparkfinancial.com');
        await password.fill('Oneparkfinancial@2025')
        await signIn.click()
    })

    test("Verify the user can't login by adding incorrect email and valid password", async ({ merchantPage }) => {
        const email = await merchantPage.emailField();
        const password = await merchantPage.passwordField();
        const signIn = await merchantPage.signInButton();
        const page = await merchantPage.currentPage()
        const crossButton = await merchantPage.corssButton()
        const alert = await merchantPage.alert();

        await email.fill('nirajp@oneparkfinancial.co');
        await password.fill('Stella@2025')
        await signIn.click()

        await page.on('dialog', async (alert) => {
            expect(alert.type()).toContain("alert");
            expect(alert.message()).toContain("Error: That email is not registered");
        })

        await expect(alert.evaluate(el => getComputedStyle(el).getPropertyValue('--bs-alert-bg').trim())).resolves.toBe('#f8d7da');

        await crossButton.click()

    })

    test("Verify the user can't login by adding valid email and invalid password", async ({ merchantPage }) => {
        const email = await merchantPage.emailField();
        const password = await merchantPage.passwordField();
        const signIn = await merchantPage.signInButton();
        const page = await merchantPage.currentPage()
        const crossButton = await merchantPage.corssButton()
        const alert = await merchantPage.alert();

        await email.fill(`${user.email}`);
        await password.fill(`${user.password}`)
        await signIn.click()

        await page.on('dialog', async (alert) => {
            expect(alert.type()).toContain("alert");
            expect(alert.message()).toContain("Error: Password incorrect");
        })

        await expect(alert.evaluate(el => getComputedStyle(el).getPropertyValue('--bs-alert-bg').trim())).resolves.toBe('#f8d7da');

        await crossButton.click()

    })

    test("Verify the user can't login by leaving the email field empty and adding valid password", async ({ merchantPage, browserName }) => {
        const email = await merchantPage.emailField();
        const password = await merchantPage.passwordField();
        const signIn = await merchantPage.signInButton();

        await email.fill('');
        await password.fill(`${user.password}`)
        await signIn.click()

        await email.focus();
        await email.blur();

        const tooltipText = await email.evaluate((element) => {
            const input = element as HTMLInputElement;
            return input.validationMessage;
        });

        const expectedMessage = browserName === 'webkit' ? 'Fill out this field' : 'Please fill out this field.';
        expect(tooltipText.trim()).toContain(expectedMessage);
    })

    test("Verify the user can't login by leaving the password field empty and adding valid email", async ({ merchantPage, browserName }) => {
        const email = await merchantPage.emailField();
        const password = await merchantPage.passwordField();
        const signIn = await merchantPage.signInButton();

        await email.fill(`${user.email}`);
        await password.fill('')
        await signIn.click()

        await password.focus();
        await password.blur();

        const tooltipText = await password.evaluate((element) => {
            const input = element as HTMLInputElement;
            return input.validationMessage;
        });

        const expectedMessage = browserName === 'webkit' ? 'Fill out this field' : 'Please fill out this field.';
        expect(tooltipText.trim()).toContain(expectedMessage);
    })

    test("Verify the user can't login by adding the email without @", async ({ merchantPage, browserName }) => {
        const email = await merchantPage.emailField();
        const password = await merchantPage.passwordField();
        const signIn = await merchantPage.signInButton();

        await email.fill(`${user.email}`);
        await password.fill('')
        await signIn.click()

        await password.focus();
        await password.blur();

        const tooltipText = await password.evaluate((element) => {
            const input = element as HTMLInputElement;
            return input.validationMessage;
        });
       
        const expectedMessage = browserName === 'webkit' ? 'Fill out this field' : 'Please fill out this field.';
        expect(tooltipText.trim()).toContain(expectedMessage);
    })

    test('Verify the user can Sign up with proper creds (single-browser gate)', async ({ merchantPage, browserName }, testInfo) => {

        const projectName = testInfo.project.name ?? browserName;
        const { acquired, winner } = tryAcquireLockOrReadWinner(projectName);

        if (!acquired && winner && winner !== projectName) {
            test.skip(true, `Sign-up already executed by project "${winner}". Skipping for "${projectName}".`);
        }

        await deleteFromDatabase('users', { email: `${user.email}` })
        const firstName = await merchantPage.firstNameInput();
        const lastName = await merchantPage.lastNameInput();
        const email = await merchantPage.emailField();
        const phone = await merchantPage.phoneInput();
        const password = await merchantPage.passwordField();
        const confirmPassword = await merchantPage.confirmPasswordInput();
        const checkbox = await merchantPage.agreementCheckboxForTermsNCondition();
        const signUp = await merchantPage.signUpButton();
        const page = await merchantPage.currentPage();

        await SignUp(merchantPage);

        await firstName.fill(`${user.firstName}`);
        await lastName.fill(`${user.lastName}`);
        await email.fill(`${user.email}`);
        await phone.fill(`${user.phone}`);
        await password.fill(`${user.password}`);
        await confirmPassword.fill(`${user.confirmPassword}`);
        await checkbox.click();
        await signUp.click();

        await expect(page).toHaveURL(`${envVariable.merchantDashboard}/user/login`);
        await page.once('dialog', async (alert) => {
            expect(alert.type()).toContain("alert");
            expect(alert.message()).toContain(
                "We have sent a verification link to your email. Please check your inbox and click the link to verify your account and continue."
            );
        });
    });

    test("Verify the user can forgot the password", async ({ merchantPage }) => {
        function getSingleUserByEmail(users: any, emailToMatch: any) {
            const needle = String(emailToMatch).trim().toLowerCase();

            const matches = users.filter((u: { email: any; username: any; }) => {
                const email = String(u?.email ?? "").trim().toLowerCase();
                const username = String(u?.username ?? "").trim().toLowerCase();
                return email === needle || username === needle;
            });

            if (matches.length === 0) throw new Error(`No user found for email: ${emailToMatch}`);
            if (matches.length > 1) throw new Error(`Multiple users found for email: ${emailToMatch}`);

            return matches[0];
        }

        const userCondition = getSingleUserByEmail(users, `${user.email}`)

        if (userCondition.status === "ACTIVE") {

            const forgotPassword = await merchantPage.forgotPasswordLink()
            const email = await merchantPage.emailField();
            const page = await merchantPage.currentPage()
            const alert = await merchantPage.alert();
            await forgotPassword.click();

            expect(page.url()).toBe(`${envVariable.merchantDashboard}/user/forgot-password`)
            await email.fill(`${user.email}`)

            await merchantPage.submitButtonClick()

            expect(page.url()).toBe(`${envVariable.merchantDashboard}/user/login`)

            await page.on('dialog', async (alert) => {
                expect(alert.type()).toContain("alert");
                expect(alert.message()).toContain("We have sent a password reset link to your email. Please check your inbox and click the link to reset your password.");
            })
        }else{
            test.skip(true);
        }
    })

    test("Verify the user does not exist and user try to request for forgot password", async ({ merchantPage }) => {
        const forgotPassword = await merchantPage.forgotPasswordLink()
        const email = await merchantPage.emailField();
        const page = await merchantPage.currentPage()
        const crossButton = await merchantPage.corssButton()
        const alert = await merchantPage.alert();
        await forgotPassword.click();

        expect(page.url()).toBe(`${envVariable.merchantDashboard}/user/forgot-password`)
        await email.fill(`${user.emailDoesNotExist}`)

        await merchantPage.submitButtonClick()

        await page.on('dialog', async (alert) => {
            expect(alert.type()).toContain("alert");
            expect(alert.message()).toContain("Error: User does not exists !");
        })

        await expect(alert.evaluate(el => getComputedStyle(el).getPropertyValue('--bs-alert-bg').trim())).resolves.toBe('#f8d7da');

        await crossButton.click()
    })

    test("Verify the user can navigate to Login page after click on Sign in link in forgot password", async ({ merchantPage }) => {
        const forgotPassword = await merchantPage.forgotPasswordLink()
        const goToSignInLink = await merchantPage.goToSignInLink();
        const page = await merchantPage.currentPage()
        await forgotPassword.click();

        expect(page.url()).toBe(`${envVariable.merchantDashboard}/user/forgot-password`)
        await goToSignInLink.click()
        expect(page.url()).toBe(`${envVariable.merchantDashboard}/user/login`)

    })

    test("Verify the user can navigate to Sign up page after clicking on Create an Account link", async ({ merchantPage }) => {
        const createAnAccount = await merchantPage.createAnAccountLink()
        const page = await merchantPage.currentPage()
        await createAnAccount.click()
        expect(page.url()).toBe(`${envVariable.merchantDashboard}/user/register`)

    })

    test("Verify the user can't Sign up with same email", async ({ merchantPage }) => {
        const firstName = await merchantPage.firstNameInput();
        const lastName = await merchantPage.lastNameInput();
        const email = await merchantPage.emailField();
        const phone = await merchantPage.phoneInput();
        const password = await merchantPage.passwordField();
        const confirmPassword = await merchantPage.confirmPasswordInput();
        const checkbox = await merchantPage.agreementCheckboxForTermsNCondition();
        const signUp = await merchantPage.signUpButton();
        const page = await merchantPage.currentPage();
        const alert = await merchantPage.alert();
        const crossButton = await merchantPage.corssButton()

        await SignUp(merchantPage);

        await firstName.fill(`${user.firstName}`);
        await lastName.fill(`${user.lastName}`);
        await email.fill(`${user.email}`);
        await phone.fill(`${user.phone}`);
        await password.fill(`${user.password}`);
        await confirmPassword.fill(`${user.confirmPassword}`);
        await checkbox.click();
        await signUp.click();

        await page.once('dialog', async (alert) => {
            expect(alert.type()).toContain("alert");
            expect(alert.message()).toContain(
                "Error: This email is already registered"
            );
        });

        await expect(alert.evaluate(el => getComputedStyle(el).getPropertyValue('--bs-alert-bg').trim())).resolves.toBe('#f8d7da');
        await crossButton.click()
    })

    test("Verify the user can't Sign up when merchant's email is not present in database", async ({ merchantPage }) => {
        const firstName = await merchantPage.firstNameInput();
        const lastName = await merchantPage.lastNameInput();
        const email = await merchantPage.emailField();
        const phone = await merchantPage.phoneInput();
        const password = await merchantPage.passwordField();
        const confirmPassword = await merchantPage.confirmPasswordInput();
        const checkbox = await merchantPage.agreementCheckboxForTermsNCondition();
        const signUp = await merchantPage.signUpButton();
        const page = await merchantPage.currentPage();
        const alert = await merchantPage.alert();
        const crossButton = await merchantPage.corssButton()

        await SignUp(merchantPage);

        await firstName.fill(`${user.firstName}`);
        await lastName.fill(`${user.lastName}`);
        await email.fill(`${user.emailDoesNotExist}`);
        await phone.fill(`${user.phone}`);
        await password.fill(`${user.password}`);
        await confirmPassword.fill(`${user.confirmPassword}`);
        await checkbox.click();
        await signUp.click();

        await page.once('dialog', async (alert) => {
            expect(alert.type()).toContain("alert");
            expect(alert.message()).toContain(
                "Error: No such tenant exists"
            );
        });

        await expect(alert.evaluate(el => getComputedStyle(el).getPropertyValue('--bs-alert-bg').trim())).resolves.toBe('#f8d7da');

        await crossButton.click()
    })

    test("Verify the fields are have boder when it is active", async ({ merchantPage }) => {
        await SignUp(merchantPage);

        const firstName = await merchantPage.firstNameInput();
        const checkbox = await merchantPage.agreementCheckboxForTermsNCondition();

        await firstName.focus();
        await expect(firstName).toHaveCSS('border-color', 'rgb(134, 183, 254)');

        await checkbox.focus();
        await expect(checkbox).toHaveCSS('border-color', 'rgb(222, 226, 230)');
    })

})

