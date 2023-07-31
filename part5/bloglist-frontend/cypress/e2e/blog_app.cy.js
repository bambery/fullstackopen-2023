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

    describe('when logged in', () => {
        beforeEach(() => {
            cy.login({ username: 'santhony', password: 'secretpassword' })
            cy.newBlog({ title: 'blog1', author: 'author one', url: 'http://url1.com' })
            cy.newBlog({ title: 'blog2', author: 'author two', url: 'http://url2.com' })
        })

        it('A blog can be created', () => {
            cy.get('div.blog-list').children().as('blogList')
            cy.get('@blogList').should('have.length', 2)


            cy.contains('button', 'new blog').click()
            cy.contains('title:').find('input').type('A cool new blog title')
            cy.contains('author:').find('input').type('A. Testauthor')
            cy.contains('url:').find('input').type('http://www.coolblog.com')
            cy.contains('button', 'create').click()

            cy
                .get('.notification')
                .should('contain', 'New blog: "')
                .and('have.css', 'color', 'rgb(0, 128, 0)')

            cy.get('@blogList').should('have.length', 3)
        })

        it('Can like a blog', () => {
            cy.contains('blog2').contains('button', 'view').click()
            cy.contains('blog2').contains('likes: 0')
            cy.contains('blog2').contains('button', 'like').click()
            cy.contains('blog2').contains('likes: 1')
            cy.contains('blog2').contains('button', 'like').click()
            cy.contains('blog2').contains('likes: 2')
        })

        it('A user can delete a blog they created', () => {
            const secondUser = {
                username: 'mascary',
                name: 'Mary Ann Shadd Cary',
                password: 'coolpassword'
            }
            cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser)
            cy.contains('button', 'logout').click()
            cy.login({ username: secondUser.username, password: secondUser.password })
            cy.visit('')
            cy.newBlog({
                title: 'second user title',
                author: 'second user author',
                url: 'http://seconduser.com'
            })

            cy.contains('div', 'second user title').contains('button', 'view').click()
            cy.contains('div', 'second user title').contains('button', 'remove')
            //cy.contains('div', 'blog2').contains('button', 'view').click()
            //cy.contains('div', 'blog2').should('not.contain', 'remove')

        })

    })
})
