import { useState, useCallback, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { CreatePost } from '../components/create-post.component';
import { FeedHeader } from '../components/feed-header.component';
import { AlliesScroll } from '../components/allies-scroll.component';
import { Post } from '../components/post.component';
import { fetchPosts } from '../../../requests/post';
import { AudioContext } from '../../../services/audio/audio.context';
import { ToastContext } from '../../../services/toast/toast.context';
import { ToastNotification } from '../../../components/animations/toast-notification.animation';

const PAGE_SIZE = 10;

export const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [showPostToast, setShowPostToast] = useState(false);
  const [showReportPostToast, setShowReportPostToast] = useState(false);
  const [showBlockUserToast, setShowBlockUserToast] = useState(false);
  const [showDeletePostToast, setShowDeletePostToast] = useState(false);
  const [showEditPostToast, setShowEditPostToast] = useState(false);

  const { token, _id, role, allies } = useSelector((state) => state.user);

  const { stopGameMusic } = useContext(AudioContext);
  const { blockUserBody } = useContext(ToastContext);

  useFocusEffect(
    useCallback(() => {
      stopGameMusic();
      newsFeed();
    }, [])
  );

  const { navigate } = navigation;

  const newsFeed = async () => {
    try {
      const res = await fetchPosts(token, _id, role, page, PAGE_SIZE);
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
      const res = await fetchPosts(token, _id, role, page + 1, PAGE_SIZE);
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

  const postToastContent = {
    type: 'success',
    title: 'Your cosmic moment is now part of the celestial journey',
    body: `Keep exploring and sharing the wonders of the universe!`,
  };

  const reportPostToastContent = {
    type: 'warning',
    title: `Cosmic Alert!`,
    body: 'Post Reported and Forwarded to Cosmic Security. Stay Vigilant!',
  };

  const blockUserToastContent = {
    type: 'info',
    title: `Your cosmic journey just got more tailored.`,
    body: blockUserBody,
  };

  const deletePostToastContent = {
    type: 'success',
    title: 'Your cosmic moment has been cleared from the stars.',
    body: 'Feel free to share more celestial moments on your space journey!',
  };

  const editPostToastContent = {
    type: 'success',
    title: 'Your cosmic moment has been updated successfully.',
    body: 'Your cosmic insight now shines even brighter! Continue sharing your space adventures with the universe.',
  };

  return (
    <SafeArea style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        <FeedHeader navigate={navigate} setPosts={setPosts} />
        <ScrollView>
          <CreatePost
            newsFeed={newsFeed}
            navigate={navigate}
            setShowPostToast={setShowPostToast}
          />
          {allies.length > 0 && <AlliesScroll navigate={navigate} />}
          <Post
            navigate={navigate}
            posts={posts}
            setPosts={setPosts}
            newsFeed={newsFeed}
            loadMorePosts={loadMorePosts}
            loading={loading}
            allPostsLoaded={allPostsLoaded}
            setShowReportPostToast={setShowReportPostToast}
            setShowBlockUserToast={setShowBlockUserToast}
            setShowDeletePostToast={setShowDeletePostToast}
            setShowEditPostToast={setShowEditPostToast}
          />
        </ScrollView>
      </View>
      {showPostToast && <ToastNotification {...postToastContent} />}
      {showReportPostToast && <ToastNotification {...reportPostToastContent} />}
      {showBlockUserToast && <ToastNotification {...blockUserToastContent} />}
      {showDeletePostToast && <ToastNotification {...deletePostToastContent} />}
      {showEditPostToast && <ToastNotification {...editPostToastContent} />}
    </SafeArea>
  );
};
