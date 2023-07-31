describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            name: 'Susan B. Anthony',
            username: 'santhony',
            password: 'secretpassword'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
    })

    it('Login form is shown', () => {
        cy.contains('Log in to application')
        cy.contains('button', 'login')
    })

    describe('Login', () => {
        it('succeeds with correct credentials', () => {
            cy.contains('button', 'login').click()
            cy.get('#username').type('santhony')
            cy.get('#password').type('secretpassword')
            cy.get('#submit-button').click()

            cy.contains('Susan B. Anthony is logged in')
        })

        it('fails with wrong credentials', () => {
            cy.contains('button', 'login').click()
            cy.get('#username').type('santhony')
            cy.get('#password').type('incorrectpassword')
            cy.get('#submit-button').click()

            cy
                .get('.error')
                .should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
})
