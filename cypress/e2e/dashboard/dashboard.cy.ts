/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

import { routes } from '@/utils/constants/routes';

describe('Dashboard', () => {
  const name = faker.internet.displayName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  before(() => {
    cy.visit(routes.signUp);

    cy.getBySel('name-input').type(name);
    cy.getBySel('email-input').type(email);
    cy.getBySel('password-input').type(password);
    cy.getBySel('password-confirmation-input').type(password);

    cy.getBySel('submit-button').click();

    cy.contains('Cadastro realizado com sucesso!');
    cy.location('pathname').should('include', routes.signIn);
  });

  beforeEach(() => {
    cy.visit(routes.signIn);

    cy.getBySel('email-input').type(email);
    cy.getBySel('password-input').type(password);

    cy.getBySel('submit-button').click();

    cy.contains(name);

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
