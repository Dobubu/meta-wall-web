declare namespace Cypress {
  interface Chainable {
    loginByAPI(email: string, password: string): Chainable<string>;
    typeLogin(email: string, password: string): Chainable<string>;
  }
}

Cypress.Commands.add('loginByAPI', (email: string, password: string) => {
  localStorage.clear();

  cy.request('POST', 'http://localhost:3001/user/sign_in', {
    email,
    password,
  }).as('comments');

  cy.get('@comments').should((res: any) => {
    expect(res.body.data).to.have.property('name', 'test');

    localStorage.setItem('meta_wall_access_token', res.body.data.token);
    localStorage.setItem('meta_wall_user_id', res.body.data.id);
  });
});

Cypress.Commands.add('typeLogin', (email: string, password: string) => {
  cy.get('[data-cy="auth-email"]').type(email);
  cy.get('[data-cy="auth-password"]').type(password);
});
