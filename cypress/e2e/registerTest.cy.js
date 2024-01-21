const hostname = "https://panel-eight-beta.vercel.app";

describe('Registration Test', () => {
  beforeEach(() => {
    cy.visit(hostname + '/register'); 
  });

  it('should register a new user', () => {
    const email = 'test@example.com';
    const password = 'Test12345';

    cy.get('#input_email')
      .type(email)
      .should('have.value', email);

    cy.get('#input_password')
      .type(password)
      .should('have.value', password);

    cy.get('#acceptTerms')
      .check({ force: true })
      .should('be.checked');

    cy.get('form').submit();

    
    cy.url().should('include', hostname + '/setup'); 
  });
});