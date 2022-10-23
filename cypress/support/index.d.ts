/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    dataCy(value: string): Chainable;
    loginWithEmail(user: string): Chainable;
  }
}
