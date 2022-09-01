import { Checkbox } from '@mui/material';
import Button from '@mui/material/Button';

import { StyledButtonContainer, StyledContainer, StyledText } from './styles';
import { TodoItemPropsType } from './types';

export const TodoItem = (props: TodoItemPropsType) => {
  const { onDelete, onToggle, id, title, completed } = props;

  if (id) {
    return (
      <StyledContainer>
        {/*<input
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
        />*/}
        <Checkbox
          checked={completed}
          onChange={() =>
            onToggle({
              variables: {
                id,
                completed: !completed,
              },
            })
          }
        />
        <StyledText>{title}</StyledText>
        <StyledButtonContainer>
          <Button
            onClick={() =>
              onDelete({
                variables: { id },
              })
            }
            variant='contained'
          >
            Delete
          </Button>
        </StyledButtonContainer>
      </StyledContainer>
    );
  }

  return <div />;
};
