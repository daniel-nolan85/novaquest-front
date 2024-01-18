import { useState, useCallback } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import Posts from '../../../../assets/svg/posts.svg';
import PostsInactive from '../../../../assets/svg/posts-inactive.svg';
import Star from '../../../../assets/svg/star.svg';
import StarInactive from '../../../../assets/svg/star-inactive.svg';
import Achievements from '../../../../assets/svg/achievements.svg';
import AchievementsInactive from '../../../../assets/svg/achievements-inactive.svg';
import { fetchUsersPosts, fetchUsersStars } from '../../../requests/post';
import { fetchUsersAchievements } from '../../../requests/user';
import { ProfileCard } from '../components/profile-card.component';
import { ProfileButtons } from '../components/profile-buttons.component';
import { PostsRoute } from '../components/posts-route.component';
import { StarsRoute } from '../components/stars-route.component';
import { AchievementsRoute } from '../components/achievements-route.component';

const SafeAreaView = styled(SafeArea)`
  flex: 1;
  background-color: #fff;
`;

const PAGE_SIZE = 15;

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [stars, setStars] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [allStarsLoaded, setAllStarsLoaded] = useState(false);
  const [routes] = useState([
    {
      key: 'first',
      title: 'Posts',
      icon: <Posts width={32} height={32} />,
      inactiveIcon: <PostsInactive width={32} height={32} />,
    },
    {
      key: 'second',
      title: 'Stars',
      icon: <Star width={32} height={32} />,
      inactiveIcon: <StarInactive width={32} height={32} />,
    },
    {
      key: 'third',
      title: 'Missions',
      icon: <Achievements width={32} height={32} />,
      inactiveIcon: <AchievementsInactive width={32} height={32} />,
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      usersPosts();
      usersStars();
      usersAchievements();
    }, [])
  );

  const { token, _id, profileImage, name, rank, bio, daysInSpace } =
    useSelector((state) => state.user);

  const usersPosts = async () => {
    await fetchUsersPosts(token, _id, 1, PAGE_SIZE, 0)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  };

  const loadMorePosts = async () => {
    if (loading || allPostsLoaded) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetchUsersPosts(token, _id, page + 1, PAGE_SIZE, 0);
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

  const usersStars = async () => {
    await fetchUsersStars(token, _id, 1, PAGE_SIZE, 0)
      .then((res) => {
        setStars(res.data);
      })
      .catch((err) => console.error(err));
  };

  const loadMoreStars = async () => {
    if (loading || allStarsLoaded) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetchUsersStars(token, _id, page + 1, PAGE_SIZE, 0);
      if (res.data.length === 0) {
        setAllStarsLoaded(true);
      } else {
        setStars((prevPosts) => [...prevPosts, ...res.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching more posts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const usersAchievements = async () => {
    await fetchUsersAchievements(token, _id)
      .then((res) => {
        const trueAchievements = Object.keys(res.data).filter(
          (key) => res.data[key] === true
        );
        setAchievements(trueAchievements);
      })
      .catch((err) => console.error(err));
  };

  const renderScene = SceneMap({
    first: () => (
      <PostsRoute
        posts={posts}
        navigate={navigate}
        loadMorePosts={loadMorePosts}
        loading={loading}
        allPostsLoaded={allPostsLoaded}
      />
    ),
    second: () => (
      <StarsRoute
        stars={stars}
        navigate={navigate}
        loadMoreStars={loadMoreStars}
        loading={loading}
        allStarsLoaded={allStarsLoaded}
      />
    ),
    third: () => <AchievementsRoute achievements={achievements} />,
  });

  const layout = useWindowDimensions();

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#009999',
      }}
      renderIcon={({ route, focused }) =>
        focused ? route.icon : route.inactiveIcon
      }
      style={{
        backgroundColor: '#fff',
        height: 64,
      }}
      renderLabel={({ focused, route }) => (
        <Text style={[{ color: focused ? '#009999' : 'gray' }]}>
          {route.title}
        </Text>
      )}
    />
  );

  const { navigate } = navigation;

  return (
    <SafeAreaView>
      <ProfileCard
        userId={_id}
        profileImage={profileImage}
        name={name}
        rank={rank}
        bio={bio}
        daysInSpace={daysInSpace}
        navigate={navigate}
      />
      <ProfileButtons
        userId={_id}
        name={name}
        rank={rank}
        navigate={navigate}
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: 22,
        }}
      >
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  );
};
