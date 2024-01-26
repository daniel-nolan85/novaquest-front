import styled from 'styled-components/native';
import { Video } from 'expo-av';
import { Text } from '../../../components/typography/text.component';

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
  width: 240px;
`;

export const Timestamp = styled(Text)`
  font-size: 14px;
  color: #009999;
`;

export const PostContentWrapper = styled.View`
  margin: 8px;
`;

export const PostActions = styled.TouchableOpacity``;

export const PostImage = styled.Image`
  margin-top: 10px;
  width: 350px;
  height: 450px;
  align-self: center;
`;

export const PostVideo = styled(Video)`
  margin-top: 10px;
  width: 350px;
  height: 450px;
  align-self: center;
`;

export const ImageNumber = styled(Text)`
  text-align: center;
  color: #009999;
`;

export const PostReactionWrapper = styled.View`
  margin: 0 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
`;

export const StarsAndComments = styled.View`
  flex-direction: row;
`;

export const Stars = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 12px;
`;

export const StarsNumber = styled(Text)`
  margin-left: 2px;
`;

export const Comments = styled.TouchableOpacity`
  margin-left: 20px;
  flex-direction: row;
  align-items: center;
`;

export const CommentsNumber = styled(Text)`
  margin-left: 2px;
`;

export const CommentSection = styled.View`
  flex-direction: row;
  margin: 0 8px;
  padding: 18px 0;
  border-top-width: 1px;
  border-top-color: #fdf6ed;
`;

export const UserImage = styled.Image`
  height: 52px;
  width: 52px;
  border-radius: 26px;
`;

export const CommentBox = styled.TouchableOpacity`
  flex: 1;
  height: 52px;
  border-radius: 26px;
  border-width: 1px;
  border-color: #ccc;
  margin-left: 12px;
  padding-left: 12px;
  justify-content: center;
`;

export const Placeholder = styled(Text)`
  color: #ccc;
  font-size: 14px;
`;
