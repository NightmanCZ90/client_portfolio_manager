export interface Token {
  message: string;
  token: string;
  userId: number;
}

export enum Role {
  Investor = 'investor',
  PortfolioManager = 'portfolioManager',
  Administrator = 'administrator',
}

export interface CurrentUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  isActive: boolean;
}
