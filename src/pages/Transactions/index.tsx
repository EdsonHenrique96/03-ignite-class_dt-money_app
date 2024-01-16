import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';
import {
  PriceHighlight,
  TransactionContainer,
  TransactionsTable,
} from './styles';

export function TransactionsPage() {
  return (
    <div>
      <Header />
      <Summary />
      <TransactionContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
                <PriceHighlight variant="income">R$ 12.000,00</PriceHighlight>
              </td>
              <td>Vendas</td>
              <td>13/04/2023</td>
            </tr>
            <tr>
              <td width="50%">Sushi</td>
              <td>
                <PriceHighlight variant="outcome">
                  - R$ 10.000,00
                </PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>10/04/2023</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionContainer>
    </div>
  );
}
