import { useState } from 'react';
import { Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from '../../../components/typography/text.component';
import { SafeArea } from '../../../components/utils/safe-area.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  ProfileCardWrapper,
  ProfileImageWrapper,
  CameraIcon,
  ProfileImage,
  ProfileInfoWrapper,
  Input,
  BioWrapper,
  SaveIcon,
} from '../styles/repair-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import Camera from '../../../../assets/svg/camera.svg';
import Save from '../../../../assets/svg/save.svg';
import { UpdatePhotoModal } from './update-photo-modal.component';
import { updateProfileWithImage, updateProfile } from '../../../requests/user';
import { uploadImagesToCloudinary } from '../../../requests/cloudinary';

export const RepairModal = ({ visible, setVisible }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [showUpdatePhoto, setShowUpdatePhoto] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState('');
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const closeModal = () => {
    setVisible(false);
    setNewName('');
    setNewBio('');
  };

  const updatePhoto = () => {
    setShowUpdatePhoto(true);
  };

  const save = async () => {
    setIsLoading(true);
    try {
      if (newProfileImage) {
        const formData = new FormData();
        formData.append('image', {
          uri: newProfileImage,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
        const { data } = await uploadImagesToCloudinary(user.token, formData);
        await updateProfileWithImage(
          user.token,
          user._id,
          newName,
          newBio,
          data
        ).then((res) => {
          setIsLoading(false);
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              name: res.data.name,
              bio: res.data.bio,
              profileImage: res.data.profileImage,
            },
          });
          closeModal();
        });
      } else {
        await updateProfile(user.token, user._id, newName, newBio).then(
          (res) => {
            setIsLoading(false);
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                ...user,
                name: res.data.name,
                bio: res.data.bio,
              },
            });
            closeModal();
          }
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error in save function:', error);
      closeModal();
    }
  };

  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <CloseIcon onPress={closeModal}>
              <Close />
            </CloseIcon>
            <ProfileCardWrapper>
              <ProfileImageWrapper>
                {!newProfileImage ? (
                  <CameraIcon onPress={updatePhoto}>
                    <Camera />
                  </CameraIcon>
                ) : imageIsLoading ? (
                  <ActivityIndicator size='large' color='#009999' />
                ) : (
                  <TouchableOpacity onPress={updatePhoto}>
                    <ProfileImage
                      source={{ uri: newProfileImage }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                )}
              </ProfileImageWrapper>

              <ProfileInfoWrapper>
                <Input
                  label={<Text variant='body'>Name</Text>}
                  defaultValue={user.name}
                  onChangeText={(text) => setNewName(text)}
                />
                <BioWrapper>
                  <Input
                    label={<Text variant='body'>Bio</Text>}
                    defaultValue={user.bio}
                    onChangeText={(text) => setNewBio(text)}
                    multiline
                  />
                </BioWrapper>
              </ProfileInfoWrapper>
              {isLoading ? (
                <ActivityIndicator size='large' color='#009999' />
              ) : (
                <SaveIcon onPress={save}>
                  <Save width={48} height={48} />
                </SaveIcon>
              )}
            </ProfileCardWrapper>
            <UpdatePhotoModal
              showUpdatePhoto={showUpdatePhoto}
              setShowUpdatePhoto={setShowUpdatePhoto}
              newProfileImage={newProfileImage}
              setNewProfileImage={setNewProfileImage}
              setImageIsLoading={setImageIsLoading}
            />
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
