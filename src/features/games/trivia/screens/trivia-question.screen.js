import { useState, useEffect, useRef, useContext } from 'react';
import { Animated } from 'react-native';
import { useSelector } from 'react-redux';
import data from '../../../../services/trivia/trivia.data.json';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { TriviaQuestionCard } from '../components/trivia-question-card.component';
import { ProgressBar } from '../components/trivia-progress-bar.component';
import { TriviaModal } from '../components/trivia-modal.component';
import { checkTriviaAchievements } from '../../../../requests/user';
import { GamesContext } from '../../../../services/games/games.context';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const TriviaQuestionScreen = ({ navigation, route }) => {
  const { difficulty, duration } = route.params;

  const [questions, setQuestions] = useState();
  const [questionNum, setQuestionNum] = useState(0);
  const [level, setLevel] = useState('');
  const [options, setOptions] = useState([]);
  const [progress] = useState(new Animated.Value(0));
  const [progressPercent, setProgressPercent] = useState('');
  const [visible, setVisible] = useState(false);
  const [correct, setCorrect] = useState(false);

  const { score, setScore, questionsAmount, setQuestionsAmount } =
    useContext(GamesContext);

  useEffect(() => {
    setLevel(difficulty);
    setQuestionsAmount(duration);
  }, []);

  useEffect(() => {
    if (level && questionsAmount) {
      getQuiz();
      const pp = (100 / questionsAmount).toFixed(2) + '%';
      setProgressPercent(pp);
    }
  }, [level, questionsAmount]);

  const { user } = useSelector((state) => ({ ...state }));

  const scrollRef = useRef();

  const getQuiz = () => {
    const getRandomQuestions = () => {
      const qs = [...data.data];
      const filteredQuestions = qs.filter(
        (question) => question.difficulty === level
      );

      if (filteredQuestions.length < questionsAmount) {
        console.error(`Not enough questions with difficulty '${level}'`);
        return;
      }

      const randomQuestions = [];
      for (let i = 0; i < questionsAmount; i++) {
        const randomIndex = Math.floor(
          Math.random() * filteredQuestions.length
        );
        randomQuestions.push(filteredQuestions.splice(randomIndex, 1)[0]);
      }

      setQuestions(randomQuestions);
      setOptions(generateOptionsAndShuffle(randomQuestions[0]));
    };

    getRandomQuestions();
  };

  const generateOptionsAndShuffle = (_question) => {
    const options = [..._question.incorrectAnswers];
    options.push(_question.correctAnswer);
    shuffleArray(options);
    return options;
  };

  const handleSelectedOption = (_option) => {
    setVisible(true);
    if (_option === questions[questionNum].correctAnswer) {
      setScore(score + 10);
      setCorrect(true);
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: 0, y: 0, animated: false });
    }
    setVisible(false);
    setCorrect(false);
    setQuestionNum(questionNum + 1);
    setOptions(generateOptionsAndShuffle(questions[questionNum + 1]));
    Animated.timing(progress, {
      toValue: questionNum + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handleFinish = async () => {
    await checkTriviaAchievements(
      user.token,
      user._id,
      user.role,
      score,
      level,
      questionsAmount
    )
      .then((res) => {
        if (res.data.achievement) {
          navigate(res.data.achievement);
        } else if (res.data.simultaneousAchievements) {
          const firstAchievement = res.data.simultaneousAchievements[0];
          const additionalAchievements =
            res.data.simultaneousAchievements.slice(1);
          navigate(firstAchievement, { additionalAchievements });
        } else if (res.data.noAchievements) {
          navigate('TriviaResult');
        }
      })
      .catch((err) => console.error(err));
    setTimeout(() => {
      setVisible(false);
      setCorrect(false);
    }, 500);
  };

  const { navigate } = navigation;

  return (
    <SafeArea style={{ flex: 1 }}>
      {progressPercent && (
        <ProgressBar
          progress={progress}
          questionsAmount={questionsAmount}
          progressPercent={progressPercent}
        />
      )}
      {questions && (
        <>
          <TriviaQuestionCard
            question={questions[questionNum].question}
            options={options}
            image={questions[questionNum].image}
            handleSelectedOption={handleSelectedOption}
            scrollRef={scrollRef}
          />
          <TriviaModal
            visible={visible}
            setVisible={setVisible}
            handleNext={handleNext}
            handleFinish={handleFinish}
            correct={correct}
            questionNum={questionNum}
            questionsAmount={questionsAmount}
            score={score}
            correctExplanation={questions[questionNum].correctExplanation}
            incorrectExplanation={questions[questionNum].incorrectExplanation}
          />
        </>
      )}
    </SafeArea>
  );
};
