import { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { CreatePost } from '../components/create-post.component';
import { FeedHeader } from '../components/feed-header.component';
import { AlliesScroll } from '../components/allies-scroll.component';
import { Post } from '../components/post.component';
import { fetchPosts } from '../../../requests/post';

const PAGE_SIZE = 10;

export const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);

  const { token, _id, allies } = useSelector((state) => state.user);

  useFocusEffect(
    useCallback(() => {
      newsFeed();
    }, [])
  );

  const { navigate } = navigation;

  const newsFeed = async () => {
    try {
      const res = await fetchPosts(token, _id, page, PAGE_SIZE);
      const newPosts = res.data;

      setPosts((prevPosts) => {
        const filteredPosts = prevPosts.filter(
          (prevPost) =>
            !newPosts.find((newPost) => newPost._id === prevPost._id)
        );

        return [...newPosts, ...filteredPosts];
      });
    } catch (err) {
      console.error('Error fetching posts:', err.message);
    }
  };

  const loadMorePosts = async () => {
    if (loading || allPostsLoaded) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetchPosts(token, _id, page + 1, PAGE_SIZE);
      if (res.data.length === 0) {
        setAllPostsLoaded(true);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching more posts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeArea style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <FeedHeader navigate={navigate} setPosts={setPosts} />
        <CreatePost newsFeed={newsFeed} />
        {allies.length > 0 && <AlliesScroll navigate={navigate} />}
        <Post
          navigate={navigate}
          posts={posts}
          setPosts={setPosts}
          newsFeed={newsFeed}
          loadMorePosts={loadMorePosts}
          loading={loading}
          allPostsLoaded={allPostsLoaded}
        />
      </View>
    </SafeArea>
  );
};
