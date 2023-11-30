import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { badgeUnlocked } from '../../../requests/user';
import { BadgeAnimation } from '../../../components/animations/badge.animation';
import RocketLaunch from '../../../../assets/svg/rocket-launch.svg';

export const WelcomeCompleteScreen = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    badgeUnlocked(user.token, user._id, 'achievedCosmicPioneer')
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            achievedCosmicPioneer: res.data.achievedCosmicPioneer,
          },
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <BadgeAnimation
        svg={<RocketLaunch width={512} height={512} />}
        title='Cosmic Pioneer'
        body={`Congratulations, Commander ${user.name}! You've earned the illustrious 'Cosmic Pioneer' badge, signifying the launch of your extraordinary journey through the cosmos. Like a rocket soaring into the vast unknown, you've just begun to explore the wonders that await. May your celestial adventure be as limitless as the cosmos itself. Onward and upward, Cosmic Pioneer!`}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
