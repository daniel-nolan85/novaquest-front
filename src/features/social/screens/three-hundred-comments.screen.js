import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../requests/user';
import { BadgeAnimation } from '../../../components/animations/badge.animation';
import CosmicConversationalist from '../../../../assets/svg/badges/cosmic-conversationalist.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ThreeHundredCommentsScreen = ({ navigation }) => {
  const { goBack } = navigation;

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedCosmicConversationalist')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedCosmicConversationalist:
              res.data.achievedCosmicConversationalist,
          },
        });
      })
      .catch((err) => console.error(err));
    goBack();
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<CosmicConversationalist width={380} height={380} />}
        title='Cosmic Conversationalist'
        body={`In the grand cosmic dialogue, ${user.rank} ${user.name}, your voice resonates! With 300 comments, you've earned the title of Celestial Conversationalist, weaving your thoughts into the cosmic tapestry.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
