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
