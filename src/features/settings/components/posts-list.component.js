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
import { fetchAllPosts } from '../../../requests/admin';

export const PostsList = ({ navigate, posts, setPosts }) => {
  const [currentPost, setCurrentPost] = useState({});
  const [visible, setVisible] = useState(false);

  const getPosts = async () => {
    await fetchAllPosts(token)
      .then((res) => {
        console.log('posts => ', res.data);
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  };

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
        newsFeed={getPosts}
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
