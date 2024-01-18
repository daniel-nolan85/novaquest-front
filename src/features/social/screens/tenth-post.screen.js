import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../requests/user';
import { BadgeAnimation } from '../../../components/animations/badge.animation';
import ProlificExplorer from '../../../../assets/svg/badges/prolific-explorer.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TenthPostScreen = ({ navigation }) => {
  const { goBack } = navigation;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedProlificExplorer')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedProlificExplorer: res.data.achievedProlificExplorer,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<ProlificExplorer width={380} height={380} />}
        title='Prolific Explorer'
        body={`Astounding, ${user.rank} ${user.name}! Your cosmic journey is vividly documented with your 10th post. You've become a Prolific Explorer, leaving a trail of cosmic tales and discoveries for others to follow.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
