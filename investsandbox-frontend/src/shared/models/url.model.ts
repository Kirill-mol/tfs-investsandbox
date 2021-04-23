const host = 'http://localhost:8989';

export const UrlEnum = {
  HOST: host,
  ACCOUNT: `${host}/user/profile`,
  LOGIN: `${host}/auth/login`,
  REGISTER: `${host}/register`,
  PORTFOLIO: `${host}/user/portfolio`
} as const;