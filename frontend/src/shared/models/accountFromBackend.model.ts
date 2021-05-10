import { Portfolio } from './portfolio.model';

export type AccountFromBackend = {
  nickname: string;
  email: string;
  portfolios: [];
}