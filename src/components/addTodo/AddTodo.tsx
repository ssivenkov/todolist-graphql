import { useState } from 'react';

import { AllTodosDocument, useAddTodoMutation } from 'generated/schema';

export const AddTodo = () => {
  const [text, setText] = useState('');

  const [addTodo, { error, loading }] = useAddTodoMutation({
    update(cache, { data }) {
      /*const cachedAllTodosData = cache.readQuery<AllTodosQuery>({
        query: AllTodosDocument,
      });*/

      cache.writeQuery({
        query: AllTodosDocument,
        data: {
          todos: {
            merge(existing = []) {
              return [data?.newTodo, ...existing];
            },
          },
        },
      });
    },
  });

  const handleAddTodo = () => {
    if (text.trim().length) {
      addTodo({
        variables: {
          title: text,
          completed: false,
          userId: '123',
        },
      });
      setText('');
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error</h2>;
  }

  return (
    <div>
      <input onChange={(event) => setText(event.target.value)} value={text} />
      <button onClick={handleAddTodo} type='button'>
        Add todo
      </button>
    </div>
  );
};
