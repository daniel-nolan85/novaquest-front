import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../requests/user';
import { BadgeAnimation } from '../../../components/animations/badge.animation';
import CosmicPersona from '../../../../assets/svg/badges/cosmic-persona.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FirstProfileImageScreen = ({ navigation }) => {
  const { goBack } = navigation;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedCosmicPersona')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedCosmicPersona: res.data.achievedCosmicPersona,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<CosmicPersona width={380} height={380} />}
        title='Cosmic Persona'
        body={`${user.rank} ${user.name},  you've earned the 'Cosmic Persona' badge! By updating your profile image, you've personalized your cosmic identity. Show the universe your unique presence in this celestial community!`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
