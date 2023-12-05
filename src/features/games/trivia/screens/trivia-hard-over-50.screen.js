import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import GalacticSage from '../../../../../assets/svg/badges/galactic-sage.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TriviaHardScoreOver50Screen = ({ navigation, route }) => {
  const { navigate } = navigation;
  let additionalAchievements = route.params?.additionalAchievements || [];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedGalacticSage')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedGalacticSage: res.data.achievedGalacticSage,
          },
        });
        if (additionalAchievements.length > 1) {
          const firstAchievement = additionalAchievements[0];
          additionalAchievements = additionalAchievements.slice(1);
          navigate(firstAchievement, { additionalAchievements });
        } else if (additionalAchievements.length === 1) {
          navigate(additionalAchievements[0]);
        } else {
          navigate('TriviaResult');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<GalacticSage width={380} height={380} />}
        title='Galactic Sage'
        body={`Astounding wisdom, Commander ${user.name}! The 'Galactic Sage' badge is bestowed upon you for scoring more than 50% as a Galactic Guardian, showcasing your mastery of cosmic trivia. Your profound understanding of the cosmos propels you into the echelons of cosmic sages.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
