import { useState, useEffect } from 'react';
import {
  Modal,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import moment from 'moment';
import { SafeArea } from '../../../components/utils/safe-area.component';
import {
  ModalWrapper,
  ModalView,
  CloseIcon,
  OptionContainer,
  Option,
  GradientBackground,
  OptionText,
  PostWrapper,
  PostHeader,
  PostCreator,
  PostCreatorImage,
  PostInfo,
  Name,
  Timestamp,
  PostContentWrapper,
  CreatePostBox,
  PostImage,
  PostVideo,
  ImageNumber,
  TrashIcon,
  CameraIcon,
} from '../styles/edit-post-modal.styles';
import Close from '../../../../assets/svg/close.svg';
import Trash from '../../../../assets/svg/trash.svg';
import Camera from '../../../../assets/svg/camera.svg';
import SaveWhite from '../../../../assets/svg/save-white.svg';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import { uploadMediaToCloudinary } from '../../../requests/cloudinary';
import { editPostWithMedia, editPost } from '../../../requests/post';

export const EditPostModal = ({
  visible,
  setVisible,
  post,
  newsFeed,
  setShowEditPostToast,
}) => {
  const [displayedMedia, setDisplayedMedia] = useState([]);
  const [removedPublicIds, setRemovedPublicIds] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [postText, setPostText] = useState('');
  const [thumbnails, setThumbnails] = useState([]);

  const MAX_MEDIA = 9 - displayedMedia.length;

  const { token, _id, role } = useSelector((state) => state.user);

  useEffect(() => {
    if (post !== null) {
      setDisplayedMedia(post.media);
    }
  }, [post]);

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
    if (!isLoading) {
      setDisplayedMedia(post.media);
      setSelectedMedia([]);
      setRemovedPublicIds([]);
      setPostText('');
      setVisible(false);
    }
  };

  const deleteMedia = (media) => {
    const updatedMedia = displayedMedia.filter((img) => img !== media);
    setDisplayedMedia(updatedMedia);
    setRemovedPublicIds((prevIds) => [...prevIds, media.public_id]);
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
          alert(
            `Maximum limit of ${
              MAX_MEDIA + displayedMedia.length
            } media files reached`
          );
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

  const saveEdits = async () => {
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
        const { data } = await uploadMediaToCloudinary(token, role, formData);
        await editPostWithMedia(
          token,
          _id,
          role,
          postText,
          data,
          removedPublicIds,
          post._id
        );
      } else {
        await editPost(token, _id, role, postText, removedPublicIds, post._id);
      }
      setIsLoading(false);
      newsFeed();
      setVisible(false);
      setPostText('');
      setSelectedMedia([]);
      setDisplayedMedia([]);
      setRemovedPublicIds([]);
      setShowEditPostToast(true);
      setTimeout(() => {
        setShowEditPostToast(false);
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      console.error('Error in save function:', error);
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
            {post !== null && (
              <ScrollView>
                <PostWrapper>
                  <PostHeader>
                    <PostCreator>
                      <PostCreatorImage
                        source={
                          post.postedBy.profileImage
                            ? post.postedBy.profileImage
                            : defaultProfile
                        }
                      />
                      <PostInfo>
                        <Name variant='title'>
                          {post.postedBy.rank} {post.postedBy.name}
                        </Name>
                        <Timestamp variant='body'>
                          {moment(post.createdAt).fromNow()}
                        </Timestamp>
                      </PostInfo>
                    </PostCreator>
                  </PostHeader>

                  <PostContentWrapper>
                    <CreatePostBox>
                      <TextInput
                        placeholder='Share your cosmic moment...'
                        defaultValue={post.text}
                        onChangeText={(text) => setPostText(text)}
                        multiline={true}
                      />
                    </CreatePostBox>
                    {displayedMedia && displayedMedia.length > 1 ? (
                      <ScrollView
                        scrollEventThrottle={16}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0.8}
                        snapToInterval={350}
                        disableIntervalMomentum={true}
                        disableScrollViewPanResponder={true}
                        snapToAlignment={'center'}
                        horizontal={true}
                      >
                        {displayedMedia.map((media, index) => (
                          <View>
                            <CloseIcon onPress={() => deleteMedia(media)}>
                              <Trash />
                            </CloseIcon>
                            {media.type === 'image' ? (
                              <>
                                <PostImage source={{ uri: media.url }} />
                                <ImageNumber variant='title'>{`${index + 1}/${
                                  displayedMedia.length
                                }`}</ImageNumber>
                              </>
                            ) : (
                              <>
                                <PostVideo
                                  source={{ uri: media.url }}
                                  shouldPlay={true}
                                  isMuted={true}
                                  resizeMode='cover'
                                />
                                <ImageNumber variant='title'>{`${index + 1}/${
                                  displayedMedia.length
                                }`}</ImageNumber>
                              </>
                            )}
                          </View>
                        ))}
                      </ScrollView>
                    ) : (
                      displayedMedia &&
                      displayedMedia.length === 1 && (
                        <View>
                          <CloseIcon
                            onPress={() => deleteMedia(displayedMedia[0])}
                          >
                            <Trash />
                          </CloseIcon>
                          <PostImage source={{ uri: displayedMedia[0].url }} />
                        </View>
                      )
                    )}
                  </PostContentWrapper>
                  {isLoadingMedia ? (
                    <ActivityIndicator size='large' color='#009999' />
                  ) : (
                    <CameraIcon onPress={handleImagePicker}>
                      <Camera width={32} height={32} />
                    </CameraIcon>
                  )}

                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {selectedMedia.map((media, index) =>
                      renderImageItem(media, index)
                    )}
                  </ScrollView>
                  <OptionContainer>
                    <Option onPress={saveEdits}>
                      <GradientBackground>
                        {isLoading ? (
                          <ActivityIndicator size='large' color='#fff' />
                        ) : (
                          <>
                            <SaveWhite height={32} width={32} />
                            <OptionText variant='body'>Save Edits</OptionText>
                          </>
                        )}
                      </GradientBackground>
                    </Option>
                  </OptionContainer>
                </PostWrapper>
              </ScrollView>
            )}
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
