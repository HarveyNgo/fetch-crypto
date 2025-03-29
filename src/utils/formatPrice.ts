export const formatPrice = (
  val: string | number,
  decimalPlaces?: number,
  isConvertZero = true,
) => {
  if (val == null || val === '' || (val === 0 && isConvertZero)) {
    return '-';
  }

  let str =
    typeof val === 'number' && decimalPlaces !== undefined
      ? val.toFixed(decimalPlaces)
      : val.toString();

  const [integerPart, decimalPart] = str.split('.');

  return (
    integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (decimalPart ? `.${decimalPart}` : '')
  );
};
