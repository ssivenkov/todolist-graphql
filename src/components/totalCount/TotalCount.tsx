import { useQuery } from '@apollo/client';
import { ALL_TODO } from 'apollo/todos';

import { StyledContainer, StyledText } from './styles';

export const TotalCount = () => {
  const { data } = useQuery(ALL_TODO);

  return (
    <StyledContainer>
      {data?.todos && <StyledText>{`Total todos:${data.todos.length}`}</StyledText>}
    </StyledContainer>
  );
};
