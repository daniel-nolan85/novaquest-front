import { Modal, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import {
  ModalWrapper,
  ModalView,
  AnimationWrapper,
  Score,
  Explanation,
  Option,
  OptionText,
} from '../styles/trivia-modal.styles';

export const TriviaModal = ({
  visible,
  handleNext,
  handleFinish,
  correct,
  questionNum,
  questionsAmount,
  score,
  correctExplanation,
  incorrectExplanation,
}) => {
  return (
    <SafeArea>
      <Modal visible={visible} transparent={true} animationType='slide'>
        <ModalWrapper>
          <ModalView>
            <AnimationWrapper>
              <LottieView
                key='animation'
                autoPlay
                loop
                resizeMode='cover'
                source={
                  correct
                    ? require('../../../../../assets/correct.json')
                    : require('../../../../../assets/incorrect.json')
                }
              />
            </AnimationWrapper>
            <Score variant='title'>{score} points</Score>
            <ScrollView>
              {correct ? (
                <Explanation variant='body'>{correctExplanation}</Explanation>
              ) : (
                <Explanation variant='body'>{incorrectExplanation}</Explanation>
              )}
              {questionNum < questionsAmount - 1 && (
                <Option onPress={handleNext}>
                  <OptionText>Next</OptionText>
                </Option>
              )}
              {questionNum === questionsAmount - 1 && (
                <Option onPress={handleFinish}>
                  <OptionText>Show results</OptionText>
                </Option>
              )}
            </ScrollView>
          </ModalView>
        </ModalWrapper>
      </Modal>
    </SafeArea>
  );
};
