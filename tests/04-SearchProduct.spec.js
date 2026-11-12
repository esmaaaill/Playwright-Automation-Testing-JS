const { test } = require('@playwright/test');
const data = require('../data/userdata.json');
const { ProductPage } = require('../pages/ProductPage');

test('Search for product', async ({ page }) => {
  const products = new ProductPage(page);

  await products.openHome();
  await products.search(data.product.searchTerm);
  await products.expectSearchResults(data.product.searchTerm, data.product.name);
  await products.openProduct(data.product.name);
  await products.expectProductDetails(data.product.name);
});
