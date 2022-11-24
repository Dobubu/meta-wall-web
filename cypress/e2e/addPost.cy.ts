import dayjs from 'dayjs';

describe('Add Post', () => {
  beforeEach(() => {
    cy.loginByAPI('test@gmail.com', '12345678');
    cy.visit('/post');
  });

  it('successfully loads', () => {
    cy.get('[data-cy="menu-add-post-btn"]').click();

    const sign = dayjs().format('mm/DD/MM/YY');
    cy.get('[data-cy="create-post-content"]').type(`cypress test: ${sign}`);

    cy.get('input[type=file]').selectFile('cypress/fixtures/images/post.jpg', {
      force: true, // On a hidden input
    });

    cy.get('[data-cy="create-post-btn"]').click();
    cy.get('[data-cy="post-item-content"]').contains('cypress');
  });

  afterEach(() => {
    Cypress.log({
      message: 'test end :D',
    });
  });
});
