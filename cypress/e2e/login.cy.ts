describe('Login Web UI', () => {
  it('login enter error', () => {
    cy.visit('/');

    cy.get('[data-cy="auth-email"]').type('test').blur();
    cy.get('[data-cy="auth-email-error"]').should('be.visible');
  });

  it('successfully loads', () => {
    cy.visit('/');

    // cy.get('.cy-auth-email').type('test@gmail.com');
    // cy.get('.cy-auth-password').type('12345678');

    cy.typeLogin('test@gmail.com', '12345678');

    cy.contains('登入').click();
  });
});
