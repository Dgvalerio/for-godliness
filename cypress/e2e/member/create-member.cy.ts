/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

import { CreateMember } from '@/app/(private)/member/add/components/create-form/create-form';
import {
  HousingCondition,
  HousingConditionValues,
  MaritalStatus,
} from '@/app/(private)/member/add/components/create-form/schemas/member.schema';
import { Ministry } from '@/app/(private)/member/add/components/create-form/schemas/ministry.schema';
import { routes } from '@/utils/constants/routes';

// eslint-disable-next-line no-restricted-imports
import { format, subYears } from 'date-fns';

import { testerEmail, testerName, testerPassword } from '../../support/e2e';

const generateCPF = (formatted = true): string => {
  const random = (n: number): number => Math.floor(Math.random() * n);

  let cpf = '';

  for (let i = 0; i < 9; i++) {
    cpf += random(10).toString();
  }

  const calculateDigit = (cpf: string, fatorInicial: number): number => {
    let total = 0;

    for (let i = 0; i < cpf.length; i++) {
      total += parseInt(cpf[i]) * fatorInicial--;
    }

    const resto = total % 11;

    return resto < 2 ? 0 : 11 - resto;
  };

  const firstDigit = calculateDigit(cpf, 10);
  const secondDigit = calculateDigit(cpf + firstDigit, 11);

  cpf += firstDigit.toString() + secondDigit.toString();

  if (formatted) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  return cpf;
};

const formTypeSuccess = ({
  name,
  cpf,
  birthDate,
  baptismDate,
  maritalStatus,
  occupation,
  housingCondition,
  // ministry
  hasMinistry,
  ministry,
  ministryPresentation,
}: Partial<CreateMember>): void => {
  cy.getBySel('name-input').type(name || faker.internet.displayName());
  cy.getBySel('cpf-input').type(cpf || generateCPF());

  const pastDate = faker.date.past();

  cy.getBySel('birthDate-input').type(
    birthDate || format(subYears(pastDate, 10), 'yyyy-MM-dd')
  );
  cy.getBySel('baptismDate-input').type(
    baptismDate || format(subYears(pastDate, 8), 'yyyy-MM-dd')
  );
  cy.getBySel('occupation-input').type(occupation || faker.person.jobTitle());

  cy.getBySel('maritalStatus-combobox-trigger').click();
  cy.get(
    `[data-value="${maritalStatus ? MaritalStatus[maritalStatus] : MaritalStatus.single}"]`
  ).click();

  cy.getBySel('commonChurch-combobox-trigger').click();
  cy.getBySel('commonChurch-combobox-group').click();

  cy.getBySel('housingCondition-combobox-trigger').click();
  cy.get(
    `[data-value="${housingCondition ? HousingCondition[housingCondition] : HousingCondition.own}"]`
  ).click();

  if (hasMinistry !== false) {
    cy.getBySel('hasMinistry-check').click();

    cy.getBySel('ministry-combobox-trigger').click();
    cy.get(
      `[data-value="${ministry ? Ministry[ministry] : Ministry.elder}"]`
    ).click();

    cy.getBySel('ministryPresentation-input').type(
      ministryPresentation || format(subYears(pastDate, 6), 'yyyy-MM-dd')
    );
  }
};

