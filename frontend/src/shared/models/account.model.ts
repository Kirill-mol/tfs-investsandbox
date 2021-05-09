import { Portfolio } from './portfolio.model';

export type Account = {
  nickname: string;
  email: string;
  portfolios: Portfolio[];
}