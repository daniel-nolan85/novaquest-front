import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../requests/user';
import { BadgeAnimation } from '../../../components/animations/badge.animation';
import CelestialContributor from '../../../../assets/svg/badges/celestial-contributor.svg';
import { XPProgressAnimation } from '../../../components/animations/xp-progress.animation';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FirstPostScreen = ({ navigation }) => {
  const [showXP, setShowXP] = useState(false);
  const [initialXP, setInitialXP] = useState(0);

  const { goBack } = navigation;

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
    badgeUnlocked(user.token, user._id, 'achievedCelestialContributor')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedCelestialContributor: res.data.achievedCelestialContributor,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<CelestialContributor width={380} height={380} />}
        title='Celestial Contributor'
        body={`${user.rank} ${user.name}, your cosmic voice echoes across the galaxy! With your inaugural post, you've officially joined the celestial chorus, contributing your unique melody to the cosmic symphony.`}
        handleSubmit={handleSubmit}
      />
      {showXP && (
        <XPProgressAnimation
          earnedXP={150}
          showXP={showXP}
          initialXP={initialXP}
        />
      )}
    </BadgeContainer>
  );
};
