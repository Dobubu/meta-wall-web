describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  });
});

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});