import LottieView from 'lottie-react-native';
import {
  ResultsContainer,
  AnimationWrapper,
  Score,
  Result,
  Option,
  OptionText,
} from '../styles/trivia-result.styles';
import { SafeArea } from '../../../../components/utils/safe-area.component';

export const TriviaResultScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { score, setOkTyping, setShowOk, questionsAmount } = route.params;

  const maxPossibleScore = questionsAmount * 10;
  const scorePercentage = (score / maxPossibleScore) * 100;
  const resultBanner =
    scorePercentage === 100
      ? require('../../../../../assets/landed.json')
      : scorePercentage < 100 && scorePercentage > 40
      ? require('../../../../../assets/flying.json')
      : require('../../../../../assets/crash.json');
  const resultText =
    scorePercentage === 100
      ? "Outstanding, Commander! You've successfully completed your cosmic mission with flying colors. Your knowledge of the universe is unparalleled, and you've proven yourself as a true cosmic explorer. The stars themselves applaud your stellar achievements. Until our next cosmic adventure, revel in the cosmic glory you've earned!"
      : scorePercentage < 100 && scorePercentage > 40
      ? "Well done, Commander! You've skillfully navigated the perils of our cosmic journey, demonstrating a solid understanding of the celestial realm. However, there's always room for improvement as we strive for greater cosmic knowledge. Keep exploring, and soon you'll be an unparalleled master of the universe!"
      : "Commander, it seems we've encountered a few cosmic bumps along the way, and we've crash-landed in an unknown celestial location. But fear not, even in the face of challenges, your determination to explore the universe is commendable. Ready for another attempt? The stars await your next cosmic adventure!";

  return (
    <SafeArea>
      <ResultsContainer>
        <Score variant='title'>You scored {score} points!</Score>
        <AnimationWrapper>
          <LottieView
            key='animation'
            autoPlay
            loop
            resizeMode='cover'
            source={resultBanner}
          />
        </AnimationWrapper>
        <Result variant='body'>{resultText}</Result>
        <Option
          onPress={() => {
            setOkTyping(true);
            setShowOk(true);
            navigate('TriviaSetup');
          }}
        >
          <OptionText>Play Again</OptionText>
        </Option>
      </ResultsContainer>
    </SafeArea>
  );
};
