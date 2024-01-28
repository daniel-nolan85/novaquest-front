import { useState, useCallback, useContext } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { FeedHeader } from '../components/feed-header.component';
import { Post } from '../components/post.component';
import { fetchPosts } from '../../../requests/post';
import { AudioContext } from '../../../services/audio/audio.context';
import { ToastContext } from '../../../services/toast/toast.context';
import { SocialContext } from '../../../services/social/social.context';
import { ToastNotification } from '../../../components/animations/toast-notification.animation';
import { fetchUserExplorers } from '../../../requests/user';

const PAGE_SIZE = 20;

export const FeedScreen = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [showPostToast, setShowPostToast] = useState(false);
  const [showReportPostToast, setShowReportPostToast] = useState(false);
  const [showBlockUserToast, setShowBlockUserToast] = useState(false);
  const [showDeletePostToast, setShowDeletePostToast] = useState(false);
  const [showEditPostToast, setShowEditPostToast] = useState(false);
  const [explorers, setExplorers] = useState([]);

  const { token, _id, role } = useSelector((state) => state.user);

  const { posts, setPosts } = useContext(SocialContext);
  const { stopGameMusic } = useContext(AudioContext);
  const { blockUserBody } = useContext(ToastContext);

  useFocusEffect(
    useCallback(() => {
      stopGameMusic();
      newsFeed();
      fetchExplorers();
    }, [])
  );

  const { navigate } = navigation;

  const newsFeed = async () => {
    try {
      const { data } = await fetchPosts(token, _id, role, 1, PAGE_SIZE);
      setPosts(data);
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

  const fetchExplorers = async () => {
    await fetchUserExplorers(token, _id, role)
      .then((res) => {
        setExplorers(res.data.explorers);
      })
      .catch((err) => {
        console.error(err);
      });
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
        <FeedHeader navigate={navigate} />
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
          setShowPostToast={setShowPostToast}
          explorers={explorers}
        />
      </View>
      {showPostToast && <ToastNotification {...postToastContent} />}
      {showReportPostToast && <ToastNotification {...reportPostToastContent} />}
      {showBlockUserToast && <ToastNotification {...blockUserToastContent} />}
      {showDeletePostToast && <ToastNotification {...deletePostToastContent} />}
      {showEditPostToast && <ToastNotification {...editPostToastContent} />}
    </SafeArea>
  );
};