describe('Membros', () => {
  beforeEach(() => {
    cy.visit(routes.signIn);

    cy.getBySel('email-input').type(testerEmail);
    cy.getBySel('password-input').type(testerPassword);

    cy.getBySel('submit-button').click();

    cy.contains(testerName);

    cy.location('pathname').should('include', routes.home);

    cy.visit(routes.addMember);
  });

  it('Se não preencher os campos, e tentar submeter, deve receber erros', () => {
    cy.getBySel('submit-button').click();

    cy.getBySel('name-input-error').contains('O nome deve ser informado.');
    cy.getBySel('cpf-input-error').contains('O cpf deve ser informado.');
    cy.getBySel('birthDate-input-error').contains('Formato de data inválido.');
    cy.getBySel('baptismDate-input-error').contains(
      'Formato de data inválido.'
    );
    cy.getBySel('maritalStatus-input-error').contains(
      'O estado civil deve ser informado.'
    );
    cy.getBySel('occupation-input-error').contains(
      'A profissão deve ser informada.'
    );
    cy.getBySel('commonChurch-input-error').contains(
      'A comum congregação deve ser informada.'
    );
    cy.getBySel('housingCondition-input-error').contains(
      'A condição de moradia deve ser informada.'
    );
  });

  it('Ao assinalar como membro do ministério sem preencher os campos, e tentar submeter, deve receber erros', () => {
    cy.getBySel('hasMinistry-check').click();

    cy.getBySel('submit-button').click();

    cy.getBySel('ministry-input-error').contains(
      'O ministério deve ser informado.'
    );
    cy.getBySel('ministryPresentation-input-error').contains(
      'Formato de data inválido.'
    );
  });

  it('Ao preencher o CPF incorretamente, e tentar submeter, deve recebe um erro', () => {
    formTypeSuccess({ cpf: '123123' });

    cy.getBySel('submit-button').click();

    cy.getBySel('cpf-input-error').contains('Esse CPF é inválido.');
  });

  it('Ao preencher a data de nascimento incorretamente, e tentar submeter, deve recebe um erro', () => {
    formTypeSuccess({ birthDate: format(faker.date.future(), 'yyyy-MM-dd') });

    cy.getBySel('submit-button').click();

    cy.getBySel('birthDate-input-error').contains(
      'A data não deve ser maior que a atual.'
    );
  });

  it('Ao preencher a data de batismo com uma data maior qua a atual, e tentar submeter, deve recebe um erro', () => {
    formTypeSuccess({ baptismDate: format(faker.date.future(), 'yyyy-MM-dd') });

    cy.getBySel('submit-button').click();

    cy.getBySel('baptismDate-input-error').contains(
      'A data não deve ser maior que a atual.'
    );
  });

  it('Ao preencher a data de batismo com uma data menor que a de nascimento, e tentar submeter, deve recebe um erro', () => {
    const pastDate = faker.date.past();

    formTypeSuccess({
      birthDate: format(subYears(pastDate, 6), 'yyyy-MM-dd'),
      baptismDate: format(subYears(pastDate, 8), 'yyyy-MM-dd'),
    });

    cy.getBySel('submit-button').click();

    cy.getBySel('baptismDate-input-error').contains(
      'A data de batismo não deve ser menor que a de nascimento.'
    );
  });

  it('Ao selecionar a moradia como alugada e não preencher o valor, e tentar submeter, deve recebe um erro', () => {
    formTypeSuccess({
      housingCondition: HousingConditionValues.rent,
    });

    cy.getBySel('submit-button').click();

    cy.getBySel('housingValue-input-error').contains(
      'O valor do aluguel deve ser informado.'
    );
  });

  it('Ao selecionar a moradia como financiada e não preencher o valor, e tentar submeter, deve recebe um erro', () => {
    formTypeSuccess({
      housingCondition: HousingConditionValues.financed,
    });

    cy.getBySel('submit-button').click();

    cy.getBySel('housingValue-input-error').contains(
      'O valor da parcela do financiamento deve ser informado.'
    );
  });

  it('Ao preencher a data de apresentação de ministério com uma data maior qua a atual, e tentar submeter, deve recebe um erro', () => {
    formTypeSuccess({
      ministryPresentation: format(faker.date.future(), 'yyyy-MM-dd'),
    });

    cy.getBySel('submit-button').click();

    cy.getBySel('ministryPresentation-input-error').contains(
      'A data não deve ser maior que a atual.'
    );
  });

  it('Ao preencher a data de apresentação de ministério com uma data menor qua a de batismo, e tentar submeter, deve recebe um erro', () => {
    const pastDate = faker.date.past();

    formTypeSuccess({
      birthDate: format(subYears(pastDate, 10), 'yyyy-MM-dd'),
      baptismDate: format(subYears(pastDate, 8), 'yyyy-MM-dd'),
      ministryPresentation: format(subYears(pastDate, 9), 'yyyy-MM-dd'),
    });

    cy.getBySel('submit-button').click();

    cy.getBySel('ministryPresentation-input-error').contains(
      'A data não deve ser menor que a data de batismo.'
    );
  });

  it('Ao preencher os dados corretamente, sem ministério, deve cadastrar um membro', () => {
    formTypeSuccess({
      hasMinistry: false,
    });

    cy.getBySel('submit-button').click();

    cy.contains('Membro adicionado com sucesso!');
  });

  it('Ao tentar usar um CPF já utilizado, deve receber um erro', () => {
    const cpf = generateCPF();

    formTypeSuccess({ cpf });

    cy.getBySel('submit-button').click();

    cy.contains('Membro adicionado com sucesso!');

    cy.visit(routes.addMember);

    formTypeSuccess({ cpf });

    cy.getBySel('submit-button').click();

    cy.getBySel('cpf-input-error').contains('Número de CPF já cadastrado!');
  });
});
