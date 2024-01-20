import { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../requests/user';
import { BadgeAnimation } from '../animations/badge.animation';
import { SafeArea } from '../utils/safe-area.component';
import CelestialSavant from '../../../assets/svg/badges/celestial-savant.svg';
import { XPProgressAnimation } from '../animations/xp-progress.animation';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FactAchievementModal = ({
  showFactAchievement,
  handleAchievementClose,
}) => {
  const [showXP, setShowXP] = useState(false);
  const [initialXP, setInitialXP] = useState(0);

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
    badgeUnlocked(user.token, user._id, 'achievedCelestialSavant')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedCelestialSavant: res.data.achievedCelestialSavant,
          },
        });
      })
      .catch((err) => console.error(err));
    handleAchievementClose();
  };

  return (
    <SafeArea>
      <Modal visible={showFactAchievement} animationType='slide'>
        {user && (
          <BadgeContainer>
            <BadgeAnimation
              svg={<CelestialSavant width={380} height={380} />}
              title='Celestial Savant'
              body={`${user.rank} ${user.name}, you've achieved the 'Celestial Savant' badge! By delving into space facts 100 times, your cosmic knowledge has reached unparalleled heights. Your curiosity about the universe knows no bounds!`}
              handleSubmit={handleSubmit}
            />
            {showXP && (
              <XPProgressAnimation
                earnedXP={250}
                showXP={showXP}
                initialXP={initialXP}
              />
            )}
          </BadgeContainer>
        )}
      </Modal>
    </SafeArea>
  );
};
