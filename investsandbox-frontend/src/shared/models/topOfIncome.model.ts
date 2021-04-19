export type TopOfIncomeItem = {portfolioTitle: string, incomeValue: number};

export type TopOfIncome = {
  percent: {
    onMonth: TopOfIncomeItem[],
    onAllTime: TopOfIncomeItem[],
  },
  absolute: TopOfIncomeItem[] //in roubles!
}