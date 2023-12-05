import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import LightSpeed from '../../../../../assets/svg/badges/light-speed.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TriviaComplete10QuestionScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  let additionalAchievements = route.params?.additionalAchievements || [];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedLightSpeedExplorer')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedLightSpeedExplorer: res.data.achievedLightSpeedExplorer,
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
        svg={<LightSpeed width={380} height={380} />}
        title='Light Speed Explorer'
        body={`Efficiency at its best, Commander ${user.name}! The 'Light Speed Explorer' badge is yours for navigating and completing a Cosmic Quickstep with stellar speed. Your swift cosmic exploration defies the limits of time and space!`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
