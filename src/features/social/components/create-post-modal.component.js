import { useEffect, useState } from 'react';
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
import * as VideoThumbnails from 'expo-video-thumbnails';
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
  TrashIcon,
  CameraIcon,
  SubmitIcon,
} from '../styles/create-post-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import Trash from '../../../../assets/svg/trash.svg';
import Camera from '../../../../assets/svg/camera.svg';
import Submit from '../../../../assets/svg/submit.svg';
import SubmitDisabled from '../../../../assets/svg/submit-disabled.svg';
import { uploadMediaToCloudinary } from '../../../requests/cloudinary';
import { submitPostWithMedia, submitPost } from '../../../requests/post';
import defaultProfile from '../../../../assets/img/defaultProfile.png';

const MAX_MEDIA = 9;

export const CreatePostModal = ({ visible, setVisible, newsFeed }) => {
  const [postText, setPostText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

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

  useEffect(() => {
    const generateThumbnails = async () => {
      const thumbnailsArray = [];
      for (const media of selectedMedia) {
        const fileType = media.uri.split('.').pop();
        if (['mp4', 'mov', 'avi'].includes(fileType.toLowerCase())) {
          try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(media.uri);
            thumbnailsArray.push(uri);
          } catch (e) {
            console.warn(e);
            thumbnailsArray.push(null);
          }
        } else {
          thumbnailsArray.push(null);
        }
      }
      setThumbnails(thumbnailsArray);
    };

    generateThumbnails();
  }, [selectedMedia]);

  const closeModal = () => {
    setVisible(false);
    setPostText('');
    setSelectedMedia([]);
  };

  const handleImagePicker = async () => {
    setTimeout(() => {
      setIsLoadingMedia(true);
    }, 500);
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
    }).then((res) => {
      if (!res.canceled) {
        if (selectedMedia.length + res.assets.length > MAX_MEDIA) {
          alert(`Maximum limit of ${MAX_MEDIA} media files reached`);
          setIsLoadingMedia(false);
          return;
        }
        setSelectedMedia(res.assets.map((image) => ({ uri: image.uri })));
        setIsLoadingMedia(false);
      } else {
        setIsLoadingMedia(false);
      }
    });
  };

  const removeImage = (index) => {
    const updatedMedia = [...selectedMedia];
    updatedMedia.splice(index, 1);
    setSelectedMedia(updatedMedia);
  };

  const renderImageItem = (media, index) => {
    return (
      <View key={index} style={{ position: 'relative' }}>
        <Image
          source={{ uri: thumbnails[index] || media.uri }}
          style={{ width: 100, height: 100, margin: 5 }}
        />
        <TrashIcon onPress={() => removeImage(index)}>
          <Trash height={24} width={24} />
        </TrashIcon>
      </View>
    );
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      if (selectedMedia.length > 0) {
        const formData = new FormData();
        selectedMedia.forEach((media, index) => {
          const fileType = media.uri.split('.').pop();
          if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType.toLowerCase())) {
            formData.append(`media-${index}`, {
              uri: media.uri,
              type: 'image/jpeg',
              name: `image-${index}.jpg`,
            });
          } else if (['mp4', 'mov', 'avi'].includes(fileType.toLowerCase())) {
            formData.append(`media-${index}`, {
              uri: media.uri,
              type: 'video/mp4',
              name: `video-${index}.mp4`,
            });
          }
        });
        const { data } = await uploadMediaToCloudinary(token, formData);
        await submitPostWithMedia(token, _id, postText, data);
      } else {
        await submitPost(token, _id, postText);
      }
      setIsLoading(false);
      newsFeed();
      setVisible(false);
      setPostText('');
      setSelectedMedia([]);
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
                    {isLoadingMedia ? (
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
                {selectedMedia.map((media, index) =>
                  renderImageItem(media, index)
                )}
              </ScrollView>
            </CreateSection>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
