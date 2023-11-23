import { Card } from 'react-native-paper';
import styled from 'styled-components/native';

export const PlanetCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[3]};
`;

export const PlanetCardCover = styled.Image`
  padding: ${(props) => props.theme.space[3]};
  aspect-ratio: 1;
  width: 100%;
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
  flex-direction: row;
  justify-content: space-between;
`;
