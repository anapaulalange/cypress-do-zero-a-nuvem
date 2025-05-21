Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Ana Paula')
        cy.get('#lastName').type('Lange Gomes')
        cy.get('#email').type('anapaula.lange@gmail.com')
        cy.get('#open-text-area').type('Test.')
        cy.get('button[type="submit"]').click()
      })

