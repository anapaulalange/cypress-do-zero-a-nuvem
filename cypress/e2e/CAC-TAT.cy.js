/// <reference types="cypress" />

  describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
      })
      
      it('verifica o título da aplicação', () => {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
      })


      it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxz', 10)

        cy.get('#firstName').type('Ana Paula')
        cy.get('#lastName').type('Lange Gomes')
        cy.get('#email').type('anapaula.lange@gmail.com')
        cy.get('#phone').type('41998764532')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
      })

      it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Ana Paula')
        cy.get('#lastName').type('Lange Gomes')
        cy.get('#email').type('anapaula.lange.gmail.com')
        cy.get('#phone').type('41998764532')
        cy.get('#open-text-area').type('Test')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
      })
    })