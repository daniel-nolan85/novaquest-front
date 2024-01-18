import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import GalacticVisionary from '../../../../../assets/svg/badges/galactic-visionary.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Apods250CompleteScreen = ({ navigation }) => {
  const { goBack } = navigation;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedGalacticVisionary')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedGalacticVisionary: res.data.achievedGalacticVisionary,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<GalacticVisionary width={380} height={380} />}
        title='Galactic Visionary'
        body={`${user.rank} ${user.name}, you've achieved the 'Galactic Visionary' badge! Your cosmic journey unfolds as you absorb the celestial spectacle in 250 Astronomy Pictures of the Day, expanding your understanding of the vast cosmic tapestry.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
