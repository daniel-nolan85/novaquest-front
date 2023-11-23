import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { MarsRoverImagesScreen } from '../../features/images/rover/screens/mars-rover-images.screen';
import { MarsRoverImagesSetupScreen } from '../../features/images/rover/screens/mars-rover-images-setup.screen';

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
      <Screen name='MarsRoverImagesScreen' component={MarsRoverImagesScreen} />
    </Navigator>
  );
};
