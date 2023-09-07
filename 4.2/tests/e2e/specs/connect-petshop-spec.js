describe('connect wallet spec', () => {
  before(() => {
    cy.visit('/').wait(10000);
  });

  it('open pet shop and buy pet', () => {
    cy.setupMetamask().acceptMetamaskAccess()
    cy.switchToCypressWindow().isCypressWindowActive().should('be.true').wait(1000);
    cy.get(':nth-child(4) > .panel > .panel-body > .btn')
      .should('be.visible')
      .should('have.text', 'Adopt')
      .click()
    cy.confirmMetamaskTransaction();
    cy.switchToCypressWindow().isCypressWindowActive().should('be.true')
    cy.get(':nth-child(4) > .panel > .panel-body > .btn')
      .should('be.visible')
      .should('have.text', 'Success');
  });

  it('open pet shop and check bought pet', () => {
    //  cy.setupMetamask().acceptMetamaskAccess()
      cy.switchToCypressWindow().isCypressWindowActive().should('be.true').wait(1000);
      cy.get(':nth-child(4) > .panel > .panel-body > .btn')
        .should('be.visible')
        .should('have.text', 'Success')
        .should('be.disabled');
  
    });

  it('open pet shop and reject Metamask Transaction', () => {
    //cy.setupMetamask().acceptMetamaskAccess()
    cy.switchToCypressWindow().isCypressWindowActive().should('be.true').wait(1000);
    cy.get(':nth-child(5) > .panel > .panel-body > .btn')
      .should('be.visible')
      .should('have.text', 'Adopt')
      .click()
    cy.rejectMetamaskTransaction();
    cy.switchToCypressWindow().isCypressWindowActive().should('be.true')
    cy.get(':nth-child(5) > .panel > .panel-body > .btn')
      .should('be.visible')
      .should('have.text', 'Adopt');
  });

});
