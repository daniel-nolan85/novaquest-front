import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from '../../features/settings/screens/settings.screen';
import { ReportedPostsScreen } from '../../features/settings/screens/reported-posts.screen';
import { PostsScreen } from '../../features/settings/screens/posts.screen';
import { UsersScreen } from '../../features/settings/screens/users.screen';
import { UserProfileScreen } from '../../features/social/screens/user-profile.screen';

const { Navigator, Screen } = createStackNavigator();

export const SettingsNavigator = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name='SettingsScreen' component={SettingsScreen} />
    <Screen name='ReportedPostsScreen' component={ReportedPostsScreen} />
    <Screen name='PostsScreen' component={PostsScreen} />
    <Screen name='UsersScreen' component={UsersScreen} />
    <Screen name='UserProfile' component={UserProfileScreen} />
  </Navigator>
);
