import { useState } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
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

export const DeletePostModal = ({ visible, setVisible, post, newsFeed }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { token, _id } = useSelector((state) => state.user);

  const closeModal = () => {
    if (!isLoading) {
      setVisible(false);
    }
  };

  const handleDeletePost = async () => {
    setIsLoading(true);
    await deletePost(token, _id, post._id)
      .then((res) => {
        newsFeed();
        Toast.show({
          type: 'success',
          text1: 'Your cosmic moment has been cleared from the stars.',
          text2:
            'Feel free to share more celestial moments on your space journey!',
          style: {
            width: '100%',
          },
        });
        setIsLoading(true);
        setVisible(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error in save function:', error);
      });
  };

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={() => setVisible(false)}>
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
