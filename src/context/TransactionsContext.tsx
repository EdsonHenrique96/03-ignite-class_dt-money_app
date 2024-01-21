import { createContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';

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
  fetchTransactions: (query?: string) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const transactions = await api.get<Transaction[]>('/transactions', {
      params: {
        q: query,
      },
    });

    setTransactions(transactions.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
