import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../../components/typography/text.component';

const { height } = Dimensions.get('window');

export const OptionContainer = styled.View``;

export const Option = styled.TouchableOpacity`
  margin: ${(props) => props.theme.space[2]};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#009999', '#00cccc'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  padding: ${(props) => props.theme.space[3]};
  margin: 6px;
  background-color: #009999;
  border-radius: 12px;
  align-items: center;
`;

export const OptionText = styled(Text)`
  color: ${(props) =>
    props.disabled ? '#666' : props.theme.colors.text.inverse};
  text-transform: uppercase;
`;

export const Input = styled(TextInput)`
  background-color: #eeeeef;
  align-self: center;
  margin: 0 ${(props) => props.theme.space[2]};
  width: 90%;
`;

export const Info = styled(Text)`
  text-align: center;
  margin: 0 ${(props) => props.theme.space[3]};
`;

export const LegalView = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Legal = styled(Text)`
  font-size: 12px;
`;

export const LegalDoc = styled(Text)`
  font-size: 12px;
  color: #009999;
`;

export const LegalDocView = styled.View`
  padding: 12px;
`;

export const LegalScroll = styled.ScrollView`
  margin-bottom: 200px;
`;

export const TextView = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const MainTitle = styled(Text)`
  font-size: 25px;
  margin-bottom: 24px;
  color: #fff;
`;

export const SubTitle = styled(Text)`
  font-size: 20px;
  margin-top: 24px;
  margin-bottom: 10px;
  color: #fff;
`;

export const BoldTitle = styled(Text)`
  color: #fff;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const NormalText = styled(Text)`
  color: #ccc;
  margin-bottom: 10px;
  line-height: 20px;
`;

export const BoldText = styled(Text)`
  color: #fff;
  line-height: 20px;
`;

export const LinkText = styled(Text)`
  color: #009999;
  font-size: 16px;
`;

export const Contents = styled.View`
  margin-left: 20px;
`;

export const ContentsItem = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

export const BulletView = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

export const Bullet = styled(Text)`
  margin-left: 20px;
  color: #ccc;
`;

export const BulletText = styled(Text)`
  margin-left: 20px;
  color: #ccc;
  width: 85%;
`;
