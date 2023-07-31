describe('Blog app', () => {
    beforeEach(() => {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        cy.visit('')
    })
    it('Login form is shown', () => {
        cy.contains('Log in to application')
        cy.contains('button', 'login')
    })
})
