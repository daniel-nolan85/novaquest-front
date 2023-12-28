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
} from '../styles/create-post-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import Camera from '../../../../assets/svg/camera.svg';
import Submit from '../../../../assets/svg/submit.svg';
import SubmitDisabled from '../../../../assets/svg/submit-disabled.svg';
import { uploadImagesToCloudinary } from '../../../requests/cloudinary';
import { submitPostWithImages, submitPost } from '../../../requests/post';
import defaultProfile from '../../../../assets/img/defaultProfile.png';

const MAX_IMAGES = 9;

export const CreatePostModal = ({ visible, setVisible, newsFeed }) => {
  const [postText, setPostText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);

  const { token, _id, profileImage } = useSelector((state) => state.user);

  useEffect(() => {
    setDisabled(postText.trim() === '');
  }, [postText]);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const closeModal = () => {
    setVisible(false);
    setPostText('');
    setSelectedImages([]);
  };

  const handleImagePicker = async () => {
    setTimeout(() => {
      setIsLoadingImages(true);
    }, 500);
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    }).then((res) => {
      if (!res.canceled) {
        if (selectedImages.length + res.assets.length > MAX_IMAGES) {
          alert(`Maximum limit of ${MAX_IMAGES} images reached`);
          setIsLoadingImages(false);
          return;
        }
        setSelectedImages(res.assets.map((image) => ({ uri: image.uri })));
        setIsLoadingImages(false);
      } else {
        setIsLoadingImages(false);
      }
    });
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const renderImageItem = (image, index) => (
    <View key={index} style={{ position: 'relative' }}>
      <Image
        source={{ uri: image.uri }}
        style={{ width: 100, height: 100, margin: 5 }}
      />
      <CloseIcon onPress={() => removeImage(index)}>
        <Close />
      </CloseIcon>
    </View>
  );

  const submit = async () => {
    setIsLoading(true);
    try {
      if (selectedImages.length > 0) {
        const formData = new FormData();
        selectedImages.forEach((image, index) => {
          formData.append(`image-${index}`, {
            uri: image.uri,
            type: 'image/jpeg',
            name: `image-${index}.jpg`,
          });
        });
        const { data } = await uploadImagesToCloudinary(token, formData);
        await submitPostWithImages(token, _id, postText, data);
      } else {
        await submitPost(token, _id, postText);
      }
      setIsLoading(false);
      newsFeed();
      setVisible(false);
      setPostText('');
      setSelectedImages([]);
      Toast.show({
        type: 'success',
        text1: 'Your cosmic moment is now part of the celestial journey.',
        text2: 'Keep exploring and sharing the wonders of the universe!',
        style: {
          width: '100%',
        },
      });
    } catch (error) {
      setIsLoading(false);
      console.error('Error in submit function:', error);
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
            <CreateSection>
              <CreatePostWrapper>
                <UserImage
                  source={profileImage ? profileImage : defaultProfile}
                  resizeMode='contain'
                />
                <CreatePostContainer>
                  <CreatePostBox>
                    <TextInput
                      placeholder='Share your cosmic moment...'
                      autoFocus
                      value={postText}
                      onChangeText={(text) => setPostText(text)}
                      multiline={true}
                    />
                  </CreatePostBox>

                  <PostIcons>
                    {isLoadingImages ? (
                      <ActivityIndicator size='large' color='#009999' />
                    ) : (
                      <CameraIcon onPress={handleImagePicker}>
                        <Camera width={32} height={32} />
                      </CameraIcon>
                    )}
                    {disabled ? (
                      <SubmitDisabled width={32} height={32} />
                    ) : isLoading ? (
                      <ActivityIndicator size='large' color='#009999' />
                    ) : (
                      <SubmitIcon onPress={submit}>
                        <Submit width={32} height={32} />
                      </SubmitIcon>
                    )}
                  </PostIcons>
                </CreatePostContainer>
              </CreatePostWrapper>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedImages.map((image, index) =>
                  renderImageItem(image, index)
                )}
              </ScrollView>
            </CreateSection>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
