import styled from 'styled-components/native';
import { Text } from '../../../components/typography/text.component';

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: ${(props) => props.theme.space[3]};
`;

export const ModalView = styled.View`
  background-color: white;
  border-radius: 20px;
  width: 100%;
  padding: 35px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2px;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

export const CloseIcon = styled.TouchableOpacity`
  width: 55px;
  height: 55px;
  position: absolute;
  top: ${(props) => props.theme.space[2]};
  right: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[2]};
`;

export const ExplorersList = styled.FlatList`
  margin-top: 20px;
`;

export const ExplorersWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const ExplorerImage = styled.Image`
  height: 50px;
  width: 50px;
  margin-right: ${(props) => props.theme.space[3]};
  border-radius: 80px;
  border-width: 2px;
  border-color: #fff;
`;

export const Name = styled(Text)`
  font-size: 15px;
`;

export const NoExplorers = styled(Text)`
  margin-top: 20px;
  text-align: center;
`;

export const ExplorersInfo = styled(Text)`
  margin-top: 20px;
  line-height: 20px;
`;
