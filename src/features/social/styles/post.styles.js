import styled from 'styled-components/native';
import { Text } from '../../../components/typography/text.component';

export const PostWrapper = styled.View`
  background-color: #fff;
  flex-direction: column;
  width: 100%;
  border-radius: 26px;
  border-width: 1px;
  border-color: #fff;
  margin-vertical: 12px;
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

export const Timestamp = styled(Text)`
  color: #009999;
`;

export const PostContentWrapper = styled.View`
  margin: 8px;
`;

export const PostImage = styled.Image`
  margin-top: 10px;
  width: 100%;
  height: 350px;
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

export const Stars = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 12px;
`;

export const StarsNumber = styled(Text)`
  margin-left: 2px;
`;

export const Comments = styled.View`
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

export const CommentBox = styled.View`
  flex: 1;
  height: 52px;
  border-radius: 26px;
  border-width: 1px;
  border-color: #ccc;
  margin-left: 12px;
  padding-left: 12px;
  justify-content: center;
`;
