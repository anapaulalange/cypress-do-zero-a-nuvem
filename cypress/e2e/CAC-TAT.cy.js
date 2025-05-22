/// <reference types="cypress" />

  describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
      })
      
      it('verifica o título da aplicação', () => {
        cy.title()
          .should('be.equal','Central de Atendimento ao Cliente TAT')
      })


      it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxz', 10)

        cy.get('#firstName')
          .type('Ana Paula')
        cy.get('#lastName')
         .type('Lange Gomes')
        cy.get('#email')
         .type('anapaula.lange@gmail.com')
        cy.get('#phone')
          .type('41998764532')
        cy.get('#open-text-area')
          .type(longText, { delay: 0})
        cy.get('button[type="submit"]')
          .click()

        cy.get('.success')
          .should('be.visible')
      })

      it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName')
          .type('Ana Paula')
        cy.get('#lastName')
         .type('Lange Gomes')
        cy.get('#email')
          .type('anapaula.lange.gmail.com')
        cy.get('#phone')
         .type('41998764532')
        cy.get('#open-text-area')
          .type('Test')
        cy.get('button[type="submit"]')
          .click()

        cy.get('.error')
          .should('be.visible')
      })

      it('campo telefone continua vazio quando preenchido com um valor não numérico', () => {
        cy.get('#phone')
          .type('abcde')
          .should('have.value','')
      })  

      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName')
          .type('Ana Paula')
        cy.get('#lastName')
          .type('Lange Gomes')
        cy.get('#email')
          .type('anapaula.lange@gmail.com')
        cy.get('#phone-checkbox')
         .click()
        cy.get('#open-text-area')
          .type('Test')
        cy.get('button[type="submit"]')
          .click()

        cy.get('.error')
          .should('be.visible')
      })

      it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Ana Paula').should('have.value','Ana Paula')
          .clear()
          .should('have.value','')
        cy.get('#lastName').type('Lange Gomes').should('have.value','Lange Gomes')
          .clear()
          .should('have.value','')
        cy.get('#email')
          .type('anapaula.lange@gmail.com')
          .should('have.value','anapaula.lange@gmail.com')
          .clear()
          .should('have.value','')
        cy.get('#phone')
          .type('41998765432')
          .should('have.value','41998765432')
          .clear()
          .should('have.value','')
      })

      it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]')
          .click()

        cy.get('.error')
          .should('be.visible')
      })  

      it('envia o formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success')
          .should('be.visible')
      })  

      it('envia mensagem de erro ao submeter o formulario com um email com formatacao invalida', () => {
        cy.get('#firstName')
          .type('Ana Paula')
        cy.get('#lastName')
          .type('Lange Gomes')
        cy.get('#email')
         .type('anapaula.lange.gmail.com')
        cy.get('#open-text-area')
          .type('Test')
        cy.contains('button', 'Enviar')
          .click()

        cy.get('.error').should('be.visible')
      })

      it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube')
          .should('have.value', 'youtube')
      })  

      it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
      }) 

      it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
      }) 
      
      it('marca o tipo de atendimento "Feedback', () => {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('be.checked')
      }) 

      it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
          .each(typeOfService => {
          cy.wrap(typeOfService)
            .check()
            .should('be.checked')
        })  
      }) 

      it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
      })

      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName')
          .type('Ana Paula')
        cy.get('#lastName')
          .type('Lange Gomes')
        cy.get('#email')
          .type('anapaula.lange@gmail.com')
        cy.get('#phone-checkbox')
          .check()
        cy.contains('button', 'Enviar')
          .click()

        cy.get('.error')
          .should('be.visible')
      })

      it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
          .selectFile('cypress/fixtures/example.json')
          .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })    
      })

      it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
          .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
          .should(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })    
      })

      it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.contains('a', 'Política de Privacidade')
          .should('have.attr', 'href', 'privacy.html')
          .and('have.attr', 'target', '_blank')
      })

    })