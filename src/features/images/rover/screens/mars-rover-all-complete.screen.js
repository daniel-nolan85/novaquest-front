import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { badgeUnlocked } from '../../../../requests/user';
import { BadgeAnimation } from '../../../../components/animations/badge.animation';
import AllRovers from '../../../../../assets/svg/badges/all-rovers.svg';

const BadgeContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MarsRoverAllCompleteScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  let additionalAchievements = route.params?.additionalAchievements || [];

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (user.role !== 'guest') {
      badgeUnlocked(user.token, user._id, 'achievedMarsRoverMaestro')
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              achievedMarsRoverMaestro: res.data.achievedMarsRoverMaestro,
            },
          });
        })
        .catch((err) => console.error(err));
    } else {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          ...user,
          achievedMarsRoverMaestro: true,
        },
      });
    }
    if (additionalAchievements.length > 1) {
      const firstAchievement = additionalAchievements[0];
      additionalAchievements = additionalAchievements.slice(1);
      navigate(firstAchievement, { additionalAchievements });
    } else if (additionalAchievements.length === 1) {
      navigate(additionalAchievements[0]);
    } else {
      navigate('MarsRoverImagesScreen');
    }
  };

  return (
    <BadgeContainer>
      <BadgeAnimation
        svg={<AllRovers width={380} height={380} />}
        title='Mars Rover Maestro'
        body={`Commander ${user.name}, a celestial salute to you! Your insatiable curiosity has led you to earn the distinguished 'Mars Rover Maestro' badge. By exploring images from all the rovers that have traversed the Martian terrain, you've become a true maestro of the Red Planet. Your cosmic journey has unveiled the wonders of Mars from every angle. Continue to orchestrate your celestial symphony, Mars Rover Maestro!`}
        handleSubmit={handleSubmit}
      />
    </BadgeContainer>
  );
};
