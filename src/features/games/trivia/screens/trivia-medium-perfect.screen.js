import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import Quasar from '../../../../../assets/svg/badges/quasar.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TriviaPerfectMediumScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  let additionalAchievements = route.params?.additionalAchievements || [];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedQuasarVirtuoso')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedQuasarVirtuoso: res.data.achievedQuasarVirtuoso,
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
        svg={<Quasar width={380} height={380} />}
        title='Quasar Virtuoso'
        body={`Outstanding performance, Commander ${user.name}! The 'Quasar Virtuoso' badge recognizes your stellar score of 100% as a Solar Seeker, showcasing your cosmic expertise. Your mastery of celestial knowledge is akin to the brilliance of distant quasars.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
