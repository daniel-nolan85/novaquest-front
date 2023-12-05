import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import StarNavigator from '../../../../../assets/svg/badges/star-navigator.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TriviaMediumScoreOver50Screen = ({ navigation, route }) => {
  const { navigate } = navigation;
  let additionalAchievements = route.params?.additionalAchievements || [];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedStarNavigator')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedStarNavigator: res.data.achievedStarNavigator,
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
        svg={<StarNavigator width={380} height={380} />}
        title='Star Navigator'
        body={`Impressive navigation, Commander ${user.name}! You've achieved the 'Star Navigator' badge by scoring more than 50% as a Solar Seeker, showcasing your cosmic knowledge. Your expertise in celestial navigation guides you through the intricate realms of space.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
