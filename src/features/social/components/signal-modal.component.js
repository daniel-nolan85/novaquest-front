import { useState, useEffect, useRef } from 'react';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { SafeArea } from '../../../components/utils/safe-area.component';
import io from 'socket.io-client';
import { Text } from '../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  PostWrapper,
  PostImage,
  PostVideo,
  PostContentWrapper,
  AnimationWrapper,
  Animation,
  Title,
  Body,
} from '../styles/signal-modal.styles';
import {
  PostHeader,
  PostCreator,
  PostCreatorImage,
  PostInfo,
  Name,
  Timestamp,
  PostActions,
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
import Close from '../../../../assets/svg/close.svg';
import Ellipsis from '../../../../assets/svg/ellipsis.svg';
import Star from '../../../../assets/svg/star.svg';
import GoldStar from '../../../../assets/svg/gold-star.svg';
import Comment from '../../../../assets/svg/comment.svg';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import {
  fetchSinglePost,
  handleLikePost,
  handleUnlikePost,
  addComment,
} from '../../../requests/post';
import { ActionsModal } from './actions-modal.component';
import { CommentOptionsModal } from './comment-options-modal.component';
import { CommentsModal } from './comments-modal.component';
import { EditPostModal } from './edit-post-modal.component';
import { DeletePostModal } from './delete-post-modal.component';

export const SignalModal = ({ signal, visible, setVisible, navigate }) => {
  const [post, setPost] = useState({});
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
    fetchPost();
  }, [signal]);

  const fetchPost = async () => {
    await fetchSinglePost(token, signal.postId)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.error(err));
  };
  const closeModal = () => {
    setVisible(false);
  };

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
        fetchPost();
        if (res.data.post.postedBy !== _id) {
          socket.emit('like post', { _id, ownerId: res.data.post.postedBy });
        }
        if (res.data.achievement) navigate(res.data.achievement);
      })
      .catch((err) => console.error(err));
  };

  const unlikePost = async (postId) => {
    await handleUnlikePost(token, _id, postId)
      .then((res) => {
        fetchPost();
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
        fetchPost();
        if (res.data.achievement) navigate(res.data.achievement);
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

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            {post !== null && Object.keys(post).length > 0 ? (
              <ScrollView>
                <PostWrapper>
                  <PostHeader>
                    <PostCreator
                      onPress={() => {
                        navigate('UserProfile', { userId: post.postedBy._id });
                        setVisible(false);
                      }}
                    >
                      <PostCreatorImage
                        source={
                          post.postedBy.profileImage
                            ? post.postedBy.profileImage
                            : defaultProfile
                        }
                      />
                      <PostInfo>
                        <Name variant='title'>
                          {post.postedBy.rank} {post.postedBy.name}
                        </Name>
                        <Timestamp variant='body'>
                          {moment(post.createdAt).fromNow()}
                        </Timestamp>
                      </PostInfo>
                    </PostCreator>
                    <PostActions onPress={() => handlePostActions(post)}>
                      <Ellipsis width={24} height={24} />
                    </PostActions>
                  </PostHeader>

                  <PostContentWrapper>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => doubleTap(post)}
                    >
                      <Text variant='body'>{post.text}</Text>
                    </TouchableOpacity>
                    {post.media.length > 1 ? (
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
                        {post.media.map((media, index) => (
                          <TouchableOpacity
                            key={index}
                            activeOpacity={1}
                            onPress={() => doubleTap(post)}
                          >
                            {media.type === 'image' ? (
                              <>
                                <PostImage source={{ uri: media.url }} />
                                <ImageNumber variant='title'>{`${index + 1}/${
                                  post.media.length
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
                                  post.media.length
                                }`}</ImageNumber>
                              </>
                            )}
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    ) : (
                      post.media.length === 1 && (
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => doubleTap(post)}
                        >
                          {post.media[0].type === 'image' ? (
                            <PostImage source={{ uri: post.media[0].url }} />
                          ) : (
                            <PostVideo
                              source={{ uri: post.media[0].url }}
                              shouldPlay={true}
                              isMuted={true}
                              resizeMode='cover'
                              onPlaybackStatusUpdate={
                                handlePlaybackStatusUpdate
                              }
                            />
                          )}
                        </TouchableOpacity>
                      )
                    )}
                  </PostContentWrapper>

                  <PostReactionWrapper>
                    <StarsAndComments>
                      {post.likes.some((like) => like._id === _id) ? (
                        <Stars onPress={() => unlikePost(post._id)}>
                          <GoldStar width={32} height={32} />
                          <StarsNumber variant='body'>
                            {post.likes.length}
                          </StarsNumber>
                        </Stars>
                      ) : (
                        <Stars onPress={() => likePost(post._id)}>
                          <Star width={32} height={32} />
                          <StarsNumber variant='body'>
                            {post.likes.length}
                          </StarsNumber>
                        </Stars>
                      )}
                      <Comments onPress={() => viewComments(post._id)}>
                        <Comment width={32} height={32} />
                        <CommentsNumber variant='body'>
                          {post.comments.length}
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
                        setSelectedPostId(post._id);
                      }}
                    >
                      <Placeholder variant='body'>Add a comment</Placeholder>
                    </CommentBox>
                  </CommentSection>

                  <ActionsModal
                    visible={showActions}
                    setVisible={setShowActions}
                    post={selectedPost}
                    newsFeed={fetchPost}
                    editPost={editPost}
                    deletePost={deletePost}
                  />
                  <EditPostModal
                    visible={editable}
                    setVisible={setEditable}
                    post={selectedPost}
                    newsFeed={fetchPost}
                  />
                  <DeletePostModal
                    visible={deleteable}
                    setVisible={setDeleteable}
                    post={selectedPost}
                    newsFeed={fetchPost}
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
              </ScrollView>
            ) : (
              <>
                <AnimationWrapper>
                  <Animation
                    key='animation'
                    autoPlay
                    loop
                    resizeMode='contain'
                    source={require('../../../../assets/animation/404.json')}
                  />
                </AnimationWrapper>
                <Title variant='title'>
                  Oops! It seems this cosmic post has ventured into the great
                  unknown.
                </Title>
                <Body variant='body'>
                  The celestial explorer who shared it may have removed it from
                  our cosmic feed. Continue your exploration, Commander!
                </Body>
              </>
            )}
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
