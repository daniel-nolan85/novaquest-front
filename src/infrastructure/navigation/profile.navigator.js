import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../../features/social/screens/profile.screen';
import { UserProfileScreen } from '../../features/social/screens/user-profile.screen';
import { UserPostsScreen } from '../../features/social/screens/user-posts.screen';
import { UserStarsScreen } from '../../features/social/screens/user-stars.screen';

const { Navigator, Screen } = createStackNavigator();

export const ProfileNavigator = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name='ProfileScreen' component={ProfileScreen} />
    <Screen name='UserProfile' component={UserProfileScreen} />
    <Screen name='UserPosts' component={UserPostsScreen} />
    <Screen name='UserStars' component={UserStarsScreen} />
  </Navigator>
);
