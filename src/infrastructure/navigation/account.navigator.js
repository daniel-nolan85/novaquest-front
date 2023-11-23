import { createStackNavigator } from '@react-navigation/stack';
import { AccountScreen } from '../../features/account/screens/account.screen';

const { Navigator, Screen } = createStackNavigator();

export const AccountNavigator = () => (
  <Navigator>
    <Screen
      name='AccountScreen'
      component={AccountScreen}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    />
  </Navigator>
);
