import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { FeedScreen } from '../../features/social/screens/feed.screen';
import { UserProfileScreen } from '../../features/social/screens/user-profile.screen';
import { SignalsScreen } from '../../features/social/screens/signals.screen';

const { Navigator, Screen } = createStackNavigator();

export const SocialNavigator = () => (
  <Navigator
    screenOptions={{
      ...TransitionPresets.ModalPresentationIOS,
      headerShown: false,
    }}
  >
    <Screen name='Feed' component={FeedScreen} />
    <Screen name='UserProfile' component={UserProfileScreen} />
    <Screen name='Signals' component={SignalsScreen} />
  </Navigator>
);
