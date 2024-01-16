import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import GalacticAviator from '../../../../../assets/svg/badges/galactic-aviator.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AstroScoreOver500Screen = ({ navigation, route }) => {
  const { navigate } = navigation;
  let additionalAchievements = route.params?.additionalAchievements || [];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedGalacticAviator')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedGalacticAviator: res.data.achievedGalacticAviator,
          },
        });
      })
      .catch((err) => console.error(err));
    if (additionalAchievements.length > 1) {
      const firstAchievement = additionalAchievements[0];
      additionalAchievements = additionalAchievements.slice(1);
      navigate(firstAchievement, { additionalAchievements });
    } else if (additionalAchievements.length === 1) {
      navigate(additionalAchievements[0]);
    } else {
      navigate('AstroAviatorGame');
    }
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<GalacticAviator width={380} height={380} />}
        title='Galactic Aviator'
        body={`Incredible! You've become the 'Galactic Aviator' by navigating the asteroid storm and scoring an astronomical 500 points. The cosmos applauds your prowess as a true space pilot!`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
