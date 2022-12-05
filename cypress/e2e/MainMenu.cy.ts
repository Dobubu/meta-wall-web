describe('MainMenu logout', () => {
  beforeEach(() => {
    cy.loginByAPI('test@gmail.com', '12345678');
    cy.visit('/post');
  });

  it('successfully loads', () => {
    cy.get('[data-cy="main-menu"]').trigger('mouseover');

    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.contains('登出')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('登出成功！');
      });
  });
});
