import React from 'react';

import { AddTodo } from 'components/addTodo/AddTodo';
import { TodoList } from 'components/todoList/TodoList';

import { StyledAppContainer } from './styles';

export const App = () => {
  return (
    <StyledAppContainer>
      <AddTodo />
      <TodoList />
    </StyledAppContainer>
  );
};
