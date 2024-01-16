import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../requests/user';
import { BadgeAnimation } from '../../../components/animations/badge.animation';
import CosmicChronicler from '../../../../assets/svg/badges/cosmic-chronicler.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TwoHundredFiftiethPostScreen = ({ navigation }) => {
  const { goBack } = navigation;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedCosmicChronicler')
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedCosmicChronicler: res.data.achievedCosmicChronicler,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<CosmicChronicler width={380} height={380} />}
        title='Cosmic Chronicler'
        body={`${user.rank} ${user.name}, your cosmic chronicles are a saga of exploration and wonder! With your 250th post, you've earned the esteemed title of Cosmic Chronicler, documenting the cosmic tapestry in unparalleled detail.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
