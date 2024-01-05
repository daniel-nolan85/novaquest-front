import styled from 'styled-components/native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../../components/typography/text.component';

export const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
  margin-top: 20px;
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  width: 90%;
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
  z-index: 999;
`;

export const OptionContainer = styled.View`
  margin: 20px 0;
  width: 100%;
`;

export const Option = styled.TouchableOpacity`
  margin: 0 ${(props) => props.theme.space[3]};
  width: 90%;
`;

const baseGradientStyle = {
  flexDirection: 'row',
  padding: '16px',
  margin: '6px',
  borderRadius: '12px',
  alignItems: 'center',
  justifyContent: 'center',
};

export const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#009999', '#00cccc'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  ${baseGradientStyle}
`;

export const OptionText = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
  text-transform: uppercase;
  margin-left: 10px;
`;

export const PostWrapper = styled.View`
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
`;

export const PostHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

export const PostCreator = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 0 8px;
`;

export const PostCreatorImage = styled.Image`
  height: 52px;
  width: 52px;
  border-radius: 25px;
`;

export const PostInfo = styled.View`
  margin-left: 12px;
`;

export const Name = styled(Text)`
  font-size: 15px;
`;

export const Timestamp = styled(Text)`
  font-size: 14px;
  color: #009999;
`;

export const PostContentWrapper = styled.View`
  margin: 8px;
`;

export const CreatePostBox = styled.View`
  border-radius: 26px;
  border-width: 1px;
  border-color: #ccc;
  padding: 12px;
  justify-content: center;
  flex-grow: 1;
`;

export const PostImage = styled.Image`
  margin-top: 10px;
  width: 350px;
  height: 350px;
  align-self: center;
`;

export const PostVideo = styled(Video)`
  margin-top: 10px;
  width: 350px;
  height: 350px;
  align-self: center;
`;

export const ImageNumber = styled(Text)`
  text-align: center;
  color: #009999;
`;

export const TrashIcon = styled.TouchableOpacity`
  position: absolute;
  top: ${(props) => props.theme.space[2]};
  right: ${(props) => props.theme.space[2]};
`;

export const CameraIcon = styled.TouchableOpacity`
  align-self: center;
`;
