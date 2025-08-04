import { should } from "chai"
import { selectByTestId } from "../helpers/selectByTestId"

describe('routing', () => {
  describe('User is logined', () => {
    it('Visit profile page', () => {
      cy.login('admin', '123')
      cy.visit('/profile/1')
      cy.wait(30000)
      cy.get(selectByTestId('ProfilePage')).should('exist')
    })
  })
  describe('User is not logined', () => {
    it('Redirect on main page', () => {
      cy.visit('/')
      cy.get('[data-testid=MainPage').should('exist')
    })
    it('Visit profile page', () => {
      cy.visit('profile/1')
      cy.get('[data-testid=MainPage').should('exist')
    })
    it('Non existent route', () => {
      cy.visit('dassdadsasdasdds')
      cy.get('[data-testid=NotFoundPage').should('exist')
    })
  })

})