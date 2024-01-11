import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { ISSTrackerSetupScreen } from '../../features/images/iss-tracker/screens/iss-tracker-setup.screen';
import { ISSTrackerScreen } from '../../features/images/iss-tracker/screens/iss-tracker.screen';

const { Navigator, Screen } = createStackNavigator();

export const ISSTrackerNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerShown: false,
      }}
    >
      <Screen name='ISSTrackerSetup' component={ISSTrackerSetupScreen} />
      <Screen name='ISSTrackerScreen' component={ISSTrackerScreen} />
    </Navigator>
  );
};
