import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import GalacticPlanetologist from '../../../../../assets/svg/badges/galactic-planetologist.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PlanetsAllCompleteScreen = ({ navigation }) => {
  const { goBack } = navigation;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedGalacticPlanetologist')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedGalacticPlanetologist:
              res.data.achievedGalacticPlanetologist,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<GalacticPlanetologist width={380} height={380} />}
        title='Galactic Planetologist'
        body={`Celestial Scholar, your journey through the Planetarium is a testament to your astronomical curiosity. As a 'Galactic Planetologist,' you've explored the intricate details of every planet and dwarf in our cosmic neighborhood!`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
