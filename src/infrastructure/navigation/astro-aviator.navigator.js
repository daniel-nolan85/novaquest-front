import { createStackNavigator } from '@react-navigation/stack';
import { AstroAviatorSetupScreen } from '../../features/games/astro-aviator/screens/astro-aviator-setup-screen';
import { AstroAviatorGameScreen } from '../../features/games/astro-aviator/screens/astro-aviator-game-screen';
import { LeaderboardScreen } from '../../features/games/astro-aviator/screens/leaderboard-screen';
import { UserProfileScreen } from '../../features/social/screens/user-profile.screen';

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
      <Screen name='Leaderboard' component={LeaderboardScreen} />
      <Screen name='UserProfile' component={UserProfileScreen} />
    </Navigator>
  );
};
