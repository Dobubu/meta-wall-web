require('cypress-downloadfile/lib/downloadFileCommand');

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
  // ! type error
  // @ts-ignore
  cy.get('[data-cy="auth-password"]').type(password, { sensitive: true });
});

interface TypeOptions extends Cypress.TypeOptions {
  sensitive: boolean;
}

Cypress.Commands.overwrite<'type', 'element'>(
  'type',
  (originalFn, element, text, options?: Partial<TypeOptions>) => {
    if (options && options.sensitive) {
      // turn off original log
      options.log = false;
      // create our own log with masked message
      Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
      });
    }

    return originalFn(element, text, options);
  },
);
