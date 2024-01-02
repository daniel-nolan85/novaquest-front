import styled from 'styled-components/native';

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
  top: ${(props) => props.theme.space[2]};
  right: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[2]};
`;

export const CreateSection = styled.View`
  flex-direction: column;
  margin-top: 50px;
  padding: 18px;
  width: 100%;
`;

export const CreatePostWrapper = styled.View`
  flex-direction: row;
`;

export const UserImage = styled.Image`
  height: 52px;
  width: 52px;
  border-radius: 26px;
`;

export const CreatePostContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const CreatePostBox = styled.View`
  border-radius: 26px;
  border-width: 1px;
  border-color: #ccc;
  margin-left: 12px;
  padding: 12px;
  justify-content: center;
  flex-grow: 1;
`;

export const PostIcons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 25px 0 10px 0;
`;

export const TrashIcon = styled.TouchableOpacity`
  position: absolute;
  top: ${(props) => props.theme.space[2]};
  right: ${(props) => props.theme.space[2]};
`;

export const CameraIcon = styled.TouchableOpacity`
  margin-left: 10px;
`;

export const SubmitIcon = styled.TouchableOpacity``;
