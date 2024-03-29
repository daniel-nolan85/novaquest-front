import { useState, useEffect, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'react-native';
import { List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut, updatePassword } from 'firebase/auth';
import { app } from '../../../../firebase';
import { SafeArea } from '../../../components/utils/safe-area.component';
import {
  AvatarContainer,
  UserInfoContainer,
  SettingsItem,
  ScrollArea,
  Delete,
} from '../styles/settings.styles';
import Admin from '../../../../assets/svg/admin.svg';
import Rocket from '../../../../assets/svg/rocket.svg';
import Achievements from '../../../../assets/svg/achievements.svg';
import Password from '../../../../assets/svg/password.svg';
import Speech from '../../../../assets/svg/speech.svg';
import SoundEffects from '../../../../assets/svg/sound-effects.svg';
import Logout from '../../../../assets/svg/logout.svg';
import Trash from '../../../../assets/svg/trash.svg';
import { Text } from '../../../components/typography/text.component';
import { AdminModal } from '../components/admin-modal.component';
import { DaysInSpaceModal } from '../components/days-in-space-modal.component';
import { AchievementsModal } from '../components/achievements-modal.component';
import { UpdatePasswordModal } from '../components/update-password-modal.component';
import { TextSpeedModal } from '../components/text-speed-modal.component';
import { SoundEffectsModal } from '../components/sound-effects-modal.component';
import { DeleteAccountModal } from '../components/delete-account-modal.component';
import {
  updateTextSpeed,
  updateSoundEffects,
  confirmUserEmail,
} from '../../../requests/user';
import defaultProfile from '../../../../assets/img/defaultProfile.png';
import { AudioContext } from '../../../services/audio/audio.context';
import { ToastNotification } from '../../../components/animations/toast-notification.animation';

export const SettingsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showDays, setShowDays] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTextSpeed, setShowTextSpeed] = useState(false);
  const [showSoundEffects, setShowSoundEffects] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [textSpeed, setTextSpeed] = useState('');
  const [soundEffects, setSoundEffects] = useState(null);
  const [showEmailInvalidToast, setShowEmailInvalidToast] = useState(false);
  const [showEmailMismatchToast, setShowEmailMismatchToast] = useState(false);
  const [showPasswordFailedToast, setShowPasswordFailedToast] = useState(false);
  const [showPasswordUpdateToast, setShowPasswordUpdateToast] = useState(false);
  const [showRecentLoginToast, setShowRecentLoginToast] = useState(false);
  const [showPasswordErrorToast, setShowPasswordErrorToast] = useState(false);
  const [showTextSpeedToast, setShowTextSpeedToast] = useState(false);
  const [showSoundEffectsToast, setShowSoundEffectsToast] = useState(false);

  const { Section } = List;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const { navigate } = navigation;

  const { stopGameMusic } = useContext(AudioContext);

  useFocusEffect(
    useCallback(() => {
      stopGameMusic();
    }, [])
  );

  useEffect(() => {
    if (user.textSpeed === 100) {
      setTextSpeed('slow');
    } else if (user.textSpeed === 50) {
      setTextSpeed('medium');
    } else {
      setTextSpeed('fast');
    }
  }, []);

  useEffect(() => {
    if (user.soundEffects === true) {
      setSoundEffects(true);
    } else {
      setSoundEffects(false);
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
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setShowEmailInvalidToast(true);
      setTimeout(() => {
        setShowEmailInvalidToast(false);
      }, 3000);
      return;
    }
    if (
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[a-zA-Z]/.test(password)
    ) {
      setShowPasswordFailedToast(true);
      setTimeout(() => {
        setShowPasswordFailedToast(false);
      }, 3000);
      return;
    }
    setIsLoading(true);

    try {
      const normalizedEmail = email.toLowerCase();
      await confirmUserEmail(
        user.token,
        user._id,
        user.role,
        normalizedEmail
      ).then(async (res) => {
        if (res.data.success) {
          const fbUser = auth.currentUser;
          await updatePassword(fbUser, password)
            .then(() => {
              setIsLoading(false);
              setShowPasswordUpdateToast(true);
              setTimeout(() => {
                setShowPasswordUpdateToast(false);
              }, 3000);
              setShowPassword(false);
              setEmail('');
              setPassword('');
            })
            .catch((err) => {
              const errorCode = err.code;
              const errorMessage = err.message;
              console.error('errorMessage => ', errorMessage);
              setIsLoading(false);
              setShowPassword(false);
              setEmail('');
              setPassword('');
              if (errorCode === 'auth/requires-recent-login') {
                setShowRecentLoginToast(true);
                setTimeout(() => {
                  setShowRecentLoginToast(false);
                }, 3000);
              } else {
                setShowPasswordErrorToast(true);
                setTimeout(() => {
                  setShowPasswordErrorToast(false);
                }, 3000);
              }
            });
        } else {
          setIsLoading(false);
          setShowEmailMismatchToast(true);
          setTimeout(() => {
            setShowEmailMismatchToast(false);
          }, 3000);
          console.error('Email verification failed');
        }
      });
    } catch (err) {
      setIsLoading(false);
      console.error('API request error: ', err);
    }
  };

  const closePasswordModal = () => {
    setShowPassword(false);
    setEmail('');
    setPassword('');
  };

  const updateUserTextSpeed = async () => {
    updateTextSpeed(user.token, user._id, user.role, textSpeed)
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
    setShowTextSpeed(false);
    setShowTextSpeedToast(true);
    setTimeout(() => {
      setShowTextSpeedToast(false);
    }, 3000);
  };

  const closeTextSpeedModal = () => {
    setShowTextSpeed(false);
  };

  const updateUserSoundEffects = async () => {
    updateSoundEffects(user.token, user._id, user.role, soundEffects)
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            ...user,
            soundEffects: res.data.soundEffects,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
    setShowSoundEffects(false);
    setShowSoundEffectsToast(true);
    setTimeout(() => {
      setShowSoundEffectsToast(false);
    }, 3000);
  };

  const closeSoundEffectsModal = () => {
    setShowSoundEffects(false);
  };

  const closeDeleteModal = () => {
    setShowDelete(false);
  };

  const logout = async () => {
    if (user.role !== 'guest') await signOut(auth);
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
  };

  const emailInvalidToastContent = {
    type: 'warning',
    title: `${user.rank} ${user.name}, it seems there's a warp in the space-time email continuum! `,
    body: 'Please enter a valid email address to continue your cosmic journey.',
  };

  const emailMismatchToastContent = {
    type: 'warning',
    title: `${user.rank} ${user.name}, the cosmic email coordinates are misaligned!`,
    body: 'Please enter the correct email associated with your account to proceed.',
  };

  const passwordFailedToastContent = {
    type: 'warning',
    title: 'Password update failed',
    body: 'Password must be at least 6 characters and contain letters and numbers.',
  };

  const passwordUpdateToastContent = {
    type: 'success',
    title: 'Launch credentials updated successfully',
    body: `Your account is now fortified with a new password. Safe travels, ${user.rank} ${user.name}!`,
  };

  const recentLoginToastContent = {
    type: 'warning',
    title: 'Recent sign-in is required',
    body: 'Please sign in again to proceed with the password update.',
  };

  const passwordErrorToastContent = {
    type: 'error',
    title: 'Password update failed',
    body: `An error occurred during password update.`,
  };

  const textSpeedToastContent = {
    type: 'success',
    title: 'Your cosmic reading speed has been adjusted',
    body: `Navigate through the cosmos at your own pace. Enjoy the journey, ${user.rank} ${user.name}!`,
  };

  const soundEffectsToastContent = {
    type: 'success',
    title: 'Your celestial soundtrack preferences have been tuned',
    body: `Whether in cosmic silence or surrounded by stellar sound, your adventure awaits.`,
  };

  const deleteAccountToastContent = {
    type: 'success',
    title: 'Your account has been successfully deleted',
    body: `Whether in cosmic silence or surrounded by stellar sound, your adventure awaits.`,
  };

  return (
    <SafeArea>
      <AvatarContainer>
        <Image
          source={user.profileImage ? user.profileImage : defaultProfile}
          style={{ width: 180, height: 180, borderRadius: 90 }}
        />
      </AvatarContainer>
      <UserInfoContainer>
        <Text variant='title' style={{ textAlign: 'center', width: '90%' }}>
          {user.rank} {user.name}
        </Text>
        <Text variant='title'>{user.xp} XP</Text>
        <Text variant='title'>
          {user.daysInSpace === 1
            ? `${user.daysInSpace} day`
            : `${user.daysInSpace} days`}{' '}
          in space
        </Text>
      </UserInfoContainer>
      <ScrollArea>
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
            title={
              <Text variant='body'>
                {user.soundEffects
                  ? 'Turn off sound effects'
                  : 'Turn on sound effects'}
              </Text>
            }
            left={() => <SoundEffects width={32} height={32} />}
            onPress={() => setShowSoundEffects(true)}
          />
          <SettingsItem
            title={<Text variant='body'>Logout</Text>}
            left={() => <Logout width={32} height={32} />}
            onPress={logout}
          />
          {user.role !== 'guest' && (
            <SettingsItem
              title={<Delete variant='body'>Delete account</Delete>}
              left={() => <Trash width={32} height={32} />}
              onPress={() => setShowDelete(true)}
            />
          )}
        </Section>
      </ScrollArea>
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
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        updateUserPassword={updateUserPassword}
        showPassword={showPassword}
        closePasswordModal={closePasswordModal}
        isLoading={isLoading}
      />
      <TextSpeedModal
        textSpeed={textSpeed}
        setTextSpeed={setTextSpeed}
        updateUserTextSpeed={updateUserTextSpeed}
        showTextSpeed={showTextSpeed}
        closeTextSpeedModal={closeTextSpeedModal}
      />
      <SoundEffectsModal
        soundEffects={soundEffects}
        setSoundEffects={setSoundEffects}
        updateUserSoundEffects={updateUserSoundEffects}
        showSoundEffects={showSoundEffects}
        closeSoundEffectsModal={closeSoundEffectsModal}
      />
      <DeleteAccountModal
        showDelete={showDelete}
        closeDeleteModal={closeDeleteModal}
        logout={logout}
      />
      {showEmailInvalidToast && (
        <ToastNotification {...emailInvalidToastContent} />
      )}
      {showEmailMismatchToast && (
        <ToastNotification {...emailMismatchToastContent} />
      )}
      {showPasswordFailedToast && (
        <ToastNotification {...passwordFailedToastContent} />
      )}
      {showPasswordUpdateToast && (
        <ToastNotification {...passwordUpdateToastContent} />
      )}
      {showRecentLoginToast && (
        <ToastNotification {...recentLoginToastContent} />
      )}
      {showPasswordErrorToast && (
        <ToastNotification {...passwordErrorToastContent} />
      )}
      {showTextSpeedToast && <ToastNotification {...textSpeedToastContent} />}
      {showSoundEffectsToast && (
        <ToastNotification {...soundEffectsToastContent} />
      )}
    </SafeArea>
  );
};
