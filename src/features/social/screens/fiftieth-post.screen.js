import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../requests/user';
import { BadgeAnimation } from '../../../components/animations/badge.animation';
import GalaxyLuminary from '../../../../assets/svg/badges/galaxy-luminary.svg';
import { XPProgressAnimation } from '../../../components/animations/xp-progress.animation';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FiftiethPostScreen = ({ navigation }) => {
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
    badgeUnlocked(user.token, user._id, 'achievedGalaxyLuminary')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedGalaxyLuminary: res.data.achievedGalaxyLuminary,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<GalaxyLuminary width={380} height={380} />}
        title='Galaxy Luminary'
        body={`A celestial beacon in the vastness of space, ${user.rank} ${user.name}! Your 50th post marks you as a true Galaxy Luminary, illuminating the cosmos with your insights and creativity.`}
        handleSubmit={handleSubmit}
      />
      {showXP && (
        <XPProgressAnimation
          earnedXP={500}
          showXP={showXP}
          initialXP={initialXP}
        />
      )}
    </BadgeContainer>
  );
};
