import { History } from './history.model';
import { Currency } from './currency.model';
import { Exchange } from './exchange.model';
import { QuoteType } from './quoteType.model';

export type Quote = {
  shortname: string;
  symbol: string;
  quoteType: QuoteType;
  exchange: Exchange;
  currency: Currency;
  count: number;
  price?: number;
  history?: History;
}
