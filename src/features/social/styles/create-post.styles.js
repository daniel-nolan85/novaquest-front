import styled from 'styled-components/native';

export const CreateSection = styled.View`
  flex-direction: row;
  padding: 18px 0;
  border-top-width: 1px;
  border-top-color: #fdf6ed;
`;

export const UserImage = styled.Image`
  height: 52px;
  width: 52px;
  border-radius: 26px;
`;

export const CreateBox = styled.TouchableOpacity`
  flex: 1;
  height: 52px;
  border-radius: 26px;
  border-width: 1px;
  border-color: #ccc;
  margin-left: 12px;
  padding-left: 12px;
  justify-content: center;
`;
