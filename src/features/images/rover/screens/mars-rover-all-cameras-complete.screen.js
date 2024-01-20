import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import RoverCamera from '../../../../../assets/svg/badges/rover-camera.svg';
import { XPProgressAnimation } from '../../../../components/animations/xp-progress.animation';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MarsRoverAllCamerasCompleteScreen = ({ navigation, route }) => {
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
      badgeUnlocked(user.token, user._id, 'achievedMartianLensMaster')
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              achievedMartianLensMaster: res.data.achievedMartianLensMaster,
            },
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          ...user,
          achievedMartianLensMaster: true,
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
      navigate('MarsRoverImagesScreen');
    }
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<RoverCamera width={380} height={380} />}
        title='Martian Lens Master'
        body={`Commander ${user.name}, congratulations on achieving the title of 'Martian Lens Master'! By thoroughly exploring every available camera on each Martian rover, you've become a virtuoso of Martian observation. Your keen eye for detail has unlocked the secrets of the Red Planet's landscapes.`}
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
