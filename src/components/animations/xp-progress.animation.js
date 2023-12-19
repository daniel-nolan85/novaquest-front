import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from '../typography/text.component';
import { SafeArea } from '../utils/safe-area.component';
import { awardXP } from '../../requests/user';
import ranks from '../../services/ranks/ranks.json';

export const XPProgressAnimation = ({ earnedXP, showXP }) => {
  const [completed, setCompleted] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  console.log('user => ', user.xp);

  useEffect(() => {
    if (!completed && showXP) {
      animateProgressBar();
    }
  }, [earnedXP, completed]);

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
        } else if (progressPercentage === 1) {
          console.log('Progress bar filled completely! Do something...');
          setCompleted(true);
          setTimeout(() => {
            setCompleted(true);
            progress.setValue(0);
          }, 2000);
        }
        if (user.role !== 'guest') {
          awardXP(user.token, user._id, earnedXP)
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
      }
    });
  };

  return (
    <SafeArea style={styles.container}>
      <Text variant='title' style={styles.progressText}>
        +{earnedXP} XP
      </Text>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    width: '80%',
  },
  progressText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#009999',
    borderRadius: 10,
  },
});
