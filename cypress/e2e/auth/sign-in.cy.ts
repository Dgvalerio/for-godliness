/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

import { routes } from '@/utils/constants/routes';

describe('Fazer login', () => {
  it('Se não autenticado, e tentar visualizar qualquer página, deve ir para o sign-in', () => {
    cy.visit('/');

    cy.location('pathname').should('include', routes.signIn);
  });

  it('Se não preencher os campos, e tentar submeter, deve receber erros', () => {
    cy.visit(routes.signIn);

    cy.getBySel('submit-button').click();

    cy.contains('O e-mail deve ser informado.');
    cy.contains('A senha deve ter pelo menos 8 caracteres.');
  });

  it('Ao preencher um e-mail inválido, e tentar submeter, deve recebe um erro', () => {
    cy.visit(routes.signIn);

    cy.getBySel('email-input').type(faker.string.alphanumeric());
    cy.getBySel('submit-button').click();

    // Verifica a validade do campo de e-mail
    cy.getBySel('email-input').then(($input) => {
      expect(($input[0] as unknown as HTMLInputElement).checkValidity()).to.be
        .false;
    });
  });

  it('Ao inserir e-mail e senha errados, não deve autenticar', () => {
    cy.visit(routes.signIn);

    cy.getBySel('email-input').type(faker.internet.email());
    cy.getBySel('password-input').type(faker.internet.password());

    cy.getBySel('submit-button').click();

    cy.contains(
      'Houve uma falha ao realizar o login, verifique seus dados e tente novamente.'
    );
  });
});
