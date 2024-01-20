import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import CosmicCadet from '../../../../../assets/svg/badges/cosmic-cadet.svg';
import { XPProgressAnimation } from '../../../../components/animations/xp-progress.animation';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TriviaEasyScoreOver50Screen = ({ navigation, route }) => {
  const [showXP, setShowXP] = useState(false);
  const [initialXP, setInitialXP] = useState(0);

  const { navigate } = navigation;
  let additionalAchievements = route.params?.additionalAchievements || [];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.xp) {
      setInitialXP(user.xp);
    }
  }, []);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setShowXP(true);
    }, 4000);

    return () => clearTimeout(delayTimeout);
  }, []);

  const handleSubmit = () => {
    if (user.role !== 'guest') {
      badgeUnlocked(user.token, user._id, 'achievedCosmicCadet')
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              achievedCosmicCadet: res.data.achievedCosmicCadet,
            },
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          ...user,
          achievedCosmicCadet: true,
        },
      });
    }
    if (additionalAchievements.length > 1) {
      const firstAchievement = additionalAchievements[0];
      additionalAchievements = additionalAchievements.slice(1);
      navigate(firstAchievement, { additionalAchievements });
    } else if (additionalAchievements.length === 1) {
      navigate(additionalAchievements[0]);
    } else {
      navigate('TriviaResult');
    }
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<CosmicCadet width={380} height={380} />}
        title='Cosmic Cadet'
        body={`Welcome to the quiz cosmos, Commander ${user.name}! Your celestial journey begins with the 'Cosmic Cadet' badge, awarded for scoring more than 50% as a Lunar Learner. Your cosmic insight is a beacon that lights up the vast expanse of knowledge!`}
        handleSubmit={handleSubmit}
      />
      {showXP && (
        <XPProgressAnimation
          earnedXP={100}
          showXP={showXP}
          initialXP={initialXP}
        />
      )}
    </BadgeContainer>
  );
};
