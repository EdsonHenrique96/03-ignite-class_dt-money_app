import { createContext, useEffect, useState } from 'react';

interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'outcome';
  amount: number;
  category: string;
  createdAt: string;
}

interface TransactionContextData {
  transactions: Transaction[];
}

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function getTransactions() {
    const response = await fetch('http://localhost:3333/transactions');
    const transactions = await response.json();

    setTransactions(transactions);
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
