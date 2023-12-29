import { useState, useRef } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Text } from '../../../components/typography/text.component';
import {
  PostWrapper,
  PostHeader,
  PostCreator,
  PostCreatorImage,
  PostInfo,
  Name,
  Timestamp,
  PostContentWrapper,
  PostImage,
  ImageNumber,
  PostReactionWrapper,
  StarsAndComments,
  Stars,
  StarsNumber,
  Comments,
  CommentsNumber,
  CommentSection,
  UserImage,
  CommentBox,
  Placeholder,
} from '../styles/post.styles';
import Star from '../../../../assets/svg/star.svg';
import GoldStar from '../../../../assets/svg/gold-star.svg';
import Comment from '../../../../assets/svg/comment.svg';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import {
  handleLikePost,
  handleUnlikePost,
  addComment,
} from '../../../requests/post';
import { CommentOptionsModal } from './comment-options-modal.component';
import { CommentsModal } from './comments-modal.component';

export const Post = ({ navigate, posts, newsFeed }) => {
  const [showComments, setShowComments] = useState(false);
  const [showCommentList, setShowCommentList] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const lastTapTimeRef = useRef(0);

  const { token, _id, profileImage } = useSelector((state) => state.user);

  const doubleTap = (item) => {
    const currentTime = new Date().getTime();
    const delta = currentTime - lastTapTimeRef.current;
    if (delta < 300) {
      if (item.likes.some((like) => like._id === _id)) {
        unlikePost(item._id);
      } else likePost(item._id);
    }
    lastTapTimeRef.current = currentTime;
  };

  const likePost = async (postId) => {
    await handleLikePost(token, _id, postId)
      .then((res) => {
        newsFeed();
      })
      .catch((err) => console.error(err));
  };

  const unlikePost = async (postId) => {
    await handleUnlikePost(token, _id, postId)
      .then((res) => {
        newsFeed();
      })
      .catch((err) => console.error(err));
  };

  const viewComments = (postId) => {
    setSelectedPostId(postId);
    setShowComments(true);
  };

  const handleCommentSelect = (item, postId) => {
    console.log(item, postId);
    setShowCommentList(false);
    addComment(token, _id, postId, item)
      .then((res) => {
        newsFeed();
      })
      .catch((err) => console.error(err));
  };

  const renderItem = ({ item }) => (
    <PostWrapper key={item._id}>
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
            <Name variant='title'>
              {item.postedBy.rank} {item.postedBy.name}
            </Name>
            <Timestamp variant='body'>
              {moment(item.createdAt).fromNow()}
            </Timestamp>
          </PostInfo>
        </PostCreator>
      </PostHeader>

      <PostContentWrapper onPress={() => doubleTap(item)}>
        <Text variant='body'>{item.text}</Text>
        {item.images.length > 1 ? (
          <ScrollView
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={350}
            disableIntervalMomentum={true}
            disableScrollViewPanResponder={true}
            snapToAlignment={'center'}
            horizontal={true}
          >
            {item.images.map((image, index) => (
              <View key={index}>
                <PostImage source={{ uri: image.url }} />
                <ImageNumber variant='title'>{`${index + 1}/${
                  item.images.length
                }`}</ImageNumber>
              </View>
            ))}
          </ScrollView>
        ) : (
          item.images.length === 1 && (
            <PostImage source={{ uri: item.images[0].url }} />
          )
        )}
      </PostContentWrapper>

      <PostReactionWrapper>
        <StarsAndComments>
          {item.likes.some((like) => like._id === _id) ? (
            <Stars onPress={() => unlikePost(item._id)}>
              <GoldStar width={32} height={32} />
              <StarsNumber variant='body'>{item.likes.length}</StarsNumber>
            </Stars>
          ) : (
            <Stars onPress={() => likePost(item._id)}>
              <Star width={32} height={32} />
              <StarsNumber variant='body'>{item.likes.length}</StarsNumber>
            </Stars>
          )}
          <Comments onPress={() => viewComments(item._id)}>
            <Comment width={32} height={32} />
            <CommentsNumber variant='body'>
              {item.comments.length}
            </CommentsNumber>
          </Comments>
        </StarsAndComments>
      </PostReactionWrapper>

      <CommentSection>
        <UserImage
          source={profileImage ? profileImage : defaultProfile}
          resizeMode='contain'
        />
        <CommentBox
          onPress={() => {
            setShowCommentList(true);
            setSelectedPostId(item._id);
          }}
        >
          <Placeholder variant='body'>Add a comment</Placeholder>
        </CommentBox>
      </CommentSection>

      <CommentsModal
        visible={showComments}
        setVisible={setShowComments}
        postId={selectedPostId}
        navigate={navigate}
      />
      <CommentOptionsModal
        visible={showCommentList}
        setVisible={setShowCommentList}
        handleCommentSelect={handleCommentSelect}
        postId={selectedPostId}
      />
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
