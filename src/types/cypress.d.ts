declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof import('cypress/react18').mount;
    }
  }
}
