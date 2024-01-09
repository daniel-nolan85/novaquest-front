import { useState } from 'react';
import { Modal, ScrollView, View } from 'react-native';
import moment from 'moment';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  PostWrapper,
  PostHeader,
  PostCreator,
  PostCreatorImage,
  PostInfo,
  Name,
  Timestamp,
  TrashIcon,
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
} from '../styles/post-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import Trash from '../../../../assets/svg/trash.svg';
import Star from '../../../../assets/svg/star.svg';
import GoldStar from '../../../../assets/svg/gold-star.svg';
import Comment from '../../../../assets/svg/comment.svg';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import { CommentsModal } from '../../social/components/comments-modal.component';
import { DeletePostModal } from '../../social/components/delete-post-modal.component';

export const PostModal = ({
  post,
  visible,
  setVisible,
  navigate,
  setPosts,
}) => {
  const [deleteable, setDeleteable] = useState(false);
  const [showComments, setShowComments] = useState(false);

  console.log({ post });

  const closeModal = () => {
    setVisible(false);
  };

  const deletePost = () => {
    setDeleteable(true);
  };

  const viewComments = (postId) => {
    setShowComments(true);
  };

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            {Object.keys(post).length > 0 && (
              <PostWrapper>
                <PostHeader>
                  <PostCreator
                    onPress={() => {
                      closeModal();
                      navigate('UserProfile', { userId: post.postedBy._id });
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
                  <TrashIcon onPress={() => deletePost(post)}>
                    <Trash width={32} height={32} />
                  </TrashIcon>
                </PostHeader>

                <PostContentWrapper>
                  <Text variant='body'>{post.text}</Text>
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
                        <>
                          {media.type === 'image' ? (
                            <View>
                              <PostImage source={{ uri: media.url }} />
                              <ImageNumber variant='title'>{`${index + 1}/${
                                post.media.length
                              }`}</ImageNumber>
                            </View>
                          ) : (
                            <View>
                              <PostVideo
                                source={{ uri: media.url }}
                                shouldPlay={true}
                                isMuted={true}
                                resizeMode='cover'
                                useNativeControls
                              />
                              <ImageNumber variant='title'>{`${index + 1}/${
                                post.media.length
                              }`}</ImageNumber>
                            </View>
                          )}
                        </>
                      ))}
                    </ScrollView>
                  ) : (
                    post.media.length === 1 && (
                      <View>
                        {post.media[0].type === 'image' ? (
                          <PostImage source={{ uri: post.media[0].url }} />
                        ) : (
                          <PostVideo
                            source={{ uri: post.media[0].url }}
                            shouldPlay={true}
                            isMuted={true}
                            resizeMode='cover'
                            useNativeControls
                          />
                        )}
                      </View>
                    )
                  )}
                </PostContentWrapper>

                <PostReactionWrapper>
                  <StarsAndComments>
                    <Stars>
                      {post.likes.length > 0 ? (
                        <GoldStar width={32} height={32} />
                      ) : (
                        <Star width={32} height={32} />
                      )}
                      <StarsNumber variant='body'>
                        {post.likes.length}
                      </StarsNumber>
                    </Stars>
                    <Comments onPress={() => viewComments(post._id)}>
                      <Comment width={32} height={32} />
                      <CommentsNumber variant='body'>
                        {post.comments.length}
                      </CommentsNumber>
                    </Comments>
                  </StarsAndComments>
                </PostReactionWrapper>

                <DeletePostModal
                  visible={deleteable}
                  setVisible={setDeleteable}
                  post={post}
                  setPosts={setPosts}
                  hidePostModal={closeModal}
                />
                <CommentsModal
                  visible={showComments}
                  setVisible={setShowComments}
                  postId={post._id}
                  navigate={navigate}
                  hidePostModal={closeModal}
                />
              </PostWrapper>
            )}
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
