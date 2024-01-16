import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../../features/social/screens/profile.screen';
import { UserProfileScreen } from '../../features/social/screens/user-profile.screen';
import { UserPostsScreen } from '../../features/social/screens/user-posts.screen';
import { UserStarsScreen } from '../../features/social/screens/user-stars.screen';
import { ThreeHundredStarsScreen } from '../../features/social/screens/three-hundred-stars.screen';
import { ThreeHundredCommentsScreen } from '../../features/social/screens/three-hundred-comments.screen';

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
    <Screen name='ThreeHundredStars' component={ThreeHundredStarsScreen} />
    <Screen
      name='ThreeHundredComments'
      component={ThreeHundredCommentsScreen}
    />
  </Navigator>
);
