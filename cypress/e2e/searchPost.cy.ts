describe('Search Posts', () => {
  it('successfully loads', () => {
    cy.loginByAPI('test@gmail.com', '12345678');

    cy.visit('/post');

    cy.get('[data-cy="search-post"]').type('666{enter}');
    cy.get('[data-cy="posts-total"]').contains('1');
  });
});
