import { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';

export function useSummary() {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
        acc.total += transaction.amount;
      }

      if (transaction.type === 'outcome') {
        acc.outcome += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return { summary };
}
