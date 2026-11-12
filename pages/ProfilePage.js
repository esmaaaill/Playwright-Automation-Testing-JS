const { expect } = require('@playwright/test');

class ProfilePage {
  constructor(page) {
    this.page = page;

    
    this.accountMenu = page.getByTestId('nav-menu');
    this.profileMenuItem = page.getByTestId('nav-my-profile');
    this.title = page.getByTestId('page-title');
    this.firstName = page.getByTestId('first-name');
    this.lastName = page.getByTestId('last-name');
    this.email = page.getByTestId('email');
    this.phone = page.getByTestId('phone');
    this.street = page.getByTestId('street');
    this.postalCode = page.getByTestId('postal_code');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.country = page.getByTestId('country');
    this.saveButton = page.getByTestId('update-profile-submit');
    this.successMessage = page.locator('.alert-success[role="alert"]');
    this.errorMessage = page.locator('.alert-danger[role="alert"]');
  }

  
  async openFromAccountMenu() {
    await this.accountMenu.click();
    await this.profileMenuItem.click();
  }

  async updateProfile(updated) {
    await this.firstName.fill(updated.firstName);
    await this.lastName.fill(updated.lastName);
    await this.phone.fill(updated.phone);
    await this.street.fill(updated.street);
    await this.postalCode.fill(updated.postalCode);
    await this.city.fill(updated.city);
    await this.state.fill(updated.state);
    await this.country.fill(updated.country);
    
    await this.saveButton.click();
  }

  async reload() {
    await this.page.reload();
  }

  
  async expectProfileLoaded(profilePath, originalEmail, firstName) {
    await expect(this.page).toHaveURL((url) => url.pathname === profilePath);
    await expect(this.email).toHaveValue(originalEmail, { timeout: 20000 });
    await expect(this.firstName).toHaveValue(firstName);
  }

  async expectUpdateSuccess(successText) {
    await expect(this.successMessage).toContainText(successText, {
      timeout: 15000,
    });
  }

  async expectSavedValues(updated, originalEmail) {
    await expect(this.email).toHaveValue(originalEmail, { timeout: 20000 });
    await expect(this.firstName).toHaveValue(updated.firstName);
    await expect(this.lastName).toHaveValue(updated.lastName);
    await expect(this.phone).toHaveValue(updated.phone);
    await expect(this.street).toHaveValue(updated.street);
    await expect(this.postalCode).toHaveValue(updated.postalCode);
    await expect(this.city).toHaveValue(updated.city);
    await expect(this.state).toHaveValue(updated.state);
    await expect(this.country).toHaveValue(updated.country);
  }
}

module.exports = { ProfilePage };
