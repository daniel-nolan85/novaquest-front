import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '../../../components/typography/text.component';

let { width } = Dimensions.get('window');
width = width - 44;

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: ${(props) => props.theme.space[3]};
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  width: 100%;
  padding: 10px;
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

export const TrashIcon = styled.TouchableOpacity`
  width: 55px;
  height: 55px;
  position: absolute;
  top: ${(props) => props.theme.space[2]};
  left: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[2]};
`;

export const CloseIcon = styled.TouchableOpacity`
  width: 55px;
  height: 55px;
  position: absolute;
  top: ${(props) => props.theme.space[2]};
  right: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[2]};
`;

export const ProfileCardWrapper = styled.TouchableOpacity`
  width: ${width};
  margin: 50px 22px 0;
  padding: 18px 6px;
  background-color: #fff;
`;

export const ProfileImageWrapper = styled.View`
  align-items: center;
`;

export const ProfileImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 80px;
  border-width: 4px;
  border-color: #fff;
`;

export const ProfileInfoWrapper = styled.View`
  flex-direction: column;
  margin: 12px 0;
`;

export const Name = styled(Text)`
  text-align: center;
`;

export const BioWrapper = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;
