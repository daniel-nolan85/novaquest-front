import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import RoverCalendar from '../../../../../assets/svg/badges/rover-calendar.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MarsRoverAllDateTypesCompleteScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  let additionalAchievements = route.params?.additionalAchievements || [];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedCosmicChronologist')
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedCosmicChronologist: res.data.achievedCosmicChronologist,
          },
        });
        if (additionalAchievements.length > 1) {
          const firstAchievement = additionalAchievements[0];
          additionalAchievements = additionalAchievements.slice(1);
          navigate(firstAchievement, { additionalAchievements });
        } else if (additionalAchievements.length === 1) {
          navigate(additionalAchievements[0]);
        } else {
          navigate('MarsRoverImagesScreen');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<RoverCalendar width={512} height={512} />}
        title='Cosmic Chronologist'
        body={`Commander ${user.name}, you've reached the distinguished rank of 'Cosmic Chronologist'! By seamlessly navigating both Earth dates and Martian sols in your Mars rover camera searches, you've become a master of temporal exploration. Your ability to traverse time and space sets you apart as a true cosmic chronologist.`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
