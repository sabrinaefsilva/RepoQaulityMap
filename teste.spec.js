const { test, expect } = require('@playwright/test');

test.describe('Registro de usuário', () => {
    let page;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('https://demo.nopcommerce.com/register', { timeout: 30000 });
    });

    test('Registro bem-sucedido', async () => {
        await expect(page).toHaveURL(/.*nopcommerce/);
        const pageTitle = await page.title();
        await expect(pageTitle).toContain('nopCommerce demo store');
        const getTitle = await page.locator('.page-title');
        await expect(getTitle).toHaveText('Register');

        const firstNameInput = await page.locator('input[id=FirstName]');
        const lastNameInput = await page.locator('input[id=LastName]');
        const emailInput = await page.locator('input[id=Email]');
        const passwordInput = await page.locator('input[id=Password]');
        const confirmPasswordInput = await page.locator('input[id=ConfirmPassword]');
        const registerButton = await page.locator('button#register-button');

        await firstNameInput.fill('John');
        await lastNameInput.fill('Doe');
        await emailInput.fill('john.doe@example.com');
        await passwordInput.fill('password123');
        await confirmPasswordInput.fill('password123');
        await registerButton.click();

        const welcomeMessage = await page.locator('div[class*=header-links] a.account');
        await expect(welcomeMessage).toHaveText('John Doe', { timeout: 10000 });
    });

    test('Registro com e-mail existente', async () => {
        const firstNameInput = await page.locator('input[id=FirstName]');
        const lastNameInput = await page.locator('input[id=LastName]');
        const emailInput = await page.locator('input[id=Email]');
        const passwordInput = await page.locator('input[id=Password]');
        const confirmPasswordInput = await page.locator('input[id=ConfirmPassword]');
        const registerButton = await page.locator('button#register-button');

        await firstNameInput.fill('Jane');
        await lastNameInput.fill('Doe');
        await emailInput.fill('john.doe@example.com');
        await passwordInput.fill('password123');
        await confirmPasswordInput.fill('password123');
        await registerButton.click();

        const errorMessage = await page.locator('div[class*=message-error]');
        await expect(errorMessage).toHaveText('The specified email already exists');
    });

    test('Validação que as mensagens erro são apresentadas', async () => {
        const emailInput = await page.locator('input[id=Email]');
        const registerButton = await page.locator('button#register-button');

        await emailInput.fill('john.doe@example.com');
        await registerButton.click();

        const errorMessage = await page.locator('div[class*=message-error]');
        await expect(errorMessage),toExist();
    });

    test('Validação que as mensagens de erro são compatíveis com os inputs desejados', async () => {
        const emailInput = await page.locator('input[id=Email]');
        const registerButton = await page.locator('button#register-button');

        await emailInput.fill('john.doe@example.com');
        await registerButton.click();

        const errorMessage = await page.locator('div[class*=message-error]');
        await expect(errorMessage).toHaveText('The specified email already exists');
    });

    test.afterEach(async () => {
        await page.close();
    });
});
