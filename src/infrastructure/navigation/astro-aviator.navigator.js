import { createStackNavigator } from '@react-navigation/stack';
import { AstroAviatorSetupScreen } from '../../features/games/astro-aviator/screens/astro-aviator-setup-screen';
import { AstroAviatorGameScreen } from '../../features/games/astro-aviator/screens/astro-aviator-game-screen';

const { Navigator, Screen } = createStackNavigator();

export const AstroAviatorNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='AstroAviatorSetup' component={AstroAviatorSetupScreen} />
      <Screen name='AstroAviatorGame' component={AstroAviatorGameScreen} />
    </Navigator>
  );
};
