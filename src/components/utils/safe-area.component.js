import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
