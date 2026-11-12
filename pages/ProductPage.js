const { expect } = require('@playwright/test');


class ProductPage {
  constructor(page) {
    this.page = page;

  
    this.homeNavigation = page.getByTestId('nav-home');
    this.searchInput = page.getByTestId('search-query');
    this.searchButton = page.getByTestId('search-submit');
    this.searchTerm = page.getByTestId('search-term');
    this.productCards = page.locator('a[data-test^="product-"]');
    this.productDetailName = page.locator('h1[data-test="product-name"]');
    this.addFavoriteButton = page.getByTestId('add-to-favorites');
    this.favoriteSuccessToast = page.locator('.toast-success');
  }

  matchingProductCards(productName) {
    return this.productCards.filter({
      has: this.page.getByTestId('product-name').filter({
        hasText: productName,
      }),
    });
  }

  
  async openHome() {
    await this.page.goto('/');
  }

  async search(searchTerm) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }

  async openProduct(productName) {
    await this.matchingProductCards(productName).first().click();
  }

  async addToFavorites() {
    await this.addFavoriteButton.click();
  }

  
  async expectSearchResults(searchTerm, productName) {
    await expect(this.searchTerm).toHaveText(searchTerm, {
      timeout: 20000,
    });
    await expect(this.matchingProductCards(productName)).toHaveCount(1, {
      timeout: 20000,
    });
  }

  async expectProductDetails(productName) {
    await expect(this.productDetailName).toHaveText(productName);
  }

  async expectFavoriteAdded(successText) {
    await expect(this.favoriteSuccessToast).toContainText(successText, {
      timeout: 15000,
    });
  }
}

module.exports = { ProductPage };
