import { useContext } from 'react';
import { Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
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
import FlagWhite from '../../../../assets/svg/flag-white.svg';
import BlockWhite from '../../../../assets/svg/block-white.svg';
import { blockMember } from '../../../requests/user';
import { reportContent } from '../../../requests/post';
import { ToastContext } from '../../../services/toast/toast.context';
import { SocialContext } from '../../../services/social/social.context';

export const ActionsModal = ({
  visible,
  setVisible,
  post,
  editPost,
  deletePost,
  setShowReportPostToast,
  setShowBlockUserToast,
}) => {
  const { user } = useSelector((state) => ({ ...state }));

  const { setBlockUserBody } = useContext(ToastContext);
  const { setPosts } = useContext(SocialContext);

  const closeModal = () => {
    setVisible(false);
  };

  const reportPost = async (postId) => {
    await reportContent(user.token, user.role, postId)
      .then((res) => {
        setShowReportPostToast(true);
        setTimeout(() => {
          setShowReportPostToast(false);
        }, 3000);
        setVisible(false);
      })
      .catch((err) => console.error(err));
  };

  const blockUser = async (u) => {
    await blockMember(user.token, user._id, user.role, u._id)
      .then((res) => {
        setBlockUserBody(
          `You've successfully blocked posts from ${u.rank} ${u.name}.`
        );
        setShowBlockUserToast(true);
        setTimeout(() => {
          setShowBlockUserToast(false);
        }, 3000);
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.postedBy._id !== u._id)
        );
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
                <Option onPress={() => editPost(post)}>
                  <GradientBackground>
                    <EditWhite height={32} width={32} />
                    <OptionText variant='body'>Edit</OptionText>
                  </GradientBackground>
                </Option>
                <Option onPress={() => deletePost(post)}>
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
                      reportPost(post._id);
                    }}
                  >
                    <CancelGradientBackground>
                      <FlagWhite height={32} width={32} />
                      <OptionText variant='body'>Report post?</OptionText>
                    </CancelGradientBackground>
                  </Option>
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
