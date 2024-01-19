const hostname = "http://localhost:3000";

describe('Send chat message test', () => {
  beforeEach(() => {
    cy.visit(hostname + '/login'); 
  });

  it('should login with user', () => {
    const email = 'testing@gmail.nl';
    const password = 'string123';

    cy.get('#input_email')
      .type(email)
      .should('have.value', email);

    cy.get('#input_password')
      .type(password)
      .should('have.value', password);

    cy.get('form').submit();

    cy.get('.chat-toggle-button').click();

    cy.get('.popup-chat-window').should('be.visible');

    cy.get('.chat-list ul li').first().click();

    const bericht = 'Dit is een test bericht';

    cy.get('#input-message')
      .type(bericht)
      .should('have.value', bericht);

    cy.get('.send-button').click();

    cy.get('.message-list li').last().should('contain.text', bericht);

  });
});