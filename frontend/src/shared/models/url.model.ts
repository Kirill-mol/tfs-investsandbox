const host = 'http://localhost';
const mboum = 'https://mboum.com/api/v1';
const yahoo = 'https://seeking-alpha.p.rapidapi.com';

export const UrlEnum = {
  API: host,
  API_ACCOUNT: `${host}/user/profile`,
  API_LOGIN: `${host}/auth/login`,
  API_REGISTER: `${host}/register`,
  API_PORTFOLIO: `${host}/user/portfolio`,
  API_QUOTE: `${host}/user/portfolio/quote`,
  YAHOO: yahoo,
  YAHOO_AUTOCOMPLETE: `${yahoo}/auto-complete`,
  MBOUM: mboum,
  MBOUM_GET_QUOTE: `${mboum}/qu/quote`,
  MBOUM_GET_HISTORY: `${mboum}/hi/history`
} as const;