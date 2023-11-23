import styled from 'styled-components/native';
import { Text } from '../../../../components/typography/text.component';
import { SafeArea } from '../../../../components/utils/safe-area.component';

export const SetupSafeArea = styled(SafeArea)`
  flex: 1;
`;

export const SetupContainer = styled.View`
  justify-content: space-between;
`;

export const SpeechContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  margin-bottom: ${(props) => props.theme.space[3]};
`;

export const ImageContainer = styled.View`
  width: 100px;
`;

export const Astronaut = styled.Image`
  width: 100%;
  height: 100px;
  resize-mode: cover;
`;

export const SpeechBubble = styled.View`
  flex: 1;
  margin-left: 8px;
  position: relative;
  top: 30px;
`;

export const OptionContainer = styled.View``;

export const Option = styled.TouchableOpacity`
  padding: ${(props) => props.theme.space[3]};
  margin: 6px;
  background-color: #009999;
  border-radius: 12px;
  align-items: center;
`;

export const OptionText = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
`;
