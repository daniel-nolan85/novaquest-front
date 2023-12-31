import { useState, useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { fetchUsersStars } from '../../../requests/post';
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
import { CommentOptionsModal } from '../components/comment-options-modal.component';
import { CommentsModal } from '../components/comments-modal.component';

export const UserStarsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showCommentList, setShowCommentList] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [postLayouts, setPostLayouts] = useState([]);

  const { navigate } = navigation;
  const { userId, initialIndex } = route.params;

  const scrollViewRef = useRef(null);
  const lastTapTimeRef = useRef(0);
  const postRef = useRef(null);

  const { token, _id, profileImage } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  useEffect(() => {
    handleScrollToPost();
  }, [postLayouts]);

  const fetchPosts = async () => {
    await fetchUsersStars(token, userId)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
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
        fetchPosts();
      })
      .catch((err) => console.error(err));
  };

  const unlikePost = async (postId) => {
    await handleUnlikePost(token, _id, postId)
      .then((res) => {
        fetchPosts();
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
        fetchPosts();
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeArea style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <ScrollView ref={scrollViewRef}>
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
                </PostHeader>

                <PostContentWrapper onPress={() => doubleTap(post)}>
                  <Text variant='body'>{post.text}</Text>
                  {post.images.length > 1 ? (
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
                      {post.images.map((image, index) => (
                        <View key={index}>
                          <PostImage source={{ uri: image.url }} />
                          <ImageNumber variant='title'>{`${index + 1}/${
                            post.images.length
                          }`}</ImageNumber>
                        </View>
                      ))}
                    </ScrollView>
                  ) : (
                    post.images.length === 1 && (
                      <PostImage source={{ uri: post.images[0].url }} />
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
        </ScrollView>
      </View>
    </SafeArea>
  );
};
