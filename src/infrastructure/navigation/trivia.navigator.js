import { createStackNavigator } from '@react-navigation/stack';
import { TriviaSetupScreen } from '../../features/games/trivia/screens/trivia-setup.screen';
import { TriviaQuestionScreen } from '../../features/games/trivia/screens/trivia-question.screen';
import { TriviaEasyScoreOver50Screen } from '../../features/games/trivia/screens/trivia-easy-over-50.screen';
import { TriviaMediumScoreOver50Screen } from '../../features/games/trivia/screens/trivia-medium-over-50.screen';
import { TriviaHardScoreOver50Screen } from '../../features/games/trivia/screens/trivia-hard-over-50.screen';
import { TriviaPerfectEasyScreen } from '../../features/games/trivia/screens/trivia-easy-perfect.screen';
import { TriviaPerfectMediumScreen } from '../../features/games/trivia/screens/trivia-medium-perfect.screen';
import { TriviaPerfectHardScreen } from '../../features/games/trivia/screens/trivia-hard-perfect.screen';
import { TriviaComplete10QuestionScreen } from '../../features/games/trivia/screens/trivia-complete-10.screen';
import { TriviaComplete20QuestionScreen } from '../../features/games/trivia/screens/trivia-complete-20.screen';
import { TriviaComplete30QuestionScreen } from '../../features/games/trivia/screens/trivia-complete-30.screen';
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
      <Screen
        name='TriviaEasyScoreOver50'
        component={TriviaEasyScoreOver50Screen}
      />
      <Screen
        name='TriviaMediumScoreOver50'
        component={TriviaMediumScoreOver50Screen}
      />
      <Screen
        name='TriviaHardScoreOver50'
        component={TriviaHardScoreOver50Screen}
      />
      <Screen name='TriviaPerfectEasy' component={TriviaPerfectEasyScreen} />
      <Screen
        name='TriviaPerfectMedium'
        component={TriviaPerfectMediumScreen}
      />
      <Screen name='TriviaPerfectHard' component={TriviaPerfectHardScreen} />
      <Screen
        name='TriviaComplete10Question'
        component={TriviaComplete10QuestionScreen}
      />
      <Screen
        name='TriviaComplete20Question'
        component={TriviaComplete20QuestionScreen}
      />
      <Screen
        name='TriviaComplete30Question'
        component={TriviaComplete30QuestionScreen}
      />
      <Screen name='TriviaResult' component={TriviaResultScreen} />
    </Navigator>
  );
};
