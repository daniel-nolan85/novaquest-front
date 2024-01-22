import { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { fetchUsersPosts } from '../../../requests/post';
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
import { ActionsModal } from '../components/actions-modal.component';
import { CommentOptionsModal } from '../components/comment-options-modal.component';
import { CommentsModal } from '../components/comments-modal.component';
import { EditPostModal } from '../components/edit-post-modal.component';
import { DeletePostModal } from '../components/delete-post-modal.component';

const PAGE_SIZE = 20;

export const UserPostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showCommentList, setShowCommentList] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [postLayouts, setPostLayouts] = useState([]);
  const [showActions, setShowActions] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editable, setEditable] = useState(false);
  const [deleteable, setDeleteable] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [shouldTriggerScroll, setShouldTriggerScroll] = useState(true);

  const { navigate } = navigation;
  const { userId, initialIndex } = route.params;

  const scrollViewRef = useRef(null);
  const lastTapTimeRef = useRef(0);
  const postRef = useRef(null);

  const { token, _id, role, profileImage } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  useEffect(() => {
    if (shouldTriggerScroll) {
      handleScrollToPost();
    }
  }, [postLayouts]);

  const fetchPosts = async () => {
    try {
      const res = await fetchUsersPosts(
        token,
        userId,
        role,
        page,
        PAGE_SIZE,
        initialIndex
      );
      const newPosts = res.data;

      setPosts((prevPosts) => {
        // Ensure there are no duplicate posts
        const filteredPosts = prevPosts.filter(
          (prevPost) =>
            !newPosts.find((newPost) => newPost._id === prevPost._id)
        );

        return [...filteredPosts, ...newPosts];
      });
    } catch (err) {
      console.error('Error fetching posts:', err.message);
    }
  };

  const loadMorePosts = async () => {
    setShouldTriggerScroll(false);
    if (loading || allPostsLoaded) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetchUsersPosts(
        token,
        userId,
        role,
        page + 1,
        PAGE_SIZE,
        initialIndex
      );
      if (res.data && Array.isArray(res.data)) {
        if (res.data.length === 0) {
          setAllPostsLoaded(true);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...res.data]);
          setPage((prevPage) => prevPage + 1);
        }
      } else {
        console.error('Invalid response format:', res);
      }
    } catch (error) {
      console.error('Error fetching more posts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      loadMorePosts();
    }
  };

  const handleLayout = (event, index) => {
    const layout = { ...event.nativeEvent.layout, index };
    setPostLayouts((prevLayouts) => [...prevLayouts, layout]);
  };

  const handleScrollToPost = () => {
    if (
      scrollViewRef.current &&
      initialIndex !== undefined &&
      initialIndex > 0 &&
      postLayouts.length > 0
    ) {
      const sortedLayouts = [...postLayouts].sort((a, b) => a.y - b.y);
      const sortedIndex = sortedLayouts.findIndex(
        (layout) => layout.index === initialIndex
      );

      if (sortedIndex !== -1) {
        const totalHeight = sortedLayouts
          .slice(0, sortedIndex)
          .reduce((acc, layout) => acc + layout.height + 16, 0);

        scrollViewRef.current.scrollTo({
          y: totalHeight,
          animated: false,
        });
      }
    }
  };

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
    try {
      await handleLikePost(token, _id, role, postId).then((res) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? { ...post, likes: [...post.likes, { _id }] }
              : post
          )
        );
        if (res.data.post.postedBy !== _id) {
          socket.emit('like post', { _id, ownerId: res.data.post.postedBy });
        }
        if (res.data.achievement) navigate(res.data.achievement);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const unlikePost = async (postId) => {
    try {
      await handleUnlikePost(token, _id, role, postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          likes: post.likes.filter((like) => like._id !== _id),
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const viewComments = (postId) => {
    setSelectedPostId(postId);
    setShowComments(true);
  };

  const handleCommentSelect = (item, postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? { ...post, comments: [...post.comments, item] }
          : post
      )
    );
    addComment(token, _id, role, postId, item)
      .then((res) => {
        setShowCommentList(false);
        if (res.data.achievement) navigate(res.data.achievement);
      })
      .catch((err) => {
        console.error('Error adding comment:', err);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? { ...post, comments: post.comments.slice(0, -1) }
              : post
          )
        );
      });
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
    <SafeArea style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {postLayouts &&
            posts.map((post, index) => (
              <PostWrapper
                key={post._id}
                ref={postRef}
                onLayout={(event) => handleLayout(event, index)}
              >
                <PostHeader>
                  <PostCreator
                    onPress={() =>
                      navigate('ProfileScreen', { userId: post.postedBy._id })
                    }
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
                                style={{ width: 350, height: 350 }}
                                useNativeControls
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
                            style={{ width: '100%', height: 300 }}
                            useNativeControls
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
                  newsFeed={fetchPosts}
                  editPost={editPost}
                  deletePost={deletePost}
                />
                <EditPostModal
                  visible={editable}
                  setVisible={setEditable}
                  post={selectedPost}
                  newsFeed={fetchPosts}
                />
                <DeletePostModal
                  visible={deleteable}
                  setVisible={setDeleteable}
                  post={selectedPost}
                  setPosts={setPosts}
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
            ))}
          {loading && !allPostsLoaded && (
            <ActivityIndicator size='large' color='#009999' />
          )}
        </ScrollView>
      </View>
    </SafeArea>
  );
};
