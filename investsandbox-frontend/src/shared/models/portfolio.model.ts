import { Income } from './income.model';
import { History } from './history.model';
import { Quote } from './quote.model';
import { Currency } from './currency.model';

export type Portfolio = {
  title: string;
  currency: Currency;
  initBalance: number;
  balance: number;
  realBalance?: number;
  quotes: Quote[];
  history: History;
  income?: Income;
}
