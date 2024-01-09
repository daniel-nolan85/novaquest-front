import { useState, useEffect } from 'react';
import { List, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { getAuth, signOut, updatePassword } from 'firebase/auth';
import { app } from '../../../../firebase';
import { SafeArea } from '../../../components/utils/safe-area.component';
import {
  AvatarContainer,
  UserInfoContainer,
  SettingsItem,
} from '../styles/settings.styles';
import Admin from '../../../../assets/svg/admin.svg';
import Rocket from '../../../../assets/svg/rocket.svg';
import Astronaut from '../../../../assets/svg/astronaut.svg';
import Achievements from '../../../../assets/svg/achievements.svg';
import Password from '../../../../assets/svg/password.svg';
import Speech from '../../../../assets/svg/speech.svg';
import Logout from '../../../../assets/svg/logout.svg';
import { Text } from '../../../components/typography/text.component';
import { AdminModal } from '../components/admin-modal.component';
import { DaysInSpaceModal } from '../components/days-in-space-modal.component';
import { AchievementsModal } from '../components/achievements-modal.component';
import { UpdatePasswordModal } from '../components/update-password-modal.component';
import { TextSpeedModal } from '../components/text-speed-modal.component';
import { updateTextSpeed } from '../../../requests/user';

export const SettingsScreen = ({ navigation }) => {
  const [passwordIsLoading, setPasswordIsLoading] = useState(false);
  const [textSpeedIsLoading, setTextSpeedIsLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showDays, setShowDays] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTextSpeed, setShowTextSpeed] = useState(false);
  const [password, setPassword] = useState('');
  const [textSpeed, setTextSpeed] = useState('');

  const { Icon } = Avatar;
  const { Section } = List;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const { navigate } = navigation;

  useEffect(() => {
    if (user.textSpeed === 100) {
      setTextSpeed('slow');
    } else if (user.textSpeed === 50) {
      setTextSpeed('medium');
    } else {
      setTextSpeed('fast');
    }
  }, []);

  const auth = getAuth();

  const closeAdminModal = () => {
    setShowAdmin(false);
  };

  const closeDaysInSpaceModal = () => {
    setShowDays(false);
  };

  const closeAchievementsModal = () => {
    setShowAchievements(false);
  };

  const updateUserPassword = async () => {
    setPasswordIsLoading(true);
    const fbUser = auth.currentUser;
    await updatePassword(fbUser, password)
      .then(() => {
        setPasswordIsLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Launch credentials updated successfully',
          text2: `Your account is now fortified with a new password. Safe travels, Commander ${user.name}!`,
        });
        setShowPassword(false);
        setPassword('');
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error('errorMessage => ', errorMessage);
        setPasswordIsLoading(false);
        setShowPassword(false);
        setPassword('');
        if (errorCode === 'auth/requires-recent-login') {
          Toast.show({
            type: 'error',
            text1: 'Recent sign-in is required',
            text2: 'Please sign in again to proceed with the password update.',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Update Failed',
            text2: errorMessage || 'An error occurred during password update.',
          });
        }
      });
  };

  const closePasswordModal = () => {
    setShowPassword(false);
    setPassword('');
  };

  const updateUserTextSpeed = async () => {
    setTextSpeedIsLoading(true);
    if (user.role !== 'guest') {
      updateTextSpeed(user.token, user._id, textSpeed)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              ...user,
              textSpeed: res.data.textSpeed,
            },
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          ...user,
          textSpeed,
        },
      });
    }
    setShowTextSpeed(false);
    setTextSpeedIsLoading(false);
    Toast.show({
      type: 'success',
      text1: 'Your cosmic reading speed has been adjusted',
      text2:
        'Navigate through the cosmos at your own pace. Enjoy the journey, Commander!',
    });
  };

  const closeTextSpeedModal = () => {
    setShowTextSpeed(false);
  };

  const logout = async () => {
    if (user.role !== 'guest') await signOut(auth);
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  };
  return (
    <SafeArea>
      <AvatarContainer>
        <Icon
          icon={() => <Astronaut width={180} height={180} />}
          backgroundColor='#eeeeef'
        />
      </AvatarContainer>
      <UserInfoContainer>
        <Text variant='title'>
          {user.rank} {user.name}
        </Text>
      </UserInfoContainer>
      <Section>
        {user.role === 'admin' && (
          <SettingsItem
            title={<Text variant='body'>Admin</Text>}
            left={() => <Admin width={32} height={32} />}
            onPress={() => setShowAdmin(true)}
          />
        )}
        <SettingsItem
          title={<Text variant='body'>Days in space</Text>}
          left={() => <Rocket width={32} height={32} />}
          onPress={() => setShowDays(true)}
        />
        <SettingsItem
          title={<Text variant='body'>Missions</Text>}
          left={() => <Achievements width={32} height={32} />}
          onPress={() => setShowAchievements(true)}
        />
        {user.role !== 'guest' && (
          <SettingsItem
            title={<Text variant='body'>Change password</Text>}
            left={() => <Password width={32} height={32} />}
            onPress={() => setShowPassword(true)}
          />
        )}
        <SettingsItem
          title={<Text variant='body'>Change conversation speed</Text>}
          left={() => <Speech width={32} height={32} />}
          onPress={() => setShowTextSpeed(true)}
        />
        <SettingsItem
          title={<Text variant='body'>Logout</Text>}
          left={() => <Logout width={32} height={32} />}
          onPress={logout}
        />
      </Section>
      <AdminModal
        showAdmin={showAdmin}
        closeAdminModal={closeAdminModal}
        navigate={navigate}
      />
      <DaysInSpaceModal
        showDays={showDays}
        closeDaysInSpaceModal={closeDaysInSpaceModal}
      />
      <AchievementsModal
        showAchievements={showAchievements}
        closeAchievementsModal={closeAchievementsModal}
      />
      <UpdatePasswordModal
        password={password}
        setPassword={setPassword}
        updateUserPassword={updateUserPassword}
        showPassword={showPassword}
        closePasswordModal={closePasswordModal}
      />
      <TextSpeedModal
        textSpeed={textSpeed}
        setTextSpeed={setTextSpeed}
        updateUserTextSpeed={updateUserTextSpeed}
        showTextSpeed={showTextSpeed}
        closeTextSpeedModal={closeTextSpeedModal}
      />
    </SafeArea>
  );
};
