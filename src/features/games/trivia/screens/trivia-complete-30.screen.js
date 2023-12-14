import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import Infinity from '../../../../../assets/svg/badges/infinity.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TriviaComplete30QuestionScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  let additionalAchievements = route.params?.additionalAchievements || [];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (user.role !== 'guest') {
      badgeUnlocked(user.token, user._id, 'achievedInfinityVoyager')
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              achievedInfinityVoyager: res.data.achievedInfinityVoyager,
            },
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          ...user,
          achievedInfinityVoyager: true,
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
        svg={<Infinity width={380} height={380} />}
        title='InfinityVoyager'
        body={`Remarkable resilience, Commander ${user.name}! You've conquered the 'Infinity Voyager' badge by navigating through an Infinity Expedition, exploring the cosmos of knowledge. Your unwavering commitment to cosmic exploration knows no bounds.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
