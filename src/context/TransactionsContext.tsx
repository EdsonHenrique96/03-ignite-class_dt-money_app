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

type CreateTransaction = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionContextData {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransaction) => Promise<void>;
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

  async function createTransaction(data: CreateTransaction) {
    const { description, amount, category, type } = data;

    const response = await api.post('/transactions', {
      description,
      amount,
      category,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [response.data, ...state]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
