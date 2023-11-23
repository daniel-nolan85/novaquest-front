import styled from 'styled-components/native';

export const IconsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[2]};
  background-color: transparent;
`;
