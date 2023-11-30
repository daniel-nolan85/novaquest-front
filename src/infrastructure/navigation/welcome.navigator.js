import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeSetupScreen } from '../../features/welcome/screens/welcome-setup.screen';
import { WelcomeCompleteScreen } from '../../features/welcome/screens/welcome-complete.screen';

const { Navigator, Screen } = createStackNavigator();

export const WelcomeNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='WelcomeSetup' component={WelcomeSetupScreen} />
      <Screen name='WelcomeComplete' component={WelcomeCompleteScreen} />
    </Navigator>
  );
};
