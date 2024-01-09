import styled from 'styled-components/native';
import { Text } from '../../../components/typography/text.component';

export const RPWrapper = styled.View`
  background-color: #fff;
  flex-direction: column;
  width: 100%;
  border-radius: 12px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 4px;
  }
  margin: 6px 0;
  padding: 12px 0;
`;

export const RPHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const RPUser = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 0 8px;
`;

export const RPUserImage = styled.Image`
  height: 52px;
  width: 52px;
  border-radius: 25px;
`;

export const RPInfo = styled.TouchableOpacity`
  margin-left: 12px;
  width: 80%;
`;

export const Title = styled(Text)`
  font-size: 15px;
`;

export const Timestamp = styled(Text)`
  margin-left: 70px;
  font-size: 14px;
  color: #009999;
`;
