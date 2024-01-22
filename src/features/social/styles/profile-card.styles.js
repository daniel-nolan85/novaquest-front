import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Text } from '../../../components/typography/text.component';

let { width } = Dimensions.get('window');
width = width - 44;

export const ProfileCardWrapper = styled.View`
  width: ${width};
  margin: 0 22px;
  padding: 18px 6px;
  background-color: #fff;
`;

export const ProfileImageWrapper = styled.View`
  align-items: center;
`;

export const IconContainer = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  margin-op: 10px;
  border-radius: 30px;
  flex-direction: row;
  position: absolute;
  left: 0;
  justify-content: center;
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

export const ProfileImageContainer = styled.View`
  position: relative;
`;

export const Banner = styled.View`
  position: absolute;
  background-color: #009999;
  transform: rotate(45deg);
  top: 15px;
  left: 40px;
  padding: 15px 50px;
`;

export const BannerText = styled(Text)`
  color: #fff;
`;
