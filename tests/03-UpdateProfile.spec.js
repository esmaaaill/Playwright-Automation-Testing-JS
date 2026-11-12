const { test } = require('@playwright/test');
const data = require('../data/userdata.json');
const { LoginPage } = require('../pages/LoginPage');
const { ProfilePage } = require('../pages/ProfilePage');

test('Update Profile and Save', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const profilePage = new ProfilePage(page);

  await loginPage.open(data.site.routes.login);
  await loginPage.login(process.env.USER_EMAIL, data.registration.password);
  await loginPage.expectLoggedIn(data.site.routes.account);

  await profilePage.openFromAccountMenu();
  await profilePage.expectProfileLoaded(
    data.site.routes.profile,
    process.env.USER_EMAIL,
    data.registration.firstName
  );

  await profilePage.updateProfile(data.profileUpdate);
  await profilePage.expectUpdateSuccess(data.expected.profileSuccess);

  await test.info().attach('03-profile-save-success', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  await profilePage.reload();
  await profilePage.expectSavedValues(data.profileUpdate, process.env.USER_EMAIL);
});
