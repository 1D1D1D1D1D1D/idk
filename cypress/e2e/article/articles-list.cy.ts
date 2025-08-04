import { selectByTestId } from "../helpers/selectByTestId"
describe('article list', () => {

    beforeEach(() => {
        cy.login().then((data) => {
            cy.visit('articles')
        })

    })
    it('Articles render', () => {
        cy.get(selectByTestId('ArticleList')).should('exist')
        cy.get(selectByTestId('ArticleListItem')).should('have.length.greaterThan', 3)
    })
})