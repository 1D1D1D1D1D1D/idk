import { Article } from 'entities/Article'
import { selectByTestId } from '../../e2e/helpers/selectByTestId'

const testArticle = {
    "title": "Javascript news",
    "subtitle": "Что нового в JS за 2022 год?",
    "img": "https://teknotower.com/wp-content/uploads/2020/11/js.png",
    "views": 1022,
    "createdAt": "26.02.2022",
    "userId": "1",
    "type": [
        "ECONOMICS"
    ],
    "blocks": []
}

export const createArticle = (article?: Article) => {
    return cy.request({
        method: "POST",
        url: 'http://localhost:8000/articles',
        headers: { Authorization: '213' },
        body: article ?? testArticle
    }).then((responce) => {
        return responce.body
    })

}
export const removeArticle = (artcileId?: string) => {
    return cy.request({
        method: "DELETE",
        url: 'http://localhost:8000/articles/' + artcileId,
        headers: { Authorization: '213' },
    })

}
declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>,
            removeArticle(artcileId: string): Chainable<void>

        }
    }
}