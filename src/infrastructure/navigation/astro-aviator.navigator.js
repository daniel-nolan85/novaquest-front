import { createStackNavigator } from '@react-navigation/stack';
import { AstroAviatorSetupScreen } from '../../features/games/astro-aviator/screens/astro-aviator-setup-screen';
import { AstroAviatorGameScreen } from '../../features/games/astro-aviator/screens/astro-aviator-game-screen';
import { LeaderboardScreen } from '../../features/games/astro-aviator/screens/leaderboard-screen';
import { UserProfileScreen } from '../../features/social/screens/user-profile.screen';
import { AstroScoreOver50Screen } from '../../features/games/astro-aviator/screens/astro-aviator-over-50.screen';
import { AstroScoreOver100Screen } from '../../features/games/astro-aviator/screens/astro-aviator-over-100.screen';
import { AstroScoreOver500Screen } from '../../features/games/astro-aviator/screens/astro-aviator-over-500.screen';

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
      <Screen name='AstroScoreOver50' component={AstroScoreOver50Screen} />
      <Screen name='AstroScoreOver100' component={AstroScoreOver100Screen} />
      <Screen name='AstroScoreOver500' component={AstroScoreOver500Screen} />
    </Navigator>
  );
};
