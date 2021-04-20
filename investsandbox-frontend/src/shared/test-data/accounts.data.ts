import { Account } from './../models/account.model';

export const AccountsData: Account[] = [
  {
    nickname: 'Кирилл Костарев',
    email: 'kos@23.com',
    portfolios: [
      {
        title: 'Технологические гиганты',
        currency: 'RUB',
        initBalance: 25000,
        balance: 21000,
        quotes: [
          {
            shortname: 'Tesla Inc.',
            symbol: 'TSLA',
            quoteType: 'EQUITY',
            exchange: 'NMS',
            currency: 'USD',
            count: 2,
          },
          {
            shortname: 'Apple Inc.',
            symbol: 'AAPL',
            quoteType: 'EQUITY',
            exchange: 'NMS',
            currency: 'USD',
            count: 10
          }
        ],
        history: {
          onMonth: [23953, 21532, 27743, 28943, 22064, 20954, 20457],
          onAllTime: [22469, 22867, 29583]
        }
      },
      {
        title: 'IT гиганты',
        currency: 'EUR',
        initBalance: 5000,
        balance: 4100,
        quotes: [
          {
            shortname: 'Alphabet Class A.',
            symbol: 'GOOGL',
            quoteType: 'EQUITY',
            exchange: 'NMS',
            currency: 'USD',
            count: 15
          }
        ],
        history: {
          onMonth: [2843],
          onAllTime: []
        }
      },
      {
        title: 'Мои любимые компании',
        currency: 'USD',
        initBalance: 10000,
        balance: 6900,
        quotes: [
          {
            shortname: 'Alphabet Class A.',
            symbol: 'GOOGL',
            quoteType: 'EQUITY',
            exchange: 'NMS',
            currency: 'USD',
            count: 15
          },
          {
            shortname: 'Microsoft',
            symbol: 'MCRSFT',
            quoteType: 'EQUITY',
            exchange: 'NMS',
            currency: 'USD',
            count: 40
          },
          {
            shortname: 'Appache',
            symbol: 'APPA',
            quoteType: 'EQUITY',
            exchange: 'NMS',
            currency: 'USD',
            count: 5
          },
          {
            shortname: 'EUR/USD',
            symbol: 'EURUSD=X',
            quoteType: 'CURRENCY',
            exchange: 'NMS',
            currency: 'EUR',
            count: 34
          },
        ],
        history: {
          onMonth: [8964, 7853, 6863, 6921, 6932, 7849, 8942, 9035, 9032, 10942, 8985],
          onAllTime: [10323, 10325, 10895, 9457, 8953, 8694, 9201]
        }
      },
    ]
  }
];