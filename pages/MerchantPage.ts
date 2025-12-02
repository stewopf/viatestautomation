import { Page } from "@playwright/test";

export default class MerchantPage{
    protected page : Page
    constructor(page:Page){
        this.page=page
    }

    get imageSide(){
        const element= this.page.locator(".col-lg-6.d-none.d-lg-block.bg-black.text-white")
        if(element!==null){
            return element
        }throw new Error("Left side of the screen, in which image is avialble is not visible")
    }

    get formSide(){
        const element= this.page.locator(".col-lg-6.d-flex.flex-column.justify-content-center.align-items-center")
        if(element!==null){
            return element
        }throw new Error("Right side of the screen, in which form is available in not visible")
    }

    get email(){
        const element = this.page.locator("//input[@id='email']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the Email field in the screen")
    }

    get password(){
        const element = this.page.locator("//input[@id='password']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the Password field in the screen")
    }

    get forgotPassword(){
        const element = this.page.locator("//a[text()='Forgot password']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the Forgot password link in the screen")
    }

    get signIn(){
        const element = this.page.locator("//button[normalize-space()='Sign In']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the Sign In button in the screen")
    }

    get createAnAccount(){
        const element = this.page.locator("//a[text()='Create an Account']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the Create an Account link in the screen")
    }

    get submitButton(){
        const element = this.page.locator("//button[normalize-space()='Submit']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the Submit button in the screen")
    }

    get goToSignIn(){
        const element = this.page.locator("//a[text()='Sign In']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the Sign In link in the screen")
    }

    get firstName(){
        const element = this.page.locator("//input[@id='firstName']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the First name in the screen")
    }

    get lastName(){
        const element = this.page.locator("//input[@id='lastName']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the First name in the screen")
    }

    get phone(){
        const element = this.page.locator("//input[@id='phone']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the First name in the screen")
    }

    get confirmPassword(){
        const element = this.page.locator("//input[@id='confirm_password']")
        if(element!==null){      
            return element
        }throw new Error("Cannot find the First name in the screen")
    }

    get agreementForTermsNCondition(){
        const element = this.page.locator("//input[@id='terms']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the Checkbox in the screen")
    }

    get signUp(){
        const element = this.page.locator("//button[normalize-space()='Sign Up']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the Checkbox in the screen")
    }

    get termsOfUse(){
        const element = this.page.locator("//a[text()='Terms of use']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the Terms of use in the screen")
    }

    get privacyPolicy(){
        const element = this.page.locator("//a[text()='Privacy Policy']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the Privacy Policy in the screen")
    }

    get alertBox(){
        const element=this.page.locator("//div[@class='alert alert-danger alert-dismissible fade show']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the alert box in the screen")
    }

    get crossbtn(){
        const element=this.page.locator("//button[@class='btn-close']")
        if(element!==null){
            return element
        }throw new Error("Cannot find the cross button in the screen")
    }

    async currentPage(){
        return await this.page
    }

    async leftPannel(){
        return await this.imageSide
    }

    async rightPannel(){
        return await this.formSide
    }

    async emailField(){
        return await this.email
    }

    async passwordField(){
        return await this.password
    }

    async forgotPasswordLink(){
        return await this.forgotPassword
    }

    async signInButton(){
        return await this.signIn
    }

    async createAnAccountLink(){
        return await this.createAnAccount
    }

    async submitButtonClick(){
        return await this.submitButton.click()
    }

    async goToSignInLink(){
        return await this.goToSignIn
    }

    async firstNameInput(){
        return await this.firstName
    }

    async lastNameInput(){
        return await this.lastName
    }

    async phoneInput(){
        return await this.phone
    }

    async agreementCheckboxForTermsNCondition(){
        return await this.agreementForTermsNCondition
    }

    async confirmPasswordInput(){
        return await this.confirmPassword
    }

    async termsOfUseLink(){
        return await this.termsOfUse
    }

    async privacyPolicyLink(){
        return await this.privacyPolicy
    }

    async signUpButton(){
        return await this.signUp
    }

    async alert(){
        return await this.alertBox
    }

    async corssButton(){
        return await this.crossbtn
    }
}