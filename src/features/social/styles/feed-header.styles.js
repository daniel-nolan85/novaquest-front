import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Header = styled.View`
  flex-direction: row;
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const SearchContainer = styled.View`
  flex: 1;
  padding-right: ${(props) => props.theme.space[2]};
`;

export const SignalsIcon = styled(LinearGradient).attrs({
  colors: ['#009999', '#00cccc'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  height: 55px;
  width: 55px;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;
