export const currencyFormatter = new Intl.NumberFormat('en-NG', { 
    currency: 'NGN',
    style: 'currency',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
})