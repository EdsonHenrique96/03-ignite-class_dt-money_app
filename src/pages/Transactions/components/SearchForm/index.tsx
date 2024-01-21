import { MagnifyingGlass } from 'phosphor-react';
import { SearchFormContainer } from './styles';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { TransactionsContext } from '../../../../context/TransactionsContext';

const searchFormSchema = z.object({
  transactionQuery: z.string(),
});

type SearchFormSchemaType = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchFormSchemaType>({
    resolver: zodResolver(searchFormSchema),
  });
  const { fetchTransactions } = useContext(TransactionsContext);

  const handleSearchTransaction = async (data: SearchFormSchemaType) => {
    await fetchTransactions(data.transactionQuery);
  };
  console.log(errors);

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input
        type="text"
        id=""
        placeholder="Busque por transações"
        {...register('transactionQuery')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
