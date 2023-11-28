import { createDrawerNavigator } from '@react-navigation/drawer';
import { ApodScreen } from '../../features/images/apod/screens/apod.screen';
import { MarsRoverNavigator } from './rover.navigator';
import { LandsatHomeScreen } from '../../features/images/landsat/screens/landsat-home.screen';
import { AsteroidAlmanacNavigator } from './asteroid-almanac.navigator';
import { Text } from '../../components/typography/text.component';

const { Navigator, Screen } = createDrawerNavigator();

export const ImagesNavigator = () => {
  return (
    <Navigator>
      <Screen
        name='Apod'
        component={ApodScreen}
        options={{
          headerShown: false,
          drawerLabel: () => <Text variant='body'>Picture of the Day</Text>,
        }}
      />
      <Screen
        name='MarsRovers'
        component={MarsRoverNavigator}
        options={{
          headerShown: false,
          drawerLabel: () => <Text variant='body'>Mars Rovers</Text>,
        }}
      />
      <Screen
        name='Landsat'
        component={LandsatHomeScreen}
        options={{
          headerShown: false,
          drawerLabel: () => <Text variant='body'>Landsat</Text>,
        }}
      />
      <Screen
        name='AsteroidAlmanac'
        component={AsteroidAlmanacNavigator}
        options={{
          headerShown: false,
          drawerLabel: () => <Text variant='body'>Asteroid Almanac</Text>,
        }}
      />
    </Navigator>
  );
};
