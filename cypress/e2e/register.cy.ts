import dayjs from 'dayjs';

describe('Register Web', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.get('[data-cy="toggle-register"]').click();

    const account = dayjs().format('mm/DD/MM/YY');

    cy.get('[data-cy="register-name"]').type(`test${account}`);
    cy.get('[data-cy="auth-email"]').type(`test${account}@gmail.com`);
    cy.get('[data-cy="auth-password"]').type('12345678');

    cy.get('[data-cy="register-btn"]').click();
  });
});
