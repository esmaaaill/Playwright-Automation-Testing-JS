const { test } = require('@playwright/test');
const data = require('../data/userdata.json');
const { LoginPage } = require('../pages/LoginPage');

test('Login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open(data.site.routes.login);
  await loginPage.login(process.env.USER_EMAIL, data.registration.password);
  await loginPage.expectLoggedIn(data.site.routes.account);
});
