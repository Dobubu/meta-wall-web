describe('Search Posts', () => {
  it('successfully loads', () => {
    cy.loginByAPI('test@gmail.com', '12345678');

    cy.visit('/post');

    cy.get('[data-cy="search-post"]').type('666{enter}');
    cy.get('[data-cy="posts-total"]').contains('1');

    // 單純測試用
    // 1. download file
    // ! type error
    // @ts-ignore
    cy.downloadFile(
      'https://i.pinimg.com/originals/16/96/3f/16963f1eee510c42b464664463040aaa.jpg',
      'cypress/downloads',
      'rilakkuma.jpg',
    );

    // 2. write/read file
    cy.writeFile('cypress/fixtures/message.txt', 'Hello World');
    cy.readFile('cypress/fixtures/message.txt').then(text => {
      expect(text).to.equal('Hello World');
    });
  });
});
