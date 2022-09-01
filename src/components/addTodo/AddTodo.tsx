import { useState } from 'react';

import Button from '@mui/material/Button';
import { AllTodosDocument, useAddTodoMutation } from 'generated/schema';
import { nanoid } from 'nanoid';

import { StyledButtonContainer, StyledContainer } from './styles';

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
    <StyledContainer>
      <input onChange={(event) => setText(event.target.value)} value={text} />
      <StyledButtonContainer>
        <Button onClick={handleAddTodo} variant='contained'>
          Add todo
        </Button>
      </StyledButtonContainer>
    </StyledContainer>
  );
};
