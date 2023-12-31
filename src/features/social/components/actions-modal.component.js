import { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  OptionContainer,
  Option,
  GradientBackground,
  CancelGradientBackground,
  OptionText,
} from '../styles/actions-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import EditWhite from '../../../../assets/svg/edit-white.svg';
import TrashWhite from '../../../../assets/svg/trash-white.svg';
import BlockWhite from '../../../../assets/svg/block-white.svg';
import { blockMember } from '../../../requests/user';

export const ActionsModal = ({ visible, setVisible, post, newsFeed }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const closeModal = () => {
    setVisible(false);
  };

  const editPost = (post) => {
    console.log('edit => ', post._id);
  };

  const deletePost = (post) => {
    console.log('delete => ', post._id);
  };

  const blockUser = async (u) => {
    await blockMember(user.token, user._id, u._id)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            blockeds: res.data.blockeds,
          },
        });
        Toast.show({
          type: 'success',
          text1: `Your cosmic journey just got more tailored.`,
          text2: `You've successfully blocked posts from ${u.rank} ${u.name}.`,
          style: {
            width: '100%',
          },
        });
        newsFeed();
        setVisible(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            {post !== null && post.postedBy._id === user._id ? (
              <OptionContainer>
                <Option
                  onPress={() => {
                    editPost(post);
                  }}
                >
                  <GradientBackground>
                    <EditWhite height={32} width={32} />
                    <OptionText variant='body'>Edit</OptionText>
                  </GradientBackground>
                </Option>
                <Option
                  onPress={() => {
                    deletePost(post);
                  }}
                >
                  <CancelGradientBackground>
                    <TrashWhite height={32} width={32} />
                    <OptionText variant='body'>Delete</OptionText>
                  </CancelGradientBackground>
                </Option>
              </OptionContainer>
            ) : (
              post !== null &&
              post.postedBy._id !== user._id && (
                <OptionContainer>
                  <Option
                    onPress={() => {
                      blockUser(post.postedBy);
                    }}
                  >
                    <CancelGradientBackground>
                      <BlockWhite height={32} width={32} />
                      <OptionText variant='body'>
                        Block {post.postedBy.name}'s posts?
                      </OptionText>
                    </CancelGradientBackground>
                  </Option>
                </OptionContainer>
              )
            )}
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
