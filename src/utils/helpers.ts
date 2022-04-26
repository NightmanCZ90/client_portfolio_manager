import { fixedDecimals } from '../constants/configurations';
import { Portfolio, PortfolioOwnership } from '../types/portfolio';
import { User } from '../types/user';
import { Currency, CurrencyProps } from '../types/utility';

export const capitalizeFirst = (str: string) => {
  if (str.length === 0) return '';
  return str[0].toUpperCase() + str.slice(1);
}

export const generateGreenRedClass = (value: number) => {
  if (value > 0) return 'green';
  if (value < 0) return 'red';
  return '';
}

export const generateUserName = (user?: User) => {
  const { firstName, lastName, email } = user || {};
  if (firstName && lastName) return `${firstName} ${lastName}`;
  return email || '';
}

export const generatePortfolioOwnership = (data: {userId?: number | null, portfolio?: Portfolio | null}): PortfolioOwnership => {
  const { portfolio, userId } = data;
  if (!userId || !portfolio) return PortfolioOwnership.Personal;

  if (portfolio.pmId && portfolio.pmId === userId) return PortfolioOwnership.Managing;
  if (portfolio.pmId && portfolio.pmId !== userId) return PortfolioOwnership.Managed;
  return PortfolioOwnership.Personal;
}

export const convertCurrencyDecimals = (value: number, property: CurrencyProps, currency: Currency, receivedFromAPI: boolean) => {
  if (receivedFromAPI) {
    return value / (10**fixedDecimals[currency][property]);
  } else {
    return value * (10**fixedDecimals[currency][property]);
  }
}

export const returnPrecision = (property: CurrencyProps, currency: Currency) => {
  return 1 / 10**fixedDecimals[currency][property];
}

export const remainDecimals = (value: string, property: CurrencyProps, currency: Currency) => {
  const splitNumber = value.split('.');
  if (splitNumber.length === 1) return value;

  return (splitNumber?.[0] || '0') + '.' + (splitNumber?.[1]?.slice(0, fixedDecimals[currency][property]) || '');
}
