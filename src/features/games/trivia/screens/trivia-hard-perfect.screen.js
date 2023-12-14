import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import Supernova from '../../../../../assets/svg/badges/supernova.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TriviaPerfectHardScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  let additionalAchievements = route.params?.additionalAchievements || [];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (user.role !== 'guest') {
      badgeUnlocked(user.token, user._id, 'achievedSupernovaSavant')
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              achievedSupernovaSavant: res.data.achievedSupernovaSavant,
            },
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          ...user,
          achievedSupernovaSavant: true,
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
        svg={<Supernova width={380} height={380} />}
        title='Supernova Savant'
        body={`Unparalleled brilliance, Commander ${user.name}! As a 'Supernova Savant,' you've achieved a perfect score as a Galactic Guardian, cementing your status as a cosmic sage. Your intellect blazes with the intensity of a supernova, illuminating the cosmos with your knowledge.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
