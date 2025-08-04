import { selectByTestId } from "../helpers/selectByTestId"
let profileId: string
describe('Profile Edit', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      profileId = data.id
      cy.visit('profile/' + data.id)
    })
  })
  afterEach(() => {
    cy.resetProfile(profileId)
  })
  it('Successful profile loading ', () => {
    cy.get(selectByTestId('ProfileCard-firstName')).should('have.value', 'Test User')
  })
  it('Edit Profile ', () => {
    cy.updateProfile()
    cy.get(selectByTestId('ProfileCard-firstName')).should('have.value', 'New')
  })
}) 