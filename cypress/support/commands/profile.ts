import { selectByTestId } from '../../e2e/helpers/selectByTestId'
export const updateProfile = () => {
    cy.get(selectByTestId('EditableProfileCardHeader-EditButton')).click()
    cy.get(selectByTestId('ProfileCard-firstName')).clear().type('New')
    cy.get(selectByTestId('EditableProfileCardHeader-SaveButton')).click()

}
export const resetProfile = (profileId: string) => {
    return cy.request({
        method: "PUT",
        url: 'http://localhost:8000/profile/' + profileId,
        headers: { Authorization: '213' },
        body: {
            "id": "3",
            "first": "Test User",
            "lastname": "Огр",
            "age": 39,
            "currency": "RUB",
            "country": "Russia",
            "city": "Oryol",
            "username": "admin2",
            "avatar": "https://i.ytimg.com/vi/5lV1F0b0iJ4/maxresdefault.jp"
        }
    })

}
declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(): Chainable<void>,
            resetProfile(profileId: string): Chainable<void>

        }
    }
}