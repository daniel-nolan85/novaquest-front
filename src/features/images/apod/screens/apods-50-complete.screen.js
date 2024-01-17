import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import NebulaGazer from '../../../../../assets/svg/badges/nebula-gazer.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Apods50CompleteScreen = ({ navigation }) => {
  const { goBack } = navigation;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedNebulaGazer')
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedNebulaGazer: res.data.achievedNebulaGazer,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<NebulaGazer width={380} height={380} />}
        title='Nebula Gazer'
        body={`${user.rank} ${user.name}, congratulations on reaching the 'Nebula Gazer' status! You've delved into the cosmic depths with 50 Astronomy Pictures of the Day, absorbing the mesmerizing beauty of distant galaxies and nebulae.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
