import { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DiscoveryHubScreen } from '../../features/images/discovery-hub.screen';
import { ApodScreen } from '../../features/images/apod/screens/apod.screen';
import { PlanetsNavigator } from './planets.navigator';
import { MarsRoverNavigator } from './rover.navigator';
import { AsteroidAlmanacNavigator } from './asteroid-almanac.navigator';
import { ISSTrackerNavigator } from './iss-tracker.navigator';
import { Text } from '../../components/typography/text.component';
import { CustomDrawer } from '../../components/navigation/custom-drawer.component';
import Image from '../../../assets/svg/image.svg';
import ImageActive from '../../../assets/svg/image-active.svg';
import Asteroid from '../../../assets/svg/asteroid.svg';
import AsteroidActive from '../../../assets/svg/asteroid-active.svg';
import Iss from '../../../assets/svg/iss.svg';
import IssActive from '../../../assets/svg/iss-active.svg';
import Rover from '../../../assets/svg/moon-rover.svg';
import RoverActive from '../../../assets/svg/moon-rover-active.svg';
import Observatory from '../../../assets/svg/observatory.svg';
import ObservatoryActive from '../../../assets/svg/observatory-active.svg';

const { Navigator, Screen } = createDrawerNavigator();

export const ImagesNavigator = ({ navigation }) => {
  const { addListener, navigate } = navigation;

  useEffect(() => {
    const unsubscribeFocus = addListener('focus', () => {
      navigate('DiscoveryHub');
    });

    return unsubscribeFocus;
  }, [navigation]);

  return (
    <Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#009999',
      }}
    >
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
          drawerLabel: ({ focused }) => (
            <Text
              variant='body'
              style={{ color: focused ? '#fff' : '#009999' }}
            >
              APOD
            </Text>
          ),
          drawerIcon: ({ focused }) => {
            return focused ? (
              <ImageActive height={22} width={22} />
            ) : (
              <Image height={22} width={22} />
            );
          },
        }}
      />
      <Screen
        name='AsteroidAlmanac'
        component={AsteroidAlmanacNavigator}
        options={{
          headerShown: false,
          drawerLabel: ({ focused }) => (
            <Text
              variant='body'
              style={{ color: focused ? '#fff' : '#009999' }}
            >
              Asteroid Almanac
            </Text>
          ),
          drawerIcon: ({ focused }) => {
            return focused ? (
              <AsteroidActive height={22} width={22} />
            ) : (
              <Asteroid height={22} width={22} />
            );
          },
        }}
      />
      <Screen
        name='ISSTracker'
        component={ISSTrackerNavigator}
        options={{
          headerShown: false,
          drawerLabel: ({ focused }) => (
            <Text
              variant='body'
              style={{ color: focused ? '#fff' : '#009999' }}
            >
              ISS Tracker
            </Text>
          ),
          drawerIcon: ({ focused }) => {
            return focused ? (
              <IssActive height={22} width={22} />
            ) : (
              <Iss height={22} width={22} />
            );
          },
        }}
      />
      <Screen
        name='MarsRovers'
        component={MarsRoverNavigator}
        options={{
          headerShown: false,
          drawerLabel: ({ focused }) => (
            <Text
              variant='body'
              style={{ color: focused ? '#fff' : '#009999' }}
            >
              Mars Rovers
            </Text>
          ),
          drawerIcon: ({ focused }) => {
            return focused ? (
              <RoverActive height={22} width={22} />
            ) : (
              <Rover height={22} width={22} />
            );
          },
        }}
      />
      <Screen
        name='Planets'
        component={PlanetsNavigator}
        options={{
          headerShown: false,
          drawerLabel: ({ focused }) => (
            <Text
              variant='body'
              style={{ color: focused ? '#fff' : '#009999' }}
            >
              Planetarium
            </Text>
          ),
          drawerIcon: ({ focused }) => {
            return focused ? (
              <ObservatoryActive height={22} width={22} />
            ) : (
              <Observatory height={22} width={22} />
            );
          },
        }}
      />
    </Navigator>
  );
};
