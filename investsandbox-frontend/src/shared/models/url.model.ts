const host = 'http://localhost';
const mboum = 'https://mboum.com/api/v1';
const yahoo = 'https://seeking-alpha.p.rapidapi.com';

export const UrlEnum = {
  HOST: host,
  ACCOUNT: `${host}/user/profile`,
  LOGIN: `${host}/auth/login`,
  REGISTER: `${host}/register`,
  PORTFOLIO: `${host}/user/portfolio`,
  YAHOO: yahoo,
  YAHOO_AUTOCOMPLETE: `${yahoo}/auto-complete`,
  MBOUM: mboum,
  MBOUM_GET_QUOTE: `${yahoo}/qu/quote`,
  MBOUM_GET_HISTORY: `${yahoo}/hi/history`
} as const;