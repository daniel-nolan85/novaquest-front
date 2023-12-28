import { TextInput, FlatList } from 'react-native';
import moment from 'moment';
import { Text } from '../../../components/typography/text.component';
import {
  PostWrapper,
  PostHeader,
  PostCreator,
  PostCreatorImage,
  PostInfo,
  Timestamp,
  PostContentWrapper,
  PostImage,
  PostReactionWrapper,
  StarsAndComments,
  Stars,
  StarsNumber,
  Comments,
  CommentsNumber,
  CommentSection,
  UserImage,
  CommentBox,
} from '../styles/post.styles';
import Star from '../../../../assets/svg/star.svg';
import Comment from '../../../../assets/svg/comment.svg';
import defaultProfile from '../../../../assets/img/defaultProfile.png';

export const Post = ({ navigate, posts }) => {
  const renderItem = ({ item }) => (
    <PostWrapper>
      <PostHeader>
        <PostCreator
          onPress={() => navigate('UserProfile', { userId: item.postedBy._id })}
        >
          <PostCreatorImage
            source={
              item.postedBy.profileImage
                ? item.postedBy.profileImage
                : defaultProfile
            }
          />
          <PostInfo>
            <Text variant='title'>
              {item.postedBy.rank} {item.postedBy.name}
            </Text>
            <Timestamp variant='body'>
              {moment(item.createdAt).fromNow()}
            </Timestamp>
          </PostInfo>
        </PostCreator>
      </PostHeader>

      <PostContentWrapper>
        <Text variant='body'>{item.text}</Text>
        {item.images.length && (
          <PostImage source={{ uri: item.images[0].url }} />
        )}
      </PostContentWrapper>

      <PostReactionWrapper>
        <StarsAndComments>
          <Stars>
            <Star width={24} height={24} />
            <StarsNumber variant='body'>22</StarsNumber>
          </Stars>
          <Comments>
            <Comment width={24} height={24} />
            <CommentsNumber variant='body'>22</CommentsNumber>
          </Comments>
        </StarsAndComments>
      </PostReactionWrapper>

      <CommentSection>
        <UserImage
          source={
            item.postedBy.profileImage
              ? item.postedBy.profileImage
              : defaultProfile
          }
          resizeMode='contain'
        />
        <CommentBox>
          <TextInput placeholder='Add a comment' placeholderTextColor='#ccc' />
        </CommentBox>
      </CommentSection>
    </PostWrapper>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
    />
  );
};
