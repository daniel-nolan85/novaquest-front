import { Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { Text } from '../../../components/typography/text.component';

let { width } = Dimensions.get('window');
width = width - 44;

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  position: relative;
  margin-top: 20px;
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  width: 100%;
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
  z-index: 999;
  top: ${(props) => props.theme.space[2]};
  right: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[2]};
`;

export const ProfileCardWrapper = styled.View`
  width: ${width};
  margin: 0 22px;
  padding: 18px 6px;
  background-color: #ffffff;
  elevation: 2;
  border-radius: 35px;
  flex-grow: 1;
`;

export const ProfileImageWrapper = styled.View`
  align-items: center;
`;

export const CameraIcon = styled.TouchableOpacity`
  height: 100px;
  width: 100px;
  border-radius: 80px;
  border-width: 4px;
  border-color: #fff;
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

export const Input = styled(TextInput)`
  background-color: #fff;
  align-self: center;
  margin: 0 ${(props) => props.theme.space[2]};
  width: 90%;
`;

export const BioWrapper = styled.View`
  flex-grow: 1;
`;

export const SaveIcon = styled.TouchableOpacity`
  align-items: center;
  margin-top: 10px;
`;
