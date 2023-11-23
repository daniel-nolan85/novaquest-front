import styled from 'styled-components/native';
import { Text } from '../../../../components/typography/text.component';

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

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  padding: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[2]};
`;

export const Congratulations = styled(Text)`
  margin: ${(props) => props.theme.space[3]} 0;
`;

export const Option = styled.TouchableOpacity`
  padding: ${(props) => props.theme.space[3]};
  margin: 6px;
  background-color: #009999;
  border-radius: 12px;
  align-items: center;
`;

export const OptionText = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
`;
