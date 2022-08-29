import { StyledContainer, StyledText } from './styles';
import { TodoItemPropsType } from './types';

export const TodoItem = (props: TodoItemPropsType) => {
  const { onDelete, onToggle, id, title, completed } = props;

  if (id) {
    return (
      <StyledContainer>
        <input
          checked={completed}
          onChange={() =>
            onToggle({
              variables: {
                id,
                completed: !completed,
              },
            })
          }
          type='checkbox'
        />
        <StyledText>{title}</StyledText>
        <button
          onClick={() =>
            onDelete({
              variables: { id },
            })
          }
          type='button'
        >
          Delete
        </button>
      </StyledContainer>
    );
  }

  return <div />;
};
