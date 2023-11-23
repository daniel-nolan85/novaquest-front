import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../../firebase';
import { SafeArea } from '../../components/utils/safe-area.component';
import { ImagesNavigator } from './images.navigator';
import { PlanetsNavigator } from './planets.navigator';
import { GamesNavigator } from './games.navigator';
import Telescope from '../../../assets/telescope.svg';
import TelescopeInactive from '../../../assets/telescope-inactive.svg';
import Planets from '../../../assets/planets.svg';
import PlanetsInactive from '../../../assets/planets-inactive.svg';
import Joystick from '../../../assets/joystick.svg';
import JoystickInactive from '../../../assets/joystick-inactive.svg';
import Settings from '../../../assets/settings.svg';
import SettingsInactive from '../../../assets/settings-inactive.svg';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppNavigator = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  const logout = async () => {
    await signOut(auth);
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  };

  const SettingsScreen = () => (
    <SafeArea>
      <Text>SettingsScreen</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeArea>
  );

  return (
    <Navigator>
      <Screen
        name='Images'
        component={ImagesNavigator}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Telescope height={32} width={32} />
            ) : (
              <TelescopeInactive height={32} width={32} />
            ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Screen
        name='Planets'
        component={PlanetsNavigator}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Planets height={32} width={32} />
            ) : (
              <PlanetsInactive height={32} width={32} />
            ),
          headerShown: false,

          tabBarShowLabel: false,
        }}
      />
      <Screen
        name='Games'
        component={GamesNavigator}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Joystick height={32} width={32} />
            ) : (
              <JoystickInactive height={32} width={32} />
            ),
          headerShown: false,

          tabBarShowLabel: false,
        }}
      />
      <Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Settings height={32} width={32} />
            ) : (
              <SettingsInactive height={32} width={32} />
            ),
          headerShown: false,

          tabBarShowLabel: false,
        }}
      />
    </Navigator>
  );
};
