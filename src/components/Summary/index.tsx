import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { SummaryCard, SummaryContainer } from './styles';
import { useContext } from 'react';
import { TransactionsContext } from '../../context/TransactionsContext';
import { currencyFormatter } from '../../utils/formatter';

export function Summary() {
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

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{currencyFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{currencyFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>{currencyFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
