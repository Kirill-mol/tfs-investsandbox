const host = 'http://localhost';

export const UrlEnum = {
  HOST: host,
  ACCOUNT: `${host}/user/profile`,
  LOGIN: `${host}/auth/login`,
  REGISTER: `${host}/register`,
  PORTFOLIO: `${host}/user/portfolio`
} as const;