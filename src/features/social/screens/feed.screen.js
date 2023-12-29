import { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { CreatePost } from '../components/create-post.component';
import { FeedHeader } from '../components/feed-header.component';
import { AlliesScroll } from '../components/allies-scroll.component';
import { Post } from '../components/post.component';
import { fetchPosts } from '../../../requests/post';

export const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      newsFeed();
    }
  }, [token]);

  const { navigate } = navigation;

  const newsFeed = async () => {
    await fetchPosts(token)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeArea style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <FeedHeader navigate={navigate} />
        <ScrollView>
          <CreatePost newsFeed={newsFeed} />
          {/* <AlliesScroll /> */}
          <Post navigate={navigate} posts={posts} newsFeed={newsFeed} />
        </ScrollView>
      </View>
    </SafeArea>
  );
};
