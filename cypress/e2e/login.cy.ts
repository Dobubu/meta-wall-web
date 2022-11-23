describe('Login Web UI', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.get('.cy-auth-email').type('test@gmail.com');
    cy.get('.cy-auth-password').type('12345678');

    cy.contains('登入').click();
  });
});
