import { Page } from '@playwright/test';

export class CartPage {

  constructor(private page: Page) {}

  checkoutButton = this.page.locator('#checkout');

  async startCheckout() {
    await this.checkoutButton.click();
  }
}