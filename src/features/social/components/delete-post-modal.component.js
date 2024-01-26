import { useState } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  AnimationWrapper,
  Animation,
  Title,
  OptionContainer,
  Option,
  CancelGradientBackground,
  OptionText,
} from '../styles/delete-post-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import TrashWhite from '../../../../assets/svg/trash-white';
import { deletePost } from '../../../requests/post';

export const DeletePostModal = ({
  visible,
  setVisible,
  post,
  setPosts,
  hidePostModal,
  setShowDeletePostToast,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { token, _id, role } = useSelector((state) => state.user);

  const closeModal = () => {
    if (!isLoading) {
      setVisible(false);
    }
  };

  const handleDeletePost = async () => {
    setIsLoading(true);
    await deletePost(token, _id, role, post._id)
      .then((res) => {
        setPosts((prevPosts) =>
          prevPosts.filter((prevPost) => prevPost._id !== post._id)
        );
        setShowDeletePostToast && setShowDeletePostToast(true);
        setShowDeletePostToast &&
          setTimeout(() => {
            setShowDeletePostToast(false);
          }, 3000);
        setIsLoading(false);
        setVisible(false);
        hidePostModal && hidePostModal();
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error in delete function:', error);
      });
  };

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            <AnimationWrapper>
              <Animation
                key='animation'
                autoPlay
                loop
                resizeMode='contain'
                source={require('../../../../assets/animation/delete.json')}
              />
            </AnimationWrapper>
            <Title variant='title'>
              Are you sure you want to delete this post?
            </Title>
            <Text variant='body'>
              This action is irreversible, and your cosmic creation will be lost
              in the vastness of space. Confirm your decision wisely.
            </Text>
            <OptionContainer>
              <Option onPress={handleDeletePost}>
                <CancelGradientBackground>
                  {isLoading ? (
                    <ActivityIndicator size='large' color='#fff' />
                  ) : (
                    <>
                      <TrashWhite height={32} width={32} />
                      <OptionText variant='body'>Delete Post</OptionText>
                    </>
                  )}
                </CancelGradientBackground>
              </Option>
            </OptionContainer>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
