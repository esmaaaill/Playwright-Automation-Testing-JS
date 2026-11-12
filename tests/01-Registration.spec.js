const { test } = require('@playwright/test');
const data = require('../data/userdata.json');
const { RegisterPage } = require('../pages/RegisterPage');

test('Registration', async ({ page }) => {
  const user = {
    ...data.registration,
    email: process.env.USER_EMAIL,
  };
  const registerPage = new RegisterPage(page);

  await registerPage.open(data.site.routes.register);
  await registerPage.register(user);
  await registerPage.expectRegistrationSuccessful(data.site.routes.login);

  console.log(`Registration passed. New test user: ${user.email}`);
});
