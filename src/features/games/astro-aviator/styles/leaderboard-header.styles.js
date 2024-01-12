import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const SearchContainer = styled.View`
  flex: 1;
  padding-right: ${(props) => props.theme.space[2]};
`;
