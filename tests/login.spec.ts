import { test, expect } from '../fixtures/auth';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test.describe('Login tests', () => {

    test('standard user can log in successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL(/inventory/);
    });

    test('locked out user sees an authentication error', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.locked.username, users.locked.password);
        await loginPage.expectError();
    });
});