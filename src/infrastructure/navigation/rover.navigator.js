import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { MarsRoverImagesScreen } from '../../features/images/rover/screens/mars-rover-images.screen';
import { MarsRoverImagesSetupScreen } from '../../features/images/rover/screens/mars-rover-images-setup.screen';
import { MarsRoverOneCompleteScreen } from '../../features/images/rover/screens/mars-rover-one-complete.screen';
import { MarsRoverAllCompleteScreen } from '../../features/images/rover/screens/mars-rover-all-complete.screen';
import { MarsRoverAllCamerasCompleteScreen } from '../../features/images/rover/screens/mars-rover-all-cameras-complete.screen';
import { MarsRoverAllDateTypesCompleteScreen } from '../../features/images/rover/screens/mars-rover-all-date-types-complete.screen';

const { Navigator, Screen } = createStackNavigator();

export const MarsRoverNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerShown: false,
      }}
    >
      <Screen
        name='MarsRoverImagesSetup'
        component={MarsRoverImagesSetupScreen}
      />
      <Screen
        name='MarsRoverOneComplete'
        component={MarsRoverOneCompleteScreen}
      />
      <Screen
        name='MarsRoverAllComplete'
        component={MarsRoverAllCompleteScreen}
      />
      <Screen
        name='MarsRoverAllCamerasComplete'
        component={MarsRoverAllCamerasCompleteScreen}
      />
      <Screen
        name='MarsRoverAllDateTypesComplete'
        component={MarsRoverAllDateTypesCompleteScreen}
      />
      <Screen name='MarsRoverImagesScreen' component={MarsRoverImagesScreen} />
    </Navigator>
  );
};
