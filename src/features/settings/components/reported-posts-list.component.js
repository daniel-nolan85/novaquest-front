import { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import moment from 'moment';
import {
  RPWrapper,
  RPHeader,
  RPUser,
  RPUserImage,
  RPInfo,
  Title,
  Timestamp,
} from '../styles/reported-posts-list.styles';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import { PostModal } from './post-modal.component';
import { fetchReportedPosts } from '../../../requests/admin';

export const ReportedPostsList = ({ navigate, posts, setReportedPosts }) => {
  const [currentPost, setCurrentPost] = useState({});
  const [visible, setVisible] = useState(false);

  const renderItem = ({ item }) => (
    <RPWrapper key={item._id}>
      <RPHeader>
        <RPUser onPress={() => showRP(item)}>
          <TouchableOpacity
            onPress={() => navigate('UserProfile', { userId: item.postedBy })}
          >
            <RPUserImage
              source={
                item.postedBy.profileImage
                  ? item.postedBy.profileImage
                  : defaultProfile
              }
            />
          </TouchableOpacity>
          <RPInfo onPress={() => showRP(item)}>
            <Title variant='title'>{item.text}</Title>
          </RPInfo>
        </RPUser>
      </RPHeader>
      <Timestamp variant='body'>{moment(item.createdAt).fromNow()}</Timestamp>
      <PostModal
        post={currentPost}
        visible={visible}
        setVisible={setVisible}
        navigate={navigate}
        setPosts={setReportedPosts}
      />
    </RPWrapper>
  );

  const showRP = (item) => {
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
