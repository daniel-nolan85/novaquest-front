import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CreateSection,
  UserImage,
  CreateBox,
} from '../styles/create-post.styles';
import { Text } from '../../../components/typography/text.component';
import { CreatePostModal } from './create-post-modal.component';
import defaultProfile from '../../../../assets/img/defaultProfile.png';

export const CreatePost = ({ newsFeed }) => {
  const [visible, setVisible] = useState(false);

  const { profileImage } = useSelector((state) => state.user);

  return (
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
        newsFeed={newsFeed}
      />
    </CreateSection>
  );
};
