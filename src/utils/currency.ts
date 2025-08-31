export const toCurrency = (amount: number, currency?: string) =>
  new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: currency ? currency : 'WON',
  }).format(amount);
