/// <reference types="cypress" />
import { routes } from '@/utils/constants/routes';

import { testerEmail, testerName, testerPassword } from '../../support/e2e';

describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit(routes.signIn);

    cy.getBySel('email-input').type(testerEmail);
    cy.getBySel('password-input').type(testerPassword);

    cy.getBySel('submit-button').click();

    cy.contains(testerName);

    cy.location('pathname').should('include', routes.home);
  });

  it(`Ao clicar no item "add-presentation-form" deve ir para "${routes.addPresentationForm}"`, () => {
    cy.getBySel('add-presentation-form').click();

    cy.location('pathname', { timeout: 10 ** 8 }).should(
      'include',
      routes.addPresentationForm
    );
  });

  it(`Ao clicar no item "add-member" deve ir para "${routes.addMember}"`, () => {
    cy.getBySel('add-member').click();

    cy.location('pathname', { timeout: 10 ** 8 }).should(
      'include',
      routes.addMember
    );
  });

  it(`Ao clicar no item "add-church" deve ir para "${routes.addChurch}"`, () => {
    cy.getBySel('add-church').click();

    cy.location('pathname', { timeout: 10 ** 8 }).should(
      'include',
      routes.addChurch
    );
  });
});
