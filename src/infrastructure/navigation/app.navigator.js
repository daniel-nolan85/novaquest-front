import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImagesNavigator } from './images.navigator';
import { PlanetsNavigator } from './planets.navigator';
import { GamesNavigator } from './games.navigator';
import { SettingsScreen } from '../../features/settings/screens/settings.screen';
import Telescope from '../../../assets/svg/telescope.svg';
import TelescopeInactive from '../../../assets/svg/telescope-inactive.svg';
import Planets from '../../../assets/svg/planets.svg';
import PlanetsInactive from '../../../assets/svg/planets-inactive.svg';
import Joystick from '../../../assets/svg/joystick.svg';
import JoystickInactive from '../../../assets/svg/joystick-inactive.svg';
import Settings from '../../../assets/svg/settings.svg';
import SettingsInactive from '../../../assets/svg/settings-inactive.svg';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppNavigator = () => {
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
