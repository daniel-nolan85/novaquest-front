import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../requests/user';
import { BadgeAnimation } from '../../../components/animations/badge.animation';
import CelestialContributor from '../../../../assets/svg/badges/celestial-contributor.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FirstPostScreen = ({ navigation }) => {
  const { goBack } = navigation;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedCelestialContributor')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedCelestialContributor: res.data.achievedCelestialContributor,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<CelestialContributor width={380} height={380} />}
        title='Celestial Contributor'
        body={`${user.rank} ${user.name}, your cosmic voice echoes across the galaxy! With your inaugural post, you've officially joined the celestial chorus, contributing your unique melody to the cosmic symphony.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
