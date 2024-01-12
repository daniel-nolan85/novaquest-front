import { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { GamesHubScreen } from '../../features/games/games-hub.screen';
import { InterstellarAssemblyNavigator } from './interstellar-assembly.navigator';
import { AstroAviatorNavigator } from './astro-aviator.navigator';
import { TriviaNavigator } from './trivia.navigator';
import { Text } from '../../components/typography/text.component';
import { CustomDrawer } from '../../components/navigation/custom-drawer.component';
import Astro from '../../../assets/svg/astro.svg';
import AstroActive from '../../../assets/svg/astro-active.svg';
import Puzzle from '../../../assets/svg/puzzle.svg';
import PuzzleActive from '../../../assets/svg/puzzle-active.svg';
import Interstellar from '../../../assets/svg/interstellar.svg';
import InterstellarActive from '../../../assets/svg/interstellar-active.svg';

const { Navigator, Screen } = createDrawerNavigator();

export const GamesNavigator = ({ navigation }) => {
  const { addListener, navigate } = navigation;

  useEffect(() => {
    const unsubscribeFocus = addListener('focus', () => {
      navigate('GamesHub');
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
        name='GamesHub'
        component={GamesHubScreen}
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Screen
        name='AstroAviator'
        component={AstroAviatorNavigator}
        options={{
          headerShown: false,
          drawerLabel: ({ focused }) => (
            <Text
              variant='body'
              style={{ color: focused ? '#fff' : '#009999' }}
            >
              Astro Aviator
            </Text>
          ),
          drawerIcon: ({ focused }) => {
            return focused ? (
              <AstroActive height={22} width={22} />
            ) : (
              <Astro height={22} width={22} />
            );
          },
        }}
      />
      <Screen
        name='CosmicConundrum'
        component={TriviaNavigator}
        options={{
          headerShown: false,
          drawerLabel: ({ focused }) => (
            <Text
              variant='body'
              style={{ color: focused ? '#fff' : '#009999' }}
            >
              Cosmic Conundrum
            </Text>
          ),
          drawerIcon: ({ focused }) => {
            return focused ? (
              <PuzzleActive height={22} width={22} />
            ) : (
              <Puzzle height={22} width={22} />
            );
          },
        }}
      />
      <Screen
        name='InterstellarAssembly'
        component={InterstellarAssemblyNavigator}
        options={{
          headerShown: false,
          drawerLabel: ({ focused }) => (
            <Text
              variant='body'
              style={{ color: focused ? '#fff' : '#009999' }}
            >
              Interstellar Assembly
            </Text>
          ),
          drawerIcon: ({ focused }) => {
            return focused ? (
              <InterstellarActive height={22} width={22} />
            ) : (
              <Interstellar height={22} width={22} />
            );
          },
        }}
      />
    </Navigator>
  );
};
