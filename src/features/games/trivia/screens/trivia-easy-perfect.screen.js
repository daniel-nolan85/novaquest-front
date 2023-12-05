import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import Scholar from '../../../../../assets/svg/badges/scholar.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TriviaPerfectEasyScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  let additionalAchievements = route.params?.additionalAchievements || [];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedNovaScholar')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedNovaScholar: res.data.achievedNovaScholar,
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
        svg={<Scholar width={380} height={380} />}
        title='Nova Scholar'
        body={`Flawless brilliance, Commander ${user.name}! The 'Nova Scholar' badge illuminates your achievement of scoring 100% as a Lunar Learner, demonstrating your cosmic insight. Your intellect shines like a cosmic beacon, casting light on the mysteries of the universe.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
