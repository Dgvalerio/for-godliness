const cpfMask = (value: string): string => {
  const justNumber = value.replaceAll(/\D/g, '');

  const part1 = justNumber.slice(0, 3);
  const part2 = justNumber.slice(3, 6);
  const part3 = justNumber.slice(6, 9);
  const part4 = justNumber.slice(9, 11);

  let cpfFormat = '';

  if (part1) cpfFormat = part1;
  if (part2) cpfFormat += `.` + part2;
  if (part3) cpfFormat += `.` + part3;
  if (part4) cpfFormat += `-` + part4;

  return cpfFormat;
};

const moneyMask = (value: string): string => {
  let numericValue = value.replaceAll(/\D/g, '');

  numericValue = (parseInt(numericValue, 10) / 100).toFixed(2);
  numericValue = numericValue.replace('.', ',');
  numericValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `R$ ${numericValue}`;
};

export const applyMask = {
  cpf: cpfMask,
  money: moneyMask,
};
