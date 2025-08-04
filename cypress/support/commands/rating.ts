import { selectByTestId } from "../../e2e/helpers/selectByTestId"

export const setRating = (stars = 5, feedback = 'comment') => {
    cy.get(selectByTestId('StarRating' + stars)).click()
    cy.wait(1000)
    cy.get(selectByTestId('RatingCardInput')).type(feedback)
    cy.wait(1000)
    cy.get(selectByTestId('RatingCardSend')).click()
}


declare global {
    namespace Cypress {
        interface Chainable {
            setRating(stars: number, feedback: string): Chainable<void>
        }
    }
}