const { expect } = require('@playwright/test');


class FavoritesPage {
  constructor(page) {
    this.page = page;

    
    this.accountMenu = page.getByTestId('nav-menu');
    this.favoritesMenuItem = page.getByTestId('nav-my-favorites');
    this.pageTitle = page.getByTestId('page-title');
    this.favoriteCards = page.locator('div[data-test^="favorite-"]');
  }


  matchingFavoriteCards(productName) {
    return this.favoriteCards.filter({
      has: this.page.getByTestId('product-name').filter({
        hasText: productName,
      }),
    });
  }


  async openFromAccountMenu() {
    await this.accountMenu.click();
    await this.favoritesMenuItem.click();
  }

  async removeFirstFilteredFavorite(productName) {
    const matchingCards = this.matchingFavoriteCards(productName);


    await matchingCards.first().getByTestId('delete').click();
  }


  async expectFavoritePresent(favoritesPath, productName) {
    await expect(this.page).toHaveURL(
      (url) => url.pathname === favoritesPath,
      { timeout: 20000 }
    );
    await expect(this.matchingFavoriteCards(productName)).toHaveCount(1, {
      timeout: 20000,
    });
    await expect(
      this.matchingFavoriteCards(productName).first().getByTestId('product-name')
    ).toHaveText(productName);
  }

  async expectFavoriteRemoved(productName) {
    await expect(this.matchingFavoriteCards(productName)).toHaveCount(0, {
      timeout: 20000,
    });
  }

  async expectRemovalPersistsAfterReload(productName) {
    await this.page.reload();
    await this.expectFavoriteRemoved(productName);
  }
}

module.exports = { FavoritesPage };
