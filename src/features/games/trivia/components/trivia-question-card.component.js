import { ScrollView } from 'react-native';
import { Text } from '../../../../components/typography/text.component';
import {
  QuestionCard,
  QuestionCardCover,
  Question,
  Answers,
  Option,
  OptionText,
} from '../styles/trivia-question-card.styles';
import { SafeArea } from '../../../../components/utils/safe-area.component';

export const TriviaQuestionCard = ({
  question,
  options,
  image,
  handleSelectedOption,
  scrollRef,
}) => {
  return (
    <SafeArea>
      <QuestionCard>
        <QuestionCardCover key={question} source={{ uri: image }} />
        <ScrollView ref={scrollRef}>
          <Question>
            <Text variant='title'>{question}</Text>
          </Question>
          <Answers>
            <Option onPress={() => handleSelectedOption(options[0])}>
              <OptionText>{options[0]}</OptionText>
            </Option>
            <Option onPress={() => handleSelectedOption(options[1])}>
              <OptionText>{options[1]}</OptionText>
            </Option>
            <Option onPress={() => handleSelectedOption(options[2])}>
              <OptionText>{options[2]}</OptionText>
            </Option>
            <Option onPress={() => handleSelectedOption(options[3])}>
              <OptionText>{options[3]}</OptionText>
            </Option>
          </Answers>
        </ScrollView>
      </QuestionCard>
    </SafeArea>
  );
};
