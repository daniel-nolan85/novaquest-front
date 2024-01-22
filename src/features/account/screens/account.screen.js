import { useState } from 'react';
import Swiper from 'react-native-swiper';
import { View, StyleSheet } from 'react-native';
import { SpaceRide } from '../components/space-ride.component';
import { LoginForm } from '../components/login-form.component';
import { RegistrationForm } from '../components/registration-form.component';
import { GuestExplorerModal } from '../components/guest-explorer-modal.component';

export const AccountScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);

  const { navigate } = navigation;

  const handleGuestLogin = () => {
    setVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}>
        <SpaceRide />
      </View>
      <View style={{ flex: 0.5, backgroundColor: '#eeeeef' }}>
        <Swiper
          showsPagination
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        >
          <LoginForm handleGuestLogin={handleGuestLogin} />
          <RegistrationForm
            handleGuestLogin={handleGuestLogin}
            navigate={navigate}
          />
          <GuestExplorerModal visible={visible} setVisible={setVisible} />
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#009999',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
});
