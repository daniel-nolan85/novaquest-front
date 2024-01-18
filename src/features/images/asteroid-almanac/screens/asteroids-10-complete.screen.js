import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import AsteroidScholar from '../../../../../assets/svg/badges/asteroid-scholar.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Asteroids10CompleteScreen = ({ navigation }) => {
  const { goBack } = navigation;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedAsteroidScholar')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedAsteroidScholar: res.data.achievedAsteroidScholar,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<AsteroidScholar width={380} height={380} />}
        title='Asteroid Scholar'
        body={`${user.rank} ${user.name}, you've earned the 'Asteroid Scholar' badge! By exploring the Asteroid Almanac 10 times, you've demonstrated your commitment to understanding the celestial bodies that venture close to Earth. Your cosmic knowledge is reaching new heights!`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
