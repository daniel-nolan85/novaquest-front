import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import AstroAce from '../../../../../assets/svg/badges/astro-ace.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const AstroScoreOver100Screen = ({ navigation, route }) => {
  const { navigate } = navigation;
  let additionalAchievements = route.params?.additionalAchievements || [];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedAstroAce')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedAstroAce: res.data.achievedAstroAce,
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
        svg={<AstroAce width={380} height={380} />}
        title='Astro Ace'
        body={`Astounding maneuvers! You're now the 'Astro Ace,' mastering the art of evasion with a cosmic score of 100. Asteroids can't keep up with your swift flight through the cosmic realm!`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
