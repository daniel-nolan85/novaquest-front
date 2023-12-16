import { List, TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../../components/typography/text.component';

const { Section, Item } = List;

export const AvatarContainer = styled.View`
  margin: ${(props) => props.theme.space[5]};
  align-items: center;
`;

export const UserInfoContainer = styled.View`
  margin-top: ${(props) => props.theme.space[3]};
  align-items: center;
`;

export const SettingsItem = styled(Item)`
  padding: ${(props) => props.theme.space[3]};
  margin: 0 ${(props) => props.theme.space[1]};
`;

export const OptionContainer = styled.View`
  width: 100%;
`;

export const Option = styled.TouchableOpacity`
  margin: ${(props) => props.theme.space[2]} 0;
`;

export const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#009999', '#00cccc'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  padding: ${(props) => props.theme.space[3]};
  background-color: #009999;
  border-radius: 12px;
  align-items: center;
`;

export const OptionText = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
  text-transform: uppercase;
`;

export const Input = styled(TextInput)`
  background-color: #fff;
  align-self: center;
  margin: ${(props) => props.theme.space[3]};
  width: 100%;
`;

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: ${(props) => props.theme.space[3]};
`;

const baseModalStyle = `
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

export const ModalView = styled.View`
  ${baseModalStyle}
  padding: 35px;
`;

export const AchievementsModalView = styled.View`
  ${baseModalStyle}
  padding: 35px 10px;
`;

export const CloseIcon = styled.TouchableOpacity`
  width: 55px;
  height: 55px;
  position: absolute;
  top: ${(props) => props.theme.space[2]};
  right: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[2]};
`;

export const AchievementsSection = styled(Section)``;

export const AchievementsItem = styled(Item)`
  width: 90%;
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.space[4]};
`;

export const Animation = styled(LottieView)`
  width: 100%;
  height: 100%;
`;

export const DaysDescription = styled(Text)`
  margin-top: 20px;
`;
