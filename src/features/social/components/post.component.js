import { useState, useEffect, useRef } from 'react';
import { View, FlatList, ScrollView, TouchableOpacity } from 'react-native';
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
  PostActions,
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
import Ellipsis from '../../../../assets/svg/ellipsis.svg';
import Star from '../../../../assets/svg/star.svg';
import GoldStar from '../../../../assets/svg/gold-star.svg';
import Comment from '../../../../assets/svg/comment.svg';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import {
  handleLikePost,
  handleUnlikePost,
  addComment,
} from '../../../requests/post';
import { ActionsModal } from './actions-modal.component';
import { CommentOptionsModal } from './comment-options-modal.component';
import { CommentsModal } from './comments-modal.component';

export const Post = ({ navigate, posts, newsFeed, initialIndex }) => {
  const [showActions, setShowActions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showCommentList, setShowCommentList] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const postRef = useRef(null);
  const lastTapTimeRef = useRef(0);
  const flatListRef = useRef(null);
  const scrollViewRef = useRef(null);

  const { token, _id, profileImage } = useSelector((state) => state.user);

  const handlePostActions = (post) => {
    setSelectedPost(post);
    setShowActions(true);
  };

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
    setShowCommentList(false);
    addComment(token, _id, postId, item)
      .then((res) => {
        newsFeed();
      })
      .catch((err) => console.error(err));
  };

  const renderItem = ({ item }) => (
    <PostWrapper key={item._id} ref={postRef}>
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
        <PostActions onPress={() => handlePostActions(item)}>
          <Ellipsis width={24} height={24} />
        </PostActions>
      </PostHeader>

      <PostContentWrapper>
        <TouchableOpacity activeOpacity={1} onPress={() => doubleTap(item)}>
          <Text variant='body'>{item.text}</Text>
        </TouchableOpacity>
        {item.images.length > 1 ? (
          <ScrollView
            ref={scrollViewRef}
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
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => doubleTap(item)}
              >
                <PostImage source={{ uri: image.url }} />
                <ImageNumber variant='title'>{`${index + 1}/${
                  item.images.length
                }`}</ImageNumber>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          item.images.length === 1 && (
            <TouchableOpacity activeOpacity={1} onPress={() => doubleTap(item)}>
              <PostImage source={{ uri: item.images[0].url }} />
            </TouchableOpacity>
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

      <ActionsModal
        visible={showActions}
        setVisible={setShowActions}
        post={selectedPost}
        newsFeed={newsFeed}
      />
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
      ref={flatListRef}
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      initialScrollIndex={initialIndex}
      onScrollToIndexFailed={(info) => {
        const wait = new Promise((resolve) => setTimeout(resolve, 500));
        wait.then(() => {
          flatListRef.current?.scrollToIndex({
            index: initialIndex,
            animated: false,
          });
        });
      }}
    />
  );
};
