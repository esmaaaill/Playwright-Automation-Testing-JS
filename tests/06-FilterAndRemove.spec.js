const { test } = require('@playwright/test');
const data = require('../data/userdata.json');
const { LoginPage } = require('../pages/LoginPage');
const { FavoritesPage } = require('../pages/FavoritesPage');

test('Filter and Remove from fav ', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const favorites = new FavoritesPage(page);

  await loginPage.open(data.site.routes.login);
  await loginPage.login(process.env.USER_EMAIL, data.registration.password);
  await loginPage.expectLoggedIn(data.site.routes.account);

  await favorites.openFromAccountMenu();
  await favorites.expectFavoritePresent(
    data.site.routes.favorites,
    data.product.name
  );

  await favorites.removeFirstFilteredFavorite(data.product.name);
  await favorites.expectFavoriteRemoved(data.product.name);
});
