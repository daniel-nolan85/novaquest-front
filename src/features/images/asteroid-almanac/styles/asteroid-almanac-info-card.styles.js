import { Card } from 'react-native-paper';
import styled from 'styled-components/native';

export const AsteroidCard = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[3]};
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const AsteroidHeaderCard = styled.View`
  padding: ${(props) => props.theme.space[3]};
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const AsteroidDetailsCard = styled.View`
  padding: ${(props) => props.theme.space[3]};
  border-radius: 0 0 12px 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-top: -20px;
  position: relative;
  z-index: 1;
`;
