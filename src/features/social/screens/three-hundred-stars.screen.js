import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../requests/user';
import { BadgeAnimation } from '../../../components/animations/badge.animation';
import StellarSupporter from '../../../../assets/svg/badges/stellar-supporter.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ThreeHundredStarsScreen = ({ navigation }) => {
  const { goBack } = navigation;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedStellarSupporter')
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedStellarSupporter: res.data.achievedStellarSupporter,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<StellarSupporter width={380} height={380} />}
        title='Stellar Supporter'
        body={`${user.rank} ${user.name}, your cosmic generosity knows no bounds! As a Stellar Supporter, you've bestowed your celestial glow on 300 posts, lighting up the cosmic community with your appreciation.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
