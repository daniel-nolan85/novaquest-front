import { createStackNavigator } from '@react-navigation/stack';
import { FeedScreen } from '../../features/social/screens/feed.screen';
import { UserProfileScreen } from '../../features/social/screens/user-profile.screen';
import { UserPostsScreen } from '../../features/social/screens/user-posts.screen';
import { SignalsScreen } from '../../features/social/screens/signals.screen';
import { FirstPostScreen } from '../../features/social/screens/first-post.screen';
import { TenthPostScreen } from '../../features/social/screens/tenth-post.screen';
import { FiftiethPostScreen } from '../../features/social/screens/fiftieth-post.screen';
import { TwoHundredFiftiethPostScreen } from '../../features/social/screens/two-hundred-fiftieth-post.screen';
import { ThreeHundredStarsScreen } from '../../features/social/screens/three-hundred-stars.screen';
import { ThreeHundredCommentsScreen } from '../../features/social/screens/three-hundred-comments.screen';

const { Navigator, Screen } = createStackNavigator();

export const SocialNavigator = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Screen name='Feed' component={FeedScreen} />
    <Screen name='UserProfile' component={UserProfileScreen} />
    <Screen name='UserPosts' component={UserPostsScreen} />
    <Screen name='Signals' component={SignalsScreen} />
    <Screen name='FirstPost' component={FirstPostScreen} />
    <Screen name='TenthPost' component={TenthPostScreen} />
    <Screen name='FiftiethPost' component={FiftiethPostScreen} />
    <Screen
      name='TwoHundredFiftiethPost'
      component={TwoHundredFiftiethPostScreen}
    />
    <Screen name='ThreeHundredStars' component={ThreeHundredStarsScreen} />
    <Screen
      name='ThreeHundredComments'
      component={ThreeHundredCommentsScreen}
    />
  </Navigator>
);
