import { Modal } from 'react-native';
import { SafeArea } from '../../../components/utils/safe-area.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  CommentsList,
  Comment,
  GradientBackground,
  CommentText,
} from '../styles/comment-options-modal.styles';
import Close from '../../../../assets/svg/close.svg';

export const CommentOptionsModal = ({
  visible,
  setVisible,
  handleCommentSelect,
  postId,
}) => {
  const comments = [
    'Stellar post! 🌟',
    'Capturing the cosmic beauty! Your photo is breathtaking! 🌌📸',
    'Thanks for sharing your cosmic journey! 🚀',
    'Your cosmic humor is on another orbit! 😄',
    'Astounding visuals! Your photo takes us on a stellar journey! 🚀📷',
    'Out of this world! 🪐',
    'Fascinating insights into the cosmic abyss! 🌌',
    'Space adventures through your lens! Absolutely mesmerizing! 🌠📸',
    'Launching laughter into the cosmos! 🚀😂',
    'Interstellar vibes! 🌠',
    "Jaw-dropping imagery! You've got a real eye for the universe! 👀🌌",
    'Your space adventures are truly inspiring! 🌌',
    'Commander, your knowledge of the cosmos shines bright! 💫',
    'Astronomically awesome content! 🚀',
    'Creating your own celestial masterpiece! Such a talented space explorer! 🎨🌠',
    'Out-of-this-world funny! Space chuckles engaged! 🌠🤣',
    'Exploring the universe with you has been enlightening! 🌌',
    'Epic post, Commander! 🪐',
    'Cosmic creativity at its best! Your photo tells a stellar story! 🚀📷',
    'Your jokes are as infinite as the universe! 😅🚀',
    'Your celestial insights leave me starstruck! 🌟',
    'Thanks for taking us on a cosmic journey! 🚀',
    'Video from the cosmos! Thanks for sharing this interstellar moment! 🌌🎥',
    'Sending laughter to the far reaches of the galaxy! 😄🌌',
    'Mind-blowing space facts! 🪐',
    'Your posts are a meteoric source of inspiration! 💫',
    "Comedy that's light-years ahead! Hilarious post! 🌠😂",
    'Captivating tales from the cosmos! 🌌',
    'Unveiling the wonders of space through your lens! Stellar work! 🌟📸',
    'Your space wisdom is out of this world! 🚀',
    'Cosmic jesters like you brighten up the space-time continuum! 🌟😆',
    'Exploring the galaxies with you is a cosmic delight! 🌠',
    'Interstellar knowledge on full display! 🪐',
    "Laughter echoing through the cosmos! You're a comedic genius! 😂🚀",
    'Commander, your posts illuminate the universe! 💫',
    'Engaging content from a true space pioneer! 🚀',
  ];

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            <CommentsList
              data={comments}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Comment onPress={() => handleCommentSelect(item, postId)}>
                  <GradientBackground>
                    <CommentText variant='title'>{item}</CommentText>
                  </GradientBackground>
                </Comment>
              )}
            />
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
