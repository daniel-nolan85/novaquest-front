import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import Quasar from '../../../../../assets/svg/badges/quasar.svg';
import { XPProgressAnimation } from '../../../../components/animations/xp-progress.animation';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TriviaPerfectMediumScreen = ({ navigation, route }) => {
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
      badgeUnlocked(user.token, user._id, 'achievedQuasarVirtuoso')
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              achievedQuasarVirtuoso: res.data.achievedQuasarVirtuoso,
            },
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          ...user,
          achievedQuasarVirtuoso: true,
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
        svg={<Quasar width={380} height={380} />}
        title='Quasar Virtuoso'
        body={`Outstanding performance, Commander ${user.name}! The 'Quasar Virtuoso' badge recognizes your stellar score of 100% as a Solar Seeker, showcasing your cosmic expertise. Your mastery of celestial knowledge is akin to the brilliance of distant quasars.`}
        handleSubmit={handleSubmit}
      />
      {showXP && (
        <XPProgressAnimation
          earnedXP={300}
          showXP={showXP}
          initialXP={initialXP}
        />
      )}
    </BadgeContainer>
  );
};
