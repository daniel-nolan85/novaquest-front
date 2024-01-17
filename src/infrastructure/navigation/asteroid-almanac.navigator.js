import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { AsteroidAlmanacSetupScreen } from '../../features/images/asteroid-almanac/screens/asteroid-almanac-setup.screen';
import { AsteroidAlmanacListScreen } from '../../features/images/asteroid-almanac/screens/asteroid-almanac-list.screen';
import { AsteroidAlmanacDetailsScreen } from '../../features/images/asteroid-almanac/screens/asteroid-almanac-details.screen';
import { Asteroids10CompleteScreen } from '../../features/images/asteroid-almanac/screens/asteroids-10-complete.screen';

const { Navigator, Screen } = createStackNavigator();

export const AsteroidAlmanacNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerShown: false,
      }}
    >
      <Screen
        name='AsteroidAlmanacSetup'
        component={AsteroidAlmanacSetupScreen}
      />
      <Screen
        name='AsteroidAlmanacList'
        component={AsteroidAlmanacListScreen}
      />
      <Screen
        name='AsteroidAlmanacDetails'
        component={AsteroidAlmanacDetailsScreen}
      />
      <Screen
        name='Asteroids10Complete'
        component={Asteroids10CompleteScreen}
      />
    </Navigator>
  );
};
