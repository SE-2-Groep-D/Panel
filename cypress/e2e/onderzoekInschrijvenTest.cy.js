
const hostname = "https://panel-eight-beta.vercel.app";
describe('Onderzoek detail pagina Tests', () => {
    beforeEach(() => {

        cy.visit(hostname+'/login');

        const email = 'Jan9@test.com';
        const password = 'Jan9@test.com';

        cy.get('#input_email')
            .type(email)
            .should('have.value', email);

        cy.get('#input_password')
            .type(password)
            .should('have.value', password);

        cy.get('form').submit();


        cy.url().should('include', hostname + '/');
    });

    it('succses vol laad en gaat naar onderzoek detail pagina', () => {

        cy.get('.navigation-button').click();


        cy.get('.navigation-items').should('be.visible');


        cy.contains('a', 'Onderzoeken').click();

        cy.url().should('include', '/onderzoek');

        cy.get('.onderzoek-button').first().click();


    });

});


