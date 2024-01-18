import { useState } from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { SafeArea } from '../../../components/utils/safe-area.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  IconsContainer,
  IconWrapper,
} from '../styles/update-photo-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import CameraSquare from '../../../../assets/svg/camera-square.svg';
import Gallery from '../../../../assets/svg/gallery.svg';
import Trash from '../../../../assets/svg/trash.svg';

export const UpdatePhotoModal = ({
  showUpdatePhoto,
  setShowUpdatePhoto,
  newProfileImage,
  setNewProfileImage,
  setImageIsLoading,
}) => {
  const closeModal = () => {
    setShowUpdatePhoto(false);
  };

  const uploadLiveImage = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      setTimeout(() => {
        setImageIsLoading(true);
      }, 500);
      const result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        await saveImage(result.assets[0].uri).then((res) => {
          setImageIsLoading(false);
        });
      }
    } catch ({ message }) {
      console.error(message);
      alert(`Error uploading image: ${message}`);
      setShowUpdatePhoto(false);
      setImageIsLoading(false);
    }
  };

  const uploadGalleryImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      setTimeout(() => {
        setImageIsLoading(true);
      }, 500);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        await saveImage(result.assets[0].uri).then((res) => {
          setImageIsLoading(false);
        });
      }
    } catch ({ message }) {
      console.error(message);
      alert(`Error uploading image: ${message}`);
      setShowUpdatePhoto(false);
      setImageIsLoading(false);
    }
  };

  // const removeImage = async () => {
  //   try {
  //     saveImage(null);
  //   } catch ({ message }) {
  //     console.error(message);
  //     alert(`Error removing image: ${message}`);
  //     setShowUpdatePhoto(false);
  //   }
  // };

  const saveImage = async (image) => {
    try {
      setNewProfileImage(image);
      setShowUpdatePhoto(false);
    } catch ({ message }) {
      console.error(message);
      alert(`Error saving image: ${message}`);
      setShowUpdatePhoto(false);
    }
  };

  return (
    <SafeArea>
      <Modal visible={showUpdatePhoto} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            <IconsContainer>
              <IconWrapper onPress={uploadLiveImage}>
                <CameraSquare width={48} height={48} />
              </IconWrapper>
              <IconWrapper onPress={uploadGalleryImage}>
                <Gallery width={48} height={48} />
              </IconWrapper>
              {/* <IconWrapper onPress={removeImage}>
                <Trash width={48} height={48} />
              </IconWrapper> */}
            </IconsContainer>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
