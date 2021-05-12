import { Portfolio } from './portfolio.model';

export type Account = {
  name: string;
  email: string;
  portfolios: Portfolio[];
}