import { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  CommentsList,
  CommentsWrapper,
  CommentImage,
  Comment,
  NoComments,
} from '../styles/comments-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import { getComments } from '../../../requests/post';
import defaultProfile from '../../../../assets/img/defaultProfile.png';

export const CommentsModal = ({ visible, setVisible, postId, navigate }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (visible) {
      fetchComments();
    }
  }, [visible, token]);

  const { token } = useSelector((state) => state.user);

  const fetchComments = async () => {
    getComments(token, postId)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const closeModal = () => {
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <CommentsWrapper
      onPress={() => {
        navigate('UserProfile', { userId: item.postedBy._id });
        setVisible(false);
      }}
    >
      <CommentImage
        source={
          item.postedBy.profileImage
            ? item.postedBy.profileImage
            : defaultProfile
        }
        resizeMode='contain'
      />
      <Comment variant='body' numberOfLines={2}>
        {item.text}
      </Comment>
    </CommentsWrapper>
  );

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            {comments.length ? (
              <CommentsList
                data={comments}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <NoComments variant='title'>
                No one has commented on this post yet
              </NoComments>
            )}
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
