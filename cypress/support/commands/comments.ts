import { selectByTestId } from "../../e2e/helpers/selectByTestId"

export const addComment = (text: string) => {
    cy.get(selectByTestId('AddCommentFormInput')).type(text ?? 'Test')
    cy.wait(1000)
    cy.get(selectByTestId('AddCommentFormButton')).click()

}
declare global {
    namespace Cypress {
        interface Chainable {
            addComment(text: string): Chainable<void>
        }
    }
}