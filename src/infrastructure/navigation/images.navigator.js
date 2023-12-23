import { createDrawerNavigator } from '@react-navigation/drawer';
import { DiscoveryHubScreen } from '../../features/images/discovery-hub.screen';
import { ApodScreen } from '../../features/images/apod/screens/apod.screen';
import { MarsRoverNavigator } from './rover.navigator';
import { AsteroidAlmanacNavigator } from './asteroid-almanac.navigator';
import { Text } from '../../components/typography/text.component';

const { Navigator, Screen } = createDrawerNavigator();

export const ImagesNavigator = () => {
  return (
    <Navigator>
      <Screen
        name='DiscoveryHub'
        component={DiscoveryHubScreen}
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { display: 'none' },
        }}
      />
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
