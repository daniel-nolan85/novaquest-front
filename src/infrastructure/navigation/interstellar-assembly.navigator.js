import { createStackNavigator } from '@react-navigation/stack';
import { InterstellarAssemblySetupScreen } from '../../features/games/interstellar-assembly/screens/interstellar-assembly-setup.screen';
import { InterstellarAssemblyGameScreen } from '../../features/games/interstellar-assembly/screens/interstellar-assembly-game.screen';
import { InterstellarAssemblyGameWonScreen } from '../../features/games/interstellar-assembly/screens/interstellar-assembly-game-won.screen';

const { Navigator, Screen } = createStackNavigator();

export const InterstellarAssemblyNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name='InterstellarAssemblySetup'
        component={InterstellarAssemblySetupScreen}
      />
      <Screen
        name='InterstellarAssemblyGame'
        component={InterstellarAssemblyGameScreen}
      />
      <Screen
        name='InterstellarAssemblyGameWon'
        component={InterstellarAssemblyGameWonScreen}
      />
    </Navigator>
  );
};
