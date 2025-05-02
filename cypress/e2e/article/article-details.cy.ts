import { selectByTestId } from "../helpers/selectByTestId"
let artcileId: string
describe('article details', () => {

    beforeEach(() => {
        cy.login()
        cy.createArticle().then((article) => {
            cy.log(JSON.stringify(article))
            artcileId = article.id
            cy.visit('articles/' + article.id)
        })
    })
    afterEach(() => {
        cy.removeArticle(artcileId)
    })
    it('Article render', () => {
        cy.get(selectByTestId('ArticleDetails')).should('exist')
    })
    it('Send comment', () => {
        cy.get(selectByTestId('ArticleDetails'))
        cy.get(selectByTestId('AddCommentForm')).scrollIntoView()
        cy.addComment('Test Comment')
        cy.wait(300)
        cy.get(selectByTestId('CommentCardContent')).should('have.length', 1)

    })
    it('Send rating', () => {
        cy.get(selectByTestId('ArticleDetails'))
        cy.get(selectByTestId('RatingCard')).scrollIntoView()
        cy.setRating(5, 'comment')
        cy.get('[data-selected=true]').should('have.length', 5)
    })
})