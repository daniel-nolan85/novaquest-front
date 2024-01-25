import { useState } from 'react';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Audio } from 'expo-av';
import {
  CreateSection,
  UserImage,
  CreateBox,
} from '../styles/create-post.styles';
import { Text } from '../../../components/typography/text.component';
import { CreatePostModal } from './create-post-modal.component';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import { uploadMediaToCloudinary } from '../../../requests/cloudinary';
import { submitPostWithMedia, submitPost } from '../../../requests/post';
import { AnimatedProgressBar } from '../../../components/animations/progress-bar.animation';

export const CreatePost = ({ newsFeed, navigate }) => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [postText, setPostText] = useState('');

  const { token, _id, role, profileImage, soundEffects } = useSelector(
    (state) => state.user
  );

  const playPostSound = async () => {
    try {
      if (soundEffects) {
        const { sound } = await Audio.Sound.createAsync(
          require('../../../../assets/sounds/post.wav')
        );
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const submit = async () => {
    setIsLoading(true);
    setVisible(false);
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
        const { data } = await uploadMediaToCloudinary(formData);
        console.log({ data });
        await submitPostWithMedia(token, _id, role, postText, data)
          .then((res) => {
            if (res.data) navigate(res.data);
          })
          .catch((err) => console.error(err));
      } else {
        await submitPost(token, _id, role, postText)
          .then((res) => {
            if (res.data) navigate(res.data);
          })
          .catch((err) => console.error(err));
      }
      setIsLoading(false);
      newsFeed();
      setPostText('');
      setSelectedMedia([]);
      playPostSound();
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
    <>
      <CreateSection>
        <UserImage
          source={profileImage ? profileImage : defaultProfile}
          resizeMode='contain'
        />
        <CreateBox onPress={() => setVisible(true)}>
          <Text variant='body'>Share your cosmic moment...</Text>
        </CreateBox>
        <CreatePostModal
          visible={visible}
          setVisible={setVisible}
          selectedMedia={selectedMedia}
          setSelectedMedia={setSelectedMedia}
          submit={submit}
          postText={postText}
          setPostText={setPostText}
        />
      </CreateSection>
      <AnimatedProgressBar isLoading={isLoading} />
    </>
  );
};
