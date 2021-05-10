const host = 'http://localhost';
const yahoo = 'https://query1.finance.yahoo.com/';

export const UrlEnum = {
  API: host,
  API_ACCOUNT: `${host}/user/profile`,
  API_LOGIN: `${host}/auth/login`,
  API_REGISTER: `${host}/register`,
  API_PORTFOLIO: `${host}/user/portfolio`,
  API_QUOTE: `${host}/user/portfolio/quote`,
  YAHOO: yahoo,
  YAHOO_AUTOCOMPLETE: `${yahoo}/v1/finance/search`,
  YAHOO_GET_QUOTE_INFO: `${yahoo}v10/finance/quoteSummary`,
  YAHOO_GET_QUOTE_HISTORY: `${yahoo}/v8/finance/chart`
} as const;