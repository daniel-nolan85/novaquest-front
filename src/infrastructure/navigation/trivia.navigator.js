import { createStackNavigator } from '@react-navigation/stack';
import { TriviaSetupScreen } from '../../features/games/trivia/screens/trivia-setup.screen';
import { TriviaQuestionScreen } from '../../features/games/trivia/screens/trivia-question.screen';
import { TriviaResultScreen } from '../../features/games/trivia/screens/trivia-result.screen';

const { Navigator, Screen } = createStackNavigator();

export const TriviaNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='TriviaSetup' component={TriviaSetupScreen} />
      <Screen name='TriviaQuestion' component={TriviaQuestionScreen} />
      <Screen name='TriviaResult' component={TriviaResultScreen} />
    </Navigator>
  );
};
