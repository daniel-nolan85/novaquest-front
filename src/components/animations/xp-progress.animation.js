import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AnimateNumber from 'react-native-countup';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../typography/text.component';
import { SafeArea } from '../utils/safe-area.component';
import { awardXP } from '../../requests/user';
import ranks from '../../services/ranks/ranks.json';
import { RankUpModal } from '../modals/rank-up.modal';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const AnimationContainer = styled(SafeArea)`
  position: absolute;
  top: 60px;
  width: 80%;
`;
const ProgressText = styled(Text)`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;
const ProgressBarContainer = styled.View`
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
`;
const GradientProgressBar = styled(AnimatedLinearGradient)`
  height: 100%;
  border-radius: 10px;
`;
// const ProgressBar = styled(Animated.View)`
//   height: 100%;
//   background-color: #009999;
//   border-radius: 10px;
// `;
const NumberContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const NumberText = styled(Text)`
  color: #009999;
  margin-top: 10px;
  margin-left: 10px;
`;

export const XPProgressAnimation = ({ earnedXP, showXP }) => {
  const [completed, setCompleted] = useState(false);
  const [progAnimated, setProgAnimated] = useState(false);
  const [numAnimated, setNumAnimated] = useState(false);
  const [initialXP, setInitialXP] = useState(0);
  const [rankUp, setRankUp] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.xp) {
      setInitialXP(user.xp);
    }
  }, []);

  useEffect(() => {
    if (!completed && showXP) {
      animateProgressBar();
    }
  }, [earnedXP, completed]);

  useEffect(() => {
    if (progAnimated && numAnimated) {
      updateXP();
    }
  }, [progAnimated && numAnimated]);

  const progress = useRef(new Animated.Value(0)).current;

  let currentRank = ranks.find((r) => r.name === user.rank);
  let currentRankIndex = ranks.findIndex((r) => r.name === user.rank);
  let rankRange = 0;

  if (currentRank) {
    const nextRank = ranks[currentRankIndex + 1];
    if (nextRank) {
      rankRange = nextRank.requiredXP - currentRank.requiredXP;
    }
  }

  const animateProgressBar = () => {
    const targetXP = user.xp + earnedXP;
    const relativeXP = targetXP - currentRank.requiredXP;
    const progressPercentage = rankRange !== 0 ? relativeXP / rankRange : 1;

    Animated.timing(progress, {
      toValue: Math.min(progressPercentage, 1),
      duration: 1000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        if (progressPercentage > 1) {
          const remainder = progressPercentage - 1;
          currentRankIndex++;
          currentRank = ranks[currentRankIndex];
          const newRankRange =
            ranks[currentRankIndex + 1].requiredXP - currentRank.requiredXP;
          const totalRange = ranks
            .slice(currentRankIndex, currentRankIndex + 2)
            .reduce((sum, r) => sum + r.requiredXP, 0);
          const originalRemainderXP = remainder * rankRange;
          const adjustedRemainderXP =
            (originalRemainderXP / rankRange) * newRankRange;
          const remainderPercentage =
            newRankRange !== 0 ? adjustedRemainderXP / totalRange : 0;
          const roundedRemainderPercentage = Number(
            remainderPercentage.toFixed(2)
          );
          Animated.sequence([
            Animated.timing(progress, {
              toValue: 0,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(progress, {
              toValue: roundedRemainderPercentage,
              duration: 1000,
              useNativeDriver: false,
            }),
          ]).start(() => {
            setCompleted(false);
          });
          setRankUp(true);
        } else if (progressPercentage === 1) {
          setCompleted(true);
          setRankUp(true);
          progress.setValue(0);
        }
        setProgAnimated(true);
      }
    });
  };

  const updateXP = async () => {
    setProgAnimated(false);
    setNumAnimated(false);
    if (user.role !== 'guest') {
      await awardXP(user.token, user._id, earnedXP)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              xp: res.data.xp,
            },
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          ...user,
          xp: user.xp + earnedXP,
        },
      });
    }
  };

  return (
    <AnimationContainer>
      <ProgressText variant='title'>+{earnedXP} XP</ProgressText>
      <ProgressBarContainer>
        <GradientProgressBar
          colors={['#009999', '#00cccc']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </ProgressBarContainer>
      <NumberContainer>
        <AnimateNumber
          initial={initialXP}
          value={initialXP + earnedXP}
          duration={2000}
          countBy={1}
          onFinish={() => setNumAnimated(true)}
          style={{
            fontFamily: 'Audiowide_400Regular',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#009999',
            marginTop: 10,
          }}
        />
        <NumberText variant='title'>XP</NumberText>
      </NumberContainer>
      <RankUpModal rankUp={rankUp} setRankUp={setRankUp} />
    </AnimationContainer>
  );
};