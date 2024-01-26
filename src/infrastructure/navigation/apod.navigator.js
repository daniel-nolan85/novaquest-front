import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { ApodSetupScreen } from '../../features/images/apod/screens/apod-setup.screen';
import { ApodScreen } from '../../features/images/apod/screens/apod.screen';
import { Apods10CompleteScreen } from '../../features/images/apod/screens/apods-10-complete.screen';
import { Apods50CompleteScreen } from '../../features/images/apod/screens/apods-50-complete.screen';
import { Apods250CompleteScreen } from '../../features/images/apod/screens/apods-250-complete.screen';

const { Navigator, Screen } = createStackNavigator();

export const ApodNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerShown: false,
      }}
    >
      <Screen name='ApodSetup' component={ApodSetupScreen} />
      <Screen name='ApodScreen' component={ApodScreen} />
      <Screen name='Apods10Complete' component={Apods10CompleteScreen} />
      <Screen name='Apods50Complete' component={Apods50CompleteScreen} />
      <Screen name='Apods250Complete' component={Apods250CompleteScreen} />
    </Navigator>
  );
};
