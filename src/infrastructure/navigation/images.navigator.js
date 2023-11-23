import { createDrawerNavigator } from '@react-navigation/drawer';
import { ApodScreen } from '../../features/images/apod/screens/apod.screen';
import { MarsRoverNavigator } from './rover.navigator';
import { LandsatHomeScreen } from '../../features/images/landsat/screens/landsat-home.screen';
import { AsteroidAlmanacNavigator } from './asteroid-almanac.navigator';

const { Navigator, Screen } = createDrawerNavigator();

export const ImagesNavigator = () => {
  return (
    <Navigator>
      <Screen
        name='Apod'
        component={ApodScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Picture of the Day',
        }}
      />
      <Screen
        name='MarsRovers'
        component={MarsRoverNavigator}
        options={{
          headerShown: false,
          drawerLabel: 'Mars Rovers',
        }}
      />
      <Screen
        name='Landsat'
        component={LandsatHomeScreen}
        options={{
          headerShown: false,
          drawerLabel: 'Landsat',
        }}
      />
      <Screen
        name='AsteroidAlmanac'
        component={AsteroidAlmanacNavigator}
        options={{
          headerShown: false,
          drawerLabel: 'Asteroid Almanac',
        }}
      />
    </Navigator>
  );
};
