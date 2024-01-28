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

export const ProfileImage = styled.Image`
  height: 300px;
  width: 300px;
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

export const Bio = styled(Text)`
  line-height: 20px;
`;
