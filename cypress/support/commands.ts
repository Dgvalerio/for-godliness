/// <reference types="cypress" />

Cypress.Commands.add(
  'getBySel',
  (selector, ...args) =>
    cy.get(
      `[data-test=${selector}]`,
      ...args
    ) as unknown as void | Cypress.Chainable<unknown>
);

Cypress.Commands.add(
  'getBySelLike',
  (selector, ...args) =>
    cy.get(
      `[data-test*=${selector}]`,
      ...args
    ) as unknown as void | Cypress.Chainable<unknown>
);

declare global {
  namespace Cypress {
    interface Chainable {
      getBySel<S = string>(
        alias: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
      ): Chainable<S>;

      getBySelLike<S = string>(
        alias: string,
        options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
      ): Chainable<S>;
    }
  }
}

export const commands = 'commands';
