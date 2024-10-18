/// <reference types="cypress" />
// ***********************************************

declare namespace Cypress {
    interface Chainable<Subject = any> {
        searchByQuery(query: string): Chainable<Subject>
    }
}


Cypress.Commands.add('searchByQuery', (query: string) => {
    cy.visit('/')

    cy.get('input[name=q]').type(query).parent('form').submit()
})