/* eslint-disable no-undef */
describe('Reservation Test', () => {
    it('Visits the page reservation', () => {
        cy.visit('http://127.0.0.1:3000/audit/create');
        cy.get('#numero_audit').type("AUDIT-0006/2020");
        cy.get('#nom').type("Andriamialy");
        cy.get('#prenom').type('Angelot')
        cy.get('#telephone').type("+261 34 92 652 68");
        cy.get('#email').type("angelot.andriamialy@gmail.com");
        cy.get('#adresse').type("Lot VF 54 Bis Ankazotokana");
        cy.get('#ville').type("Antananarivo");
        cy.get('#code_postale').type("101");
        cy.get('#pays').select("Madagascar");
        cy.contains('Créer le dossier').click();
    })
  })