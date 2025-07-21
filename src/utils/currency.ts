export const toCurrency = (amount: number) =>
  new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'WON',
  }).format(amount);
