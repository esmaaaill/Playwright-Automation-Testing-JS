const { test } = require('@playwright/test');
const data = require('../data/userdata.json');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');

test('Add to Favorites', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const products = new ProductPage(page);

  await loginPage.open(data.site.routes.login);
  await loginPage.login(process.env.USER_EMAIL, data.registration.password);
  await loginPage.expectLoggedIn(data.site.routes.account);

  await products.openHome();
  await products.search(data.product.searchTerm);
  await products.openProduct(data.product.name);
  await products.expectProductDetails(data.product.name);

  await products.addToFavorites();
  await products.expectFavoriteAdded(data.expected.favoriteAdded);

  await test.info().attach('05-favorite-added-success', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });
});
