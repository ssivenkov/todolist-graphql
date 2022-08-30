import { useState } from 'react';

import { AllTodosDocument, useAddTodoMutation } from 'generated/schema';
import { nanoid } from 'nanoid';

export const AddTodo = () => {
  const [text, setText] = useState('');

  const [addTodo, { error, loading }] = useAddTodoMutation({
    update(cache, { data: newTodoData }) {
      cache.updateQuery({ query: AllTodosDocument }, (data) => ({
        todos: [newTodoData?.newTodo, ...data.todos],
      }));
    },
  });

  const handleAddTodo = () => {
    if (text.trim().length) {
      addTodo({
        variables: {
          title: text,
          completed: false,
          userId: nanoid(),
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
