/// <reference types="cypress" />

Cypress.Commands.add('getBySel', (selector, options) =>
  cy.get(`[data-test=${selector}]`, options)
);

declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(
        selector: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export const commands = 'commands';
