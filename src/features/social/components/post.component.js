import { useState, useEffect, useRef } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import io from 'socket.io-client';
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
  PostVideo,
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
import { EditPostModal } from './edit-post-modal.component';
import { DeletePostModal } from './delete-post-modal.component';

export const Post = ({ navigate, posts, newsFeed }) => {
  const [showActions, setShowActions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showCommentList, setShowCommentList] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editable, setEditable] = useState(false);
  const [deleteable, setDeleteable] = useState(false);

  const lastTapTimeRef = useRef(0);

  const { token, _id, profileImage } = useSelector((state) => state.user);

  const socket = io(process.env.SOCKET_IO_URL, { path: '/socket.io' });

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

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
        if (res.data.postedBy !== _id) {
          socket.emit('like post', { _id, ownerId: res.data.postedBy });
        }
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
        console.log('res.data => ', res.data);
        if (res.data.postedBy !== _id) {
          socket.emit('new comment', { _id, ownerId: res.data.postedBy });
        }
      })
      .catch((err) => console.error(err));
  };

  const editPost = (post) => {
    setEditable(true);
    setShowActions(false);
    setSelectedPost(post);
  };

  const deletePost = (post) => {
    setDeleteable(true);
    setShowActions(false);
    setSelectedPost(post);
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
        <PostActions onPress={() => handlePostActions(item)}>
          <Ellipsis width={24} height={24} />
        </PostActions>
      </PostHeader>

      <PostContentWrapper>
        <TouchableOpacity activeOpacity={1} onPress={() => doubleTap(item)}>
          <Text variant='body'>{item.text}</Text>
        </TouchableOpacity>
        {item.media.length > 1 ? (
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
            {item.media.map((media, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => doubleTap(item)}
              >
                {media.type === 'image' ? (
                  <>
                    <PostImage source={{ uri: media.url }} />
                    <ImageNumber variant='title'>{`${index + 1}/${
                      item.media.length
                    }`}</ImageNumber>
                  </>
                ) : (
                  <>
                    <PostVideo
                      source={{ uri: media.url }}
                      shouldPlay={true}
                      isMuted={true}
                      resizeMode='cover'
                    />
                    <ImageNumber variant='title'>{`${index + 1}/${
                      item.media.length
                    }`}</ImageNumber>
                  </>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          item.media.length === 1 && (
            <TouchableOpacity activeOpacity={1} onPress={() => doubleTap(item)}>
              {item.media[0].type === 'image' ? (
                <PostImage source={{ uri: item.media[0].url }} />
              ) : (
                <PostVideo
                  source={{ uri: item.media[0].url }}
                  shouldPlay={true}
                  isMuted={true}
                  resizeMode='cover'
                  onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                />
              )}
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
        editPost={editPost}
        deletePost={deletePost}
      />
      <EditPostModal
        visible={editable}
        setVisible={setEditable}
        post={selectedPost}
        newsFeed={newsFeed}
      />
      <DeletePostModal
        visible={deleteable}
        setVisible={setDeleteable}
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
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
    />
  );
};
