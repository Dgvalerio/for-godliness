/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

import { routes } from '@/utils/constants/routes';

// eslint-disable-next-line no-restricted-imports
import { testerEmail, testerName, testerPassword } from '../../support/e2e';

describe('Igrejas', () => {
  beforeEach(() => {
    cy.visit(routes.signIn);

    cy.getBySel('email-input').type(testerEmail);
    cy.getBySel('password-input').type(testerPassword);

    cy.getBySel('submit-button').click();

    cy.contains(testerName);

    cy.location('pathname').should('include', routes.home);

    cy.visit(routes.addChurch);
  });

  it('Se não preencher os campos, e tentar submeter, deve receber erros', () => {
    cy.getBySel('submit-button').click();

    cy.contains('O nome deve ser informado.');
    cy.contains('O número deve ser informado.');
  });

  it('Ao preencher o corretamente, deve cadastrar uma igreja', () => {
    cy.getBySel('name-input').type(faker.location.country());
    cy.getBySel('number-input').type(String(faker.number.int()));

    cy.getBySel('submit-button').click();

    cy.contains('Igreja adicionada com sucesso!');
  });

  it('Ao tentar usar número já utilizado, deve receber um erro', () => {
    const number = String(faker.number.int());

    cy.getBySel('name-input').type(faker.location.country());
    cy.getBySel('number-input').type(number);

    cy.getBySel('submit-button').click();

    cy.contains('Igreja adicionada com sucesso!');

    cy.visit(routes.addChurch);

    cy.getBySel('name-input').type(faker.location.country());
    cy.getBySel('number-input').type(number);

    cy.getBySel('submit-button').click();

    cy.contains('Número do relatório já cadastrado!');
  });
});
