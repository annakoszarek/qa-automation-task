import { Page } from '@playwright/test';

export class InventoryPage {

  constructor(private page: Page) {}

  addBackpackButton = this.page.locator('#add-to-cart-sauce-labs-backpack');
  cartBadge = this.page.locator('.shopping_cart_badge');
  cartIcon = this.page.locator('.shopping_cart_link');

  async addBackpackToCart() {
    await this.addBackpackButton.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}