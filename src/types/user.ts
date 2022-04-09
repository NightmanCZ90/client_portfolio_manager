export interface Token {
  message?: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userId?: number;
}

export enum Role {
  Investor = 'investor',
  PortfolioManager = 'portfolioManager',
  Administrator = 'administrator',
}

export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  currency: string;
  role: Role;
  isActive: boolean;
}
