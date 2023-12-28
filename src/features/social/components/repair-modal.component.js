import { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { SafeArea } from '../../../components/utils/safe-area.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  CreateSection,
  CreatePostWrapper,
  UserImage,
  CreatePostContainer,
  CreatePostBox,
  PostIcons,
  CameraIcon,
  SubmitIcon,
} from '../styles/repair-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import Camera from '../../../../assets/svg/camera.svg';
import Submit from '../../../../assets/svg/submit.svg';
import SubmitDisabled from '../../../../assets/svg/submit-disabled.svg';
import {
  uploadImagesToCloudinary,
  submitPostWithImages,
  submitPost,
} from '../../../requests/post';
import defaultProfile from '../../../../assets/img/defaultProfile.png';

export const RepairModal = ({ visible, setVisible }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { token, _id, profileImage } = useSelector((state) => state.user);

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
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
