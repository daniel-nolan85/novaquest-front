import { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { CreatePost } from '../components/create-post.component';
import { FeedHeader } from '../components/feed-header.component';
import { AlliesScroll } from '../components/allies-scroll.component';
import { Post } from '../components/post.component';
import { fetchPosts } from '../../../requests/post';

export const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { token, _id, allies } = useSelector((state) => state.user);

  useFocusEffect(
    useCallback(() => {
      newsFeed();
    }, [])
  );

  const { navigate } = navigation;

  const newsFeed = async () => {
    await fetchPosts(token, _id)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeArea style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <FeedHeader navigate={navigate} setPosts={setPosts} />
        <ScrollView>
          <CreatePost newsFeed={newsFeed} />
          {allies.length > 0 && <AlliesScroll navigate={navigate} />}
          <Post navigate={navigate} posts={posts} newsFeed={newsFeed} />
        </ScrollView>
      </View>
    </SafeArea>
  );
};
