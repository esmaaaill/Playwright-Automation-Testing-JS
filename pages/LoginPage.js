const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;

    
    this.loginForm = page.getByTestId('login-form');
    this.email = this.loginForm.getByTestId('email');
    this.password = this.loginForm.getByTestId('password');
    this.loginButton = page.getByTestId('login-submit');
    this.loginError = page.getByTestId('login-error');
    this.accountMenu = page.getByTestId('nav-menu');
  }

  
  async open(loginPath) {
    await this.page.goto(loginPath);
    await expect(this.loginForm).toBeVisible();
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async expectLoggedIn(accountPath) {
    await expect(this.page).toHaveURL(
      (url) => url.pathname === accountPath,
      { timeout: 20000 }
    );
    await expect(this.accountMenu).toBeVisible();
    await expect(this.loginError).toHaveCount(0);
  }
}

module.exports = { LoginPage };
