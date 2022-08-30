import { TodoItem } from 'components/todoItem/TodoItem';
import { TotalCount } from 'components/totalCount/TotalCount';
import {
  AllTodosQuery,
  useAllTodosQuery,
  useDeleteTodoMutation,
  useUpdateTodoStatusMutation,
} from 'generated/schema';

import { StyledTodoListsContainer } from './styles';

export const TodoList = () => {
  const { loading, error, data } = useAllTodosQuery();

  const [toggleTodo, { error: updateError }] = useUpdateTodoStatusMutation();

  const [removeTodo, { error: removeError }] = useDeleteTodoMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          allTodos(existingTodos: AllTodosQuery['todos'], { toReference }) {
            return existingTodos?.filter((todo) => {
              // (todo) => todo.__ref !== `Todo:${data?.removeTodo?.id}`
              return todo && toReference(todo)?.__ref !== `Todo:${data?.removeTodo?.id}`;
            });
          },
        },
      });
      /*cache.writeQuery({
        query: AllTodosDocument,
        data: {
          todos: {
            merge(currentTodos: AllTodosQuery['todos'] = []) {
              return currentTodos?.filter(
                // @ts-ignore
                (todo) => todo?.__ref !== `Todo:${data?.removeTodo?.id}`,
              );
            },
          },
        },
      });*/
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || updateError || removeError) {
    return <h2>Error</h2>;
  }

  return (
    <>
      <StyledTodoListsContainer>
        {data?.todos?.map((todo) => (
          <TodoItem
            completed={todo?.completed}
            id={todo?.id}
            key={todo?.id}
            onDelete={removeTodo}
            onToggle={toggleTodo}
            title={todo?.title}
          />
        ))}
      </StyledTodoListsContainer>
      <TotalCount />
    </>
  );
};
