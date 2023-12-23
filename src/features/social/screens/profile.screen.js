import { useState, useEffect } from 'react';
import {
  View,
  Image,
  Dimensions,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { SafeArea } from '../../../components/utils/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import Alliance from '../../../../assets/svg/alliance.svg';
import Posts from '../../../../assets/svg/posts.svg';
import PostsInactive from '../../../../assets/svg/posts-inactive.svg';
import Allies from '../../../../assets/svg/allies.svg';
import AlliesInactive from '../../../../assets/svg/allies-inactive.svg';
import Explorers from '../../../../assets/svg/explorers.svg';
import ExplorersInactive from '../../../../assets/svg/explorers-inactive.svg';
import { fetchUsersPosts } from '../../../requests/post';

const { width } = Dimensions.get('window');

const PostsRoute = ({ posts }) => (
  <View
    style={{
      flex: 1,
    }}
  >
    <FlatList
      data={posts}
      numColumns={3}
      renderItem={({ item, index }) => {
        console.log('item => ', item);
        return (
          <View
            style={{
              flex: 1,
              aspectRatio: 1,
              margin: 3,
            }}
          >
            {item.images.length ? (
              <Image
                key={index}
                source={{ uri: item.images[0].url }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 12,
                }}
              />
            ) : (
              <Text variant='title'>Post</Text>
            )}

            <View
              style={{
                position: 'absolute',
                bottom: 4,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 6,
                }}
              >
                <Ionicons name='eye' size={14} color='#fff' />
                <Text style={{ color: '#fff' }}>{item.numOfViews}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Ionicons name='heart-outline' size={14} color='#fff' />
                <Text style={{ color: '#fff' }}>{item.numOfViews}</Text>
              </View>
            </View>
          </View>
        );
      }}
    />
  </View>
);

const HighLightsRoute = () => (
  <View style={{ flex: 1, backfaceColor: 'blue' }}></View>
);

const TaggedRoute = () => (
  <View style={{ flex: 1, backfaceColor: 'blue' }}></View>
);

export const ProfileScreen = () => {
  const [posts, setPosts] = useState([]);

  console.log('posts => ', posts);

  useEffect(() => {
    if (token) {
      usersPosts();
    }
  }, [token]);

  const { token, _id, profileImage, name, rank, bio } = useSelector(
    (state) => state.user
  );

  const usersPosts = async () => {
    await fetchUsersPosts(token, _id)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  };

  const renderScene = SceneMap({
    first: () => <PostsRoute posts={posts} />,
    second: HighLightsRoute,
    third: TaggedRoute,
  });

  const renderProfileCard = () => {
    return (
      <View
        style={{
          width: width - 44,
          height: 260,
          marginHorizontal: 22,
          paddingHorizontal: 6,
          paddingVertical: 18,
          borderColor: '#F7F7F7',
          borderWidth: 1,
          backgroundColor: '#FFFFFF',
          shadowColor: '#18274B',
          shadowOffset: {
            width: 0,
            height: 4.5,
          },
          shadowOpacity: 0.12,
          shadowRadius: 0.65,
          elevation: 2,
          borderRadius: 35,
        }}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        >
          {/* Profile image container */}
          <View>
            <Image
              source={profileImage ? profileImage : defaultProfile}
              resizeMode='contain'
              style={{
                height: 100,
                width: 96,
                borderRadius: 80,
                borderWidth: 4,
                borderColor: '#ffffff',
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginVertical: 12,
          }}
        >
          <Text variant='title' style={{ textAlign: 'center' }}>
            {rank} {name}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text variant='body'>{bio}</Text>
          </View>
        </View>
      </View>
    );
  };

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'first',
      title: 'Posts',
      icon: <Posts width={32} height={32} />,
      inactiveIcon: <PostsInactive width={32} height={32} />,
    },
    {
      key: 'second',
      title: 'Allies',
      icon: <Allies width={32} height={32} />,
      inactiveIcon: <AlliesInactive width={32} height={32} />,
    },
    {
      key: 'third',
      title: 'Explorers',
      icon: <Explorers width={32} height={32} />,
      inactiveIcon: <ExplorersInactive width={32} height={32} />,
    },
  ]);

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

  const renderButtons = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: 22,
          marginVertical: 12,
        }}
      >
        <LinearGradient
          colors={['#009999', '#00cccc']}
          style={{
            height: 50,
            width: 200,
            marginTop: 10,
            borderRadius: 10 * 3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Alliance width={32} height={32} />
          <Text
            variant='body'
            style={{
              marginLeft: 12,
              color: '#fff',
            }}
          >
            Form Alliance
          </Text>
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeArea style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        {renderProfileCard()}
        {renderButtons()}
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
      </View>
    </SafeArea>
  );
};
