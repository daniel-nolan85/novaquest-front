import { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { ImagesContext } from '../../services/images/images.context';
import { DaysInSpaceScreen } from '../../features/welcome/screens/days-in-space.screen';
import { ImagesNavigator } from './images.navigator';
import { PlanetsNavigator } from './planets.navigator';
import { SocialNavigator } from './social.navigator';
import { ProfileNavigator } from './profile.navigator';
import { GamesNavigator } from './games.navigator';
import { SettingsScreen } from '../../features/settings/screens/settings.screen';
import Telescope from '../../../assets/svg/telescope.svg';
import TelescopeInactive from '../../../assets/svg/telescope-inactive.svg';
import Planets from '../../../assets/svg/planets.svg';
import PlanetsInactive from '../../../assets/svg/planets-inactive.svg';
import Feed from '../../../assets/svg/feed.svg';
import FeedInactive from '../../../assets/svg/feed-inactive.svg';
import Profile from '../../../assets/svg/profile.svg';
import ProfileInactive from '../../../assets/svg/profile-inactive.svg';
import GameController from '../../../assets/svg/game-controller.svg';
import GameControllerInactive from '../../../assets/svg/game-controller-inactive.svg';
import Settings from '../../../assets/svg/settings.svg';
import SettingsInactive from '../../../assets/svg/settings-inactive.svg';

const Stack = createStackNavigator();
const { Navigator: StackNavigator, Screen: StackScreen } = Stack;
const { Navigator, Screen } = createBottomTabNavigator();

export const AppNavigator = () => {
  const { renderDays, setRenderDays } = useContext(ImagesContext);

  const {
    daysInSpace,
    achievedAdventurousExplorer,
    achievedStellarVoyager,
    achievedAstroPioneer,
    achievedCosmicTrailblazer,
    achievedCelestialNomad,
    achievedGalacticWayfarer,
    achievedInterstellarVoyager,
    achievedStellarCenturion,
    achievedVoyagerExtraordinaire,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (
      (daysInSpace === 4 && !achievedAdventurousExplorer) ||
      (daysInSpace === 7 && !achievedStellarVoyager) ||
      (daysInSpace === 14 && !achievedAstroPioneer) ||
      (daysInSpace === 30 && !achievedCosmicTrailblazer) ||
      (daysInSpace === 60 && !achievedCelestialNomad) ||
      (daysInSpace === 90 && !achievedGalacticWayfarer) ||
      (daysInSpace === 180 && !achievedInterstellarVoyager) ||
      (daysInSpace === 270 && !achievedStellarCenturion) ||
      (daysInSpace === 365 && !achievedVoyagerExtraordinaire)
    )
      setRenderDays(true);
  }, []);

  return (
    <>
      {renderDays ? (
        <StackNavigator>
          <StackScreen
            name='DaysInSpace'
            component={DaysInSpaceScreen}
            initialParams={{ daysInSpace }}
            options={{
              headerShown: false,
            }}
          />
        </StackNavigator>
      ) : (
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
            name='Social'
            component={SocialNavigator}
            options={{
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Feed height={32} width={32} />
                ) : (
                  <FeedInactive height={32} width={32} />
                ),
              headerShown: false,
              tabBarShowLabel: false,
            }}
          />
          <Screen
            name='Profile'
            component={ProfileNavigator}
            options={{
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Profile height={32} width={32} />
                ) : (
                  <ProfileInactive height={32} width={32} />
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
                  <GameController height={32} width={32} />
                ) : (
                  <GameControllerInactive height={32} width={32} />
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
      )}
    </>
  );
};
