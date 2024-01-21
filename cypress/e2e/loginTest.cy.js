const hostname = "https://panel-eight-beta.vercel.app";

describe('LoginTest', () => {
    beforeEach(() => {
        cy.visit(hostname + '/login');
    });

    it('should login the user', () => {
        const email = 'test@example.com';
        const password = 'Test12345';

        cy.get('#input_email')
            .type(email)
            .should('have.value', email);

        cy.get('#input_password')
            .type(password)
            .should('have.value', password);

        cy.get('form').submit();


        cy.url().should('include', hostname + '/');
    });
});