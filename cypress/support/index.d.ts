/// <reference types="cypress" />
import { type User } from 'entities/User'
export { }

declare global {
    namespace Cypress {
        interface Chainable {
            login(login?: string, password?: string): Chainable<User>,

        }
    }
}