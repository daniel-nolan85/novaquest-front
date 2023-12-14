import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../requests/user';
import { BadgeAnimation } from '../../../components/animations/badge.animation';
import RocketLaunch from '../../../../assets/svg/badges/rocket-launch.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const WelcomeCompleteScreen = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (user.role !== 'guest') {
      badgeUnlocked(user.token, user._id, 'achievedCosmicPioneer')
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              achievedCosmicPioneer: res.data.achievedCosmicPioneer,
            },
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          ...user,
          achievedCosmicPioneer: true,
        },
      });
    }
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<RocketLaunch width={380} height={380} />}
        title='Cosmic Pioneer'
        body={`Congratulations, Commander ${user.name}! You've earned the illustrious 'Cosmic Pioneer' badge, signifying the launch of your extraordinary journey through the cosmos. Like a rocket soaring into the vast unknown, you've just begun to explore the wonders that await. May your celestial adventure be as limitless as the cosmos itself. Onward and upward, Cosmic Pioneer!`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
