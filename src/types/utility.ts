export enum Currency {
  USD = 'USD',
}

export enum CurrencyProps {
  NumShares = 'numShares',
  Price = 'price',
  Commissions = 'commissions',
}

export type CurrencyDecimals = {
  [key in Currency]: {
    numShares: number,
    price: number,
    commissions: number,
  }
}
