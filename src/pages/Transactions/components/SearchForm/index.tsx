import { MagnifyingGlass } from 'phosphor-react';
import { SearchFormContainer } from './styles';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const searchFormSchema = z.object({
  transactionQuery: z.string().min(1, 'digite um valor para a busca'),
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

  const handleSearchTransaction = async (data: SearchFormSchemaType) => {
    return await new Promise((resolve) =>
      setTimeout(() => {
        console.log(data);
        resolve(data);
      }, 2000)
    );
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
