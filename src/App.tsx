import { TransactionsProvider } from './context/TransactionsContext';
import { TransactionsPage } from './pages/Transactions';

export function App() {
  return (
    <div>
      <TransactionsProvider>
        <TransactionsPage />
      </TransactionsProvider>
    </div>
  );
}
