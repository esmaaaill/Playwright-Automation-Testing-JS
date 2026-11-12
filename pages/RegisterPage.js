const { expect } = require('@playwright/test');


class RegisterPage {
  constructor(page) {
    this.page = page;

    
    this.form = page.getByTestId('register-form');
    this.firstName = page.getByTestId('first-name');
    this.lastName = page.getByTestId('last-name');
    this.dateOfBirth = page.getByTestId('dob');
    this.country = page.getByTestId('country');
    this.postalCode = page.getByTestId('postal_code');
    this.houseNumber = page.getByTestId('house_number');
    this.street = page.getByTestId('street');
    this.city = page.getByTestId('city');
    this.state = page.getByTestId('state');
    this.phone = page.getByTestId('phone');
    this.email = page.getByTestId('email');
    this.password = page.getByTestId('password');
    this.registerButton = page.getByTestId('register-submit');
    this.registrationError = page.getByTestId('register-error');
    this.postcodeLookupLoading = page.getByTestId('postcode-lookup-loading');
  }

  
  async open(registerPath) {
    await this.page.goto(registerPath);
    await expect(this.form).toBeVisible();
  }

  async register(user) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.dateOfBirth.fill(user.dateOfBirth);

    
    await this.country.selectOption(user.countryCode);
    await this.postalCode.fill(user.postalCode);
    const addressLookup = this.page.waitForResponse(
      (response) => response.url().includes('/postcode-lookup') &&
        response.request().method() === 'GET',
      { timeout: 10000 }
    ).catch(() => null); 
    await this.houseNumber.fill(user.houseNumber);
    await addressLookup;

    await this.street.fill(user.street);
    await this.city.fill(user.city);
    await this.state.fill(user.state);

    await this.phone.fill(user.phone);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.registerButton.click();
  }


  async expectRegistrationSuccessful(loginPath) {
  
    await expect(this.page).toHaveURL(
      (url) => url.pathname === loginPath,
      { timeout: 20000 }
    );
    await expect(this.page.getByTestId('login-form')).toBeVisible();
  }
}

module.exports = { RegisterPage };
