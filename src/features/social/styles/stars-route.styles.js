import styled from 'styled-components/native';

export const StarsRouteWrapper = styled.View`
  flex: 1;
`;

export const StarsList = styled.FlatList`
  margin-top: 5px;
`;

export const StarWrapper = styled.TouchableOpacity`
  aspect-ratio: 1;
  margin: 3px;
  width: 32%;
`;

export const StarImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;
