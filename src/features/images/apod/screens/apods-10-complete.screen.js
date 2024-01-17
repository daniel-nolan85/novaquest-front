import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import CosmicObserver from '../../../../../assets/svg/badges/cosmic-observer.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Apods10CompleteScreen = ({ navigation }) => {
  const { goBack } = navigation;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedCosmicObserver')
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedCosmicObserver: res.data.achievedCosmicObserver,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<CosmicObserver width={380} height={380} />}
        title='Cosmic Observer'
        body={`${user.rank} ${user.name}, your keen eye for the cosmos has earned you the 'Cosmic Observer' badge. Gaze upon the wonders of the universe with each Astronomy Picture of the Day, and let the cosmic beauty inspire your celestial journey!`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
