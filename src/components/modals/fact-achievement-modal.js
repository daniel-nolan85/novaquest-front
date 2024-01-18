import { Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../requests/user';
import { BadgeAnimation } from '../animations/badge.animation';
import { SafeArea } from '../utils/safe-area.component';
import CelestialSavant from '../../../assets/svg/badges/celestial-savant.svg';

const ModalWrapper = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  z-index: 999;
`;

const ModalView = styled.View`
  background-color: white;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  align-items: center;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2px;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FactAchievementModal = ({
  showFactAchievement,
  handleAchievementClose,
}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

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
      <Modal
        visible={showFactAchievement}
        // transparent={true}
        animationType='slide'
      >
        {/* <ModalWrapper> */}
        {/* <ModalView> */}
        {user && (
          <BadgeContainer>
            <BadgeAnimation
              svg={<CelestialSavant width={380} height={380} />}
              title='Celestial Savant'
              body={`${user.rank} ${user.name}, you've achieved the 'Celestial Savant' badge! By delving into space facts 100 times, your cosmic knowledge has reached unparalleled heights. Your curiosity about the universe knows no bounds!`}
              handleSubmit={handleSubmit}
            />
          </BadgeContainer>
        )}
        {/* </ModalView>*/}
        {/* </ModalWrapper> */}
      </Modal>
    </SafeArea>
  );
};
