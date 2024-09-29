/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

import { routes } from '@/utils/constants/routes';

describe('Cadastrar usuário', () => {
  it('Ao clicar no botão de voltar, deve ir para o sign-in', () => {
    cy.visit(routes.signUp);

    cy.getBySel('back-button').click();

    cy.location('pathname').should('include', routes.signIn);
  });

  it('Se não preencher os campos, e tentar submeter, deve receber erros', () => {
    cy.visit(routes.signUp);

    cy.getBySel('submit-button').click();

    cy.contains('O nome deve ser informado.');
    cy.contains('O e-mail deve ser informado.');
    cy.contains('A senha deve ter pelo menos 8 caracteres.');
    cy.contains('A confirmação de senha deve ter pelo menos 8 caracteres.');
  });

  it('Ao preencher um e-mail inválido, e tentar submeter, deve receber um erro', () => {
    cy.visit(routes.signUp);

    cy.getBySel('email-input').type(faker.string.alphanumeric());
    cy.getBySel('submit-button').click();

    // Verifica a validade do campo de e-mail
    cy.getBySel('email-input').then(($input) => {
      expect(($input[0] as unknown as HTMLInputElement).checkValidity()).to.be
        .false;
    });
  });

  it('Ao preencher uma confirmação de senha diferente da senha, e tentar submeter, deve receber um erro', () => {
    cy.visit(routes.signUp);

    cy.getBySel('password-input').type(faker.internet.password({ length: 8 }));
    cy.getBySel('password-confirmation-input').type(
      faker.internet.password({ length: 9 })
    );
    cy.getBySel('submit-button').click();

    cy.contains('A senha deve ser igual a confirmação de senha.');
  });

  it('Ao preencher o corretamente, deve cadastrar o usuário e redirecionar ao login', () => {
    cy.visit(routes.signUp);

    cy.getBySel('name-input').type(faker.internet.displayName());
    cy.getBySel('email-input').type(faker.internet.email());

    const password = faker.internet.password();

    cy.getBySel('password-input').type(password);
    cy.getBySel('password-confirmation-input').type(password);

    cy.getBySel('submit-button').click();

    cy.contains('Cadastro realizado com sucesso!');

    cy.location('pathname').should('include', routes.signIn);
  });

  it('Ao tentar usar um e-mail já utilizado, deve receber um erro', () => {
    cy.visit(routes.signUp);

    cy.getBySel('name-input').type(faker.internet.displayName());

    const email = faker.internet.email();

    cy.getBySel('email-input').type(email);

    const password = faker.internet.password();

    cy.getBySel('password-input').type(password);
    cy.getBySel('password-confirmation-input').type(password);

    cy.getBySel('submit-button').click();

    cy.contains('Cadastro realizado com sucesso!');

    cy.visit(routes.signUp);

    cy.getBySel('name-input').type(faker.internet.displayName());
    cy.getBySel('email-input').type(email);
    cy.getBySel('password-input').type(password);
    cy.getBySel('password-confirmation-input').type(password);

    cy.getBySel('submit-button').click();

    cy.contains('Esse e-mail já está em uso por outro usuário.');
    cy.contains(
      'Houve uma falha ao realizar o cadastro, verifique seus dados e tente novamente.'
    );
  });
});
