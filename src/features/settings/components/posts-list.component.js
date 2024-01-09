import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import {
  PostWrapper,
  PostHeader,
  PostUser,
  PostUserImage,
  PostInfo,
  Title,
  Timestamp,
} from '../styles/post-list.styles';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import { PostModal } from './post-modal.component';

export const PostsList = ({ navigate, posts, setPosts }) => {
  const [currentPost, setCurrentPost] = useState({});
  const [visible, setVisible] = useState(false);

  const renderItem = ({ item }) => (
    <PostWrapper key={item._id}>
      <PostHeader>
        <PostUser onPress={() => showPost(item)}>
          <TouchableOpacity
            onPress={() => navigate('UserProfile', { userId: item.postedBy })}
          >
            <PostUserImage
              source={
                item.postedBy.profileImage
                  ? item.postedBy.profileImage
                  : defaultProfile
              }
            />
          </TouchableOpacity>
          <PostInfo onPress={() => showPost(item)}>
            <Title variant='title'>{item.text}</Title>
          </PostInfo>
        </PostUser>
      </PostHeader>
      <Timestamp variant='body'>{moment(item.createdAt).fromNow()}</Timestamp>
      <PostModal
        post={currentPost}
        visible={visible}
        setVisible={setVisible}
        navigate={navigate}
        setPosts={setPosts}
      />
    </PostWrapper>
  );

  const showPost = (item) => {
    setCurrentPost(item);
    setVisible(true);
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
    />
  );
};
