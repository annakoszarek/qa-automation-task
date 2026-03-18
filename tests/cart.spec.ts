import { test, expect } from '../fixtures/auth';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart tests', () => {

    test('user can add a product to the cart and start checkout', async ({ loggedInPage }) => {

        const inventory = new InventoryPage(loggedInPage);
        const cart = new CartPage(loggedInPage);

        await inventory.addBackpackToCart();

        await expect(inventory.cartBadge).toHaveText('1');

        await inventory.goToCart();
        await cart.startCheckout();

        await expect(loggedInPage).toHaveURL(/checkout/);
    });
});